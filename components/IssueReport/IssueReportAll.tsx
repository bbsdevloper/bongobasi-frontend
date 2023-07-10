import React from "react";
import IssueReportCard from "./issueReport.Card";
import GrNext from "react-icons/gr";

const IssueReportAll = () => {
  return (
    <div className="mt-20 pb-10 ">
      <h1 className="font-bold text-deepBlue text-4xl  text-center mb-10">
        Steps to Report a Issue
      </h1>
      <div className="flex justify-center items-center space-x-16">
        <div className="max-w-[20rem] bg-white py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200">
          <div className=" w-full flex justify-center items-center ">
            <span className="px-6 py-1  rounded-full bg-bluePrimary text-white -mt-10">
              Step 1
            </span>
          </div>
          <img src="/search.png" alt="search png" />
          <h1 className="bg-bluePrimary text-white px-6 py-4 text-lg font-semibold text-center">
            Find a issue in your locality
          </h1>
          <h2 className="px-6 py-3 text-center">
            Report your problems in your locality to the government
          </h2>
        </div>{" "}
        <div className="max-w-[20rem] bg-white py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200">
          <div className=" w-full flex justify-center items-center ">
            <span className="px-6 py-1  rounded-full bg-bluePrimary text-white -mt-10">
              Step 2
            </span>
          </div>
          <img src="/write.png" alt="search png" />
          <h1 className="bg-bluePrimary text-white px-6 py-4 text-lg font-semibold text-center">
            Fill the details of the issue
          </h1>
          <h2 className="px-6 py-3 text-center">
            Please ensure to add neccessary details asked in the site
          </h2>
        </div>{" "}
        <div className="max-w-[20rem] bg-white py-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-200">
          <div className=" w-full flex justify-center items-center ">
            <span className="px-6 py-1  rounded-full bg-bluePrimary text-white -mt-10">
              Step 3
            </span>
          </div>
          <img src="/solved.png" alt="search png" className="h-72 w-[20rem]" />
          <h1 className="bg-bluePrimary text-white px-6 py-4 text-lg font-semibold text-center">
            Get the solution ASAP
          </h1>
          <h2 className="px-6 py-3 text-center">
            One of the government official will see your issue and will try to
            resolve it as soon as possible
          </h2>
        </div>
      </div>
    </div>
  );
};

export default IssueReportAll;
