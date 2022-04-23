import express from 'express'
import dotenv from 'dotenv'
import cluster from 'cluster'
import os from 'os'
dotenv.config()
const app = express()

app.get('/', (req, res) => {
    for (let i = 0; i < 1e8; i++) {
        // console.log(`CL : ${process.pid}`);
    }
    res.send('Nusayeb')
    // cluster.worker?.kill()
})
//cluster setup
const port = process.env.PORT
const numCPUS = os.cpus().length
if (cluster.isPrimary) {

    for (let i = 0; i < numCPUS; i++) {
        cluster.fork()
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
        cluster.fork()
    })

} else {
    app.listen(port, () => {
        console.log(`App is started on http://localhost:${port} and process id ${process.pid}`)
    })
}

    // app.listen(port, () => {
    //     console.log(`App is started on http://localhost:${port} and process id ${process.pid}`)
    // })