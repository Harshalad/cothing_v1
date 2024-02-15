import { useState, useRef, useEffect, useCallback } from "react";
import HeaderNav from "../../../common/HeaderNav/HeaderNav";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Box,
  Typography,
  Stack,
  Tabs,
  Tab,
  Avatar,
  Checkbox,
  Button,
  Divider,
  TextField,
  InputAdornment,
} from "@mui/material";
import AddGoalPurpose from "../AddGoalPurpose/AddGoalPurpose";
import ViewPurpose from "../../../common/ViewPurpose/ViewPurpose";
import { useDispatch, useSelector } from "react-redux";
import { getProgramGoals } from "../../../../actions/align/fetchProgramGoals";
import SelectGoals from "../SelectGoals/SelectGoals";
import CurrentGoals from "../CurrentGoals/CurrentGoals";
import { fetchCurrentGoals } from "../../../../actions/achieve/fetchCurrentGoals";
import NewGoalAdded from "../NewGoalAdded/NewGoalAdded";
import SavedForLaterGoals from "../SaveForLaterGoals/SavedForLaterGoals";
import UserDetails from "../../../common/UserDetails/UserDetails";
import { DURATION_OPTIONS } from "../../../../constants/goals";
import PreviousGoals from "../PreviousGoals/PreviousGoals";
import { fetchDevelopmentAreas } from "../../../../actions/align/fetchDevelopmentAreas";
import { useRouter } from "next/router";
import { getNworxUser } from "../../../../actions/auth/fetchNworxUser";
import { fetchPreviousGoals } from "../../../../actions/align/fetchPreviousGoals";
import Spinner from "../../../common/Spinner/Spinner";
import CustomGoalPurpose from "../CustomGoalPurpose/CustomGoalPurpose";

var popUpName = "";

const drawerWidth = 250;

const ManagerAlignAddGoal = () => {
  const router = useRouter();
  const [ tabName, setTabName ] = useState( "current_goals" );
  const [ showEditOption, setEditOption ] = useState( false );
  const [ isDisableBtn, setDisableBtn ] = useState( false );
  const [ showPopUp, setPopUp ] = useState( false );
  const [ showViewPurpose, setViewPurpose ] = useState( false );
  const refAreas = useRef( null );
  const refDuration = useRef( null );
  const [ developmentAreas, setDevelopmentAreas ] = useState<any>( null );
  const [ topGoals, setTopGoals ] = useState<any>( [] );
  const [ remainingGoals, setRemainingGoals ] = useState<any>( [] );
  const [ currentGoals, setCurrentGoals ] = useState<any>( [] );
  const [ selectedGoal, setSelectedGoal ] = useState<any>( null );
  const [ selectGoalsLoading, setSelectGoalsLoading ] = useState( false );

  const [ reporteeId, setReporteeId ] = useState<any>( null );
  const [ reporteeEmail, setReporteeEmail ] = useState<any>( null );
  const [ reporteeProgramId, setReporteeProgramId ] = useState<any>( null );
  const [ employeeData, setEmployeeData ] = useState<any>( null );
  const [ previousGoals, setPreviousGoals ] = useState<any>( null );
  const [ completedGoalsLoading, setCompletedGoalsLoading ] =
    useState<any>( false );
  const [ goalIdDevAreaMap, setGoalIdDevAreaMap ] = useState<any>( null );
  const [ openCustomPopUp, setOpenCustomPopUp ] = useState<any>( false );

  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );

  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );

  // FETCH EMPLOYEE DETAILS
  useEffect( () => {
    const fetchNworxUser = async () => {
      try {
        if ( reporteeEmail ) {
          const response = await getNworxUser( reporteeEmail );
          //@ts-ignore
          if ( response?.nWorxUser ) {
            //@ts-ignore
            setEmployeeData( response.nWorxUser );
          }
        }
      } catch ( error ) {
        console.log( error );
      }
    };
    fetchNworxUser();
  }, [ reporteeEmail, router?.isReady ] );

  useEffect( () => {
    if ( router?.query?.reporteeId ) {
      //@ts-ignore
      setReporteeId( router?.query?.reporteeId );
    }
    if ( router?.query?.reporteeEmail ) {
      //@ts-ignore
      setReporteeEmail( router?.query?.reporteeEmail );
    }
    if ( router?.query?.reporteeProgramId ) {
      //@ts-ignore
      setReporteeProgramId( router?.query?.reporteeProgramId );
    }
  }, [ router?.isReady ] );


  const getCurrentGoals = useCallback( async () => {
    if ( reporteeId ) {
      try {
        //@ts-ignore
        // let  = await firebaseUser.getIdToken().then(function(idToken){
        //   return idToken
        // })

        const response = await fetchCurrentGoals( {
          userId: reporteeId,
          programId: reporteeProgramId,

        } );
        //@ts-ignore
        if ( response?.currentGoals?.length ) {
          //@ts-ignore
          setCurrentGoals( response?.currentGoals );
        }
      } catch ( error ) {
        console.log( error );
      }
    }
  }, [ reporteeId, reporteeProgramId ] );

  const fetchProgramGoals = useCallback( async () => {
    try {

      const programGoalsObject = await getProgramGoals( {
        programId: reporteeProgramId,
        userId: reporteeId,
        department: user?.department, // TODO Sateesh check and confirm if manager and LP will always be same department

      } );

      console.log( "programGoalsObject ", programGoalsObject );

      //@ts-ignore
      if ( programGoalsObject?.programGoals?.length ) {
        //@ts-ignore
        const topGoals = programGoalsObject?.programGoals?.filter(
          ( programGoal: any ) => programGoal.recommended
        );
        setTopGoals( topGoals );
        //@ts-ignore
        const remainingGoals = programGoalsObject?.programGoals?.filter(
          ( programGoal: any ) => {
            if ( programGoal?.recommended ) return false;
            return true;
          }
        );
        setRemainingGoals( remainingGoals );
      }
    } catch ( error ) {
      console.log( error );
    }
  }, [ reporteeProgramId ] );


  const getDevelopmentAreas = useCallback( async () => {
    try {

      const response = await fetchDevelopmentAreas( {
        programId: reporteeProgramId,

      } );
      //@ts-ignore
      if ( response?.length ) {
        setDevelopmentAreas( response );
      }
    } catch ( error ) {
      console.log( error );
    }
  }, [ reporteeProgramId, router?.isReady ] );

  const getCompletedGoals = useCallback( async () => {
    try {
      setCompletedGoalsLoading( true );

      const response = await fetchPreviousGoals( {
        userId: reporteeId,
        programId: reporteeProgramId,

      } );
      //@ts-ignore
      if ( response?.previousGoals?.length ) {
        //@ts-ignore
        setPreviousGoals( response?.previousGoals );
      }
      setCompletedGoalsLoading( false );
    } catch ( error ) {
      console.log( error );
      setCompletedGoalsLoading( false );
    }
  }, [ reporteeId, reporteeProgramId ] );

  useEffect( () => {
    const getAllGoals = async () => {
      await getDevelopmentAreas();
      await getCompletedGoals();
      await getCurrentGoals();
      await fetchProgramGoals();
    };
    getAllGoals();
  }, [
    fetchProgramGoals,
    getCompletedGoals,
    getCurrentGoals,
    getDevelopmentAreas,
    reporteeProgramId,
  ] );

  useEffect( () => {
    let goalIdDevAreaMapLocal = new Map();
    developmentAreas?.map( ( curDevArea: any, index: number ) => {
      if ( curDevArea?.goals?.length ) {
        curDevArea?.goals?.map( ( goal: any, index: number ) => {
          if ( goalIdDevAreaMapLocal.has( goal.goalId ) ) {
            let value = goalIdDevAreaMapLocal.get( goal.goalId );
            value.push( curDevArea.devAreaName );
            goalIdDevAreaMapLocal.set( goal.goalId, value );
          } else {
            goalIdDevAreaMapLocal.set( goal.goalId, [ curDevArea.devAreaName ] );
          }
        } );
      }
    } );
    setGoalIdDevAreaMap( goalIdDevAreaMapLocal );
  }, [ developmentAreas ] );

  console.log( "goalIdDevAreaMap ", goalIdDevAreaMap );

  const tabSwitch = ( event: any, newValue: any ) => {
    setTabName( newValue );
  };

  const viewPurpose = ( event: any ) => {
    setViewPurpose( true );
  };

  const addPurpose = ( event: any ) => {
    setEditOption( true );
    if ( !program?.configMap?.customAlignQuestion ) {
      var purposeBtns = document.getElementsByClassName( "purpose_btn" );
      for ( let i = 0; i < purposeBtns.length; i++ ) {
        //@ts-ignore
        if ( purposeBtns[ i ].innerText === "Add Purpose" ) {
          setDisableBtn( false );
          break;
        } else {
          setDisableBtn( true );
        }
      }
      //@ts-ignore
      if ( document.getElementById( event.target.id ).innerText === "Add Purpose" ) {
        popUpName = "addPurpose";
        setPopUp( true );
      } else {
        popUpName = "editPurpose";
        setPopUp( true );
      }
    } else {
      setOpenCustomPopUp( true );
    }
  };

  const closePopup = ( value: any ) => {
    setPopUp( value );
    setViewPurpose( value );
    setOpenCustomPopUp( false );
  };

  return (
    <>
      <UserDetails employeeData={ employeeData } />
      <Box className="manager_grid">
        <Box className="manager_left_box">
          { selectGoalsLoading ? (
            <Box>
              <Spinner />
            </Box>
          ) : topGoals?.length || remainingGoals?.length ? (
            <SelectGoals
              topGoals={ topGoals }
              remainingGoals={ remainingGoals }
              currentGoals={ currentGoals }
              setCurrentGoals={ setCurrentGoals }
              PROGRAM_ID_TEMP={ reporteeProgramId }
              ASSIGNEE_USER_ID_TEMP={ reporteeId }
              developmentAreas={ developmentAreas }
              previousGoals={ previousGoals }
              employeeDesignation={ employeeData?.designation }
              goalIdDevAreaMap={ goalIdDevAreaMap }
            />
          ) : null }
          {/* <NewGoalAdded /> */ }
        </Box>
        <Box className="manager_right_box">
          <Box className="manager_tab_box">
            <Tabs value={ tabName } onChange={ tabSwitch } className="manager_tabs">
              <Tab
                value="current_goals"
                label="Current Goals"
                sx={ { textTransform: "capitalize" } }
              />
              <Tab
                value="previous_goals"
                label="Previous Goals"
                sx={ { textTransform: "capitalize" } }
              />
            </Tabs>
          </Box>
          <Box className="managerTabContent" mt="12px">
            { tabName === "current_goals" ? (
              <CurrentGoals
                currentGoals={ currentGoals }
                setCurrentGoals={ setCurrentGoals }
                PROGRAM_ID_TEMP={ reporteeProgramId }
                ASSIGNEE_USER_ID_TEMP={ reporteeId }
                addPurpose={ addPurpose }
                selectedGoal={ selectedGoal }
                setSelectedGoal={ setSelectedGoal }
                viewPurpose={ viewPurpose }
                getCurrentGoals={ getCurrentGoals }
                employeeData={ employeeData }
              />
            ) : (
              <PreviousGoals
                previousGoals={ previousGoals }
                completedGoalsLoading={ completedGoalsLoading }
              />
            ) }
          </Box>
        </Box>
      </Box>
      { selectedGoal?.id && (
        <AddGoalPurpose
          closePopup={ closePopup }
          open={ { showPopUp, popUpName } }
          goal={ selectedGoal }
          setGoal={ setSelectedGoal }
          getCurrentGoals={ getCurrentGoals }
          PROGRAM_ID_TEMP={ reporteeProgramId }
          ASSIGNEE_USER_ID_TEMP={ reporteeId }
          employeeName={ employeeData?.name }
        />
      ) }
      { selectedGoal?.id && <CustomGoalPurpose
        closePopup={ closePopup }
        open={ openCustomPopUp }
        goal={ selectedGoal }
        setGoal={ setSelectedGoal }
        getCurrentGoals={ getCurrentGoals }
        PROGRAM_ID_TEMP={ reporteeProgramId }
        ASSIGNEE_USER_ID_TEMP={ reporteeId }
        employeeName={ employeeData?.name }
      />
      }

      <ViewPurpose
        closePopup={ closePopup }
        open={ { showViewPurpose, popUpName } }
        goal={ selectedGoal }
        reporteeProgramId={ reporteeProgramId }
      />
    </>
  );
};
export default ManagerAlignAddGoal;
