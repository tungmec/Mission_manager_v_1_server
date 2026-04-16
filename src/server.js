import {myEnv} from '../src/config/env.js';
import http  from 'http';
import app from './app.js';


const httpServer = http.createServer(app);
const serverPort = myEnv.server.PORT || 8000;

httpServer.listen(serverPort, () =>{
    console.log(`Server is listening in http://localhost:${serverPort}`);
})