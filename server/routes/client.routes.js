import express from 'express';
import clientCtrl from '../controllers/client.controller'

const router = express.Router();

router.route('/api/clients')
    .get(clientCtrl.list)
    .post(clientCtrl.create)

router.route('/api/client')
    .get(clientCtrl.listUser)