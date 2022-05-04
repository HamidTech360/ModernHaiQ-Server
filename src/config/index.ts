// module.exports = (()=>{
// })()

export const CONFIG = () => {
    const env = process.env.NODE_ENV
    if(env!=='production') require ('dotenv').config()
    
    return{
        DATABASE_URL:process.env.DATABASE_URL,
        JWT_SECRET:process.env.JWT_SECRET,
        PORT:process.env.PORT,
        SEND_GRID_EMAIL_KEY:process.env.SEND_GRID_EMAIL_KEY,
        cloud_name:process.env.cloud_name,
        cloudinary_api_key:process.env.cloudinary_api_key,
        cloudinary_api_secret:process.env.cloudinary_api_secret,
        stripe_api_secret:process.env.stripe_secret_key
    }

}
