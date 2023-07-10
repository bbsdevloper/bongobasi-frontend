"use client";
import { IIssueData } from "@/Interface/ReportIinterface";
import Navbar from "@/components/Navbar";
import ReportIssueCard from "@/components/Problem/ReportIssueCard";
import { fetchAllIssue } from "@/functions/issueReport.tsx/fetchAllIssue";
import { CircularProgress, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";

const Issues = () => {
  const [issues, setIssues] = useState<IIssueData[]>([]);
  const [levelSort, setLevelSort] = useState<string>();
  const [typeSort, setTypeSort] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    handleGetAllIssues();
  }, []);

  const handleGetAllIssues = async () => {
    setLoading(true);
    try {
      const res = await fetchAllIssue();
      setIssues(res);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center space-y-4">
          <CircularProgress isIndeterminate color="blue.400" />
          <h1>Loading please wait!</h1>
        </div>
      ) : (
        <div className="bg-blueBackground pb-6 min-h-screen">
          <Navbar />
          <div className="mx-12 ">
            <div className="flex justify-between items-center py-4 px-8">
              <h1 className="text-1.5xl font-semibold flex items-center gap-2">
                <GrLocation /> Kolkata -{" "}
                <span className="text-xl mt-1">12</span> Issues
              </h1>
              <div className="flex gap-4">
                <Select
                  borderColor={"gray.500"}
                  backgroundColor={"#FBFAFF"}
                  focusBorderColor="purple.500"
                  placeholder="Filter the issue level"
                  width={"200px"}
                >
                  <option value="1">Severe</option>
                  <option value="2">Moderate</option>
                  <option value="3">Low</option>
                </Select>
                <Select
                  borderColor={"gray.500"}
                  backgroundColor={"#FBFAFF"}
                  focusBorderColor="purple.500"
                  placeholder="Filter the issue type"
                  width={"200px"}
                >
                  <option value="1">Road</option>
                  <option value="2">Water</option>
                  <option value="3">Electricity</option>
                </Select>
              </div>
            </div>
            <div className="bg-white mx-8 mb-8 rounded-lg p-4 px-8 shadow-xl min-h-[90vh]">
              {issues?.map((data, id) => {
                return (
                  <div className="my-6" key={id}>
                    <ReportIssueCard data={data} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Issues;
