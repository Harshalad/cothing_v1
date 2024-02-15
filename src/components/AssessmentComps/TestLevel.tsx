import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TestInstructionsModal from "./TestInstructionsModal";
import { useRouter } from "next/router";
import { TimeLeft } from "./TimeLeft";
import ConfirmModal from "./ConfirmModal";
const TestLevel = ({handleshowReview}:any) => {
  //@ts-ignore
  let attemptNo = useSelector((state) => state?.assessment?.attemptNo) + "";
  console.log(attemptNo, "attempt");
  //@ts-ignore
  const testDetail = useSelector((state) => state?.assessment?.testDetails);
  var modalStatus = "";
  const [showTestInstructs, setTestInstructs] = useState(false);

  const router = useRouter();
  const testId = router?.query?.id;

  const openTestInstructsModal = () => {
    modalStatus = "open";
    setTestInstructs(true);
  };
  const closeTestInstructsModal = (value: any) => {
    setTestInstructs(value);
    setTimeout(() => {
      modalStatus = "close";
    }, 200);
  };
  const [showConfirmModal, setConfirmModal] = useState(false);
  const closeConfirmModal = () => {
    setConfirmModal(false);
  };
  const handleEndTestClick = () => {
    handleshowReview();
  };

  return (
    <>
      <Box className="test_lvl_contr">
        <Stack className="test_instructs_contr_flex">
          <Box>
            <Typography className="sect_instructs_title" variant="h2">
              {testDetail?.name}
            </Typography>
            <Typography
              className="view_test_instructs_cta"
              onClick={() => openTestInstructsModal()}
            >
              View {testDetail?.assessmentLabelSingular} Instructions
            </Typography>
          </Box>
          <Box>
            <Typography
              className="sect_instructs_end_test"
              onClick={() => handleEndTestClick()}
              // onClick={() => submitTest(false)}
            >
              End {testDetail?.assessmentLabelSingular}
            </Typography>
            <TimeLeft />
            {/* <Stack className="test_instructs_time_flex">
              <AccessTimeRoundedIcon />
              <Typography className="test_time_numb">
                {minutes} Min : {remainingSeconds < 10 ? "0" : ""}
                {remainingSeconds} Sec
              </Typography>
            </Stack> */}
          </Box>
        </Stack>
      </Box>
      <TestInstructionsModal
        showTestInstructs={{ showTestInstructs, modalStatus }}
        closeTestInstructsModal={closeTestInstructsModal}
      />
      <ConfirmModal
        showModal={showConfirmModal}
        closeConfirmModal={closeConfirmModal}
      />
    </>
  );
};
export default TestLevel;
