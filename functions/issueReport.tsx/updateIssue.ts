import { IIssueData } from '@/Interface/ReportIinterface'
import { baseUrl } from '@/baseUrl'
import axios from 'axios'

export async function updateIssue(issueID: string, data: IIssueData) {
    try {
        const res = await axios.put(`${baseUrl}/api/updateIssue/${issueID}`, data)
        return res.data
    } catch (err: any) {
        console.log(err)
    }
}
