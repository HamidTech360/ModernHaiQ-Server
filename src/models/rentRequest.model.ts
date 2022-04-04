import mongoose from 'mongoose'
import joi from 'joi-browser'



const userSchema = new mongoose.Schema({
   accomodationStatus:{
       type:String,
       required:true
   },
   rentRequest:{
       type:String,
       required:true
   },
   paymentPlan:{
       type:String,
       required:true
   },
   monthlyIncome:{
       type:String,
       required:true
   }
}, {timestamps:true})



 export function ValidateRequest (payload:any){
    const schema = {
        accomodationStatus:joi.string().required(),
        rentRequest:joi.string().required(),
        paymentPlan:joi.string().required(),
        monthlyIncome: joi.string().required()
    }

    return joi.validate(payload, schema)

}
export const UserModel = mongoose.model('rentRequest', userSchema)

// export {ValidateUser as ValidateUser};

