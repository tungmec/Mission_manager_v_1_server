import {Pool} from 'pg';
import {myEnv} from '../config/env.js'

const pool = new Pool({
    host:myEnv.db.PgHost,
    port:myEnv.db.PgPort,
    user:myEnv.db.PgUser,
    password:myEnv.db.PgPassword,
    database:myEnv.db.PgDatabase,
    max:10,
    idleTimeoutMillis:30000

});

export const query = (text, params) => {
    return pool.query(text, params);

} 

