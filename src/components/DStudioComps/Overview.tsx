import { Box, Button, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useRef, useState } from "react";

const Overview = ({ selectedDropDown }: any) => {

  const refViewTests = useRef<any>(null);
  const refCreateTests = useRef<any>(null);
  const [showViewTests, setViewTests] = useState<any>(false);
  const [selectedViewTests, selectViewTests] = useState<any>("");
  const [showCreateTests, setCreateTests] = useState<any>(false);
  const [selectedCreateTests, selectCreateTests] = useState<any>("");

  const getViewTests = (e: any) => {
    refViewTests?.current?.focus();
    selectViewTests(e.target.innerText);
  };

  const getCreateTests = (e: any) => {
    refCreateTests?.current?.focus();
    selectCreateTests(e.target.innerText);
  };

  return (
    <>
      <Typography
            variant="h1"
            sx={{ fontWeight: "700", color: "#1C2129" }}
            className="dash_title"
          >
            Assessment
          </Typography>
          <Stack className="dstudio_drpdwn_flx">
            <Box className="dstudio_drpdwn_select_box">
              <Box sx={{ position: "relative" }}>
                <TextField
                  placeholder="View Tests"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputRef={refViewTests}
                  inputProps={{
                    sx: {
                      fontSize: "20px",
                      color: "#3E4248",
                      fontWeight: "600",
                      cursor: "pointer",
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ color: "#1C2129" }}
                      >
                        {showViewTests ? (
                          <KeyboardArrowUpIcon style={{ color: "#1C2129" }} />
                        ) : (
                          <KeyboardArrowDownIcon style={{ color: "#1C2129" }} />
                        )}
                      </InputAdornment>
                    ),
                    sx: { cursor: "pointer" },
                  }}
                  value={selectedViewTests ? selectedViewTests : "View Tests"}
                  onClick={() => {
                    setViewTests(!showViewTests);
                  }}
                />
                <Box
                  className="dropdown profile_dropdown"
                  sx={{
                    display: showViewTests ? "block" : "none",
                  }}
                >
                  <Stack
                    gap="10px"
                    flexDirection="row"
                    alignItems="center"
                    className="dropdown_inner"
                    onClick={getViewTests}
                  >
                    <Typography
                      className="dropdown_text"
                      sx={{
                        color: "#5D636B",
                        fontSize: "16px",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 5px",
                      }}
                    >
                      View Regular Tests
                    </Typography>
                    <ChevronRightRoundedIcon />
                  </Stack>
                  <Stack
                    gap="10px"
                    flexDirection="row"
                    alignItems="center"
                    className="dropdown_inner"
                    onClick={getViewTests}
                  >
                    <Typography
                      className="dropdown_text"
                      sx={{
                        color: "#5D636B",
                        fontSize: "16px",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 5px",
                      }}
                    >
                      View Evaluator Tests
                    </Typography>
                    <ChevronRightRoundedIcon />
                  </Stack>
                </Box>
              </Box>
            </Box>
            <Box className="dstudio_drpdwn_select_box">
              <Box sx={{ position: "relative" }}>
                <TextField
                  placeholder="Create Tests"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputRef={refCreateTests}
                  inputProps={{
                    sx: {
                      fontSize: "20px",
                      color: "#3E4248",
                      fontWeight: "600",
                      cursor: "pointer",
                    },
                  }}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment
                        position="start"
                        sx={{ color: "#1C2129" }}
                      >
                        {showCreateTests ? (
                          <KeyboardArrowUpIcon style={{ color: "#1C2129" }} />
                        ) : (
                          <KeyboardArrowDownIcon style={{ color: "#1C2129" }} />
                        )}
                      </InputAdornment>
                    ),
                    sx: { cursor: "pointer" },
                  }}
                  value={
                    selectedCreateTests ? selectedCreateTests : "Create Tests"
                  }
                  onClick={() => {
                    setCreateTests(!showCreateTests);
                  }}
                />
                <Box
                  className="dropdown profile_dropdown"
                  sx={{
                    display: showCreateTests ? "block" : "none",
                  }}
                >
                  <Stack
                    gap="10px"
                    flexDirection="row"
                    alignItems="center"
                    className="dropdown_inner"
                    onClick={getCreateTests}
                  >
                    <Typography
                      className="dropdown_text"
                      sx={{
                        color: "#5D636B",
                        fontSize: "16px",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 5px",
                      }}
                    >
                      Create from existing test (duplicate & edit)
                    </Typography>
                    <ChevronRightRoundedIcon />
                  </Stack>
                  <Stack
                    gap="10px"
                    flexDirection="row"
                    alignItems="center"
                    className="dropdown_inner"
                    onClick={(e) => {getCreateTests(e); selectedDropDown("create-test")}}
                  >
                    <Typography
                      className="dropdown_text"
                      sx={{
                        color: "#5D636B",
                        fontSize: "16px",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 5px",
                      }}
                    >
                      Create new test
                    </Typography>
                    <ChevronRightRoundedIcon />
                  </Stack>
                  <Stack
                    gap="10px"
                    flexDirection="row"
                    alignItems="center"
                    className="dropdown_inner"
                    onClick={getCreateTests}
                  >
                    <Typography
                      className="dropdown_text"
                      sx={{
                        color: "#5D636B",
                        fontSize: "16px",
                        width: "100%",
                        textAlign: "left",
                        padding: "8px 5px",
                      }}
                    >
                      Create with bulk upload
                    </Typography>
                    <ChevronRightRoundedIcon />
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Stack>
          <Box className="recnt_tsts_added_section">
            <Typography className="active_assmnts_title">
              Recent tests added
            </Typography>
            <Box className="avlbl_assmnts_card">
              <Box className="no_bg">
                <Box className="avlbl_assmnts_top_inner">
                  <Typography className="avlbl_assmnts_card_title">
                    Survey name Evaluate Your Work on the Project our Work on
                    the Project - single line
                  </Typography>
                  <Typography className="avlbl_assmnts_card_descrpt">
                    Description for self Assessments, these can use these
                    assessments to better your performance and go ahead
                    Description for self Assessments, these can use these
                    assessments to better your performance and go ahead.
                  </Typography>
                  <Typography className="avlbl_assmnts_skills">
                    Skills evaluated : Skill Tag 1 | Skill Tag 2
                  </Typography>
                  <Stack className="avlbl_assmnts_infocta_flx">
                    <Stack className="avlbl_assmnts_info_flx">
                      <Stack className="avlbl_assmnts_durtn_flx">
                        <AccessTimeOutlinedIcon
                          sx={{ color: "#1C2129", fontSize: "12px" }}
                        />
                        <Typography className="avlbl_assmnts_durtn">
                          30- 35 mins
                        </Typography>
                      </Stack>
                    </Stack>
                    <Box className="analyze_cta">
                      <Stack className="analyze_cta_flx">
                        <Typography className="dstudio_rcnttsts_edit_cta">
                          Edit
                        </Typography>
                        <Button className="outlined_cta blue_outlined_cta">
                          Preview
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
            <Box className="avlbl_assmnts_card">
              <Box className="no_bg">
                <Box className="avlbl_assmnts_top_inner">
                  <Typography className="avlbl_assmnts_card_title">
                    Survey name Evaluate Your Work on the Project our Work on
                    the Project - single line
                  </Typography>
                  <Typography className="avlbl_assmnts_card_descrpt">
                    Description for self Assessments, these can use these
                    assessments to better your performance and go ahead
                    Description for self Assessments, these can use these
                    assessments to better your performance and go ahead.
                  </Typography>
                  <Typography className="avlbl_assmnts_skills">
                    Skills evaluated : Skill Tag 1 | Skill Tag 2
                  </Typography>
                  <Stack className="avlbl_assmnts_infocta_flx">
                    <Stack className="avlbl_assmnts_info_flx">
                      <Stack className="avlbl_assmnts_durtn_flx">
                        <AccessTimeOutlinedIcon
                          sx={{ color: "#1C2129", fontSize: "12px" }}
                        />
                        <Typography className="avlbl_assmnts_durtn">
                          30- 35 mins
                        </Typography>
                      </Stack>
                    </Stack>
                    <Box className="analyze_cta">
                      <Stack className="analyze_cta_flx">
                        <Typography className="dstudio_rcnttsts_edit_cta">
                          Edit
                        </Typography>
                        <Button className="outlined_cta blue_outlined_cta">
                          Preview
                        </Button>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
    </>
  );
};
export default Overview;
