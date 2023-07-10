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
import lottieData from '../../../public/lottie.json'
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BsGraphUp, BsPeople, BsSend, BsSendFill } from "react-icons/bs";
import { BiDownvote, BiSolidDownvote, BiSolidUpvote, BiUpvote } from "react-icons/bi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaMapMarkerAlt } from "react-icons/fa";
import getUserById from "@/functions/user/getUserById";
import { Avatar, CircularProgress, Input, Textarea } from "@chakra-ui/react";
import Link from "next/link";
import { useUser } from "@/context/userContext";
import { updateIssue } from "@/functions/issueReport.tsx/updateIssue";
import Moment from "react-moment";

const Issue = ({ params }: any) => {
  const [adminComment, setAdminComment] = useState<string>("");
  const issueId = params.issueId;
  const [issue, setIssue] = useState<Partial<IIssueData>>();
  const [loading, setLoading] = useState<boolean>(true);
  const [mySwiper, setMySwiper] = useState<any>();
  const [isLiked, setIsLiked] = useState(false)
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
  const handleAddAdminComment = async () => {
    const commentData: ICommentData = {
      body: adminComment,
      commenttype: "officer",
      username: user?.UserId as string,
      commenttime: Date.now(),
    };

    await updateIssue(issue?._id as string, {
      ...issue,
      issuecomments: [...(issue?.issuecomments as ICommentData[]), commentData],
    });
    setIssue((prev: any) => {
      return {
        ...prev,
        issuecomments: [
          ...(prev?.issuecomments as ICommentData[]),
          commentData,
        ],
      };
    }
    );
    setAdminComment("");
  };

  const handleAddVote = async () => {
    let _issueData = { ...issue, issuevote: [...issue?.issuevote as string[], user?.UserId as string] }
     await updateIssue(issue?._id as string,_issueData)
    setIssue((prev)=>{
      return {
        ...prev,
        issuevote: [...issue?.issuevote as string[], user?.UserId as string]
      }
    })
    setIsLiked(true)
  }

  useEffect(() => {
    handleGetSingleIssues();
  }, [user]);

  const handleGetSingleIssues = async () => {
    setLoading(true);
    try {
      const res = await getSingleIssue(issueId);
      setIssue(res);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };
  const handleAddComment = async () => {
    const commentData: ICommentData = {
      body: comment,
      commenttype: "citizen",
      username: user?.username as string,
      commenttime: Date.now(),
    };

    await updateIssue(issue?._id as string, {
      ...issue,
      issuecomments: [...(issue?.issuecomments as ICommentData[]), commentData],
    });
    setIssue((prev: any) => {
      return {
        ...prev,
        issuecomments: [
          ...(prev?.issuecomments as ICommentData[]),
          commentData,
        ],
      };
    });
    setComment("");
  };

  return (
    <>
      {loading ? (
        <div className="h-screen w-screen flex flex-col justify-center items-center space-y-4">
          <CircularProgress isIndeterminate color="blue.400" />
          <h1>Loading please wait!</h1>
        </div>
      ) : (
        <div className="min-h-screen bg-blueBackground pb-6">
          <Navbar />
          <div className="grid grid-cols-4  min-h-[85vh] bg-white rounded-xl shadow-custom mx-8 my-8 divide-x-2 ">
            <div
              className={`col-span-3  ${issue?.issuelevel === "severe" && "border-t-red-500"
                } ${issue?.issuelevel === "moderate" && "border-t-yellow-500"} ${issue?.issuelevel === "low" && "border-t-blue-500"
                } border-t-8`}
            >
              <div className=" px-6 space-y-4 py-4 ">
                <section>
                  <div className="flex justify-between items-center">
                    <section className="flex justify-start items-center gap-2">
                      <h1 className="text-2xl font-semibold">
                        {issue?.issuetitle}
                      </h1>
                      <h1 className="text-lg">
                        ({issue?.issuedate &&
                          format(parseInt(issue?.issuedate), "PP")})
                      </h1>
                    </section>
                    <section className="flex justify-end gap-1 text-base items-center">
                      {
                        isLiked ? <BiUpvote size={30} color="#002966" cursor={'pointer'} onClick={handleAddVote} /> : <BiSolidUpvote size={30} color="#002966" cursor={'pointer'} className="hover:scale-105" />
                      }
                      {issue?.issuevote?.length}
                    </section>
                  </div>
                  <h1>Raised {daysPassed?.days} days ago</h1>
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
                    slidesPerView={1}
                    //pagination={true}
                    spaceBetween={2}
                    //navigation={true}
                    autoplay={{
                      delay: 2000,
                      disableOnInteraction: false,
                    }}
                    modules={[
                      Pagination,
                      Navigation,
                      Autoplay,

                    ]}
                    className=" mx-auto"
                  >
                    {issue?.issuemedia?.map((img, i) => {
                      return (
                        <SwiperSlide key={i}>
                          <img src={img} alt="image" key={i} className="w-[40vw] mx-auto" />
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
                <p>{issue?.issuedescription}</p>
                <section className="flex justify-start items-center">
                  <BsGraphUp color="#1A75FF" size={30} />
                  <span className="ml-2 mr-2 font-semibold">Progress:</span>
                  <span
                    className={`${issue?.issueprogress === "started" && "text-yellow-600"
                      } ${issue?.issueprogress === "not started" && "text-red-600"
                      } ${issue?.issueprogress === "finished" && "text-green-600"
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
                  <span>
                    {issue?.issuelocation?.localaddress},{" "}
                    {issue?.issuelocation?.subdivision},{" "}
                    {issue?.issuelocation?.district}{" "}
                  </span>
                </section>

                <div className="flex justify-start items-center gap-2">
                  <span>
                    <BsPeople color="#1A75FF" size={30} />
                  </span>
                  <span className="mr-3 font-semibold">Issue Raised by :</span>
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

              <div className="px-4 py-4 space-y-6 ">
                <h1 className="text-1.5xl font-semibold ">Discussion Forum</h1>
                <p className="text-xl font-semibold ">
                  {issue?.issuecomments?.length} Messages
                </p>
                <div className="flex gap-3 ">
                  <Avatar size={"md"} name={user?.username}></Avatar>
                  <Textarea
                    rows={1}
                    borderColor={"purple.500"}
                    maxLength={1000}
                    resize="none"
                    ringColor={"purple.500"}
                    focusBorderColor="purple.500"
                    placeholder="Write your message here"
                    onChange={(e: any) => {
                      setComment(e.target.value);
                    }}
                    value={comment}
                    className="fixed bottom-0"
                  />
                  <button onClick={handleAddComment} className="btn-primary">
                    <BsSendFill />
                  </button>
                </div>
                {issue?.issuecomments?.filter(
                  (data) => data.commenttype == "citizen"
                ).length !== 0 ? (
                  issue?.issuecomments
                    ?.filter((data) => data.commenttype == "citizen")
                    .reverse()
                    .map((data, id) => {
                      return (
                        <div key={id}>
                          <div className="flex justify-start items-center m-4">
                            <Avatar name={data.username} size={"md"} />
                            <div className="flex flex-col justify-start px-2 leading-snug font-semibold ">
                              <span className="text-green-800 text-sm ">
                                {data?.username} (
                                <Moment fromNow>{data?.commenttime}</Moment>)
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

            <div className="overflow-y-auto max-h-[85vh] px-2 py-4">
              <h1 className=" text-center font-semibold text-2xl py-3 text-red-700">
                Updates
              </h1>
              {/* All Issue Updates */}
              {issue?.issuecomments?.map((data, id) => {
                return (
                  <div key={id} className="w-fit mr-4">
                    {data.commenttype == "officer" && (
                      <div
                        className={`px-6 py-4 m-4 border-l-8 border-blue-600 rounded-lg w-full shadow-custom`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex justify-start items-center">
                            <Avatar name={data.username} size={"md"} />
                            <div className="flex flex-col justify-start px-2 leading-snug font-semibold ">
                              <span className="text-green-800 text-sm ">
                                {data?.username} (
                                <Moment fromNow>{data?.commenttime}</Moment>)
                              </span>
                              <p>{data.body}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <>
                {
                  user?.userrole === "officer" && <div className="flex justify-start gap-2 items-center mb-2">
                    <Avatar name={user?.username} size={'sm'} />
                    <Input
                      type="text"
                      backgroundColor={"#FBFAFF"}
                      focusBorderColor="#1A75FF"
                      placeholder="Enter your message here"
                      size={"md"}
                      value={adminComment}
                      onChange={(e) =>
                        setAdminComment(e.target.value)
                      }
                      fontSize="base"
                    />
                    <button className="btn-primary" 
                    onClick={handleAddAdminComment}
                    >
                      <BsSendFill />
                    </button>
                  </div>
                }
              </>
              <hr className="py-3" />
              <div className="pl-2">

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Issue;
