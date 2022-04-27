import cloudinary from '../utils/cloudinary'
import {CONFIG} from '../config'
const config = CONFIG()
import Stripe from 'stripe'
const stripe = new Stripe (`${config.stripe_api_secret}`, {apiVersion:'2020-08-27'})
import { sendMail } from '../utils/mail'
import { CreateHaikuMailTemplate } from '../utils/mailTemplates'
import { ValidateRequest, HaikModel } from '../models/haiku.model'
import { send } from 'process'
const clientUrl= 'https://modernhaiq.netlify.app'


export const saveHaik = async (req:any, res:any, next:any)=>{
    
    const {error} = ValidateRequest(req.body)
    if(error) return res.status(401).send(error.details[0].message)

    let imageLink 
    const {line1, line2, line3, image, imageUrl, email} = req.body
   if(image==='none'){
       imageLink = imageUrl 
   }else{
       try{
        const uploadResponse = await cloudinary.uploader.upload(imageUrl,{
            upload_preset:'haiku_uploads'
        })
        imageLink= uploadResponse.secure_url 
       }catch(ex){
           console.log('UPLOAD ERROR', ex);   
       }
   }

   try{
     console.log('FInal link is ', imageLink);
        
     const newHaik = new HaikModel({
        line1, line2, line3, image:imageLink, email
     })
    const saveHaiku= await newHaik.save()
    sendMail(email,'Haik Published', CreateHaikuMailTemplate(`${clientUrl}/haiku/${saveHaiku._id}`))

    res.json({
        status:'success',
        message:'Haik saved with success',
        data:saveHaiku
    })
    }catch(err:any){
        res.status(500).send(err)
    }

}

export const getHaik = async (req:any, res:any, next:any)=>{
    console.log(req.params.id)
    try{
        const result = await HaikModel.findById(req.params.id)
        console.log(result)
        if(!result) res.status(404).send('Haiku not found')
       
        res.json({
            status:'success',
            message:'Haik fetched successfully',
            data:result
        })

    }catch(ex){
        res.status(500).send(ex)
        console.log(ex);
        
    }
}

export const payment = async (req:any, res:any, next:any)=>{
    console.log(req.body);
    let status
    try{
       const response = await stripe.charges.create({
            source:req.body.token.id,
            amount:10000,
            currency:'usd'
        })
        status='success'
        console.log(response);
        
        res.json({
            status,
            message:'Transaction successful'
        })

    }catch(ex){
        console.log(ex);
        status='failure'  
        res.status(500).send(ex)   
    }
    
}






