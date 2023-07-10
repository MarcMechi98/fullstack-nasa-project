const http = require('http');
const cluster = require('cluster')
const mongoose = require('mongoose')
cluster.schedulingPolicy = cluster.SCHED_RR

const app = require('./app');
const { loadPlanetsData } = require('./models/planets.model');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const MONGO_URL = 'mongodb+srv://marcedumechi:obFbfvD4vaJWr9aM@cluster0.yyjiygm.mongodb.net/nasa?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection has been established!')
})

mongoose.connection.on('error', (err) => {
    console.error(err)
})

async function startServer() {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}...`);
    });
}

startServer();



