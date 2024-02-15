import {NWORX_GRPC_HOSTNAME} from "../../constants/constants";
import {fetchToken} from "../auth/token";
//@ts-ignore
import {UpdateCustomAlignQuestionRequest,UpdateGoalRequest,CustomQuestion,Tag} from "../../../src/constants/proto/updateUserProgram/update-user-goal_pb"
import {UpdateUserGoalServiceClient} from "../../../src/constants/proto/updateUserProgram/update-user-goal_grpc_web_pb"

export const updateCustomUserGoalAlignQuestions=async ({
	userId,
	programId,
	goalId,
	customQuestionsObj
}: any) => {
	const metadata=await fetchToken();
	return new Promise((resolve,reject) => {
		const goalDetails=new UpdateGoalRequest();
		goalDetails.setUsergoalid(goalId);
		goalDetails.setUserid(userId);
		goalDetails.setProgramid(programId);
		const request=new UpdateCustomAlignQuestionRequest();
		request.setGoaldetails(goalDetails);

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

		console.log(request,"updateCustomUserGoalAlignQuestions");
		const instance=new UpdateUserGoalServiceClient(
			NWORX_GRPC_HOSTNAME,
			null,
			null
		);
		instance.updateCustomUserGoalAlignQuestions(request,metadata,async (err,response) => {
			try {
				console.log("updateCustomUserGoalAlignQuestions response request",response,request);
				const parsedResponse=JSON.parse(response);
				//   //@ts-ignore
				console.log(parsedResponse);
				if(parsedResponse?.statusCode===0) {
					resolve(parsedResponse);
				}
			} catch(error) {
				console.log(error,"updateCustomUserGoalAlignQuestions error");
				reject(error);
			}
		});

	});
};
