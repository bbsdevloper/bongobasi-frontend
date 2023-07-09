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
    issueraiserdetails: IIssueRaiserDetails;
    issueprogress?: string
    _id: string
}

export interface IIssueLocation{
    localAddress:string,
    district:string,
    subDivision:string,
}

export interface IIssueRaiserDetails{
    issueraisername:string,
    issueraiserid: string,
    issueraisermail:string,
    issueraiserphone:string,
    issueraiserprofilephoto:string,
}