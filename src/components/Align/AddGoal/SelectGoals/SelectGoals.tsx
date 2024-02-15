import {
  Box,
  Typography,
  Stack,
  Checkbox,
  InputAdornment,
  TextField,
  Chip,
} from "@mui/material";
import { addProgramGoalToUserGoal } from "../../../../actions/align/addProgramGoalToUserGoal";
import { useSelector } from "react-redux";
import { removeProgramGoalFromUserGoals } from "../../../../actions/align/removeProgramGoalFromUserGoals";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import { DURATION_OPTIONS } from "../../../../constants/goals";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import { logUserEngagement } from "../../../../actions/actionCenter/logUserEngagement";
import AddGoalPurpose from "../AddGoalPurpose/AddGoalPurpose";
import { useRouter } from "next/router";
import ViewMilestone from "./ViewMilestone";

var popUpName = "";

const drawerWidth = 250;

const SelectGoals = ( {
  topGoals,
  remainingGoals,
  currentGoals,
  setCurrentGoals,
  PROGRAM_ID_TEMP,
  ASSIGNEE_USER_ID_TEMP,
  previousGoals,
  developmentAreas,
  employeeDesignation,
  goalIdDevAreaMap,
}: any ) => {
  console.log( currentGoals, previousGoals, remainingGoals, "adityacurrentgoals" );
  currentGoals?.map( ( goal: any ) => {
    console.log( goal?.name, "goal?.name" );
  } )
  //@ts-ignore
  const roleBasedAccess = useSelector( ( state ) => state?.auth?.roleBasedAccess );

  const [ showAreaSelect, setAreaSelect ] = useState( false );
  const [ showTimeSelect, setTimeSelect ] = useState( false );
  const [ showEditOption, setEditOption ] = useState( false );
  const [ isDisableBtn, setDisableBtn ] = useState( false );
  const [ currentGoalsHere, setCurrentGoalsHere ] = useState( currentGoals );
  useEffect( () => {
    setCurrentGoalsHere( currentGoals );
  }, [ currentGoals ] )

  // const [showPopUp, setPopUp] = useState(false);
  const [ showPopUp, setViewPurpose ] = useState( false );
  const [ selectedGoal, setSelectedGoal ] = useState<any>( null );
  const refAreas = useRef( null );
  const refDuration = useRef( null );
  const router = useRouter();
  const dropdownRef = useRef( null );
  const textFieldRef = useRef( null );
  const queryDevArea = router?.query?.devArea;
  const [ filteredRemainingGoals, setFilteredRemainingGoals ] =
    useState<any>( remainingGoals );

  const [ filteredTopGoals, setFilteredTopGoals ] = useState<any>( topGoals );

  const [ selectedDevelopmentAreas, setSelectedDevelopmentAreas ] = useState<any>(
    []
  );

  const [ selectedDevAreasGoalIds, setSelectedDevAreasGoalIds ] = useState<any>(
    []
  );
  const [ openViewMilestone, setOpenViewMilestone ] = useState( false );
  const [ viewGoal, setViewGoal ] = useState<any>( null );

  const [ placeHolder, setPlaceHolder ] = useState<string>( "Selectsdf" );
  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  useEffect( () => {
    if ( queryDevArea?.length !== 0 ) {
      const queryDevAreaArray = ( queryDevArea as string )?.split( "||" );

      console.log(
        "QueryDevArea",
        selectedDevelopmentAreas,
        queryDevArea,
        queryDevAreaArray
      );
      let modifiedDevelopmentAreas: any = [];
      queryDevAreaArray?.forEach( ( queryDevAreaAr: any ) => {
        developmentAreas?.forEach( ( devArea: any ) => {
          if ( devArea?.devAreaName === queryDevAreaAr ) {
            if ( modifiedDevelopmentAreas?.includes( devArea ) === false ) {
              modifiedDevelopmentAreas.push( devArea );

            }
          }
        } );
        setSelectedDevelopmentAreas( modifiedDevelopmentAreas );
      } );
    }
  }, [ queryDevArea ] );
  console.log( "selectedDevelopmentAreas", selectedDevelopmentAreas );
  useEffect( () => {
    //@ts-ignore
    const handleClickOutside = ( event ) => {
      if (
        //@ts-ignore
        textFieldRef.current &&
        //@ts-ignore
        !textFieldRef.current.contains( event.target ) &&
        dropdownRef.current &&
        //@ts-ignore
        !dropdownRef.current.contains( event.target )
      ) {
        setAreaSelect( false );
      }
    };

    document.addEventListener( "mousedown", handleClickOutside );

    return () => {
      document.removeEventListener( "mousedown", handleClickOutside );
    };
  }, [] );

  const handleTextFieldClick = () => {
    setAreaSelect( !showAreaSelect );

  };

  // SETTING GOAL IDS FROM SELECTED DEVELOPMENT AREAS FOR FILTERING
  useEffect( () => {
    if ( selectedDevelopmentAreas?.length ) {
      const goalIds: any = [];
      selectedDevelopmentAreas.map( ( selectedDevArea: any, index: number ) => {
        if ( selectedDevArea?.goals?.length ) {
          selectedDevArea?.goals?.map( ( goal: any, index: number ) => {
            goalIds.push( goal.goalId );
          } );
        }
      } );
      setSelectedDevAreasGoalIds( goalIds );
    }
    if ( !selectedDevelopmentAreas?.length ) {
      setSelectedDevAreasGoalIds( [] );
    }
  }, [ selectedDevelopmentAreas ] );
  console.log( filteredRemainingGoals, "adityajdksvfa" );
  // FILTERING TOP GOALS AND REMAINING GOALS FROM THE ALLOWED GOAL IDS FROM SELECTED DEV AREAS
  useEffect( () => {
    if ( selectedDevAreasGoalIds?.length ) {
      console.log( "setting placeholder" );
      setPlaceHolder( "Selected: " + selectedDevelopmentAreas.length );

      const filteredTopGoals = topGoals.filter( ( goal: any, index: number ) => {
        return selectedDevAreasGoalIds.includes( goal?.id );
      } );
      setFilteredTopGoals( filteredTopGoals );
      const filteredRemainingGoals = remainingGoals.filter(
        ( goal: any, index: number ) => {
          return selectedDevAreasGoalIds.includes( goal?.id );
        }
      );

      setFilteredRemainingGoals( filteredRemainingGoals );
    }
    if ( !selectedDevAreasGoalIds?.length ) {
      setFilteredTopGoals( topGoals );
      setFilteredRemainingGoals( remainingGoals );
      setPlaceHolder( "Select" );
    }
  }, [ remainingGoals, selectedDevAreasGoalIds, topGoals ] );

  const addCustomGoal = () => {
    popUpName = "addGoal";
    // setPopUp(true);
  };

  const highlightCheckbox = ( event: any ) => {
    var currentId =
      event.target.parentElement.parentElement.parentElement.parentElement
        .previousElementSibling.firstElementChild.firstElementChild.id;
    if ( currentId === "development_areas" ) {
      //@ts-ignore
      refAreas.current.focus();
    } else {
      //@ts-ignore
      refDuration.current.focus();
    }

    let devAreaName = event.target.value;
    let devGoalIds: any = [];

    developmentAreas?.map( ( da: any ) => {
      if ( da?.devAreaName === devAreaName ) {
        da.goals.forEach( ( daGoal: any ) => {
          devGoalIds.push( daGoal.goalId );
        } );
      }
    } );

    if ( event.target.checked === true ) {
      let filteredTG: any = [];

      filteredTopGoals.map( ( ftg: any ) => {
        if ( devGoalIds.includes( ftg.id ) ) {
          filteredTG.push( ftg );
        }
      } );

      setFilteredTopGoals( filteredTG );

      let filteredRG: any = [];

      filteredRemainingGoals.map( ( ftg: any ) => {
        if ( devGoalIds.includes( ftg.id ) ) {
          filteredRG.push( ftg );
        }
      } );

      setFilteredRemainingGoals( filteredRG );

      event.target.parentElement.nextElementSibling.style.color = "#1C2129";
    } else {
      let filteredTG: any = [];

      topGoals.map( ( ftg: any ) => {
        if ( devGoalIds.includes( ftg.id ) ) {
          filteredTG.push( ftg );
        }
      } );

      setFilteredTopGoals( [ ...filteredTopGoals, filteredTG ] );

      let filteredRG: any = [];

      remainingGoals.map( ( ftg: any ) => {
        if ( devGoalIds.includes( ftg.id ) ) {
          filteredRG.push( ftg );
        }
      } );

      setFilteredRemainingGoals( [ ...filteredRemainingGoals, filteredRG ] );

      event.target.parentElement.nextElementSibling.style.color = "#5D636B";
    }
  };

  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const managerToggleView = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  const addGoalToCurrentGoals = ( goal: any ) => {
    const goalExists = currentGoals.find(
      ( currentGoal: any ) => currentGoal.id === goal.id
    );
    console.log( goal, "goalishereere" );
    if ( !goalExists ) {
      if (
        currentUserRole === MANAGER_VIEW_STATE.EXPERT ||
        currentUserRole === MANAGER_VIEW_STATE.JP
      ) {
        toast.error( "You are not authorized to add goal for a Leader.", {
          toastId: "CANNOT_ADD_GOALS",
        } );
        return;
      }
      addProgramGoalToUserGoal( {
        assignedBy: user?.name,
        goalId: goal?.id,
        userId:
          managerToggleView === MANAGER_VIEW_STATE.LP
            ? user.id
            : ASSIGNEE_USER_ID_TEMP,
        programId:
          managerToggleView === MANAGER_VIEW_STATE.LP
            ? user.activeProgramId
            : PROGRAM_ID_TEMP,
        status: "ADDED",
        addedBy: user?.name,
        addedByRole:
          managerToggleView === MANAGER_VIEW_STATE.LP ? "SELF" : "MANAGER",
        addedByUserId: user?.id,
      } );

      if ( currentUserRole === MANAGER_VIEW_STATE.LP ) {
        logUserEngagement( {
          userId: user?.id,
          goalId: goal?.id,
          programId: user?.activeProgramId,
          type: "engagement",
          action: "employee_added_goal",
          contentName: goal?.name,
          contentId: "NA",
          milestoneId: "NA",
          marks: 2,
        } );
      }

      setCurrentGoals( [
        ...currentGoals,
        {
          ...goal,
          assignedBy: user?.name,
          userId: ASSIGNEE_USER_ID_TEMP,
          programId: PROGRAM_ID_TEMP,
          status: "ADDED",
          addedBy: user?.name,
          addedByRole: "MANAGER",
          addedByUserId: user?.id,
        },
      ] );
    }
    if ( goalExists ) {
      const currentGoal = currentGoals.filter(
        ( currentGoal: any ) => currentGoal.id === goal.id
      )[ 0 ];

      if (
        currentUserRole === MANAGER_VIEW_STATE.EXPERT ||
        currentUserRole === MANAGER_VIEW_STATE.JP
      ) {
        toast.error( "You are not authorized to remove goal of a Leader.", {
          toastId: "CANNOT_REMOVE_GOALS",
        } );
        return;
      }

      if ( currentGoal.addedByUserId !== user.id ) {
        toast.error( "Cannot remove goals added by others.", {
          toastId: "CANNOT_REMOVE_GOALS",
        } );
        return;
      }

      if (
        currentGoal.status !== "ADDED" &&
        currentGoal.status !== "AUTO_APPROVED"
      ) {
        toast.error( "Cannot remove goals that have been initiated.", {
          toastId: "CANNOT_REMOVE_IN_PROGRESS_GOALS",
        } );
        return;
      }

      const filteredGoals = currentGoals.filter(
        ( currentGoal: any ) => currentGoal.id !== goal.id
      );
      removeProgramGoalFromUserGoals( {
        userId:
          managerToggleView === MANAGER_VIEW_STATE.LP
            ? user.id
            : ASSIGNEE_USER_ID_TEMP,
        programId: PROGRAM_ID_TEMP,
        userGoalId: goal.id,
      } );

      setCurrentGoals( filteredGoals );
    }
  };

  const toggleSelectedDevelopmentArea = ( e: any, developmentArea: any ) => {
    console.log( "seclected development area", developmentArea );
    // IF DEV AREA ALREADY EXISTS, REMOVE IT FROM THE SELECTED DEV AREAS
    if ( selectedDevelopmentAreas?.includes( developmentArea ) ) {
      const filteredDevelopmentAreas = selectedDevelopmentAreas.filter(
        ( devArea: any, index: number ) => {
          return devArea !== developmentArea;
        }
      );
      setSelectedDevelopmentAreas( filteredDevelopmentAreas );
    }
    // IF DEV AREA IS NOT THERE, ADD IT TO SELECTED DEV AREAS
    if ( !selectedDevelopmentAreas?.includes( developmentArea ) ) {
      let modifiedDevelopmentAreas = [];
      if ( selectedDevelopmentAreas?.length ) {
        modifiedDevelopmentAreas = [
          ...selectedDevelopmentAreas,
          developmentArea,
        ];
      } else {
        modifiedDevelopmentAreas = [ developmentArea ];
      }

      setSelectedDevelopmentAreas( modifiedDevelopmentAreas );
    }
  };
  const viewPurpose = ( event: any ) => {
    setViewPurpose( true );
  };
  const closePopup = ( value: any ) => {
    setViewPurpose( value );
  };
  const handleViewMilestoneClick = ( goal: any ) => {
    setOpenViewMilestone( true );
    setViewGoal( goal )
  }
  return (
    <>
      { developmentAreas && selectedDevelopmentAreas ? (
        <Stack flexDirection="row" gap="15px" alignItems="center">
          <Box
            sx={ { position: "relative", flex: "unset" } }
            className="manager_select_box unset-box"
          >
            <Typography mb="8px" sx={ { fontSize: "14px", color: "#3E4248" } }>
              Development Areas
            </Typography>
            <TextField
              ref={ textFieldRef }
              id="development_areas"
              placeholder={ placeHolder }
              variant="outlined"
              size="small"
              fullWidth
              inputRef={ refAreas }
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
                  <InputAdornment position="start" sx={ { color: "#C8CDD4" } }>
                    { showAreaSelect ? (
                      <KeyboardArrowUpIcon style={ { color: "#3E4248" } } />
                    ) : (
                      <KeyboardArrowDownIcon style={ { color: "#3E4248" } } />
                    ) }
                  </InputAdornment>
                ),
                sx: { cursor: "pointer" },
              } }
              value={ placeHolder }
              onClick={ handleTextFieldClick }
            />
            <Box
              ref={ dropdownRef }
              className="dropdown"
              sx={ { display: showAreaSelect ? "block" : "none" } }
            >
              { developmentAreas?.map( ( devArea: any, index: number ) => (
                <label htmlFor={ devArea?.devAreaName } key={ index }>
                  <Stack
                    sx={ { padding: "8px 5px" } }
                    gap="10px"
                    flexDirection="row"
                    alignItems="center"
                    className="dropdown_inner"
                  >
                    <Checkbox
                      size="small"
                      id={ devArea?.devAreaName }
                      value={ devArea?.devAreaName }
                      sx={ {
                        padding: "0",
                      } }
                      checked={ selectedDevelopmentAreas?.includes( devArea ) }
                      onChange={ ( e ) => {
                        console.log( "made change" );
                        toggleSelectedDevelopmentArea( e, devArea );
                      } }
                    />
                    <Typography sx={ { color: "#3E4248", fontSize: "14px" } }>
                      { devArea?.devAreaName }
                    </Typography>
                  </Stack>
                </label>
              ) ) }
            </Box>
          </Box>

          {/* <Box sx={{ position: "relative" }} className="manager_select_box">
          <Typography mb="8px" sx={{ fontSize: "14px", color: "#3E4248" }}>
            Duration
          </Typography>
          <TextField
            id="duration"
            placeholder="Select"
            variant="outlined"
            size="small"
            fullWidth
            inputRef={refDuration}
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
                <InputAdornment position="start" sx={{ color: "#C8CDD4" }}>
                  {showTimeSelect ? (
                    <KeyboardArrowUpIcon style={{ color: "#3E4248" }} />
                  ) : (
                    <KeyboardArrowDownIcon style={{ color: "#3E4248" }} />
                  )}
                </InputAdornment>
              ),
              sx: { cursor: "pointer" },
            }}
            value={"Select"}
            onClick={() => {
              setTimeSelect(!showTimeSelect);
            }}
          />
          <Box
            className="dropdown"
            sx={{ display: showTimeSelect ? "block" : "none" }}
          >
            {DURATION_OPTIONS.map((duration) => (
              <label htmlFor={"d" + duration} key={duration.label}>
                <Stack
                  sx={{ padding: "8px 5px" }}
                  gap="10px"
                  flexDirection="row"
                  alignItems="center"
                  className="dropdown_inner"
                >
                  <Checkbox
                    size="small"
                    id={"d" + duration}
                    sx={{
                      padding: "0",
                    }}
                    onChange={highlightCheckbox}
                  />
                  <Typography sx={{ color: "#3E4248", fontSize: "14px" }}>
                    {duration.label}
                  </Typography>
                </Stack>
              </label>
            ))}
          </Box>
        </Box> */}
          {/* <Stack
                  flexDirection="row"
                  alignItems="center"
                  gap="6px"
                  ml="auto"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    addCustomGoal();
                  }}
                >
                  <AddCircleOutlineOutlinedIcon style={{ color: "#F58A43" }} />
                  <Typography
                    sx={{
                      color: "#F58A43",
                      fontWeight: "600",
                      fontSize: "12px",
                    }}
                  >
                    Add Custom Goal
                  </Typography>
                </Stack> */}
        </Stack>
      ) : null }
      <Box mt="24px">
        <Stack
          flexDirection="row"
          gap="10px"
          flexWrap="wrap"
          // m="8px 0"
          // p="0 16px"
          // flexDirection="row"
          alignItems="center"
        // justifyContent="space-between"
        // gap="15px"
        >
          { selectedDevelopmentAreas?.map( ( devArea: any, index: number ) => (
            <Chip
              key={ index }
              label={ devArea?.devAreaName }
              onDelete={ ( e ) => toggleSelectedDevelopmentArea( e, devArea ) }
              variant="outlined"
              color="primary"
              sx={ {
                color: "black",


                borderColor:
                  ( currentUserRole === MANAGER_VIEW_STATE.LP && program?.configMap?.customLPColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customLPColor : ( currentUserRole === MANAGER_VIEW_STATE.MANAGER && program?.configMap?.customManagerColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customManagerColor :
                    roleBasedAccess?.[ currentUserRole ]?.themeColor,

                ".MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    ( currentUserRole === MANAGER_VIEW_STATE.LP && program?.configMap?.customLPColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customLPColor : ( currentUserRole === MANAGER_VIEW_STATE.MANAGER && program?.configMap?.customManagerColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customManagerColor :
                      roleBasedAccess?.[ currentUserRole ]?.themeColor,
                },
                "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    ( currentUserRole === MANAGER_VIEW_STATE.LP && program?.configMap?.customLPColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customLPColor : ( currentUserRole === MANAGER_VIEW_STATE.MANAGER && program?.configMap?.customManagerColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customManagerColor :
                      roleBasedAccess?.[ currentUserRole ]?.themeColor,
                },
                "& :hover .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    ( currentUserRole === MANAGER_VIEW_STATE.LP && program?.configMap?.customLPColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customLPColor : ( currentUserRole === MANAGER_VIEW_STATE.MANAGER && program?.configMap?.customManagerColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customManagerColor :
                      roleBasedAccess?.[ currentUserRole ]?.themeColor,
                },
                ".MuiSvgIcon-root ": {
                  fill: ( currentUserRole === MANAGER_VIEW_STATE.LP && program?.configMap?.customLPColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customLPColor : ( currentUserRole === MANAGER_VIEW_STATE.MANAGER && program?.configMap?.customManagerColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customManagerColor :
                    roleBasedAccess?.[ currentUserRole ]?.themeColor,
                },
                fontSize: "12px",
                fontWeight: "600",
                borderRadius: "10px",

              } }
            />
          ) ) }
        </Stack>
      </Box>
      <Box mt="24px">
        <Typography
          className="goal_heading"
          sx={ {
            fontWeight: "600",
            color: "#1C2129",
            marginBottom: "8px",
          } }
        >
          Select goals
          { managerToggleView === MANAGER_VIEW_STATE.LP
            ? ""
            : " for " + employeeDesignation }
        </Typography>
        { filteredTopGoals?.length ? (
          <Box
            sx={ {
              border: "1px solid #EFCE5B",
              borderRadius: "8px",
              bgcolor: "#FDF9E4",
              padding: "16px 16px 8px",
            } }
          >
            <Typography
              sx={ {
                fontWeight: "700",
                color: "#1C2129",
                fontSize: "14px",
              } }
            >
              Top recommended goals for
            </Typography>
            {/* <label htmlFor={"top_goals"}> */ }
            { filteredTopGoals?.map( ( goal: any, index: number ) => {
              return (
                <Stack
                  key={ index }
                  m="8px 0"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="15px"
                  sx={ { cursor: "pointer" } }
                >
                  <Box className="goal_content_limit">
                    <Typography
                      sx={ {
                        fontWeight: "500",
                        color: "#3E4248",
                        fontSize: "16px",
                      } }
                    >
                      { goal?.name }
                    </Typography>
                    <Typography sx={ { color: "#989EA5", fontSize: "12px" } }>
                      { goal?.descriptionAlias
                        ? goal?.descriptionAlias
                        : goal?.description }
                    </Typography>
                  </Box>
                  <Checkbox
                    id={ "top_goals" }
                    sx={ {
                      padding: "0",
                      color: "#C8CDD4",
                      "&.Mui-checked": {
                        color: "#2E5DB0",
                      },
                    } }
                    onChange={ () => addGoalToCurrentGoals( goal ) }
                    checked={
                      currentGoals.find(
                        ( currentGoal: any ) => currentGoal.id === goal.id
                      ) ||
                      previousGoals?.find(
                        ( previousGoal: any ) => previousGoal?.id === goal?.id
                      )
                    }
                    disabled={
                      previousGoals?.find(
                        ( previousGoal: any ) => previousGoal?.id === goal?.id
                      ) ||
                      currentGoals.find(
                        ( currentGoal: any ) =>
                          currentGoal.id === goal.id &&
                          currentGoal.addedByUserId !== user.id
                      )
                    }
                  />
                </Stack>
              );
            } ) }
            {/* </label> */ }
          </Box>
        ) : null }
        { filteredRemainingGoals?.length ? (
          <>
            { filteredRemainingGoals?.map( ( goal: any, index: number ) => {
              //  console.log("disabled logic", goal.name,   currentGoals.id === goal.id &&
              //  currentGoals.addedByUserId !== user.id)
              return (
                <Stack
                  key={ index }
                  m="8px 0"
                  p="0 16px"
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="15px"
                >
                  <Box sx={ { marginBottom: "30px" } }>
                    <Typography
                      sx={ {
                        fontWeight: "500",
                        color: "#3E4248",
                        fontSize: "16px",
                      } }
                    >
                      { goal?.name }
                      <br />
                    </Typography>
                    <Typography
                      sx={ {
                        fontWeight: "500",
                        color: "#3E4248",
                        fontSize: "12px",
                      } }
                    >
                      {/* {goalIdDevAreaMap?.get(goal?.id).length} */ }
                      { goalIdDevAreaMap?.get( goal?.id )
                        ? goalIdDevAreaMap?.get( goal?.id ).length === 1
                          ? `  [Development Area: ${ goalIdDevAreaMap?.get( goal?.id ).join( ", " ) || ""
                          }]`
                          : `  [Development Areas: ${ goalIdDevAreaMap?.get( goal?.id ).join( ", " ) || ""
                          }]`
                        : "" }
                    </Typography>
                    <Typography
                      sx={ {
                        fontWeight: "400",
                        color: "#2E5DB0",
                        fontSize: "12px",
                        marginTop: "5px",
                        cursor: "pointer"

                      } }
                      onClick={ () => handleViewMilestoneClick( goal ) }
                    >
                      View Milestones
                      <br />
                    </Typography>
                  </Box>
                  { ( currentUserRole === MANAGER_VIEW_STATE.EXPERT ||
                    currentUserRole === MANAGER_VIEW_STATE.JP ||
                    ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                      !program?.configMap?.enableAlign ) ) && (
                      <Typography
                        style={ {
                          paddingTop: "4px",
                          textDecoration: "none",
                          color: "#F58A43",
                          cursor: "pointer",
                          textAlign: "right",
                        } }
                        onClick={ ( e ) => {
                          viewPurpose( e );
                          setSelectedGoal( goal );
                        } }
                      >
                        Details
                      </Typography>
                    ) }
                  { currentGoals && ( currentUserRole === MANAGER_VIEW_STATE.LP ||
                    ( currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                      program?.configMap?.enableAlign ) ) && (
                      <Checkbox
                        sx={ {
                          padding: "0",
                          color: "#C8CDD4",
                          "&.Mui-checked": {
                            color: "#2E5DB0",
                          },
                          marginBottom: "30px",
                        } }
                        onChange={ () => addGoalToCurrentGoals( goal ) }
                        checked={
                          currentGoalsHere?.find(
                            ( currentGoal: any ) => currentGoal?.id === goal?.id
                          ) ||
                          ( previousGoals && previousGoals?.find(
                            ( previousGoal: any ) => previousGoal?.id === goal?.id
                          ) )
                        }
                        disabled={

                          goal?.onStart ||
                          previousGoals?.find(
                            ( previousGoal: any ) => previousGoal?.id === goal?.id
                          ) ||
                          currentGoals.find(
                            ( currentGoal: any ) =>
                              currentGoal.id === goal.id &&
                              currentGoal.addedByUserId !== user.id
                          )
                        }
                      />
                    ) }
                </Stack>
              );
            } ) }
          </>
        ) : null }
      </Box>
      <AddGoalPurpose
        closePopup={ closePopup }
        open={ { showPopUp, popUpName } }
        goal={ selectedGoal }
        setGoal={ setSelectedGoal }
        PROGRAM_ID_TEMP={ PROGRAM_ID_TEMP }
        ASSIGNEE_USER_ID_TEMP={ ASSIGNEE_USER_ID_TEMP }
        employeeName={ "Leader" }
      />
      <ViewMilestone openViewMilestone={ openViewMilestone } viewGoal={ viewGoal } goalIdDevAreaMap={ goalIdDevAreaMap } setOpenViewMilestone={ setOpenViewMilestone } />
    </>
  );
};
export default SelectGoals;
