import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        //... create a task
        case "POST":
            await db.collection("tasks").insertMany(req.body);
            return res.json({ status: true, message: 'A task is created successfully.' });

        //... get all tasks or task by id
        case "GET":
            if(req.query.id === undefined && req.query.plantingid === undefined){
                let tasks = await db.collection("tasks").find({}).toArray();
                return res.json({ status: true, data: tasks });
            }else if(req.query.plantingid === undefined){
                let task = await db.collection("tasks").findOne({_id: new ObjectId(req.query.id)});
                return res.json({ status: true, data: task });
            }else{
                let tasks = await db.collection("tasks").find({planting_id: req.query.plantingid}).toArray();
                return res.json({ status: true, data: tasks });
            }

        //... update a task
        case "PUT":
            await db.collection("tasks").deleteMany({planting_id: req.query.plantingid});
            await db.collection("tasks").insertMany(req.body);
            return res.json({ status: true, message: 'task is updated successfully.' });

        //... delete a task
        case "DELETE":
            await db.collection("tasks").deleteOne({_id: new ObjectId(req.query)});
            return res.json({ status: true, message: 'The task is deleted successfully.' });
    }
}