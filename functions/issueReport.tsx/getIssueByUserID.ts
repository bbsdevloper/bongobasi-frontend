
import { baseUrl } from "@/baseUrl"
import axios from "axios"

export async function fetchAllUserIssue(id:string) {
    try {
        const res = await axios.get(`${baseUrl}/api/fetchIssues/${id}`)
        return res.data
    } catch (err: any) {
        console.log(err)
    }
}