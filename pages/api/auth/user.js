import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
    const client = await clientPromise;
    const db = client.db("bloom");

    switch (req.method) {
        case "POST":
            let user = await db.collection("users").find({email: req.body.email}).toArray();
            if(user.length !== 0){
                bcrypt.compare(req.body.password, user[0].password, function(err, isMatch){
                    if(err){
                        throw err;
                    }else if(!isMatch){
                        return res.json({ status: 400, message: 'Email and/or password are not correct!' });
                    }else{
                        return res.json({ status: 200, data: user });
                    }
                });
            }else{
                return res.json({ status: 400, message: 'Email and/or password are not correct!' });
            }
    }
}