import dotenv from 'dotenv';
import { url } from 'inspector';
import path, { resolve } from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({
    path: path.resolve(__dirname,'./server.env')
});

export const myEnv = {
    server: {
        PORT:process.env.PORT
    }
}