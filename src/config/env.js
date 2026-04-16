import dotenv from 'dotenv';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({
    path: path.resolve(__dirname,'./server.env')
});

export const myEnv = {
    server: {
        PORT:process.env.PORT
            },

    db:{
        PgHost:process.env.PG_HOST,
        PgPort:process.env.PG_PORT,
        PgUser:process.env.PG_USERNAME,
        PgPassword:process.env.PG_PASSWORD,
        PgDatabase:process.env.PG_DATABASE
    },

    jwt:{
        jwtSecretKey:process.env.JWT_SECRET_KEY,
        jwtExpiresIn:process.env.JWT_EXPIRES_IN
    }

}