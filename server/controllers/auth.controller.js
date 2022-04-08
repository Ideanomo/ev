import Client from '../models/client.model';
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';
import config from './../../config/config';

const signin = async (req, res) => {
    try {
        let client = await Client.findOne({"email": req.body.email});

        if (!client) {
            return res.status(401).json({
                error: "Client no fount"
            })
        }

        if (!client.authenticate(req.body.password)) {
            return res.status(401).send({error: "Email land password don't match"})
        }

        const token = jwt.sign({ _id: client._id}, config.jwtSecret);

        return res.json({
            token,
            client: {
                _id: client._id,
                name: client.name,
                email: client.email,
                company: client.company,
            }
        })

    } catch (err) {
        return res.status(404).json({
            error: "Count not sign in"
        })
    }
}

const signout = (req, res) => {
    return res.status('200').json({
        message: "Signed out"
    })
}

export default { signin, signout };
