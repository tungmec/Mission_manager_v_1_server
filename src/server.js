import {myEnv} from '../src/config/env.js';

import http  from 'http';
import app from './app.js';
import {initSocketServer} from './websocket.js';

export const httpServer = http.createServer(app);
const serverPort = myEnv.server.PORT || 8000;
initSocketServer(httpServer);

httpServer.listen(serverPort, () =>{
    console.log(`Server is listening in http://localhost:${serverPort}`);
})