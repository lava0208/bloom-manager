import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        //... create a plan
        case "POST":
            await db.collection("plans").insertOne(req.body);
            return res.json({ status: true, data: 'A plan is created successfully.' });

        //... get all plans or plan by id
        case "GET":
            const { planid } = req.query;
            console.log(planid);
            if(planid === undefined){
                let plans = await db.collection("plans").find({}).toArray();
                return res.json({ status: true, data: plans });
            }else{
                let plan = await db.collection("plans").findOne({_id: new ObjectId(planid)});
                return res.json({ status: true, data: plan });
            }

        //... update a plan
        case "PUT":
            const { id } = req.query;
            await db.collection("plans").updateOne(
                {
                    _id: new ObjectId(id),
                },
                {
                    $set: {
                        isActive: true,
                        seeding: req.body.seeding,  //... direct sow = 1, start indoors = 2
                        quantity: req.body.quantity,
                        harvest: req.body.harvest,  //... early = 1, regular = 2, late = 3
                        plantings: req.body.plantings,
                        days: req.body.days,
                        option: req.body.option //... start = 1, regular = 2, pinch = 3, pot on = 4
                    },
                }
            );
            return res.json({ status: true, message: 'Plan is updated successfully.' });
    }
}