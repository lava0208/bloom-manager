import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { planService, plantService, plantingService, taskService } from "services";
import moment from "moment";

async function getPlantImg(id){
    const _plant = await plantService.getById(id);
    return _plant.data.image;
}

async function getPlantById(id){
    const _plant = await plantService.getById(id);
    return _plant.data;
}

async function getPlanById(id){
    const _plan = await planService.getById(id);
    return _plan.data;
}

function createTasks(planting, plant, plan){
    let last_frost = plan.last_frost;
    // let first_frost = plan.first_frost;

    //... durations
    let _earliest_seed = plant.earliest_seed !== "" ? parseInt(plant.earliest_seed)*7 : 0;
    let _latest_seed = plant.latest_seed !== "" ? parseInt(plant.latest_seed)*7 : 0;
    let _cold_stratify = plant.cold_stratify !== "" ? parseInt(plant.cold_stratify)*7 : 0;
    let _pinch = plant.pinch !== "" ? parseInt(plant.pinch)*7 : 0;
    let _pot_on = plant.pot_on !== "" ? parseInt(plant.pot_on)*7 : 0;
    let _harden = plant.harden !== "" ? parseInt(plant.harden)*7 : 0;
    let _transplant = plant.transplant !== "" ? parseInt(plant.transplant)*7 : 0;
    let _direct_sow = planting.direct_sow === true ? parseInt(plant.direct_seed)*7 : 0;
    let _maturity_early = plant.maturity_early !== "" ? parseInt(plant.maturity_early) : 0;

    //... schedule dates
    let cold_stratify_date = moment(last_frost).subtract(_cold_stratify, 'days').format('YYYY/MM/DD');
    let pot_on_date = moment(last_frost).add(_pot_on, 'days').format('YYYY/MM/DD');
    let harvest_date = moment(last_frost).add(_maturity_early, 'days').format('YYYY/MM/DD');
    let seed_indoors_date;
    if(planting.direct_indoors){
        switch (planting.harvest) {
            case "Early":
                seed_indoors_date = moment(last_frost).subtract(_earliest_seed, 'days').format('YYYY/MM/DD');
                break;
            case "Regular":
                seed_indoors_date = moment(last_frost).subtract((_earliest_seed + _latest_seed)/2, 'days').format('YYYY/MM/DD');
                break;
            default:
                seed_indoors_date = moment(last_frost).subtract(_latest_seed, 'days').format('YYYY/MM/DD');
                break;
        }
    }else{
        seed_indoors_date = moment(last_frost).add(_direct_sow, 'days').format('YYYY/MM/DD');
    }
    let harden_date = moment(last_frost).add(_harden, 'days').format('YYYY/MM/DD');
    let pinch_date = moment(last_frost).add(_pinch, 'days').format('YYYY/MM/DD');
    let transplant_date = moment(last_frost).add(_transplant, 'days').format('YYYY/MM/DD');
    
    var titleArr = ['Cold Stratify', 'Pot On', 'Harvest', 'Seed Indoors', 'Harden', 'Pinch', 'Transplant'];
    var noteArr = ['', plant.pot_on_note, plant.harvest_note, plant.indoor_seed_note, '', plant.pinch_note, plant.transplant_note];
    var durationArr = [7, 7, 1, 7, 7, 7, 7];
    var scheduleArr = [cold_stratify_date, pot_on_date, harvest_date, seed_indoors_date, harden_date, pinch_date, transplant_date]

    var taskArr = [];

    for (var i=0; i<7; i++){
        var taskObj = {
            planting_id: planting._id,
            title: titleArr[i],
            scheduled_at: scheduleArr[i],
            duration: durationArr[i],
            note: noteArr[i],
            type: "incomplete",
            rescheduled_at: "",
            completed_at: ""
        }
        taskArr.push(taskObj);
    }
    return taskArr;
}

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        //... create plantings
        case "POST":
            //... check if there is same plan id and plant id
            let existOne = await db.collection("plantings").find({plan_id: req.body.plan_id, plant_id: req.body.plant_id}).toArray();
            if(existOne.length === 0){
                //... insert planting
                await db.collection("plantings").insertOne(req.body);
                
                //... insert automatic tasks
                let _plant = await getPlantById(req.body.plant_id);
                let _plan = await getPlanById(req.body.plan_id);

                await taskService.create(createTasks(req.body, _plant, _plan));

                return res.json({ status: true, message: 'Planting is created successfully. Refresh the page.' });
            }else{
                return res.json({ status: false, message: 'The Planting was already planed.' });
            }

        //... get all plantings or planing by id
        case "GET":
            if(req.query.id){
                let _planting = await db.collection("plantings").findOne({_id: new ObjectId(req.query.id)});
                return res.json({ status: true, data: _planting });
            }else if(req.query.plantid){
                let _planting = await db.collection("plantings").findOne({plant_id: req.query.plantid});
                return res.json({ status: true, data: _planting });
            }else{
                let plantings = await db.collection("plantings").find({}).toArray();
                await Promise.all(plantings.map(async (elem) => {
                    try {
                      elem.image = await getPlantImg(elem.plant_id)  
                    } catch (error) {
                      console.log('error'+ error);
                    }
                }))
                return res.json({ status: true, data: plantings });
            }

        //... update a planting
        case "PUT":
            await db.collection("plantings").updateOne(
                {
                    _id: new ObjectId(req.query.id),
                },
                {
                    $set: {
                        seeds: req.body.seeds,
                        harvest: req.body.harvest,
                        direct_sow: req.body.direct_sow,
                        pinch: req.body.pinch,
                        pot_on: req.body.pot_on,
                        spacing: req.body.spacing,
                        succession: req.body.succession
                    },
                }
            );
            
            //... insert automatic tasks
            let _plant = await getPlantById(req.body.plant_id);
            let _plan = await getPlanById(req.body.plan_id);

            await taskService.update(req.query.id , createTasks(req.body, _plant, _plan));

            return res.json({ status: true, message: 'Planting is updated successfully.' });

        //... delete a planting
        case "DELETE":
            await db.collection("plantings").deleteOne({_id: new ObjectId(req.query.id)});
            return res.json({ status: true, message: 'The planting is deleted successfully.' });
    }
}