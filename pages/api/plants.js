import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        //... create a plant        
        case "POST":
            await db.collection("plants").insertOne(req.body);
            return res.json({ status: true, data: 'A plant is created successfully.' });

        //... get all plants or plant by id
        case "GET":
            if(req.query.id === undefined){
                let plants = await db.collection("plants").find({}).toArray();
                return res.json({ status: true, data: plants });
            }else{
                let plant = await db.collection("plants").findOne({_id: new ObjectId(req.query)});
                return res.json({ status: true, data: plant });
            }

        //... update a plant
        case "PUT":
            const { id } = req.query;
            await db.collection("plants").updateOne(
                {
                    _id: new ObjectId(id),
                },
                {
                    $set: {
                    },
                }
            );
            return res.json({ status: true, message: 'plant is updated successfully.' });
    }
}