import config from './../config/config';
import app from './express';

const server = app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server started on port ${config.port}`)
})