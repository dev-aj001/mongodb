const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    CONNECTION_STRING: process.env.CONNECTION_STRING || 'mongodb://localhost:27017/?serverSelectionTimeoutMS=5000&connectTimeoutMS=10000',
    DATABASE: process.env.DATABASE || 'db_default', 
    DB_USER: process.env.DB_USER || 'admin', 
    DB_PASSWORD: process.env.DB_PASSWORD || 'admin',
}