/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import React from "react";

const ViewIssue = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row-reverse justify-center items-center gap-16 pt-10 px-28">
      <img src="reportIssue.png" className="max-w-[30rem]" />
      <div>
        <h1 className="text-4xl font-semibold text-blueDeep">
          View all Issue of your locality
        </h1>
        <p className="text-lg mt-4">
          You can see all the issues reported by the people of your locality
        </p>
        <button
          className="btn-primary mt-4"
          onClick={() => router.push("/issues")}
        >
          View Issue
        </button>
      </div>
    </div>
  );
};

export default ViewIssue;
