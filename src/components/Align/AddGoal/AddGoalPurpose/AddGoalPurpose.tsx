import {useState,useRef,useEffect} from "react";
import {
  Box,
  TextField,
  Button,
  Dialog,
  Typography,
  InputAdornment,
  DialogTitle,
  DialogContent,
  Stack,
  Chip,
  Divider,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {useSelector} from "react-redux";
import AddClarifyingStatements from "./AddClarifyingStatements";
import {updateUserGoalPurposes} from "../../../../actions/align/updateUserGoalPurposes";
import {DURATION_OPTIONS} from "../../../../constants/goals";
import "./AddGoalPurpose.module.css";
import {MANAGER_VIEW_STATE} from "../../../../constants/auth";
import {toast} from "react-toastify";
import Spinner from "../../../common/Spinner/Spinner";
import {addDays} from "../../../../utils/addDays";
import dayjs from "dayjs";
import {logUserEngagement} from "../../../../actions/actionCenter/logUserEngagement";

const AddGoalPurpose=({
  closePopup,
  open,
  goal,
  setGoal,
  PROGRAM_ID_TEMP,
  ASSIGNEE_USER_ID_TEMP,
  getCurrentGoals,
  employeeName,
}: any) => {
  //@ts-ignore
  const user=useSelector((state) => state?.auth?.nWorxUser);
  const [goalTitle,setGoalTitle]=useState(
    goal?.nameAlias||goal?.name||""
  );
  const [goalDescription,setGoalDescription]=useState(
    goal?.descriptionAlias||goal?.description||""
  );

  const [savePurposeLoading,setSavePurposeLoading]=useState(false);
  const [showMonths,setMonths]=useState(false);
  const [duration,setDuration]=useState(DURATION_OPTIONS[3]);
  const [startDate,setStartDate]=useState<any>(new Date(goal?.startDate));
  const [showAddStatement,setAddStatement]=useState(false);
  const [isQuestion,setQuestion]=useState("");
  const [isAnswer,setAnswer]=useState("");
  const [isQuestionValidate,setQuestionValidate]=useState(false);
  const [isAnswerValidate,setAnswerValidate]=useState(false);
  const [showPrimaryManager,setPrimaryManager]=useState(false);
  const [selectedPrimaryManager,selectPrimaryManager]=useState("");
  const ref=useRef(null);
  const refManager=useRef(null);
  const [purpose,setPurpose]=useState<any>([]);
  const [benefit,setBenefit]=useState<any>([]);
  const [topPriorityChecked,setTopPriorityChecked]=useState(false);
  const [stChange,setStChange]=useState(false);
  const boxRef=useRef(null);

  const managerToggleView=useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );

  const isManagerView=
    managerToggleView===MANAGER_VIEW_STATE.LP? false:true;

  const userId=isManagerView? ASSIGNEE_USER_ID_TEMP:user?.id;
  const programId=isManagerView? PROGRAM_ID_TEMP:user?.activeProgramId;

  console.log("managerToggleView ",managerToggleView);

  const initialStatement=isManagerView
    ? {
      "What is the larger objective that this goal is associated with?": "",
      "What do you gain through this goal?": "",
      "What kind of support can we provide to achieve this goal?": "",
    }
    :{
      "What is the larger objective that this goal is associated with?": "",
      "What do you gain through this goal?": "",
      "What kind of support do you need to achieve this goal?": "",
    };

  const [statement,setStatement]=useState<any>(initialStatement);
  const [endDate,setEndDate]=useState<any>(null);


  useEffect(() => {
    const updatedStatement={...initialStatement};

    updatedStatement[
      "What is the larger objective that this goal is associated with?"
    ]=
      statement[
      "What is the larger objective that this goal is associated with?"
      ];
    updatedStatement["What do you gain through this goal?"]=
      statement["What do you gain through this goal?"];
    {
      !isManagerView
        ? (updatedStatement[
          "What kind of support do you need to achieve this goal?"
        ]=statement["What kind of support do you need to achieve this goal?"])
        :(updatedStatement[
          "What kind of support can we provide to achieve this goal?"
        ]=
          statement[
          "What kind of support can we provide to achieve this goal?"
          ]);
    }
    setStatement(updatedStatement);
  },[stChange]);
  useEffect(() => {
    // SETTING NAME
    if(goal?.name||goal?.nameAlias) {
      if(goal?.name) setGoalTitle(goal?.name);
      if(goal?.nameAlias) setGoalTitle(goal?.nameAlias);
    } else {
      setGoalTitle("");
    }

    // SETTING DESCRIPTION
    if(goal?.description||goal?.descriptionAlias) {
      if(goal?.description) setGoalDescription(goal?.description);
      if(goal?.descriptionAlias) setGoalDescription(goal?.descriptionAlias);
    } else {
      setGoalDescription("");
    }

    if(goal?.topPriority) {
      setTopPriorityChecked(true);
    }
    if(!goal?.topPriority) {
      setTopPriorityChecked(false);
    }
    if(goal?.durationInDays) {
      const durationOption=DURATION_OPTIONS.filter(
        (duration) => duration.days===goal?.durationInDays
      )[0];
      setDuration(durationOption);
    }
    if(!goal?.durationInDays) {
      setDuration(DURATION_OPTIONS[3]);
    }
    if(goal?.purposeQuestionAnswer) {
      setStatement(goal?.purposeQuestionAnswer);
      setStChange(!stChange);
    }
    if(!goal?.purposeQuestionAnswer) {
      setStatement(initialStatement);
      setStChange(!stChange);
    }

    if(goal?.selectedPurporses) {
      setPurpose(goal?.selectedPurposes);
    }
    if(!goal?.selectedPurposes) {
      setPurpose([]);
    }
    if(goal?.selectedBenefits) {
      setBenefit(goal?.selectedBenefits);
    }
    if(!goal?.selectedBenefits) {
      setBenefit([]);
    }

    if(goal?.startDate) {
      setStartDate(dayjs(goal?.startDate));
    }
    if(!goal?.startDate) {
      setStartDate(null);
    }
  },[goal]);

  console.log("purposeQuestionAnswer",goal?.purposeQuestionAnswer);
  console.log(statement,"statement");

  const onSetDuration=(e: any) => {
    //@ts-ignore
    ref.current.focus();
    var dropdownWeeks=document.querySelectorAll(".dropdown_text");
    //@ts-ignore
    for(let week of dropdownWeeks) {
      week.style.color="#5D636B";
    }
    e.target.style.color="#1C2129";
    const filteredObject=Object.entries(DURATION_OPTIONS).filter(
      (item) => item[1].label===e.target.innerText
    )[0];
    const daysValue=filteredObject[1].days;
    setDuration({label: e.target.innerText,days: daysValue});
    setMonths(false);
  };

  const chipSelect=(event: any,type: any,value: any,tagAnswer: any) => {
    tagAnswer=tagAnswer.trim();
    if(event.currentTarget.classList.contains("chip_selected")) {
      if(type==="purpose") {
        setPurpose(purpose.filter((element: any) => element!==value));
      } else {
        setBenefit(benefit.filter((element: any) => element!==value));
      }

      event.currentTarget.classList.remove("chip_selected");
    } else {
      if(type==="purpose") {
        setStatement({
          ...statement,
          "What is the larger objective that this goal is associated with?": `${statement["What is the larger objective that this goal is associated with?"]}${tagAnswer} `,
        });
        setStChange(!stChange);
        setPurpose([...purpose,value]);
      } else {
        setStatement({
          ...statement,
          "What do you gain through this goal?": `${statement["What do you gain through this goal?"]}${tagAnswer} `,
        });
        setStChange(!stChange);
        setBenefit([...benefit,value]);
      }
      event.currentTarget.classList.add("chip_selected");
    }
  };

  const validateQuestion=(e: any) => {
    setQuestion(e.target.value);
    //@ts-ignore
    const field=document.getElementById("question").value;
    if(field!=="") {
      setQuestionValidate(true);
      return true;
    } else {
      setQuestionValidate(false);
      return false;
    }
  };

  const validateAnswer=(e: any) => {
    setAnswer(e.target.value);
    //@ts-ignore
    const field=document.getElementById("answer").value;
    if(field!=="") {
      setAnswerValidate(true);
      return true;
    } else {
      setAnswerValidate(false);
      return false;
    }
  };

  const getPrimaryManager=(e: any) => {
    //@ts-ignore
    refManager.current.focus();
    var dropdownNames=document.querySelectorAll(".dropdown_text");
    //@ts-ignore
    for(let name of dropdownNames) {
      name.style.color="#5D636B";
    }
    e.target.style.color="#1C2129";
    selectPrimaryManager(e.target.innerText);
  };

  const editField=(id: any) => {
    var elm=document.getElementById(id);
    //@ts-ignore
    if(elm.parentElement.parentElement.classList.contains("readOnlyInput")) {
      //@ts-ignore
      elm.parentElement.parentElement.classList.remove("readOnlyInput");
    }
    //@ts-ignore
    document.getElementById(id).readOnly=false;
  };

  const addStatement=() => {
    const temp=statement;
    statement[isQuestion]=isAnswer;
    setStatement(temp);
    setStChange(!stChange);
    setQuestion("");
    setAnswer("");
    setAddStatement(false)
  };

  const statementChange=(e: any,v: any) => {
    const temp=statement;
    temp[v]=e.target.value;
    setStatement(temp);
    setStChange(!stChange);
  };

  const currentUserRole=useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );

  const names=[
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Naveen",
    "Babu",
    "Pavithra",
    "Vidhi",
    "Watan",
  ];

  const saveAndUpdatePurpose=async () => {
    try {

      if(currentUserRole===MANAGER_VIEW_STATE.EXPERT||currentUserRole===MANAGER_VIEW_STATE.JP) {
        toast.error("You are not Allowed to Add Details",{
          toastId: "EXPERT_NOT_ALLOWED_TO_PERFORM",
        });
        return;

      }

      setSavePurposeLoading(true);
      //@ts-ignore
      const response=await updateUserGoalPurposes({
        goalPurposes: (purpose),
        goalBenefits: (benefit),
        purposeQuestionAnswerMap: (statement),
        userId,
        programId,
        goalId: goal.id,
        topPriority: topPriorityChecked,
        //@ts-ignore
        startDate: new Date(startDate).getTime(),
        durationInDays: duration.days,
        goalTitle,
        goalDescription,
      });

      if(currentUserRole===MANAGER_VIEW_STATE.LP) {
        logUserEngagement({
          userId: user?.id,
          goalId: goal?.id,
          programId: user?.activeProgramId,
          type: "engagement",
          action: "employee_answers_pupose",
          contentName: goal?.name,
          contentId: "NA",
          milestoneId: "NA",
          marks: 2,
        });
      }

      //@ts-ignore
      if(response?.statusCode===0) {
        closePopup(false);
        getCurrentGoals();
        toast.success("Goal details have been saved");
        setGoal(null);
      }
      setSavePurposeLoading(false);
    } catch(error) {
      setSavePurposeLoading(false);
      console.log(error);
    }
  };

  console.log(
    !goalTitle,
    !goalDescription,
    !startDate,
    !statement[
    "What is the larger objective that this goal is associated with?"
    ],
    !statement["What do you gain through this goal?"]
  );
  console.log(statement,"statement");
  console.log(duration?.days);
  const handleOutSideClick=(event: any) => {
    //@ts-ignore
    if(boxRef.current&&!boxRef.current.contains(event.target)) {
      setMonths(false);
    }
  };
  useEffect(() => {
    if(startDate&&duration?.days) {
      const date=new Date(startDate);
      const endDate=addDays(date,duration?.days);
      setEndDate(endDate);
    }
    document.addEventListener("mousedown",handleOutSideClick);
    return () => document.removeEventListener("mousedown",handleOutSideClick);
  },[duration,startDate]);

  return (
    <>
      <Box>
        <Dialog
          open={open.showPopUp}
          aria-labelledby="title"
          aria-describedby="description"
          sx={{textAlign: "center",padding: "30px"}}
          className="add_goal_dialog"
        >
          <DialogContent sx={{padding: "0 0 0px 0",marginBottom: "20px"}}>
            <CloseIcon
              style={{
                position: "absolute",
                top: "15px",
                right: "15px",
                zIndex: "1",
                cursor: "pointer",
              }}
              onClick={() => {
                closePopup(false);
              }}
            />
            <Stack flexDirection="row" className="add_goal_details_flex">
              <Box className="popup_left_box">
                <Stack
                  flexDirection="row"
                  alignItems="center"
                  gap="15px"
                  justifyContent="space-between"
                  mb="40px"
                >
                  <DialogTitle
                    id="title"
                    sx={{
                      color: "#1C2129",
                      fontWeight: "700",
                      fontSize: {mobile: "18px",tablet: "25px"},
                      margin: "0 0 0px",
                      padding: "0 0 0px 0",
                      textAlign: "left",
                    }}
                  >
                    {/* {open.popUpName === "editPurpose" ||
                    open.popUpName === "editEmployeePurpose"
                      ? " Edit "
                      : " Fill "} */}
                    Goal details
                    {/* {open.popUpName === "addPurpose" ||
                    open.popUpName === "editPurpose" ||
                    open.popUpName === "addEmployeePurpose" ||
                    open.popUpName === "editEmployeePurpose"
                      ? " Purpose"
                      : " Details"} */}
                  </DialogTitle>
                  {/* {open.popUpName === "addEmployeePurpose" ||
                  open.popUpName === "editEmployeePurpose" ? ( */}
                  {startDate&&endDate&&duration?.days&&(
                    <Typography className="goal_enddate">
                      End Date :{" "}
                      {endDate.toLocaleDateString("en-GB",{
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </Typography>
                  )}
                  {/* ) : (
                    ""
                  )} */}
                </Stack>
                <Box>
                  <Box sx={{marginBottom: "20px"}}>
                    <article className="popup_txtfld_lbl">
                      Goal Title&#x2A;
                    </article>
                    <TextField
                      placeholder="Goal Title"
                      variant="outlined"
                      size="small"
                      fullWidth
                      inputProps={{
                        sx: {
                          fontSize: "16px",
                          color: "#1C2129",
                          fontWeight: "500",
                        },
                      }}
                      value={goalTitle}
                      onChange={(e) => setGoalTitle(e.target.value)}
                    //   disabled={true}
                    />
                  </Box>
                  <Box sx={{marginBottom: "20px"}}>
                    <article className="popup_txtfld_lbl">
                      Goal Description&#x2A;
                    </article>
                    <TextField
                      placeholder="Please write your goal description here..."
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      rows={7}
                      inputProps={{
                        sx: {
                          fontSize: "16px",
                          color: "#1C2129",
                          fontWeight: "500",
                        },
                      }}
                      InputProps={{
                        sx: {padding: "0"},
                      }}
                      value={goalDescription}
                      onChange={(e) => setGoalDescription(e.target.value)}
                    />
                  </Box>
                </Box>
                <Stack flexDirection="row" alignItems="center" gap="30px">
                  {open.popUpName==="addEmployeePurpose"||
                    open.popUpName==="editEmployeePurpose"? (
                    <Box className="manager_select_box">
                      <article className="popup_txtfld_lbl">
                        Select Manager
                      </article>
                      <Box sx={{position: "relative"}}>
                        <TextField
                          id="select_manager"
                          placeholder="Select"
                          variant="outlined"
                          size="small"
                          fullWidth
                          inputRef={refManager}
                          inputProps={{
                            sx: {
                              fontSize: "16px",
                              color: "#1C2129",
                              fontWeight: "500",
                              cursor: "pointer",
                            },
                          }}
                          InputProps={{
                            readOnly: true,
                            endAdornment: (
                              <InputAdornment
                                position="start"
                                sx={{color: "#C8CDD4"}}
                              >
                                {showPrimaryManager? (
                                  <KeyboardArrowUpIcon
                                    style={{color: "#3E4248"}}
                                  />
                                ):(
                                  <KeyboardArrowDownIcon
                                    style={{color: "#3E4248"}}
                                  />
                                )}
                              </InputAdornment>
                            ),
                            sx: {cursor: "pointer"},
                          }}
                          value={
                            selectedPrimaryManager
                              ? selectedPrimaryManager
                              :"Select"
                          }
                          onClick={() => {
                            setPrimaryManager(!showPrimaryManager);
                          }}
                        />
                        <Box
                          className="dropdown profile_dropdown"
                          sx={{
                            display: showPrimaryManager? "block":"none",
                          }}
                        >
                          {names.map((name) => (
                            <Stack
                              key={name}
                              gap="10px"
                              flexDirection="row"
                              alignItems="center"
                              className="dropdown_inner"
                              onClick={getPrimaryManager}
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
                                {name}
                              </Typography>
                            </Stack>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  ):(
                    ""
                  )}
                  <Box className="manager_select_box" sx={{zIndex: 9999}}>
                    <Typography className="popup_txtfld_lbl">
                      Start Date&#x2A;
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        disablePast={true}
                        //@ts-ignore
                        portalId="root-portal"
                        PopperProps={{
                          style: {zIndex: 999999},
                          // disablePortal: true,
                        }}
                        sx={{width: "115%",zIndex: 999999}}
                        format="DD-MM-YYYY"
                        value={startDate}
                        onChange={(newValue) => {
                          console.log(newValue,"new date value");
                          if(newValue) {
                            let selectedDate=new Date(newValue);
                            let date=new Date();
                            date.setDate(date.getDate()-1);
                            if(date.getTime()<=selectedDate.getTime()) {
                              setStartDate(newValue);
                            } else {
                              toast.error(
                                "You have selected a date before today. Please select a future date.",
                                {toastId: "INVALID_DATE_ADD_PURPOSE_MODAL"}
                              );
                              setStartDate(null);
                              return;
                            }
                          }
                        }}
                      />
                    </LocalizationProvider>
                  </Box>
                  <Box
                    sx={{position: "relative"}}
                    className="manager_select_box"
                  >
                    <Typography className="popup_txtfld_lbl">
                      Duration&#x2A;
                    </Typography>
                    <Box ref={boxRef}>
                      <TextField
                        id="duration"
                        placeholder="Select"
                        variant="outlined"
                        size="small"
                        fullWidth
                        inputRef={ref}
                        inputProps={{
                          sx: {
                            fontSize: "16px",
                            color: "#1C2129",
                            fontWeight: "500",
                            cursor: "pointer",
                          },
                        }}
                        InputProps={{
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{color: "#C8CDD4"}}
                            >
                              {showMonths? (
                                <KeyboardArrowUpIcon
                                  style={{color: "#3E4248"}}
                                />
                              ):(
                                <KeyboardArrowDownIcon
                                  style={{color: "#3E4248"}}
                                />
                              )}
                            </InputAdornment>
                          ),
                          sx: {cursor: "pointer"},
                        }}
                        value={duration? duration.label:"Select"}
                        onClick={() => {
                          setMonths(!showMonths);
                        }}
                      />
                      <Box
                        className="dropdown profile_dropdown"
                        sx={{display: showMonths? "block":"none"}}
                      >
                        {DURATION_OPTIONS.map((days: any) => (
                          <Stack
                            key={days.days}
                            gap="10px"
                            flexDirection="row"
                            alignItems="center"
                            className="dropdown_inner"
                            onClick={onSetDuration}
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
                              {days.label}
                            </Typography>
                          </Stack>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                  {open.popUpName==="addPurpose"||
                    open.popUpName==="editPurpose"||
                    open.popUpName==="addGoal"? (
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                      mt="30px"
                      mb="30px"
                      sx={{marginLeft: "auto"}}
                    >
                      <Typography
                        className="popup_txtfld_lbl"
                        sx={{marginBottom: "0 !important"}}
                      >
                        Top Priority
                      </Typography>
                      <Checkbox
                        id="checkbox"
                        sx={{
                          padding: "0",
                          color: "#EAECEF",
                          "&.Mui-checked": {
                            color: "#2E5DB0",
                          },
                        }}
                        checked={topPriorityChecked}
                        onChange={(e) =>
                          setTopPriorityChecked(!topPriorityChecked)
                        }
                      />
                    </Stack>
                  ):(
                    ""
                  )}
                </Stack>
                <AddClarifyingStatements
                  open={open}
                  chipSelect={chipSelect}
                  programId={
                    isManagerView? PROGRAM_ID_TEMP:user?.activeProgramId
                  }
                  selectedPurposes={goal?.selectedPurposes}
                  selectedBenefits={goal?.selectedBenefits}
                />
              </Box>
              <Divider
                orientation="vertical"
                sx={{color: "#EAECEF",borderWidth: "10px"}}
                flexItem
              />
              <Box className="popup_right_box">
                <Stack>
                  <Box>
                    <Typography className="statement_right_title">
                      {/* Your Clarifying Statements will be{" "} */}
                      {isManagerView
                        ? `${employeeName} may see this information and may respond to it.`
                        :user?.noAlignRequired
                          ? ""
                          :`${user?.manager} may see this information and may respond to it.`}
                    </Typography>
                    {/* <div> {statement}</div> */}
                    {Object.keys(statement).map(
                      (individualStatement: any,index: number) => {
                        return (
                          <Box
                            sx={{marginBottom: "24px",textAlign: "left"}}
                            key={index}
                          >
                            <article className="statement_right_txtfld_lbl">
                              {individualStatement}
                              {individualStatement!==
                                "What kind of support do you need to achieve this goal?"&&
                                individualStatement!==
                                "What kind of support can we provide to achieve this goal?"? (
                                <span>&#x2A;</span>
                              ):(
                                ""
                              )}
                              {/* What is the Purpose of{" "}
                              {open.popUpName === "addEmployeePurpose" ||
                              open.popUpName === "editEmployeePurpose"
                                ? " selecting "
                                : ""}{" "}
                              this goal? */}
                            </article>
                            <TextField
                              id={individualStatement}
                              placeholder={statement[individualStatement]}
                              variant="outlined"
                              size="small"
                              fullWidth
                              multiline
                              rows={4}
                              inputProps={{
                                sx: {
                                  fontSize: "16px",
                                  color: "#5D636B",
                                  fontWeight: "400",
                                },
                              }}
                              onChange={(e) => {
                                setStatement({
                                  ...statement,
                                  [individualStatement]: e.target.value,
                                });
                                setStChange(!stChange);
                                // statementChange(e, individualStatement);
                              }}
                              value={statement[individualStatement]}
                              InputProps={{
                                sx: {padding: "0"},
                                // readOnly: false,
                                endAdornment: (
                                  <InputAdornment position="end">
                                    {/* <EditIcon
                                      onClick={() =>
                                        editField(individualStatement)
                                      }
                                      sx={{
                                        color: "#989EA5",
                                        fontSize: "18px",
                                        position: "absolute",
                                        right: "15px",
                                        bottom: "30px",
                                        cursor: "pointer",
                                      }}
                                    /> */}
                                  </InputAdornment>
                                ),
                              }}
                            // className="readOnlyInput"
                            />
                          </Box>
                        );
                      }
                    )}
                    {/* <Box sx={{ marginBottom: "24px", textAlign: "left" }}>
                      <article className="statement_right_txtfld_lbl">
                        What is the Purpose of{" "}
                        {open.popUpName === "addEmployeePurpose" ||
                        open.popUpName === "editEmployeePurpose"
                          ? " selecting "
                          : ""}{" "}
                        this goal?
                      </article>
                      <TextField
                        id="goalPurpose"
                        placeholder="What is the Purpose of this goal?"
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        inputProps={{
                          sx: {
                            fontSize: "16px",
                            color: "#5D636B",
                            fontWeight: "400",
                          },
                        }}
                        onChange={(e) => setPurposeOfSelecting(e.target.value)}
                        value={purposeOfSelecting}
                        InputProps={{
                          sx: { padding: "0" },
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <EditIcon
                                onClick={() => editField("goalPurpose")}
                                sx={{
                                  color: "#989EA5",
                                  fontSize: "18px",
                                  position: "absolute",
                                  right: "15px",
                                  bottom: "30px",
                                  cursor: "pointer",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        className="readOnlyInput"
                      />
                    </Box>
                    <Box sx={{ marginBottom: "24px", textAlign: "left" }}>
                      <article className="statement_right_txtfld_lbl">
                        {open.popUpName === "addEmployeePurpose" ||
                        open.popUpName === "editEmployeePurpose"
                          ? "How would you benefit from this goal?"
                          : "What are the Goal Benefits?"}
                      </article>
                      <TextField
                        id="goalBenefits"
                        placeholder="What are the Benefits of this Goal?"
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        onChange={(e) => setBenefitFromThisGoal(e.target.value)}
                        value={benefitFromThisGoal}
                        inputProps={{
                          sx: {
                            fontSize: "16px",
                            color: "#5D636B",
                            fontWeight: "400",
                          },
                        }}
                        InputProps={{
                          sx: { padding: "0" },
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <EditIcon
                                onClick={() => editField("goalBenefits")}
                                sx={{
                                  color: "#989EA5",
                                  fontSize: "18px",
                                  position: "absolute",
                                  right: "15px",
                                  bottom: "30px",
                                  cursor: "pointer",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        className="readOnlyInput"
                      />
                    </Box>
                    <Box sx={{ marginBottom: "24px", textAlign: "left" }}>
                      <article className="statement_right_txtfld_lbl">
                        What kind of Goal Assistance will{" "}
                        {open.popUpName === "addEmployeePurpose" ||
                        open.popUpName === "editEmployeePurpose"
                          ? "you require"
                          : "be Provided"}
                        ?
                      </article>
                      <TextField
                        id="goalAssist"
                        placeholder="What kind of Goal Assistance will be Provided?"
                        variant="outlined"
                        size="small"
                        fullWidth
                        multiline
                        rows={4}
                        inputProps={{
                          sx: {
                            fontSize: "16px",
                            color: "#5D636B",
                            fontWeight: "400",
                          },
                        }}
                        InputProps={{
                          sx: { padding: "0" },
                          readOnly: true,
                          endAdornment: (
                            <InputAdornment position="end">
                              <EditIcon
                                onClick={() => editField("goalAssist")}
                                sx={{
                                  color: "#989EA5",
                                  fontSize: "18px",
                                  position: "absolute",
                                  right: "15px",
                                  bottom: "30px",
                                  cursor: "pointer",
                                }}
                              />
                            </InputAdornment>
                          ),
                        }}
                        className="readOnlyInput"
                      />
                    </Box> */}
                    <Stack
                      flexDirection="row"
                      alignItems="center"
                      gap="6px"
                      ml="auto"
                      sx={{cursor: "pointer"}}
                      onClick={() => {
                        setAddStatement(true);
                      }}
                    >
                      <AddCircleOutlineOutlinedIcon
                        style={{color: "#2E5DB0"}}
                      />
                      <Typography sx={{color: "#2E5DB0",fontSize: "16px"}}>
                        What other question do you want to answer?
                      </Typography>
                    </Stack>
                    {showAddStatement? (
                      <Box
                        sx={{
                          textAlign: "left",
                          padding: "24px",
                          border: "2px solid #C8CDD4",
                          borderRadius: "16px",
                          margin: "16px 0 30px",
                          position: "relative",
                        }}
                      >
                        <Typography className="add_statement_title">
                          What other question do you want to answer?
                        </Typography>
                        <CloseIcon
                          style={{
                            position: "absolute",
                            top: "15px",
                            right: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setAddStatement(false);
                          }}
                        />
                        <Box sx={{marginBottom: "16px"}}>
                          <article className="popup_txtfld_lbl">
                            Question
                          </article>
                          <TextField
                            id="question"
                            placeholder="Type the question"
                            variant="outlined"
                            size="small"
                            fullWidth
                            inputProps={{
                              sx: {fontSize: "16px",color: "#1C2129"},
                            }}
                            value={isQuestion}
                            onChange={(e) => validateQuestion(e)}
                          />
                        </Box>
                        <Box>
                          <article className="popup_txtfld_lbl">Answer</article>
                          <TextField
                            id="answer"
                            placeholder="Write your response here"
                            variant="outlined"
                            size="small"
                            fullWidth
                            multiline
                            rows={4}
                            inputProps={{
                              sx: {fontSize: "16px",color: "#1C2129"},
                            }}
                            InputProps={{
                              sx: {padding: "0"},
                            }}
                            value={isAnswer}
                            onChange={(e) => validateAnswer(e)}
                          />
                        </Box>
                        <Box sx={{textAlign: "center",marginTop: "30px"}}>
                          <Button
                            sx={{
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
                            }}
                            //@ts-ignore
                            disabled={!isQuestion||!isAnswer}
                            onClick={addStatement}
                          >
                            Add
                          </Button>
                        </Box>
                      </Box>
                    ):(
                      ""
                    )}
                  </Box>
                  {savePurposeLoading? (
                    <Spinner />
                  ):(
                    <Box sx={{marginTop: showAddStatement? "0":"30px"}}>
                      <Button
                        sx={{
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
                        }}
                        onClick={saveAndUpdatePurpose}
                        disabled={
                          !goalTitle||
                          !goalDescription||
                          !startDate||
                          !statement?.[
                          "What is the larger objective that this goal is associated with?"
                          ]||
                          !statement?.["What do you gain through this goal?"]
                        }
                      >
                        {/* Save &
                        {open.popUpName === "editPurpose" ||
                        open.popUpName === "editEmployeePurpose"
                          ? " Update"
                          : " Add"}
                        {open.popUpName === "addPurpose" ||
                        open.popUpName === "editPurpose" ||
                        open.popUpName === "addEmployeePurpose" ||
                        open.popUpName === "editEmployeePurpose"
                          ? " Purpose"
                          : " Goal"} */}
                        {user?.noAlignRequired
                          ? "Save"
                          :goal?.purposeStatus
                            ? "Save"
                            :"Next"}
                      </Button>
                    </Box>
                  )}
                </Stack>
              </Box>
            </Stack>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};
export default AddGoalPurpose;
