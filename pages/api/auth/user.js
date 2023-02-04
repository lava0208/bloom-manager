import clientPromise from "../../../lib/mongodb";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        case "POST":
            let user = await db.collection("users").find({email: req.body.email}).toArray();
            if(user.length !== 0){
                return res.json({ status: 200, data: user });    
            }
            return res.json({ status: 400, message: 'Email and/or password are not correct!' });
    }
}