import { IUser } from '@/Interface/UserInterface'
import { baseUrl } from '@/baseUrl'
import axios from 'axios'

export async function updateUser(userData:Partial<IUser>) {
    try {
        const res = await axios.post(`${baseUrl}/api/updateUser/${userData.UserId}`, userData)
    } catch (err: any) {
        console.log(err)
        
    }
}