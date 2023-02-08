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
                        season: req.body.season,
                        name: req.body.name,
                        last_frost: req.body.last_frost,
                        first_frost: req.body.first_frost,
                        size: req.body.size,
                        location: req.body.location
                    },
                }
            );
            return res.json({ status: true, message: 'Plan is updated successfully.' });
    }
}