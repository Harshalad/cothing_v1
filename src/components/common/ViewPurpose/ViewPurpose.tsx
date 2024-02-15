import {
  Box,
  InputAdornment,
  Button,
  Dialog,
  Typography,
  TextField,
  Checkbox,
  DialogTitle,
  DialogContent,
  Stack,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useRef, useEffect } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { fetchProgramAPI } from "../../../actions/align/fetchProgram";

const ViewPurpose = ( { openPopup, closePopup, open, goal, reporteeProgramId, }: any ) => {
  const [ showMonths, setMonths ] = useState( false );
  const [ showSelectedMonth, setSelectedMonth ] = useState( false );
  const [ value, setValue ] = useState( dayjs( new Date() ) );
  const [ showModifyGoal, setModifyGoal ] = useState( false );
  const [ alignmentQuestions, setalignmentQuestions ] = useState<any>( [] );
  const [ userProgram, setUserProgram ] = useState<any>( null );
  const ref = useRef( null );
  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  useEffect( () => {
    const getProgramId = async () => {
      const response = await fetchProgramAPI( { programId: reporteeProgramId } );
      console.log( response, "getUserProgramgetUserProgram" );
      if ( response ) {
        setUserProgram( response );
      }
    }
    if ( reporteeProgramId !== undefined && reporteeProgramId !== null ) {
      getProgramId();
    }
    else {
      setUserProgram( program )
    }
  }, [ reporteeProgramId ] )
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  const months = [ "1 month", "2 month", "3 month", "4 month", "5 month" ];
  useEffect( () => {
    let question: { title: any; description: any; }[] = [];
    if ( userProgram?.configMap?.customAlignQuestion ) {
      if ( goal?.addedByRole === "SELF" ) {
        question = goal?.addGoalEmployeeQuestion
          ? goal?.addGoalEmployeeQuestion.map( ( alignmentQuestion: any, index: number ) => {
            return {
              title: alignmentQuestion?.question,
              description: alignmentQuestion?.answer,
            };
          } )
          : [];
      } else {
        question = goal?.addGoalManagerQuestion
          ? goal?.addGoalManagerQuestion.map( ( alignmentQuestion: any, index: number ) => {
            return {
              title: alignmentQuestion?.question,
              description: alignmentQuestion?.answer,
            };
          } )
          : [];

      }
    } else {
      question = goal?.purposeQuestionAnswer
        ? Object.keys( goal?.purposeQuestionAnswer ).map(
          ( alignmentQuestion: any, index: number ) => {
            return {
              title: alignmentQuestion,
              description: goal?.purposeQuestionAnswer[ alignmentQuestion ],
            };
          }
        )
        : goal?.managerAlignmentQuestions
          ? Object.keys( goal?.managerAlignmentQuestions ).map(
            ( alignmentQuestion: any, index: number ) => {
              return {
                title: alignmentQuestion,
                description: goal?.managerAlignmentQuestions[ alignmentQuestion ],
              };
            }
          )
          : [];
    }
    setalignmentQuestions( question );
  }, [ goal, userProgram ] )
  const getMonths = ( e: any ) => {
    if ( e !== undefined ) {
      //@ts-ignore
      ref.current.focus();
      var dropdownMonths = document.querySelectorAll( ".dropdown_text" );
      //@ts-ignore
      for ( let month of dropdownMonths ) {
        month.style.color = "#5D636B";
      }
      e.target.style.color = "#1C2129";
      //@ts-ignore
      setSelectedMonth( e.target.attributes.value.value );
      //@ts-ignore
      var dateSelected = document.getElementById( "selectedDateField" ).innerText
        ? //@ts-ignore
        document.getElementById( "selectedDateField" ).innerText
        : new Date();
      var formatedDate = new Date( dateSelected );
      var newDate = new Date(
        formatedDate.setMonth(
          formatedDate.getMonth() + parseInt( e.target.attributes.value.value )
        )
      );
      //@ts-ignore
      var newFormatedDate = newDate.toLocaleDateString( "en-GB" );
      //@ts-ignore
      document.getElementById( "endDate" ).value = newFormatedDate.replace(
        /\//g,
        "-"
      );
    }
  };

  const getDate = ( newValue: any ) => {
    setValue( newValue );
    //@ts-ignore
    document.getElementById( "selectedDateField" ).innerHTML = newValue.$d;
    //@ts-ignore
    if ( showSelectedMonth !== false && showSelectedMonth !== "" ) {
      //@ts-ignore
      var dateSelected = document.getElementById( "selectedDateField" ).innerText
        ? //@ts-ignore
        document.getElementById( "selectedDateField" ).innerText
        : new Date();
      var formatedDate = new Date( dateSelected );
      var newDate = new Date(
        formatedDate.setMonth(
          //@ts-ignore
          formatedDate.getMonth() + parseInt( showSelectedMonth )
        )
      );
      var newFormatedDate = newDate.toLocaleDateString( "en-GB" );
      //@ts-ignore
      document.getElementById( "endDate" ).value = newFormatedDate.replace(
        /\//g,
        "-"
      );
    }
  };

  console.log( goal, "goalionviewdeils" );

  const handleOutSideClick = ( event: any ) => {
    //@ts-ignore
    if ( ref.current && !ref.current.contains( event.target ) ) {
      setMonths( false );
    }
  };

  useEffect( () => {
    document.addEventListener( "mousedown", handleOutSideClick );
    return () => document.removeEventListener( "mousedown", handleOutSideClick );
  }, [] );

  const startDate = new Date( goal?.startDate );
  const endDate = new Date( goal?.endDate );

  //let alignmentQuestions: any=goal?.purposeQuestionAnswer
  //  ? Object.keys(goal?.purposeQuestionAnswer).map(
  //    (alignmentQuestion: any,index: number) => {
  //      return {
  //        title: alignmentQuestion,
  //        description: goal?.purposeQuestionAnswer[alignmentQuestion],
  //      };
  //    }
  //  )
  //  :[];

  //let CustomQuestion :any = 

  return (
    <>
      <Box>
        <Dialog
          open={ open.showViewPurpose }
          aria-labelledby="title"
          aria-describedby="description"
          sx={ { textAlign: "center", padding: "30px" } }
          className={
            showModifyGoal
              ? "view_purpose_dialog addFlex"
              : "view_purpose_dialog"
          }
        >
          <DialogContent sx={ { padding: "0 0 0px 0", marginBottom: "20px" } }>
            <CloseIcon
              style={ {
                position: "absolute",
                top: "15px",
                right: "15px",
                zIndex: "1",
                cursor: "pointer",
              } }
              onClick={ () => {
                closePopup( false );
                setTimeout( () => {
                  setModifyGoal( false );
                  setValue( dayjs( new Date() ) );
                  //@ts-ignore
                  setSelectedMonth( "" );
                  setMonths( false );
                }, 200 );
              } }
            />
            <Stack flexDirection="row" alignItems="center">
              <Box
                className={
                  showModifyGoal ? "popup_left_box addFlex" : "popup_left_box"
                }
              >
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  gap="15px"
                  mb="30px"
                  justifyContent="space-between"
                >
                  <DialogTitle
                    id="title"
                    sx={ {
                      color: "#1C2129",
                      fontWeight: "700",
                      fontSize: { mobile: "18px", tablet: "25px" },
                      margin: "0 0 0px",
                      padding: "0 0 0px 0",
                      textAlign: "left",
                    } }
                  >
                    Goal Details
                  </DialogTitle>
                  { open.popUpName === "viewEmployeeGoal"
                    ? ""
                    : // <Stack
                    //   flexDirection="row"
                    //   alignItems="center"
                    //   gap="8px"
                    //   sx={{ cursor: "pointer" }}
                    //   onClick={() => openPopup(true)}
                    // >
                    //   <img
                    //     src="/images/icons/guidance.png"
                    //     alt="guidance"
                    //     width={16}
                    //     height={20}
                    //   ></img>
                    //   <Typography
                    //     sx={{
                    //       fontSize: "12px",
                    //       fontWeight: "500",
                    //       color: "#2E5DB0",
                    //     }}
                    //   >
                    //     Guidance
                    //   </Typography>
                    // </Stack>
                    // open.popUpName !== "ManagerAchieveGoalOverview" &&
                    //   !showModifyGoal ? (
                    //   <Stack
                    //     flexDirection="row"
                    //     alignItems="center"
                    //     gap="8px"
                    //     sx={{ cursor: "pointer" }}
                    //     onClick={() => setModifyGoal(true)}
                    //   >
                    //     <img
                    //       src="/images/edit.png"
                    //       alt="modify goal"
                    //       width={20}
                    //       height={20}
                    //     ></img>
                    //     <Typography
                    //       sx={{
                    //         fontSize: "12px",
                    //         fontWeight: "500",
                    //         color: "#2E5DB0",
                    //       }}
                    //     >
                    //       Modfify Goal
                    //     </Typography>
                    //   </Stack>
                    // ) : (
                    "" }
                </Stack>
                <Box
                  sx={ {
                    textAlign: "left",
                    marginBottom: "24px",
                    background: "#FFFFFF",
                    borderRadius: "8px",
                    padding: "32px",
                  } }
                >
                  <Typography className="view_purpose_title">
                    { goal?.nameAlias ? goal?.nameAlias : goal?.name }
                  </Typography>
                  { goal?.topPriority ? (
                    <Typography className="view_purpose_tag">
                      Top Priority
                    </Typography>
                  ) : null }
                  <Typography className="view_purpose_subtext">
                    { goal?.descriptionAlias
                      ? goal?.descriptionAlias
                      : goal?.description }
                  </Typography>
                  <Stack
                    flexDirection="row"
                    alignItems="center"
                    gap="15px"
                    justifyContent="space-between"
                  >
                    { goal?.durationInDays != 0 && <Stack flexDirection="row" alignItems="center" gap="15px">
                      <AccessTimeIcon />

                      <Typography className="view_purpose_days">
                        { goal?.durationInDays } Days
                      </Typography>

                    </Stack> }
                    { goal?.startDate && goal?.endDate && <Stack flexDirection="row" alignItems="center" gap="15px">
                      <Box className="view_purpose_fromdate">
                        From :{ " " }
                        { startDate.toLocaleDateString( "en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        } ) }
                      </Box>
                      <Box className="view_purpose_tilldate">
                        To :{ " " }
                        { endDate.toLocaleDateString( "en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        } ) }
                      </Box>
                    </Stack> }
                  </Stack>
                </Box>
                <Grid
                  sx={ {
                    textAlign: "left",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "24px",
                  } }
                >
                  { alignmentQuestions &&
                    alignmentQuestions.map( ( question: any, index: number ) => {
                      return (
                        <Box key={ index } className="view_purpose_boxes">
                          <Typography className="view_purpose_box_title">
                            { question.title }
                          </Typography>
                          <Typography className="view_purpose_box_subtext">
                            { question.description }
                          </Typography>
                        </Box>
                      );
                    } ) }
                </Grid>
              </Box>
              { showModifyGoal ? (
                <Box className="popup_right_box">
                  <Stack>
                    <Box>
                      <Box>
                        <Box sx={ { marginBottom: "40px" } }>
                          <article className="popup_txtfld_lbl">
                            Goal Title
                          </article>
                          <TextField
                            placeholder="Goal Title"
                            variant="outlined"
                            size="small"
                            fullWidth
                            inputProps={ {
                              sx: {
                                fontSize: "16px",
                                color: "#1C2129",
                                fontWeight: "500",
                              },
                            } }
                          />
                        </Box>
                        <Box sx={ { marginBottom: "40px" } }>
                          <article className="popup_txtfld_lbl">
                            Goal Description
                          </article>
                          <TextField
                            placeholder="Please write your goal description here..."
                            variant="outlined"
                            size="small"
                            fullWidth
                            multiline
                            rows={ 7 }
                            inputProps={ {
                              sx: {
                                fontSize: "16px",
                                color: "#1C2129",
                                fontWeight: "500",
                              },
                            } }
                            InputProps={ {
                              sx: { padding: "0" },
                            } }
                          />
                        </Box>
                      </Box>
                      <Stack flexDirection="row" alignItems="center" gap="30px">
                        <Box className="manager_select_box">
                          <Typography className="popup_txtfld_lbl">
                            Start Date
                          </Typography>
                          <LocalizationProvider dateAdapter={ AdapterDayjs }>
                            <DatePicker
                              sx={ { width: "100%" } }
                              format="DD-MM-YYYY"
                              disablePast={ true }
                              slotProps={ {
                                textField: {
                                  id: "startDate",
                                },
                              } }
                              value={ value }
                              onChange={ ( newValue ) => getDate( newValue ) }
                            />
                          </LocalizationProvider>
                        </Box>
                        <input
                          type="hidden"
                          id="selectedDateField"
                          value=""
                        ></input>
                        <Box
                          sx={ { position: "relative" } }
                          className="manager_select_box"
                        >
                          <Typography className="popup_txtfld_lbl">
                            Duration
                          </Typography>
                          <Box ref={ ref }>
                            <TextField
                              id="duration"
                              placeholder="Select"
                              variant="outlined"
                              size="small"
                              fullWidth
                              inputRef={ ref }
                              inputProps={ {
                                sx: {
                                  fontSize: "16px",
                                  color: "#1C2129",
                                  fontWeight: "500",
                                  cursor: "pointer",
                                },
                              } }
                              InputProps={ {
                                readOnly: true,
                                endAdornment: (
                                  <InputAdornment
                                    position="start"
                                    sx={ { color: "#C8CDD4" } }
                                  >
                                    { showMonths ? (
                                      <KeyboardArrowUpIcon
                                        style={ { color: "#3E4248" } }
                                      />
                                    ) : (
                                      <KeyboardArrowDownIcon
                                        style={ { color: "#3E4248" } }
                                      />
                                    ) }
                                  </InputAdornment>
                                ),
                                sx: { cursor: "pointer" },
                              } }
                              value={
                                showSelectedMonth ? showSelectedMonth : "Select"
                              }
                              onClick={ () => {
                                setMonths( !showMonths );
                              } }
                            />
                            <Box
                              className="dropdown profile_dropdown"
                              sx={ { display: showMonths ? "block" : "none" } }
                            >
                              { months.map( ( month ) => (
                                <Stack
                                  key={ month }
                                  gap="10px"
                                  flexDirection="row"
                                  alignItems="center"
                                  className="dropdown_inner"
                                  onClick={ getMonths }
                                >
                                  {/* <Typography
                                      //@ts-ignore
                                      className="dropdown_text"
                                      //@ts-ignore
                                      sx={{
                                        color: "#5D636B",
                                        fontSize: "16px",
                                        width: "100%",
                                        textAlign: "left",
                                        padding: "8px 5px",
                                      }}
                                      //@ts-ignore
                                      value={month.replace(/\D/g, "")}
                                    >
                                      {month}
                                    </Typography> */}
                                </Stack>
                              ) ) }
                            </Box>
                          </Box>
                        </Box>
                        <Box className="manager_select_box">
                          <article className="popup_txtfld_lbl">
                            End Date
                          </article>
                          <TextField
                            id="endDate"
                            placeholder="End Date"
                            variant="outlined"
                            size="small"
                            fullWidth
                            InputProps={ {
                              readOnly: true,
                            } }
                            inputProps={ {
                              sx: {
                                fontSize: "16px",
                                color: "#1C2129",
                                fontWeight: "500",
                              },
                            } }
                            className="readOnlyInput"
                          />
                        </Box>
                      </Stack>
                      <Stack
                        direction="row"
                        spacing={ 1 }
                        alignItems="center"
                        mt="30px"
                        mb="30px"
                        sx={ { marginLeft: "auto" } }
                      >
                        <Typography
                          className="popup_txtfld_lbl"
                          sx={ { marginBottom: "0 !important" } }
                        >
                          Top Priority
                        </Typography>
                        <Checkbox
                          id="checkbox"
                          sx={ {
                            padding: "0",
                            color: "#EAECEF",
                            "&.Mui-checked": {
                              color: "#2E5DB0",
                            },
                          } }
                        />
                      </Stack>
                    </Box>
                    <Box sx={ { textAlign: "center", marginTop: "20px" } }>
                      <Button
                        sx={ {
                          color: "#FFFFFF",
                          backgroundColor: "#F58A43",
                          boxShadow: "none",
                          "&:hover": {
                            backgroundColor: "#F58A43",
                            boxShadow: "none",
                          },
                          textTransform: "none",
                          width: "250px !important",
                          margin: "0 auto",
                        } }
                      >
                        Send to manager for review
                      </Button>
                      <Box
                        sx={ {
                          display: "table",
                          cursor: "pointer",
                          margin: "16px auto 0",
                        } }
                      >
                        <Typography
                          sx={ {
                            color: "#F58A43",
                            fontSize: "18px",
                            fontWeight: "700",
                          } }
                        >
                          Save
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Box>
              ) : (
                ""
              ) }
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};
export default ViewPurpose;
