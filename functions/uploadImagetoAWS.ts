import { baseUrl } from '@/baseUrl'
import axios from 'axios'


export async function uploadImagetoAWS(imageData: any) {
    const blob = new Blob([imageData], { type: 'image/jpeg' });
    const formData = new FormData();
    formData.append('file', blob, 'image.jpg');
    
    try {
        const res = await axios.post(`${baseUrl}/api/uploadMedia`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })       
        return res.data
    } catch (err: any) {
        console.log(err)

    }
}
