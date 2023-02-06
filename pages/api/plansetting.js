import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        //... create plan setting
        case "POST":
            await db.collection("plansetting").insertOne(req.body);
            return res.json({ status: true, message: 'Plan is set successfully.' });

        //... update plan setting
        case "PUT":
            const { id } = req.query;
            await db.collection("plansetting").updateOne(
                {
                    _id: new ObjectId(id),
                },
                {
                    $set: {
                        last_frost: req.body.last_frost,
                        first_frost: req.body.first_frost,
                        location: req.body.location
                    },
                }
            );
            return res.json({ status: true, message: 'Plan setting is updated successfully.' });
    }
}