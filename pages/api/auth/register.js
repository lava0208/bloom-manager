import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        case "POST":
            let existUser = await db.collection("users").find({email: req.body.email}).toArray();
            if(existUser.length !== 0){
                return res.json({ status: 400, message: 'Another account already exists for this email address!' });    
            }else{
                let newUser = await db.collection("users").insertOne(req.body);
                return res.json({ status: 200, data: newUser });
            }            
    }
}