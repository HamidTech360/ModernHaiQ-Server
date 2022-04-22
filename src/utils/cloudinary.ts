import {CONFIG} from '../config'
const config = CONFIG()
import Cloudinary from 'cloudinary'
const cloudinary = Cloudinary.v2

cloudinary.config({
    cloud_name:config.cloud_name,
    api_key:config.cloudinary_api_key,
    api_secret:config.cloudinary_api_secret
})

export default cloudinary