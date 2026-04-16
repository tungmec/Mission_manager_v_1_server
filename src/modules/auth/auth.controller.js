import {getMainUserByName, createNewMainUser, getAllMainUser} from './auth.service.js';
import express from 'express';
import bcrypt from 'bcrypt';
import {signAccessToken, verifyAccessToken} from '../../utils/jwt.js';


// Create manager user  and insert to manager_users table function:
export const createMainUser = async (req, res, next) => {
    const {userName, password} = req.body;
    
    // Check for existed useName:
    const existUser = await getMainUserByName(userName);
    if (existUser !== null) {
        console.log("Auth Contrller error: User name already exists");
        return res.status(409).json({
            success:false,
            msg:"User name already exists"
        })
    }
    const passwordHash = await bcrypt.hash(password,10);
   
    const newMainUser = await createNewMainUser(userName, passwordHash);
    // ------------create new main user and insert to database:
    // check result - not OK:
    if (newMainUser === null) {
        return res.status(500).json({
            success:false,
            msg:"Database internal error, can not create new user"
        })
    }
    // create OK:
    return res.status(201).json({
        success: true,
        msg: `Create new main user successful`,
        data: newMainUser
    });
}

// Login function for manager users:

export const loginMainUser = async (req, res, next) => {
    const {userName, password} = req.body;
    const logedInUser = await getMainUserByName(userName);
    if (logedInUser === null) {
        return res.status(404).json({
            success:false,
            msg: "User not exist"
        })
    }

    const isCorectPassword = await bcrypt.compare(password, logedInUser.password_hash);
    if (!isCorectPassword) {
        return res.status(400).json({
            success:false,
            msg: "Invalid password -> Fail to login"
        })
    }

    const token = signAccessToken({
        id: logedInUser.id,
        user_name: logedInUser.user_name,
        user_type: logedInUser.user_type
    });

    return res.status(200).json({
        success: true,
        msg: "Login OK",
        token: token,
        data: 
        {
            id: logedInUser.id,
            user_name: logedInUser.user_name,
            user_type: logedInUser.user_type
        }
    });


}

// Get all manager users (only for test):
export const loadAllMainUser = async (req, res, next) => {
    const allUser = await getAllMainUser();
    return res.json({
        success:true,
        msg: "Load all manager users OK",
        data: allUser
    })
}