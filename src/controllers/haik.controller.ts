import cloudinary from '../utils/cloudinary'
import joi from 'joi-browser'
import {CONFIG} from '../config'
const config = CONFIG()
import Stripe from 'stripe'
const stripe = new Stripe (`${config.stripe_api_secret}`, {apiVersion:'2020-08-27'})
import { sendMail } from '../utils/mail'
import { CreateHaikuMailTemplate, HaikuReceiptMailTemplate } from '../utils/mailTemplates'
import { ValidateRequest, HaikModel } from '../models/haiku.model'
import {PaymentModel} from '../models/payment.model'
const clientUrl= 'https://modernhaiq.netlify.app'


export const saveHaik = async (req:any, res:any, next:any)=>{
    
    const {error} = ValidateRequest(req.body)
    // console.log(req.body);
    
    if(error) return res.status(401).send(error.details[0].message)

    let imageLink 
    const {line1, line2, line3, image, imageUrl, email, backgroundMode} = req.body
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
     //console.log('FInal link is ', imageLink);
        
     const newHaik = new HaikModel({
        line1, line2, line3, image:imageLink, email, backgroundMode
     })
    const saveHaiku= await newHaik.save()
    sendMail(email,'HAIQ Published', CreateHaikuMailTemplate(`${clientUrl}/haiku/${saveHaiku._id}`))

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
    //console.log(req.params.id)
    try{
        const result = await HaikModel.findById(req.params.id)
        if(!result) res.status(404).send('Haiku not found')

         if(!result.memorialized){
            let timeStamp = new Date (result.createdAt)
            let TimeStamp = new Date(timeStamp).getTime()

            let future = new Date (result.createdAt)
            future.setDate(future.getDate() + 17)
            let Future = new Date(future).getTime()

            let now = new Date().getTime()

            let distance = Future - now

            if(distance <= 0){
                await HaikModel.findByIdAndUpdate(req.params.id, {expired:true})
                // return res.status(404).send('Haiku expired')
            }

            //10 20 30
            
            //check distance

                //if distance expired
                    //delete and return and return a 404 message
                //continue
         }
       
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
    
    const {error} = validatePaymentBody(req.body)
    if(error) return res.status(401).send(error.details[0].message)
    const {card_number, exp_month, exp_year, cvc, productId, author} = req.body
    try{
        //@ts-ignore
       const token = await stripe.tokens.create({
           
           card:{
            number:card_number,
            exp_month,
            exp_year,
             cvc
           }
       })
        console.log(token);
        
       const response = await stripe.charges.create({
            source:token.id,
            amount:10000,
            currency:'usd'
        })
        const newPayment = new PaymentModel({
            productId
        })
        await HaikModel.findByIdAndUpdate(productId, {memorialized:true, expired:false})
        if(req.body.author) await HaikModel.findByIdAndUpdate(productId, {Author:author})
        await newPayment.save()
        console.log(response);
        const user = await HaikModel.findById(productId)
        sendMail(user.email,'Receipt from Modern HAIQ', HaikuReceiptMailTemplate(`${clientUrl}/haiku/${user._id}`))
        res.json({
            status:'success',
            message:'Transaction successful'
        })

    }catch(ex){
        console.log(ex);
        res.status(500).send(ex)   
    }
    
}

function validatePaymentBody (payload:any){
    const schema = {
        card_number:joi.string().required(),
        exp_month:joi.string().required(),
        exp_year:joi.string().required(),
        cvc:joi.string().required(),
        productId: joi.string().required(),
        author:joi.string()
    }

    return joi.validate(payload, schema)
}






