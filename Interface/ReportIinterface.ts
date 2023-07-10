export interface ICommentData {
    body: string,
    commenttype: "officer" | "citizen",
    username: string,
    commenttime: number,
}


export interface IIssueData {
    issuetitle: string,
    issuedescription: string,
    issuetype: string,
    issuelevel: "low" | "moderate" | "severe"
    issuevote?:string[],
    issuemedia?: string[]
    issuelocation: IIssueLocation;
    issuecomments?: ICommentData[]
    issuedate: string,
    issueraiserdetails: IIssueRaiserDetails;
    issueprogress?: string
    _id: string
}

export interface IIssueLocation{
    localaddress:string,
    district:string,
    subdivision:string,
}

export interface IIssueRaiserDetails{
    issueraisername:string,
    issueraiserid: string,
    issueraisermail:string,
    issueraiserphone:string,
    issueraiserprofilephoto:string,
}