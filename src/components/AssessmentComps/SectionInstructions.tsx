import {
  Box,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import TestInstructionsModal from "./TestInstructionsModal";
import { useState } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TimeLeft } from "./TimeLeft";
import { Description } from "@mui/icons-material";

const SectionInstructions = ({
  showSectInstructs,
  currentSectionIndex,
}: any) => {
  var modalStatus = "";
  const [showTestInstructs, setTestInstructs] = useState(false);

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
  //@ts-ignore
  const sections = useSelector((state) => state?.assessment?.sections);
  //@ts-ignore
  const [testDetail , setTestDetails]= useState(useSelector((state) => state?.assessment?.testDetails));
  let currentSection = null;
  if(sections)
    currentSection = sections[currentSectionIndex];

  return (
    <>
      <Box className="test_instructs_body">
        <Box className="sect_instructs_contr">
          <Stack className="test_instructs_contr_flex">
            <Box>
              <Typography className="sect_instructs_title" variant="h2">
                {testDetail?.name}
              </Typography>
              <Typography
                className="view_test_instructs_cta"
                onClick={() => {
                  openTestInstructsModal();
                }}
              >
                View {testDetail?.assessmentLabelSingular} Instructions
              </Typography>
            </Box>
            <Box>
              <Typography className="sect_instructs_end_test">
                <TimeLeft />
              </Typography>
              {/* <Stack className="test_instructs_time_flex">
                <AccessTimeRoundedIcon />
                <Typography className="test_time_numb">30 : 00</Typography>
              </Stack> */}
            </Box>
          </Stack>
          <Box className="test_instructs_box">
            <Typography className="sect_instructs_totalquests">
              {testDetail?.sectionLabelSingular} {currentSectionIndex + 1} - No. of Questions:{" "}
              {currentSection?.questions?.length}
            </Typography>
            <Typography variant="h1" className="test_instructs_title">
              {currentSection?.name}
            </Typography>
            <Typography variant="h2" className="section_instructs_subtitle">
            {testDetail?.sectionLabelSingular} Instructions
            </Typography>
            <Typography className="test_instructs_subtitle">
            {currentSection?.description?.startsWith("http") ? <iframe
                src={currentSection?.description}  
                title="Embedded Website"
                width="100%"
                height="400px"
              /> : currentSection?.description}
              
            </Typography>
            {/* <Typography className="test_instructs_para">
              Click on "Expand" button for a magnified view of the question.
            </Typography> */}
            {/* <List dense={true} className="test_instructs_points">
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordRoundedIcon sx={{ fontSize: "12px" }} />
                </ListItemIcon>
                <ListItemText primary="Use the text box to enter your response. Be as thorough as possible." />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <FiberManualRecordRoundedIcon sx={{ fontSize: "12px" }} />
                </ListItemIcon>
                <ListItemText primary="There is no right or wrong answer." />
              </ListItem>
            </List>
            <Typography className="test_instructs_para">
              Do not make any assumptions based on your own understanding of the
              products/categories.
            </Typography>
              */}
          </Box>
        </Box>
        <TestInstructionsModal
          showTestInstructs={{ showTestInstructs, modalStatus }}
          closeTestInstructsModal={closeTestInstructsModal}
        />
      </Box>
    </>
  );
};
export default SectionInstructions;
