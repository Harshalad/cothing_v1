import { FetchUserProgramServiceClient } from "../../constants/proto/fetchUserGoals/fetch-user-program_grpc_web_pb";
//@ts-ignore
import { FetchReporteeGoalsRequest } from "../../constants/proto/fetchUserGoals/fetch-user-program_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchToken } from "./token";

export const fetchRoleBasedAccess = async ({ managerId }: any) => {
  const metadata = await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new FetchReporteeGoalsRequest();

    request.setManagerid(managerId);

    let teamScore: {} | null = null;

    const instance = new FetchUserProgramServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchTeamScore(request, metadata, async (err, response) => {
      try {
        console.log("fetchTeamScore Response", response, err);
        teamScore = JSON.parse(response);
        console.log(teamScore, "teamScore ");
        // @ts-ignore
        teamScore["highestAchieveScore"] = 60;
        // @ts-ignore
        teamScore["myAchieveScore"] = 70;
        // @ts-ignore
        teamScore["highestAlignScore"] = 80;
        // @ts-ignore
        teamScore["myAlignScore"] = 90;
        //@ts-ignore
        // resolve({ teamScore: teamScore?.response });

        teamScore["teamIndividualScore"] = [
          {
            userName: "Xavior",
            userId: "1234",
            achieveScore: 88,
            alignScore: 66,
            designation: "Program Manager",
          },
          {
            userName: "Rockford",
            userId: "1235",
            achieveScore: 20,
            alignScore: 20,
            designation: "Tech Manager",
          },
          {
            userName: "Raju",
            userId: "1236",
            achieveScore: 99,
            alignScore: 12,
            designation: "Prime Minister",
          },
          {
            userName: "Mantri",
            userId: "1237",
            achieveScore: 88,
            alignScore: 66,
            designation: "Ward Member",
          },
          {
            userName: "Harish",
            userId: "1238",
            achieveScore: 34,
            alignScore: 28,
            designation: "Director",
          },
          {
            userName: "Rajesh",
            userId: "1239",
            achieveScore: 25,
            alignScore: 62,
            designation: "Broker",
          },
          {
            userName: "Ramesh",
            userId: "1230",
            achieveScore: 56,
            alignScore: 99,
            designation: "President",
          },
        ];
        resolve({ teamScore: teamScore });
      } catch (error) {
        console.log(error, "fetchTeamScore error");
        reject(error);
      }
    });
    return { teamScore: teamScore };
  });
};

export const getRoleBasedAccess = createAsyncThunk(
  "AUTH/GET_ROLE_BASED_ACCESS",
  async ({ userId }: any) => {
    return new Promise((resolve, reject) => {
      try {
        let RBA = {
          MANAGER: {
            themeColor: "#2E5DB0",
            role: "MANAGER",
            pages: [
              {
                key: "ACTION_CENTER",
                label: "Action Center",
                route: "/action-center",
              },
              {
                key: "ALIGN",
                label: "Set Goals",
                route: "/align",
              },
              { key: "ACHIEVE", label: "Act on Goals", route: "/achieve" },
              { key: "ANALYZE", label: "Analyze", route: "/analyze" },
              { key: "DASHBOARD", label: "Dashboard", route: "/dashboard" },
              { key: "CHAT", label: "Chat", route: "/chat" },
              { key: "EVENT", label: "Event", route: "/event-listing" },
              {
                key: "EVALUATE",
                label: "Evaluate",
                route: "/evaluate-listing",
              },
            ],
            permissions: {
              ACTION_CENTER: ["VIEW"],
              ALIGN: ["VIEW", "COMMENT"],
              ACHIEVE: ["VIEW", "COMMENT", "VIEW_RATING", "ADD_RATING"],
              DASHBOARD: ["VIEW"],
              ANALYZE: ["VIEW"],
              PREPARATION: ["VIEW"],
            },
          },
          JP: {
            themeColor: "#2E5DB0",
            role: "JP",
            pages: [
              {
                key: "ACTION_CENTER",
                label: "Action Center",
                route: "/action-center",
              },
              {
                key: "ALIGN",
                label: "Set Goals",
                route: "/align",
              },
              { key: "ACHIEVE", label: "Act on Goals", route: "/achieve" },
              { key: "ANALYZE", label: "Analyze", route: "/analyze" },
              { key: "DASHBOARD", label: "Dashboard", route: "/dashboard" },
              { key: "CHAT", label: "Chat", route: "/chat" },
              { key: "EVENT", label: "Event", route: "/event-listing" },
              {
                key: "EVALUATE",
                label: "Evaluate",
                route: "/evaluate-listing",
              },
            ],
            permissions: {
              ACTION_CENTER: ["VIEW"],
              ALIGN: ["VIEW", "COMMENT"],
              ACHIEVE: ["VIEW", "COMMENT", "VIEW_RATING", "ADD_RATING"],
              DASHBOARD: ["VIEW"],
              ANALYZE: ["VIEW"],
              PREPARATION: [""],
            },
          },
          EXPERT: {
            themeColor: "#2E5DB0",
            role: "EXPERT",
            pages: [
              {
                key: "ACTION_CENTER",
                label: "Action Center",
                route: "/action-center",
              },
              {
                key: "ALIGN",
                label: "Set Goals",
                route: "/align",
              },
              { key: "ACHIEVE", label: "Act on Goals", route: "/achieve" },
              { key: "ANALYZE", label: "Analyze", route: "/analyze" },
              { key: "DASHBOARD", label: "Dashboard", route: "/dashboard" },
              { key: "CHAT", label: "Chat", route: "/chat" },
              { key: "EVENT", label: "Event", route: "/event-listing" },
              {
                key: "EVALUATE",
                label: "Evaluate",
                route: "/evaluate-listing",
              },
            ],
            permissions: {
              ACTION_CENTER: ["VIEW"],
              ALIGN: ["VIEW", "COMMENT", "VIEW_RATING", "ADD_RATING"],
              ACHIEVE: ["VIEW", "COMMENT", "VIEW_RATING", "ADD_RATING"],
              DASHBOARD: ["VIEW"],
              ANALYZE: ["VIEW"],
              PREPARATION: ["VIEW", "COMMENT", "VIEW_RATING", "ADD_RATING"],
            },
          },
          LP: {
            themeColor: "#F58A43",
            role: "LP",
            pages: [
              {
                key: "ACTION_CENTER",
                label: "Action Center",
                route: "/action-center",
              },
              {
                key: "ALIGN",
                label: "Set Goals",
                route: "/align",
              },
              { key: "ACHIEVE", label: "Act on Goals", route: "/achieve" },
              { key: "ANALYZE", label: "Analyze", route: "/analyze" },
              { key: "DASHBOARD", label: "Dashboard", route: "/dashboard" },
              {
                key: "QUICK_PREP",
                label: "Tools",
                route: "/quick-preparation",
              },
              { key: "CHAT", label: "Chat", route: "/chat" },
              { key: "REPORTS", label: "Reports", route: "/reports" },
              { key: "EVENT", label: "Event", route: "/event-listing" },
            ],
            permissions: {
              ACTION_CENTER: ["VIEW"],
              ALIGN: ["VIEW", "COMMENT", "VIEW_RATING"],
              ACHIEVE: ["VIEW", "COMMENT", "VIEW_RATING"],
              DASHBOARD: ["VIEW"],
              ANALYZE: ["VIEW"],
              PREPARATION: ["VIEW", "EDIT", "COMMENT", "VIEW_RATING"],
            },
          },
          REPORT_VIEWER: {
            themeColor: "#F58A43",
            role: "REPORT_VIEWER",
            pages: [
              { key: "DASHBOARD", label: "Dashboard", route: "/dashboard" },
            ],
            permissions: {
              DASHBOARD: ["VIEW"],
            },
          },
        };
        //@ts-ignore
        resolve({ roleBasedAccess: RBA });
        return RBA;
      } catch (error) {
        console.log(error);
      }
    });
    //   return { roleBasedAccess: RBA };
  }
);
