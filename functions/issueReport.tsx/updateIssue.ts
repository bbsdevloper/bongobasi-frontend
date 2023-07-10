import { IIssueData } from '@/Interface/ReportIinterface'
import { baseUrl } from '@/baseUrl'
import axios from 'axios'

export async function updateIssue(issueID: string, data: Partial<IIssueData>) {
    try {
        const res = await fetch(`${baseUrl}/api/updateIssue/${issueID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(data),
        })

        return res.json()
    } catch (err: any) {
        console.log(err)
    }
}
