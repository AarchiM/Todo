import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Router } from 'express';
import {body, validationResult} from 'express-validator';
import User from '../models/users.js';

const   routes = Router();

routes.post('/createUser', [
    body("email", "Incorrect Email!!").isEmail(),
    body("password", "Password length should be more than 6 character!!").isLength(),
], async (req, res) => {
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error: error.array()});
    }

    const salt = await bcrypt.genSalt(10);
    const {name, password, email} = req.body;
    const securePassword = await bcrypt.hash(password, salt);

    try {
        await User.create({
            name,
            email,
            password: securePassword,
        })
        res.status(200).json({success: true});
    } catch (error) {
        res.status(400).json({success: false, error: error})
    }
})

routes.post('/login', [
    body("email","Enter Correct Email").isEmail(),
    body("password", "Enter Should be more than 6 character").isLength()
], async (req, res) =>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        res.status(400).json({error: error.array()})
    }

    const userLoggedIn = await User.findOne({email: req.body.email});

    if(!userLoggedIn){
        res.status(400).json({message: "Incorrect email!!"})
    }
    const pass = await bcrypt.compare(req.body.password, userLoggedIn.password)

    console.log("Pass: ",pass);
    
    if(!pass){
        res.status(400).json({message: "Incorrect Password!!"})
    }
    const authtoken = jwt.sign({userId: userLoggedIn._id}, process.env.JWT_SCERET, {expiresIn: '1d'})


    res.json({success: true, Authtoken: authtoken})
})

export default routes;