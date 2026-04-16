import express from 'express';
import morgan from 'morgan';
import cors from 'cors'
import {authRouter} from './modules/auth/auth.routes.js';


const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:[
        "http://localhost:5173"
    ]
}))

app.get('/health', (req, res, next) => {
    return res.status(200).json({
        success:true,
        msg:"OK"
    })
})

app.use('/api/auth', authRouter);

export default app;