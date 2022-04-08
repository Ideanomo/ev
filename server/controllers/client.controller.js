import Client from '../models/client.model';
import dbErrorHandler from './../helpers/dbErrorHandler';

const create = async (req, res) => {
    const client = new Client(req.body);

    try {
        await client.save();
        return res.status(200).json({
            message: `Great, thanks for signing up.`
        })

    } catch (err) {
        return res.status(200).json({
            error: dbErrorHandler.getErrorMessage(err)
        })
    }
}

const listClients = async (req, res) => {
    try {
        let clients = await Client.find().select( 'name email company createdDate')
        res.json(clients)
    } catch (err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        })
    }
}

const listClient = async (req, res) => {
    const query = {}
    if (req.query.name) {
        query.name = {'regex': req.query.name, '$options': 'i'}
    }
    try {
        let client = await Client.find(query).select('name email company created');
        res.json(client)
    } catch (err) {
        return res.status(400).json({
            error: dbErrorHandler.getErrorMessage(err)
        })
    }
}

export default { create, listClients, listClient }