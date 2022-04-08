import config from './../config/config';
import app from './express';
import mongoose from 'mongoose';

const server = app.listen(config.port, (err) => {
    if (err) {
        console.log(err)
    }
    console.log(`Server started on port ${config.port}`)
});

// Allow Mongoose to use ES6 Promises
mongoose.Promise = global.Promise;
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`)
})

export default server;