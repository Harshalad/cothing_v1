import { FetchDashboardServiceClient } from "../../constants/proto/fetchDashboard/fetch-dashboard_grpc_web_pb";
//@ts-ignore
import { FetchDashboardRequest } from "../../constants/proto/fetchDashboard/fetch-dashboard_pb";
import { NWORX_GRPC_HOSTNAME } from "../../constants/constants";
import { fetchToken } from "../auth/token";

export const fetchDashboardTemp: any = ({ userId }: any) => {
  let data = {
    orgName: "Designs in change",
    data: [
      {
        type: "normal",
        title: "Designs in change",
        alignScore: 55,
        engageScore: 66,
        effectivenessScore: {
          initScore: 35,
          finalScore: 45,
          initDate: "31st Jan, 2023",
          finalDate: "9th May 2023",
          duration: "3 months",
        },
        alignQuotient: 45,
        alignIntensity: 90,
        curiosityScore: 88,
        preparationCompletion: 99,
        preparationConsistency: 67,
        reflectionQuotient: 33,
        goalProgressByvalue: [
          { name: "Profitability", count: 23, status: 89 },
          { name: "Revenue", count: 33, status: 59 },
          { name: "Maximization", count: 43, status: 69 },
          { name: "Statistics", count: 53, status: 79 },
          { name: "Optimization", count: 25, status: 99 },
          { name: "Sales", count: 23, status: 29 },
        ],
        goalProgressByPurposes: [
          { name: "Purpose 1", goalCount: 22, achieveScore: 30 },
          { name: "Purpose 2", goalCount: 23, achieveScore: 32 },
          { name: "Purpose 3", goalCount: 24, achieveScore: 33 },
          { name: "Purpose 4", goalCount: 25, achieveScore: 34 },
          { name: "Purpose 5", goalCount: 26, achieveScore: 35 },
          { name: "Purpose 6", goalCount: 27, achieveScore: 36 },
          { name: "Purpose 7", goalCount: 28, achieveScore: 37 },
        ],
      },
      {
        type: "normal",
        title: "MyTeam",
        alignScore: 55,
        engageScore: 66,
        effectivenessScore: {
          initScore: 35,
          finalScore: 45,
          initDate: "31st Jan, 2023",
          finalDate: "9th May 2023",
          duration: "3 months",
        },
        alignQuotient: 85,
        alignIntensity: 90,
        curiosityScore: 88,
        preparationCompletion: 33,
        preparationConsistency: 67,
        reflectionQuotient: 33,
        goalProgressByvalue: [
          { name: "Profitability", count: 23, status: 89 },
          { name: "Revenue", count: 33, status: 59 },
          { name: "Maximization", count: 43, status: 69 },
          { name: "Statistics", count: 53, status: 79 },
          { name: "Optimization", count: 25, status: 99 },
          { name: "Sales", count: 23, status: 29 },
        ],
        goalProgressByPurposes: [
          { name: "Purpose 1", goalCount: 22, achieveScore: 30 },
          { name: "Purpose 2", goalCount: 23, achieveScore: 32 },
          { name: "Purpose 3", goalCount: 24, achieveScore: 33 },
          { name: "Purpose 4", goalCount: 25, achieveScore: 34 },
          { name: "Purpose 5", goalCount: 26, achieveScore: 35 },
          { name: "Purpose 6", goalCount: 27, achieveScore: 36 },
          { name: "Purpose 7", goalCount: 28, achieveScore: 37 },
        ],
      },
      {
        type: "reportees",
        title: "Reporting Employees",
        top3: [
          {
            name: "Nikhil Asrani",
            designation: "Lead Archtect",
          },
          {
            name: "Chiranjeevi",
            designation: "Lead Actor",
          },
          {
            name: "Bala Krishna",
            designation: "Lead Actor",
          },
        ],
        all: [
          {
            name: "Nikhil Asrani",
            alignScore: 90,
            engageScore: {
              quarterly: 30,
              biMonthly: 60,
              monthly: 59,
            },
            effectivenessScore: {
              quarterly: 30,
              current: 60,
            },
            achieveScore: 50,
          },
          {
            name: "Chiranjeevi",
            alignScore: 90,
            engageScore: {
              quarterly: 30,
              biMonthly: 60,
              monthly: 59,
            },
            effectivenessScore: {
              quarterly: 30,
              current: 60,
            },
            achieveScore: 5,
          },
          {
            name: "Nagarjuna",
            alignScore: 90,
            engageScore: {
              quarterly: 30,
              biMonthly: 60,
              monthly: 59,
            },
            effectivenessScore: {
              quarterly: 30,
              current: 60,
            },
            achieveScore: 99,
          },
        ],
        alignScore: 55,
        engageScore: 66,
        effectivenessScore: {
          initScore: 35,
          finalScore: 45,
          initDate: "31st Jan, 2023",
          finalDate: "9th May 2023",
          duration: "3 months",
        },
        alignQuotient: 45,
        alignIntensity: 90,
        curiosityScore: 88,
        preparationCompletion: 99,
        preparationConsistency: 67,
        reflectionQuotient: 33,
        goalProgressByvalue: [
          { name: "Profitability", count: 23, status: 89 },
          { name: "Revenue", count: 33, status: 59 },
          { name: "Maximization", count: 43, status: 69 },
          { name: "Statistics", count: 53, status: 79 },
          { name: "Optimization", count: 25, status: 99 },
          { name: "Sales", count: 23, status: 29 },
        ],
        goalProgressByPurposes: [
          { name: "Purpose 1", goalCount: 22, achieveScore: 30 },
          { name: "Purpose 2", goalCount: 23, achieveScore: 32 },
          { name: "Purpose 3", goalCount: 24, achieveScore: 33 },
          { name: "Purpose 4", goalCount: 25, achieveScore: 34 },
          { name: "Purpose 5", goalCount: 26, achieveScore: 35 },
          { name: "Purpose 6", goalCount: 27, achieveScore: 36 },
          { name: "Purpose 7", goalCount: 28, achieveScore: 37 },
        ],
      },
      {
        type: "normal",
        title: "N-3",
        alignScore: 55,
        engageScore: 66,
        effectivenessScore: {
          initScore: 35,
          finalScore: 45,
          initDate: "31st Jan, 2023",
          finalDate: "9th May 2023",
          duration: "3 months",
        },
        alignQuotient: 45,
        alignIntensity: 90,
        curiosityScore: 88,
        preparationCompletion: 99,
        preparationConsistency: 67,
        reflectionQuotient: 33,
        goalProgressByvalue: [
          { name: "Profitability", count: 23, status: 89 },
          { name: "Revenue", count: 33, status: 59 },
          { name: "Maximization", count: 43, status: 69 },
          { name: "Statistics", count: 53, status: 79 },
          { name: "Optimization", count: 25, status: 99 },
          { name: "Sales", count: 23, status: 29 },
        ],
        goalProgressByPurposes: [
          { name: "Purpose 1", goalCount: 22, achieveScore: 30 },
          { name: "Purpose 2", goalCount: 23, achieveScore: 32 },
          { name: "Purpose 3", goalCount: 24, achieveScore: 33 },
          { name: "Purpose 4", goalCount: 25, achieveScore: 34 },
          { name: "Purpose 5", goalCount: 26, achieveScore: 35 },
          { name: "Purpose 6", goalCount: 27, achieveScore: 36 },
          { name: "Purpose 7", goalCount: 28, achieveScore: 37 },
        ],
      },
      {
        type: "normal",
        title: "N-1",
        alignScore: 55,
        engageScore: 66,
        effectivenessScore: {
          initScore: 35,
          finalScore: 45,
          initDate: "31st Jan, 2023",
          finalDate: "9th May 2023",
          duration: "3 months",
        },
        alignQuotient: 45,
        alignIntensity: 90,
        curiosityScore: 88,
        preparationCompletion: 99,
        preparationConsistency: 67,
        reflectionQuotient: 33,
        goalProgressByvalue: [
          { name: "Profitability", count: 23, status: 89 },
          { name: "Revenue", count: 33, status: 59 },
          { name: "Maximization", count: 43, status: 69 },
          { name: "Statistics", count: 53, status: 79 },
          { name: "Optimization", count: 25, status: 99 },
          { name: "Sales", count: 23, status: 29 },
        ],
        goalProgressByPurposes: [
          { name: "Purpose 1", goalCount: 22, achieveScore: 30 },
          { name: "Purpose 2", goalCount: 23, achieveScore: 32 },
          { name: "Purpose 3", goalCount: 24, achieveScore: 33 },
          { name: "Purpose 4", goalCount: 25, achieveScore: 34 },
          { name: "Purpose 5", goalCount: 26, achieveScore: 35 },
          { name: "Purpose 6", goalCount: 27, achieveScore: 36 },
          { name: "Purpose 7", goalCount: 28, achieveScore: 37 },
        ],
      },
      {
        type: "normal",
        title: "Individual Contributor",
        alignScore: 55,
        engageScore: 66,
        effectivenessScore: {
          initScore: 35,
          finalScore: 45,
          initDate: "31st Jan, 2023",
          finalDate: "9th May 2023",
          duration: "3 months",
        },
        alignQuotient: 45,
        alignIntensity: 90,
        curiosityScore: 88,
        preparationCompletion: 99,
        preparationConsistency: 67,
        reflectionQuotient: 33,
        goalProgressByvalue: [
          { name: "Profitability", count: 23, status: 89 },
          { name: "Revenue", count: 33, status: 59 },
          { name: "Maximization", count: 43, status: 69 },
          { name: "Statistics", count: 53, status: 79 },
          { name: "Optimization", count: 25, status: 99 },
          { name: "Sales", count: 23, status: 29 },
        ],
        goalProgressByPurposes: [
          { name: "Purpose 1", goalCount: 22, achieveScore: 30 },
          { name: "Purpose 2", goalCount: 23, achieveScore: 32 },
          { name: "Purpose 3", goalCount: 24, achieveScore: 33 },
          { name: "Purpose 4", goalCount: 25, achieveScore: 34 },
          { name: "Purpose 5", goalCount: 26, achieveScore: 35 },
          { name: "Purpose 6", goalCount: 27, achieveScore: 36 },
          { name: "Purpose 7", goalCount: 28, achieveScore: 37 },
        ],
      },
      {
        type: "normal",
        title: "N-3",
        alignScore: 55,
        engageScore: 66,
        effectivenessScore: {
          initScore: 35,
          finalScore: 45,
          initDate: "31st Jan, 2023",
          finalDate: "9th May 2023",
          duration: "3 months",
        },
        alignQuotient: 45,
        alignIntensity: 90,
        curiosityScore: 88,
        preparationCompletion: 99,
        preparationConsistency: 67,
        reflectionQuotient: 33,
        goalProgressByvalue: [
          { name: "Profitability", count: 23, status: 89 },
          { name: "Revenue", count: 33, status: 59 },
          { name: "Maximization", count: 43, status: 69 },
          { name: "Statistics", count: 53, status: 79 },
          { name: "Optimization", count: 25, status: 99 },
          { name: "Sales", count: 23, status: 29 },
        ],
        goalProgressByPurposes: [
          { name: "Purpose 1", goalCount: 22, achieveScore: 30 },
          { name: "Purpose 2", goalCount: 23, achieveScore: 32 },
          { name: "Purpose 3", goalCount: 24, achieveScore: 33 },
          { name: "Purpose 4", goalCount: 25, achieveScore: 34 },
          { name: "Purpose 5", goalCount: 26, achieveScore: 35 },
          { name: "Purpose 6", goalCount: 27, achieveScore: 36 },
          { name: "Purpose 7", goalCount: 28, achieveScore: 37 },
        ],
      },
    ],
  };

  return data;
};

export const fetchDashboard = async ({ userId ,}: any) => {

  const metadata=await fetchToken();
  
  return new Promise((resolve, reject) => {
    const request = new FetchDashboardRequest();

    request.setUserid(userId);
    // request.setUserid("38d22e92-60b0-45db-b660-1f3e1c57ecb1");


    let dashboardInfo: {} | null = null;

    const instance = new FetchDashboardServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.fetchDashboardByUserId(request, metadata, async (err, response) => {
      try {
        console.log("dashboardInfo Response", response, err);
        dashboardInfo = JSON.parse(response);

        resolve({ dashboardInfo });
      } catch (error) {
        console.log(error, "dashboardInfo error");
        reject(error);
      }
    });
    return { dashboardInfo };
  });
};
