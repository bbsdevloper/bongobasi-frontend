"use client";
import Navbar from "@/components/Navbar";
import {
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
} from "../lib/chakraui";
import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { IIssueData, IIssueLocation } from "@/Interface/ReportIinterface";
import { addnewIssue } from "@/functions/issueReport.tsx/addNewIssue";
import Map from "react-map-gl";
import getSearchedPLaces from "@/functions/getSearchedPlaces";
import { useUser } from "@/context/userContext";
import { uploadImagetoAWS } from "@/functions/uploadImagetoAWS";
import districtDivision from "@/data/districtDivision";
import { AiOutlineClose } from "react-icons/ai";

const ReportIssuePage = () => {
  const [_selectedDistrictSubdivision, setSelectedSubdivisions] = useState([
    "",
  ]);
  const { user } = useUser();
  const [media, setMedia] = useState<any[]>([""]);
  const [reportData, setReportData] = useState<IIssueData>({
    issuetitle: "",
    issuedescription: "",
    issuetype: "",
    issuelevel: "low",
    issuemedia: [],
    issuelocation: {
      localaddress: "",
      district: "",
      subdivision: "",
    },
    issuecomments: [],
    issuedate: Date.now().toString(),
    issueraiserdetails: {
      issueraisername: user?.username as string,
      issueraiserid: user?.UserId as string,
      issueraisermail: user?.useremail as string,
      issueraiserphone: user?.userphone as string,
      issueraiserprofilephoto: user?.userphone as string,
    },
    issueprogress: "not started",
    _id: "",
  });
  const [searchedLocation, setSearchedLocation] = useState<{
    lat: number;
    long: number;
  }>({
    lat: 22.5726,
    long: 88.3639,
  });

  const validateForm = () => {
    if (
      reportData.issuetitle !== "" &&
      reportData.issuedescription !== undefined &&
      reportData.issuetype !== "" &&
      reportData.issuelevel !== undefined
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handleAddMediatoS3 = async () => {
    let _uploadedMediaLink: string[] = [];
    media?.forEach(async (img) => {
      let _link = await uploadImagetoAWS(img);
      _uploadedMediaLink.push(_link.img_url);
    });
    console.log(_uploadedMediaLink as string[]);
    return _uploadedMediaLink;
  };

  const handleSubmitReport = async () => {
    let _uploadedMediaLink: string[] = [];

    async function handleMedia() {
      for (let i = 0; i < media?.length; i++) {
        let _link = await uploadImagetoAWS(media[i]);
        _uploadedMediaLink.push(_link.img_url);
      }
    }
    await handleMedia();

    const data: IIssueData = {
      ...reportData,
      issueraiserdetails: {
        issueraiserid: user?.UserId as string,
        issueraisername: user?.username as string,
        issueraisermail: user?.useremail as string,
        issueraiserphone: user?.userphone as string,
        issueraiserprofilephoto: user?.UserProfilePhoto as string,
      },
      issuemedia: _uploadedMediaLink,
    };
    await addnewIssue(data);
  };
  useEffect(() => {
    if (reportData.issuelocation?.district !== "") {
      const districtIndex = districtDivision.findIndex(
        (data) => data.district === reportData.issuelocation?.district
      );
      setSelectedSubdivisions(districtDivision[districtIndex].subdivisions);
    }
  }, [reportData.issuelocation?.district]);
  const getPlaces = async (location: string) => {
    const data = await getSearchedPLaces(location);

    data.features &&
      setSearchedLocation({
        lat: data.features[0].center[1],
        long: data.features[0].center[0],
      });
  };

  return (
    <>
      <div className="bg-blueBackground pb-6">
        <Navbar />
        <div className="bg-white mx-8 my-8 rounded-lg p-8 shadow-xl">
          <h1 className="text-2xl font-semibold mb-6">Report New Issue</h1>
          <div className="space-y-6 mb-4">
            <section>
              <h2 className="text-xl mb-2">Title*</h2>
              <Input
                type="text"
                backgroundColor={"#FBFAFF"}
                focusBorderColor="#1A75FF"
                placeholder="Enter An Issue Title here"
                size={"md"}
                value={reportData.issuetitle}
                fontSize="base"
                onChange={(e) =>
                  setReportData((prev: any) => {
                    return {
                      ...prev,
                      issuetitle: e.target.value,
                    };
                  })
                }
              />
            </section>
            <section>
              <h2 className="text-xl mb-2">Issue Type*</h2>
              <Select
                backgroundColor={"#FBFAFF"}
                placeholder="--select--"
                focusBorderColor="#1A75FF"
                size={"md"}
                value={reportData.issuetype}
                onChange={(e) =>
                  setReportData((prev: any) => {
                    return {
                      ...prev,
                      issuetype: e.target.value,
                    };
                  })
                }
                fontSize="base"
              >
                <option>Infrastructure Problems</option>
                <option>Sanitation and Waste Management</option>
                <option>Public Safety Concerns</option>
                <option>Environmental Issues</option>
                <option>Utility Services</option>
                <option>ransportation and Traffic</option>
                <option>Health and Public Health</option>
                <option>Noise or Nuisance Complaints</option>
                <option>Animal Control</option>
                <option>General Complaints or Suggestions</option>
              </Select>
            </section>
            <section>
              <h2 className="text-xl mb-2">Issue Level*</h2>
              <RadioGroup
                value={reportData.issuelevel}
                onChange={(e) =>
                  setReportData((prev: any) => {
                    return {
                      ...prev,
                      issuelevel: e,
                    };
                  })
                }
              >
                <Stack direction="row" spacing={"5rem"}>
                  <Radio value="low">
                    <span className="px-4 py-2 bg-blue-500 rounded-md text-white font-semibold">
                      Low
                    </span>
                  </Radio>
                  <Radio value="moderate">
                    <span className="px-4 py-2 bg-yellow-500 rounded-md text-white font-semibold">
                      Moderate
                    </span>
                  </Radio>
                  <Radio value="severe">
                    <span className="px-4 py-2 bg-red-500 rounded-md text-white font-semibold">
                      Severe
                    </span>
                  </Radio>
                </Stack>
              </RadioGroup>
            </section>
            <section>
              <h2 className="text-xl mb-2">Description*</h2>
              <Textarea
                backgroundColor={"#FBFAFF"}
                focusBorderColor="#1A75FF"
                placeholder="Enter a brief Description of the issue..."
                size={"md"}
                fontSize="base"
                value={reportData.issuedescription}
                onChange={(e) =>
                  setReportData((prev: any) => {
                    return {
                      ...prev,
                      issuedescription: e.target.value,
                    };
                  })
                }
              />
            </section>
            <section className="space-y-2">
              <h2 className="text-xl">Location*</h2>
              <div className="flex justify-between items-center gap-8">
                <section className="w-full">
                  <h2 className="text-lg mb-2">District</h2>
                  <Select
                    backgroundColor={"#FBFAFF"}
                    placeholder="--select--"
                    focusBorderColor="#1A75FF"
                    size={"md"}
                    value={reportData.issuelocation?.district}
                    onChange={(e) =>
                      setReportData({
                        ...reportData,
                        issuelocation: {
                          ...(reportData.issuelocation as IIssueLocation),
                          district: e.target.value,
                        },
                      })
                    }
                    fontSize="base"
                  >
                    {districtDivision.map((data, i) => {
                      return <option key={i}>{data.district}</option>;
                    })}
                  </Select>
                </section>
                <section className="w-full">
                  <h2 className="text-lg mb-2">Sub Division</h2>
                  <Select
                    disabled={!reportData.issuelocation?.district}
                    backgroundColor={"#FBFAFF"}
                    placeholder="--select--"
                    focusBorderColor="#1A75FF"
                    size={"md"}
                    value={reportData.issuelocation?.subdivision}
                    onChange={(e) => {
                      setReportData({
                        ...reportData,
                        issuelocation: {
                          ...(reportData.issuelocation as IIssueLocation),
                          subdivision: e.target.value,
                        },
                      });
                      getPlaces(e.target.value);
                    }}
                    fontSize="base"
                  >
                    {_selectedDistrictSubdivision.map((data: any, i) => {
                      return <option key={i}>{data}</option>;
                    })}
                  </Select>
                </section>
              </div>
              <section className="w-full space-y-2 relative">
                <Textarea
                  backgroundColor={"#FBFAFF"}
                  focusBorderColor="#1A75FF"
                  placeholder="Enter your location in details"
                  size={"md"}
                  fontSize="base"
                  value={reportData.issuelocation?.localaddress}
                  onChange={(e) =>
                    setReportData({
                      ...reportData,
                      issuelocation: {
                        ...(reportData.issuelocation as IIssueLocation),
                        localaddress: e.target.value,
                      },
                    })
                  }
                />
              </section>
              <Map
                latitude={searchedLocation.lat}
                longitude={searchedLocation.long}
                mapboxAccessToken={
                  "pk.eyJ1Ijoia2luZ3NhcmthcjMwMDYiLCJhIjoiY2xqb2VvNGt6MHloejNzbjN2MnVma3I4dyJ9.mNV9n2t42a5qidyuwUzE-g"
                }
                mapLib={import("mapbox-gl")}
                initialViewState={{
                  latitude: searchedLocation.lat,
                  longitude: searchedLocation.long,
                  zoom: 12,
                }}
                style={{ width: "screen", height: 400 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
              ></Map>
            </section>
            <section>
              <h2 className="text-xl mb-1">Add Media</h2>
              <p className="text-sm font-light text-lightTextColor mb-2">
                Add media supporting the issue if possible. Media must be less
                than 5MB
              </p>
              <div className="space-y-2">
                {media.map((data, i: number) => {
                  return (
                    <div
                      className="flex justify-between gap-4 items-center"
                      key={i}
                    >
                      <Input
                        type="file"
                        backgroundColor={"#FBFAFF"}
                        focusBorderColor="#1A75FF"
                        placeholder="Search Your Location"
                        size={"md"}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            media[i] = e.target.files[0];
                            setMedia(media);
                          }
                        }}
                        fontSize="base"
                      />
                      {i > 0 && (
                        <AiOutlineClose
                          size={30}
                          cursor={"pointer"}
                          onClick={() => {
                            let _media = [...media];
                            _media.splice(i, 1);
                            setMedia(_media);
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              {media.length <= 3 && (
                <button
                  className="flex gap-2 justify-start items-center btn-secondary px-2 text-sm py-1.5 mt-3"
                  onClick={() => {
                    let _media = [...media];
                    _media.push("");
                    setMedia(_media);
                  }}
                >
                  Add More
                </button>
              )}
            </section>
          </div>
          <div className="flex justify-end items-center space-x-8">
            <button className="btn-secondary">Cancel</button>
            <button
              className="btn-primary"
              disabled={validateForm()}
              onClick={handleSubmitReport}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportIssuePage;
