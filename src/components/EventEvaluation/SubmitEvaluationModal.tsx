import { Box, Button, Dialog, DialogContent, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { finishEventEvaluation } from "../../actions/eventEvaluation/finishEventEvaluation";

const SubmitEvaluationModal = ({ showModal, closeConfirmModal }: any) => {

  const router = useRouter();
  const testId = router?.query?.id;
  const handleSubmitClick = async()=>{
    const response = await finishEventEvaluation({userTestMapId: testId});
    if(response){
      router.push("/event-evaluation/thank-you");
    }
  }
  return (
    <>
      <Dialog
        open={showModal}
        className="confirm_modal"
      >
        <DialogContent>
          <Typography className="confirm_modal_title">Are you sure to submit your evaluation?</Typography>
          <Stack className="confirm_modal_cta_flex">
            <Box className="test_instructs_cta">
              <Button className="outlined_cta" onClick={() => closeConfirmModal(false)}>Cancel</Button>
            </Box>
            <Box className="test_instructs_cta">
              <Button className="standard_cta" onClick={()=> handleSubmitClick()}>Submit</Button>
            </Box>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
}
export default SubmitEvaluationModal;