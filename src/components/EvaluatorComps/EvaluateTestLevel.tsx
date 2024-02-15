import { useEffect, useState } from "react";
import { Avatar, Box, Stack, Typography } from "@mui/material";
import EvaluationInstructionsModal from "./EvaluationInstructionsModal";
import { useRouter } from "next/router";

const EvaluateTestLevel = ({ testDetails }: any) => {
  const router = useRouter();
  const [showEvalInstructs, setEvalInstructs] = useState(false);
  const [showInst, setShowInst] = useState(true);
  const openEvalInstructsModal = () => {
    setEvalInstructs(true);
    setShowInst(false);
  };

  const closeEvalInstructsModal = (value: any) => {
    setEvalInstructs(value);
    setShowInst(false);
  };
  // console.log(testDetails,"testDetails");

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
                <Typography className="evaluator_name">{testDetails?.userName}</Typography>
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
                {testDetails?.userName?testDetails?.userName[0]:""}
              </Avatar>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <EvaluationInstructionsModal
        testDetails={testDetails}
        showEvalInstructs={showEvalInstructs}
        closeSectInstructsModal={closeEvalInstructsModal}
      />
    </>
  );
};
export default EvaluateTestLevel;
