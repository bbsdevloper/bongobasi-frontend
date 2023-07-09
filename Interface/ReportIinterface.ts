

export interface ICommentData {
    body: string,
    commenttype: "officer" | "citizen",
    username: string,
}


export interface IIssueData {
    issuetitle: string,
    issuedescription: string,
    issuetype: string,
    issuelevel: "low" | "moderate" | "severe"
    issuemedia?: string[]
    issuelocation: IIssueLocation;
    issuecomments?: ICommentData[]
    issuedate: string,
    issueRaiser: string,
    issueRaiserName?: string,
    issueraiserid: string
    issueprogress?: string
    issueimages: string[]
    _id: string
}

export interface IIssueLocation{
    localAddress:string,
    district:string,
    subDivision:string,
}