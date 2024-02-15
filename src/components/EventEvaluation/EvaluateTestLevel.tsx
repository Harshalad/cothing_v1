import { useState } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import EvaluationInstructionsModal from "./EvaluationInstructionsModal";
import { AnyARecord } from "dns";

const EvaluateTestLevel = ({ testDetails }:any) => {
  const [showEvalInstructs, setEvalInstructs] = useState(false);

  const openEvalInstructsModal = () => {
    setEvalInstructs(true);
  };

  const closeEvalInstructsModal = (value: any) => {
    setEvalInstructs(value);
  };

  return (
    <>
      <Box className="eval_tst_lvl_contr">
        <Stack className="eval_tst_lvl_flex">
          <Box>
            <Typography className="eval_tst_lvl_title" variant="h2">
              {testDetails?.name}
            </Typography>
            <Stack className="eval_tstlvl_cta_flx">
              <Typography
                className="view_eval_instructs"
                onClick={() => openEvalInstructsModal()}
              >
                View Evaluation Instructions
              </Typography>
              {/* <Typography className="view_assmnt_rubric">
                View Assessment Rubric
              </Typography> */}
            </Stack>
          </Box>
          <Box>
            <Stack className="evaluator_flx">
              <Box>
                <Typography className="evaluator_name">{testDetails?.assesseName}</Typography>
                {/* <Typography className="evaluator_role">
                  Role in examination
                </Typography> */}
              </Box>
              <Avatar
                sx={{
                  width: "32px",
                  height: "32px",
                  bgcolor: "#D9F6FF",
                  color: "#55B6C3",
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                {testDetails?.assesseName[0]}
              </Avatar>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <EvaluationInstructionsModal
        showEvalInstructs={showEvalInstructs}
        closeSectInstructsModal={closeEvalInstructsModal}
        testDetails={testDetails}
      />
    </>
  );
};
export default EvaluateTestLevel;