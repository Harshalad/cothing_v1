import { UpdateUserWorksheetServiceClient } from "../../../constants/proto/updateUserWorksheet/update-user-work-sheet_grpc_web_pb";
//@ts-ignore
import { addRatingToWorksheetRequest } from "../../../constants/proto/updateUserWorksheet/update-user-work-sheet_pb";

import { NWORX_GRPC_HOSTNAME } from "../../../constants/constants";
import { fetchToken } from "../../auth/token";

export const addManagerRatingToWorksheet = async ({
  uwid,
  rating,
  ratedBy,
  ratedByUserName,
  generalComment,
  ratedByRole,
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new addRatingToWorksheetRequest();

    request.setUserworksheetid(uwid);
    request.setRating(rating);
    request.setRatedby(ratedBy);
    request.setRatedbyusername(ratedByUserName);
    request.setGeneralcomment(generalComment);
    request.setRatedbyrole(ratedByRole);

    const instance = new UpdateUserWorksheetServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.addRatingToWorksheet(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        console.log(parsedResponse);
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
      } catch (error) {
        console.log(error, "ADD RATING TO WORKSHEET error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};

export const addExpertRatingToWorksheet = async ({
  uwid,
  qualityRating,
  thoroughnessRating,
  ratedBy,
  ratedByUserName,
  qualityComment,
  thoroughnessComment,
  ratedByRole,
  aiRatingId
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve, reject) => {
    const request = new addRatingToWorksheetRequest();

    request.setUserworksheetid(uwid);
    request.setQualityrating(qualityRating);
    request.setQualitycomment(qualityComment);
    request.setThoroughnessrating(thoroughnessRating);
    request.setThoroughnesscomment(thoroughnessComment);
    request.setRatedby(ratedBy);
    request.setRatedbyusername(ratedByUserName);
    request.setRatedbyrole(ratedByRole);
    request.setAiratingid(aiRatingId);
    console.log(aiRatingId,"addRatingToWorksheet");
    const instance = new UpdateUserWorksheetServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.addRatingToWorksheet(request, metadata, async (err, response) => {
      try {
        const parsedResponse = JSON.parse(response);
        //   //@ts-ignore
        if (parsedResponse?.statusCode === 0) {
          resolve(parsedResponse);
        }
        console.log("addRatingToWorksheet",request);
      } catch (error) {
        console.log(error, "ADD RATING TO WORKSHEET error");
        reject(error);
      }
    });
    //   return { nWorxUser: user };
  });
};

