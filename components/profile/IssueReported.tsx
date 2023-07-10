import React, { useEffect, useState } from "react";
import ReportIssueCard from "../Problem/ReportIssueCard";
import { IIssueData } from "@/Interface/ReportIinterface";
import { useUser } from "@/context/userContext";
import { fetchAllUserIssue } from "@/functions/issueReport.tsx/getIssueByUserID";

const IssueReported = () => {
  const [issueAll, setIssueAll] = useState<IIssueData[]>([]);
  const { user } = useUser();
  useEffect(() => {
    getAllIssue();
  }, []);

  const getAllIssue = async () => {
    const data = await fetchAllUserIssue(user?.UserId as string);
    setIssueAll(data as IIssueData[]);
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold text-blueDeep mb-6">
        Your Reported Issues
      </h1>
      <div className="space-y-6">
        {issueAll?.map((issue, i) => {
          return <ReportIssueCard key={i} data={issue} />;
        })}
      </div>
    </div>
  );
};

export default IssueReported;
