import mongoose from 'mongoose'
import joi from 'joi-browser'



const haikuSchema = new mongoose.Schema({
   image:{
       type:String,
       required:true
   },
   line1:{
       type:String,
       required:true
   },
   line2:{
       type:String,
       required:true
   },
   line3:{
       type:String,
       required:true
   },
   email:{
       type:String,
       required:true
   },
   Author:{
       type:String,
       default:'unknown'
   },
   memorialized:{
       type:Boolean,
       default:false
   },
   backgroundMode:{
       type:String,
       enum:["light", "dark"],
       required:true
   }
}, {timestamps:true})



 export function ValidateRequest (payload:any){
    const schema = {
        image:joi.any().required(),
        email:joi.string().email().required(),
        line1:joi.string().required(),
        line2:joi.string().required(),
        line3: joi.string().required(),
        backgroundMode:joi.string().required(),
        imageUrl:joi.any()
    }

    return joi.validate(payload, schema)

}
export const HaikModel = mongoose.model('haiku', haikuSchema)

// export {ValidateUser as ValidateUser};

