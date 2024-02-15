import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { finishEvaluation } from "../../actions/evaluator/finishEvaluation";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const SubmitEvaluationModal = ({ showModal, closeConfirmModal }: any) => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const testId = router?.query?.id;
  const handleSubmitClick = async () => {
    const response = await finishEvaluation({
      evaluatorUserId: user?.id,
      userTestMapId: testId,
    });
    //@ts-ignore
    toast.success(response?.extra);
    router.push({pathname:"/action-center"})
  };
  return (
    <>
      <Dialog open={showModal} className="confirm_modal">
        <DialogContent>
          <Typography className="confirm_modal_title">
            Are you sure to submit your evaluation?
          </Typography>
          <Stack className="confirm_modal_cta_flex">
            <Box className="test_instructs_cta">
              <Button
                className="outlined_cta"
                onClick={() => closeConfirmModal(false)}
              >
                Cancel
              </Button>
            </Box>
            <Box className="test_instructs_cta">
              <Button
                className="standard_cta"
                onClick={() => handleSubmitClick()}
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default SubmitEvaluationModal;
