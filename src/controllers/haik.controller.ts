import cloudinary from '../utils/cloudinary'
import {CONFIG} from '../config'
const config = CONFIG()
import { ValidateRequest, HaikModel } from '../models/haiku.model'



export const saveHaik = async (req:any, res:any, next:any)=>{
    const {error} = ValidateRequest(req.body)
    if(error) return res.status(401).send(error.details[0].message)

    let imageLink 
    const {line1, line2, line3, image, imageUrl, email} = req.body
    //console.log(imageUrl);
    console.log('configurations', config);
    

   if(image==='none'){
       imageLink = imageUrl 
   }else{
       try{
        const uploadResponse = await cloudinary.uploader.upload(imageUrl,{
            upload_preset:'haiku_uploads'
        })
        console.log(uploadResponse);
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
    res.json({
        status:'success',
        message:'Haik saved with success',
        data:saveHaiku
    })
    }catch(err:any){
        res.status(500).send(err)
    }

}






