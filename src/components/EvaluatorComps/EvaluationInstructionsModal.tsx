import { Box, Button, Dialog, DialogContent } from "@mui/material";
import EvaluationInstructions from "./EvaluationInstructions";

const EvaluationInstructionsModal = ({ testDetails,showEvalInstructs, closeSectInstructsModal }: any) => {
  return (
    <>
      <Dialog open={showEvalInstructs} className="test_instructs_modal">
        <DialogContent>
          <EvaluationInstructions/>
          <Box className="test_instructs_cta">
            <Button
              className="standard_cta"
              onClick={() => closeSectInstructsModal(false)}
            >
              Close
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EvaluationInstructionsModal;