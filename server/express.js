import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import devBundle from './devBundle';

const app = express();

devBundle.compile(app);

// Serve the template at the root URL
app.get('/', (req, res) => {
    res.status(200).send(Template())
})

//Add middleware ( Added modules to configure Express)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());


export default app;