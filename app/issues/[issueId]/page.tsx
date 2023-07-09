/* eslint-disable @next/next/no-img-element */
"use client";
import { ICommentData, IIssueData } from "@/Interface/ReportIinterface";
import Navbar from "@/components/Navbar";
import { getSingleIssue } from "@/functions/issueReport.tsx/getSingleIssue";
import { format, intervalToDuration } from "date-fns";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsGraphUp } from "react-icons/bs";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import getUserById from "@/functions/user/getUserById";
import { Avatar, Textarea } from "@chakra-ui/react";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { updateIssue } from "@/functions/issueReport.tsx/updateIssue";

const Issue = ({ params }: any) => {
  const issueId = params.issueId;
  const [issue, setIssue] = useState<Partial<IIssueData>>();

  const [mySwiper, setMySwiper] = useState<any>();
  const daysPassed: any =
    issue?.issuedate &&
    intervalToDuration({ start: parseInt(issue?.issuedate), end: Date.now() });
  const { user } = useUser();
  const [comment, setComment] = useState<string>("");
  const getIssueRaiser = async (userId: string) => {
    const _username = await getUserById(userId);
    setIssue((prev) => {
      return {
        ...prev,
        issueRaiserName: _username,
      };
    });
  };



  useEffect(() => {
    handleGetSingleIssues();
  }, []);

  const handleGetSingleIssues = async () => {
    try {
      const res = await getSingleIssue(issueId);
      setIssue(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-blueBackground">
      <Navbar />
      <div className="grid grid-cols-4  min-h-[90vh] bg-white rounded-xl shadow-custom mx-8 my-8 divide-x-2 ">
        <div
          className={`col-span-3  ${
            issue?.issuelevel === "severe" && "border-t-red-500"
          } ${issue?.issuelevel === "moderate" && "border-t-yellow-500"} ${
            issue?.issuelevel === "low" && "border-t-blue-500"
          } border-t-8`}
        >
          <div className=" px-6 space-y-4 py-4 ">
            <section>
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-semibold">{issue?.issuetitle}</h1>
                <h1>
                  {issue?.issuedate && format(parseInt(issue?.issuedate), "PP")}
                </h1>
              </div>
              <h1>Raised {daysPassed?.days} days ago</h1>
            </section>
            <p>{issue?.issuedescription}</p>
            <section className="flex justify-start items-center">
              <BsGraphUp color="#1A75FF" size={30} />
              <span className="ml-2 mr-2 font-semibold">Progress:</span>
              <span
                className={`${
                  issue?.issueprogress === "started" && "text-yellow-600"
                } ${issue?.issueprogress === "not started" && "text-red-600"} ${
                  issue?.issueprogress === "finished" && "text-green-600"
                } font-semibold`}
              >
                {issue?.issueprogress}
              </span>
            </section>
            <section className="flex justify-start items-center">
              <AiOutlineThunderbolt color="#1A75FF" size={30} />
              <span className="ml-2 mr-2 font-semibold">Issue Type:</span>
              <span>{issue?.issuetype}</span>
            </section>
            <section className="flex justify-start items-center">
              <FaMapMarkerAlt color="#1A75FF" size={30} />
              <span className="ml-2 mr-2 font-semibold">Location:</span>
              <span>{issue?.issuetype}</span>
            </section>
            <div className='"w-full flex items-center justify-start">'>
              <button
                className="mr-1 text-[#fff] rounded-full"
                onClick={() => {
                  if (mySwiper) mySwiper.slidePrev();
                }}
              >
                <IoIosArrowBack size={30} color="#000" />
              </button>
              <Swiper
                onInit={(ev: any) => setMySwiper(ev)}
                grabCursor={true}
                loop={true}
                slidesPerView={2}
                //pagination={true}
                spaceBetween={2}
                //navigation={true}
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                modules={[Pagination, Navigation, Autoplay, EffectCoverflow]}
                className=" mx-auto"
              >
                {issue?.issuemedia?.map((img, i) => {
                  return (
                    <SwiperSlide key={i}>
                      <img src={img} alt="image" key={i} className="" />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <button
                className="mr-1 text-[#fff] rounded-full"
                onClick={() => {
                  if (mySwiper) mySwiper.slideNext();
                }}
              >
                <IoIosArrowForward size={30} color="#000" />
              </button>
            </div>
            <div className="flex justify-start items-center">
              <span className="mr-3 font-semibold">issue Raised by</span>
              <span className="flex justify-center items-center gap-2">
                <Avatar
                  name={issue?.issueraiserdetails?.issueraisername}
                  size={"sm"}
                />
                <Link
                  href={`/profile/${issue?.issueraiserdetails?.issueraisername}?currentTab=personalDetails`}
                >
                  <span className="anchor-custom">
                    {issue?.issueraiserdetails?.issueraisername}
                  </span>
                </Link>
              </span>
            </div>
          </div>
          <hr className=""></hr>
          <div>
            <Textarea
              rows={8}
              borderColor={"purple.500"}
              maxLength={1000}
              resize="none"
              ringColor={"purple.500"}
              focusBorderColor="purple.500"
              placeholder="Why should you get the job?"
              onChange={(e: any) => {
                setComment(e.target.value);
              }}
              value={comment}
              className="fixed bottom-0"
            />
            <button
              onClick={async () => {
                const commentData = {
                  body: comment,
                  commenttype: "citizen",
                  username: user?.username,
                };
                console.log(commentData);
                console.log(issue);
                setIssue((prev: any) => {
                  return {
                      ...prev,
                      issuecomments: [...(prev?.issuecomments as ICommentData[]), commentData],
                  }
                });
                setComment("");
                await updateIssue(issue?._id as string, issue as IIssueData);
              }}
              className="btn-primary"
            >
              Send
            </button>
          </div>
          <div className="px-4 py-4 space-y-4 ">
            <h1 className="text-1.5xl font-semibold ">Discussion Forum</h1>
            <p className="text-xl font-semibold ">
              {issue?.issuecomments?.length} Messages
            </p>
            {issue?.issuecomments?.filter(
              (data) => data.commenttype == "citizen"
            ).length !== 0 ? (
              issue?.issuecomments
                ?.filter((data) => data.commenttype == "citizen")
                .map((data, id) => {
                  return (
                    <div key={id}>
                      <div className="flex justify-start items-center">
                        <Avatar name={data.username} size={"md"} />
                        <div className="flex flex-col justify-start px-2 leading-snug font-semibold ">
                          <span className="text-green-800 text-sm ">
                            {data.username}
                          </span>
                          <p>{data.body}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
            ) : (
              <p className="text-xl font-semibold ">No Messages</p>
            )}
          </div>
        </div>

        <div>
          <h1 className=" text-center font-semibold text-2xl py-3 text-red-700">
            Updates
          </h1>
          {/* All Issue Updates */}
          {issue?.issuecomments?.map((data, id) => {
            return (
              <div key={id}>
                {data.commenttype == "officer" && (
                  <div className="flex flex-col justify-start px-2 gap-2 font-semibold ">
                    <p>
                      {data.body}{" "}
                      <span className="text-green-800 text-xs  px-2">
                        {" "}
                        -{data.username}{" "}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Issue;
