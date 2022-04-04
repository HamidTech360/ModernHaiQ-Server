
import joi from 'joi-browser'
import {CONFIG} from '../config'
const config = CONFIG()
import { ValidateRequest,  UserModel } from "../models/rentRequest.model"




export const postRequest = async (req:any, res:any, next:any)=>{
    const { rentRequest, plan, income} = req.body
    const status = req.body.status.label
   
    const payload = {
        accomodationStatus:status,
        paymentPlan:plan,
        monthlyIncome:income,
        rentRequest
    }
    const {error} = ValidateRequest(payload)

    if(error) return res.status(400).send(error.details[0].message)

    try{
        
        
        
        const newUser = new UserModel ({
            accomodationStatus:status, 
            rentRequest, 
            paymentPlan:plan, 
            monthlyIncome:income
        })
        
        const saveUser = await newUser.save()
        res.json({
            status:'success',
            message:'Request posted successfully',
            data:{}
        })

    
    }catch(ex){
        res.status(500).send(ex)
    }

    
}





