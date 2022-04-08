import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template';
import clientRoutes from './routes/client.routes';
import authRoutes from './routes/auth.routes';
import devBundle from './devBundle';
import path from 'path';
const CURRENT_WORKING_DIRECTORY = process.cwd();

const app = express();

devBundle.compile(app);

app.get('/', (req, res) => {
    res.status(200).send(Template())
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use('/', clientRoutes)
app.use('/', authRoutes)
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIRECTORY, 'dist')));

export default app;