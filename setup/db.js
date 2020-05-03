const config = require('config');
const winston = require('winston');

module.exports = function(mongoose) {
    const db = config.get('db');
    mongoose.connect(db).then(() => {
        console.log('Connected to MongoDb...');
        winston.info(`Connected to MongoDb ${db}`);
    });
}