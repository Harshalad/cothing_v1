import {NWORX_GRPC_HOSTNAME} from "../../constants/constants";
import {fetchToken} from "../auth/token";
//@ts-ignore
import {UpdateCustomGoalPurposeRequest,UpdateGoalRequest,CustomQuestion,Tag} from "../../../src/constants/proto/updateUserProgram/update-user-goal_pb"
import {UpdateUserGoalServiceClient} from "../../../src/constants/proto/updateUserProgram/update-user-goal_grpc_web_pb"

export const updateCustomGoalPurpose=async ({
  userId,
  programId,
  goalId,
  topPriority,
  startDate,
  durationInDays,
  goalTitle,
  goalDescription,
  customQuestionsObj,
  goalType
}: any) => {
  const metadata=await fetchToken();
  return new Promise((resolve,reject) => {
    const goalDetails=new UpdateGoalRequest();
    goalDetails.setUsergoalid(goalId);
    goalDetails.setUserid(userId);
    goalDetails.setProgramid(programId);
    const request=new UpdateCustomGoalPurposeRequest();
    request.setGoaldetails(goalDetails);
    request.setToppriority(topPriority);
    request.setStartdate(startDate);
    request.setDurationindays(durationInDays);
    request.setNamealias(goalTitle);
    request.setDescriptionalias(goalDescription);
    request.setPurposestatus(true);
    request.setGoaltype(goalType);

    console.log(customQuestionsObj,"customQuestionsObj");
    let questionAnswer=request.getQuestionanswerList();
    customQuestionsObj.map((questionObj: any,index: number) => {
      const customQuestion=new CustomQuestion();
      customQuestion.setQuestion(questionObj?.question);
      customQuestion.setRegular(questionObj?.regular);
      customQuestion.setMandatory(questionObj?.mandatory);
      customQuestion.setType(questionObj?.type);
      customQuestion.setOrder(questionObj?.order);
      customQuestion.setAnswer(questionObj?.answer);
      let selectedTags=customQuestion.getSelectedtagsList();
      for(let i=0;i<questionObj?.selectedTags?.length;i++) {
        selectedTags.push(questionObj?.selectedTags[i]);
      }
      let tags=customQuestion.getTagsList();
      for(let i=0;i<questionObj?.tags?.length;i++) {
        let obj=questionObj?.tags[i];
        const tag=new Tag();
        tag.setTitle(obj?.title);
        tag.setDescription(obj?.description);
        tag.setOrder(obj?.order);
        tags.push(tag);
      }
      questionAnswer.push(customQuestion);
    })

    console.log(request,"updateCustomGoalPurpose");
    // let selectedPurposes = request.getSelectedpurposesList();
    // for (let i = 0; i < goalPurposes.length; i++) {
    //  selectedPurposes.push(goalPurposes[i]);
    // }
    // let selectedBenefits = request.getSelectedbenefitsList();
    // for (let i = 0; i < goalBenefits.length; i++) {
    //  selectedBenefits.push(goalBenefits[i]);
    // }
    // let purposeQuestionAnswerMapCpy = request.getPurposequestionanswerMap();
    // Object.entries(purposeQuestionAnswerMap).forEach(
    //  (attribute: any, index: number) => {
    //   console.log(attribute, "loop attriute");
    //   purposeQuestionAnswerMapCpy.set(attribute[0], attribute[1]);
    //  }
    // );
    // console.log(purposeQuestionAnswerMapCpy, "purposeQuestionAnswerMapCpy");
    // request.setStartdate(startDate);
    // request.setDurationindays(durationInDays);

    const instance=new UpdateUserGoalServiceClient(
      NWORX_GRPC_HOSTNAME,
      null,
      null
    );
    instance.updateCustomGoalPurpose(request,metadata,async (err,response) => {
      try {
        console.log("updateCustomGoalPurpose response request",response,request);
        const parsedResponse=JSON.parse(response);
        //   //@ts-ignore
        console.log(parsedResponse);
        if(parsedResponse?.statusCode===0) {
          resolve(parsedResponse);
        }
      } catch(error) {
        console.log(error,"updateCustomGoalPurpose error");
        reject(error);
      }
    });

  });
};
