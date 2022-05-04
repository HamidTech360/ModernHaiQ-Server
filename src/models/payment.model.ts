import mongoose from 'mongoose'




const paymentSchema = new mongoose.Schema({
   productId:{
       type:String,
       required:true
   }
}, {timestamps:true})




export const PaymentModel = mongoose.model('payment', paymentSchema)

// export {ValidateUser as ValidateUser};

