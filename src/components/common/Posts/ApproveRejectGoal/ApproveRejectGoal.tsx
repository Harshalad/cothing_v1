import {useState} from "react";
import {Box,Typography,Stack,Button,TextField} from "@mui/material";
import {approveOrRejectEmployeeGoal} from "../../../../actions/align/approveOrRejectEmployeeGoal";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {createPost} from "../../../../actions/align/posts/createPost";
import Spinner from "../../Spinner/Spinner";
import {useRouter} from "next/router";
import {updateUserActionToCompleted} from "../../../../actions/actionCenter/updateUserActionToCompleted";

const ApproveRejectGoal=({
  reportee,
  goal,
  fetchDirectReports,
  setShowGoalOverview,
}: any) => {
  const [showRejectTxtFld,setRejectTxtFld]=useState(false);
  const [rejectionReasonText,setRejectionReasonText]=useState("");
  const [rejectionLoading,setRejectionLoading]=useState(false);
  const [approvalLoading,setApprovalLoading]=useState(false);
  const router=useRouter();
  //@ts-ignore
  const user=useSelector((state) => state?.auth?.nWorxUser);
  const currentUserRole=useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );

  const actionId=router?.query?.actionCompleteId;

  const onApprove=async () => {
    try {
      setApprovalLoading(true);
      const response=await approveOrRejectEmployeeGoal({
        isApproved: true,
        employeeId: reportee?.userId,
        employeeProgramId: reportee?.programId, // TDOD Sateesh please change this to reportee program ID
        employeeGoalId: goal?.id,
        managerName: user?.name,
        customQuestionsObj: null
      });
      if(response) {
        await createPost({
          userId: reportee?.userId,
          programId: reportee?.programId, // TDOD Sateesh please change this to reportee program ID
          userGoalId: goal?.id,
          type: "ALIGN",
          title: "Test Title",
          text: "This is post text",
          subText: "This is post sub text",
          typeAttributes: {
            type: "APPROVE_GOAL_POST",
          },
          postedByUserId: user?.id,
          postedByName: user?.name,
          postedByDesignation: user?.designation,
          postedByRole: currentUserRole,
          postedByEmail: user?.email,
          id: new Date().valueOf().toString(),
          postedToName: reportee?.userName
            ? reportee?.userName
            :reportee?.name,
          postedToUserId: reportee?.userId? reportee?.userId:reportee?.id,
          postedToRole: "LP",
        });
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function(idToken){
        //   return idToken
        // })
        if(actionId) {
          await updateUserActionToCompleted(actionId);
        }
        setApprovalLoading(false);
        router.push("/align",{query: {}});
        await fetchDirectReports();
        setShowGoalOverview(false);
        toast.success("User goal approved",{
          toastId: "GOAL_DISCUSSION_APPROVED",
        });
        // router?.push("/action-center");
      }

      console.log(response);
    } catch(error) {
      setApprovalLoading(false);
      console.log(error);
    }
  };

  const onReject=async () => {
    try {
      setRejectionLoading(true);
      const response=await approveOrRejectEmployeeGoal({
        isApproved: false,
        employeeId: reportee?.userId,
        employeeProgramId: reportee?.programId, // TDOD Sateesh please change this to reportee program ID,
        employeeGoalId: goal?.id,
        managerName: user?.name,
      });
      if(response) {
        await createPost({
          userId: reportee?.userId,
          programId: reportee?.programId, // TDOD Sateesh please change this to reportee program ID
          userGoalId: goal?.id,
          type: "ALIGN",
          title: "Test Title",
          text: "This is post text",
          subText: "This is post sub text",
          typeAttributes: {
            type: "REJECTION_GOAL_POST",
            rejectionReason: rejectionReasonText,
          },
          postedByUserId: user?.id,
          postedByName: user?.name,
          postedByDesignation: user?.designation,
          postedByRole: currentUserRole,
          postedByEmail: user?.email,
          id: new Date().valueOf().toString(),
          postedToName: reportee?.userName
            ? reportee?.userName
            :reportee?.name,
          postedToUserId: reportee?.userId? reportee?.userId:reportee?.id,
          postedToRole: "LP",
        });
        setRejectionLoading(false);
        router.push("/align",{query: {}});
        await fetchDirectReports();
        setShowGoalOverview(false);
        toast.success("User goal rejected",{
          toastId: "GOAL_DISCUSSION_REJECTED",
        });
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function(idToken){
        //   return idToken
        // })
        if(actionId) {
          await updateUserActionToCompleted(actionId);
        }
        // router?.push("/action-center");
      }

      console.log(response);
    } catch(error) {
      setRejectionLoading(false);
      console.log(error);
    }
  };

  return (
    <Box className="mngralgn_takactn_box">
      <Typography className="mngralgn_takactn_title">
        {reportee?.userName} has added a new goal
      </Typography>
      <Typography className="mngralgn_takactn_subtitle">
        Please take the required action for this goal
      </Typography>
      {approvalLoading? (
        <Spinner />
      ):(
        <Stack className="mngralgn_takactn_cta_flex">
          <Button
            className="outlined_cta"
            onClick={() => {
              onApprove();
              setRejectTxtFld(false);
            }}
          >
            Approve this Goal
          </Button>
          <Typography className="mngralgn_takactn_or">OR</Typography>
          <Button
            className="outlined_cta"
            onClick={() => setRejectTxtFld(true)}
          >
            Reject this Goal
          </Button>
        </Stack>
      )}
      {showRejectTxtFld===true? (
        <Box className="mngralgn_rjct_inpt_box" sx={{marginTop: "24px"}}>
          <Typography className="aligngl_quest_heading">
            Please provide a reason for rejection
          </Typography>
          <Box className="algn_askqust_txtfld">
            <TextField
              id="aligngl_cmnt_txtfld"
              placeholder="Write your reason here..."
              variant="outlined"
              size="small"
              fullWidth
              value={rejectionReasonText}
              onChange={(e) => setRejectionReasonText(e.target.value)}
              inputProps={{
                sx: {fontSize: "16px",color: "#1C2129"},
              }}
            />
          </Box>
          <Box className="standard_cta_box">
            {rejectionLoading? (
              <Spinner />
            ):(
              <Button
                className="standard_cta"
                onClick={() => {
                  if(!rejectionReasonText) {
                    toast.error("Please provide a rejection reason",{
                      toastId: "REJECTION_REASON_NOT_GIVEN",
                    });
                    return;
                  }
                  onReject();
                  setRejectTxtFld(false);
                }}
              >
                Reject
              </Button>
            )}
          </Box>
        </Box>
      ):(
        ""
      )}
    </Box>
  );
};

export default ApproveRejectGoal;
