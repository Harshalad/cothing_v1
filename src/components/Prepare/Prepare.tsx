import { useEffect, useState } from "react";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Box,
  Stack,
  Typography,
  Rating,
  Menu,
  TextField,
  InputAdornment,
  LinearProgress,
  Tooltip,
  Button,
  Link,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { fetchWorksheet } from "../../actions/prepare/fetchWorksheet";
import MileLocator from "./MileLocator/MileLocator";
import { useRouter } from "next/router";
import {
  fetchUserWorksheet,
  fetchUserWorksheetByStreaming,
} from "../../actions/prepare/fetchUserWorksheet";
import uuid from "uuid";
import Spinner from "../common/Spinner/Spinner";
import UserDetails from "../common/UserDetails/UserDetails";
import EnterAdditionalData from "./EnterAdditionalData/EnterAdditionalData";
import PrepQuestionnaireInPage from "./PrepareQuestionnaire/PrepQuestionnaireInPage/PrepQuestionnaireInPage";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { fetchMyCollaboratorsAsLP } from "../../actions/align/posts/fetchMyCollaboratorsAsLP";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../constants/auth";
import { getNworxUser } from "../../actions/auth/fetchNworxUser";
import { FetchadditionalResource } from "../../actions/quickPrep/wp-cpMapping";
import AdditinalResoucePopUp from "../QuickPreparation/QuickPreparationPrepare/AdditionalResourcePopUp";
import AIPrepQuestionnaireInPage from "./PrepareQuestionnaire/PrepQuestionnaireInPage/AIPrepQuestionnaireInPage";
const drawerWidth = 250;
var accordName = "";

const mileLocationIndex = [ "one", "two", "three", "four", "five", "six" ];

const subMileLocationIndexMap = {
  one: [ "one", "two", "three" ],
  two: [ "four", "five", "six" ],
  three: [ "seven", "eight", "nine" ],
  four: [ "ten", "elvn", "twel" ],
  five: [ "trtn", "frtn", "fvtn" ],
  six: [ "sxtn", "svtn", "egtn" ],
};

const DISPLAY_MODES = {
  MILE_MARKERS: "MILE_MARKERS",
  QUESTIONNAIRE: "QUESTIONNAIRE",
  AI_WORKSHEET: "AI_WORKSHEET"

};

const Prepare = () => {
  const router = useRouter();
  const [ ratingValue, setRating ] = useState( 2 );
  const [ showTooltip, setTooltip ] = useState( "default" );
  const [ showPrepQuestionnaire, setPrepQuestionnaire ] = useState( false );
  const [ showPrepSections, setPrepSections ] = useState( "3" );
  const [ worksheetLoading, setWorksheetLoading ] = useState( false );
  const [ employeeEmail, setEmployeeEmail ] = useState<string>( "" );
  const [ displayMode, setDisplayMode ] = useState<any>( DISPLAY_MODES.AI_WORKSHEET );
  const worksheetId = router?.query?.worksheetId;
  const goalId = router?.query?.goalId;
  const milestoneId = router?.query?.milestoneId;
  const methodId = router?.query?.methodId;
  const methodType = router?.query?.methodType;
  const [ pickWorksheetFrom, setPickWorksheetFrom ] = useState(
    router?.query?.pickWorksheetFrom
  );
  const milestoneName = router?.query?.milestoneName;
  const [ userWorksheetId, setUserWorksheetId ] = useState( "" );
  const [ worksheet, setWorksheet ] = useState<any>( null );
  const [ currentPanel, setCurrentPanel ] = useState( "panel1" );
  const [ additionalResource, setAdditionalResource ] = useState<any>( null );
  const [ additionResourcePopUp, setAdditionResourcePopUp ] = useState( false );
  const [ collaborators, setCollaborators ] = useState<any>( null );
  const [ employeeData, setEmployeeData ] = useState<any>( null );
  const [ shareManager, setShareManager ] = useState<any>( null );

  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  //@ts-ignore
  const program = useSelector( ( state ) => state?.user?.program );
  const organisationId = user.organisationId;
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  //@ts-ignore
  const roleBasedAccess = useSelector( ( state ) => state?.auth?.roleBasedAccess );
  const permissions =
    roleBasedAccess?.[ currentUserRole ]?.permissions?.PREPARATION || [];
  const canEdit = permissions.includes( "EDIT" );

  const [ unsavedChanges, setUnsavedChanges ] = useState( false );

  console.log( "123456789 inside prep" );

  console.log(
    "roleBasedAccess?.[currentUserRole]?.permissions 123456789 ",
    roleBasedAccess?.[ currentUserRole ]?.permissions
  );

  useEffect( () => {
    const warningText =
      "You have unsaved changes - are you sure you wish to leave this page?";
    const handleWindowClose = ( e: BeforeUnloadEvent ) => {
      if ( !unsavedChanges ) return;
      e.preventDefault();
      return ( e.returnValue = warningText );
    };
    const handleBrowseAway = () => {
      if ( !unsavedChanges ) return;
      if ( window.confirm( warningText ) ) {
        setUnsavedChanges( false );
        return;
      }
      router.events.emit( "routeChangeError" );
      throw "routeChange aborted.";
    };
    window.addEventListener( "beforeunload", handleWindowClose );
    router.events.on( "routeChangeStart", handleBrowseAway );
    return () => {
      window.removeEventListener( "beforeunload", handleWindowClose );
      router.events.off( "routeChangeStart", handleBrowseAway );
    };
  }, [ router.events, unsavedChanges ] );
  useEffect( () => {
    const getMyCollaborators = async () => {
      try {
        const response = await fetchMyCollaboratorsAsLP( { userId: user?.id } );
        if ( response ) {
          //@ts-ignore
          const filteredCollaborators = response?.filter(
            ( collaborator: any ) => {
              //@ts-ignore
              if ( program?.configMap?.enableManagerPrepRating ) {
                return (
                  collaborator.collaboratorRole === "MANAGER" ||
                  collaborator.collaboratorRole === "EXPERT"
                );
              } else {
                return collaborator.collaboratorRole === "EXPERT";
              }
            }
          );
          setCollaborators( filteredCollaborators );
        }
      } catch ( error ) {
        console.log( error );
      }
    };
    getMyCollaborators();
  }, [ user?.id ] );
  useEffect( () => {
    if ( router?.query?.employeeEmail ) {
      //@ts-ignore
      setEmployeeEmail( router?.query?.employeeEmail );
    }
  }, [ router?.isReady ] );
  useEffect( () => {
    if ( worksheet?.aiWorksheet ) {
      setDisplayMode( DISPLAY_MODES.AI_WORKSHEET );
    } else {
      setDisplayMode( DISPLAY_MODES.QUESTIONNAIRE );
    }
  }, [ worksheet?.aiWorksheet ] );

  console.log( displayMode, "displayMode" );

  useEffect( () => {
    if ( router?.query?.pickWorksheetFrom ) {
      setPickWorksheetFrom( router?.query?.pickWorksheetFrom );
    }
  }, [ router?.query?.pickWorksheetFrom ] );

  useEffect( () => {
    // CHECK IF USER WORKSHEET EXISTS AND FETCH THAT INSTEAD OF WORKSHEET
    // MAINTAIN STATE IF FRESH OR USER WORKSHEET
    let instance: any = null;
    const getWorksheet = async () => {
      setWorksheetLoading( true );
      console.log( "pickWorksheetFrom : ", pickWorksheetFrom );
      let parsedResponse: any;
      try {
        if ( pickWorksheetFrom === "user_work_sheet" ) {
          instance = await fetchUserWorksheetByStreaming( {
            worksheetId: userWorksheetId ? userWorksheetId : worksheetId,
          } );
          instance.on( "data", function ( response: any ) {
            console.log( "DATA PREPARE", response );
            parsedResponse = JSON.parse( response?.array?.[ 0 ] );
            console.log( "dataadsd:  ", parsedResponse );
            setWorksheet( parsedResponse?.response );
            setShareManager( parsedResponse?.response?.shareWithManager );
            setUserWorksheetId( parsedResponse?.response?.id );
          } );

          // const response = await fetchUserWorksheet({ worksheetId });
          if ( parsedResponse?.response ) {
            console.log( parsedResponse?.response, "adityaworkseet" );

            setWorksheet( parsedResponse?.response );
            //@ts-ignore
            setUserWorksheetId( parsedResponse?.response?.id );
          }
          setWorksheetLoading( false );
          return { instance, unmount: true };
        }

        if ( pickWorksheetFrom === "work_sheet" ) {
          const response = await fetchWorksheet( {
            worksheetId,
          } );
          console.log( "pickWorksheetFrom : response ", response );
          if ( response ) {
            setWorksheet( response );
            const newGeneratedId = new Date().getTime();
            setUserWorksheetId( newGeneratedId.toString() );
          }
        }
        setWorksheetLoading( false );
      } catch ( error ) {
        console.log( error );
        setWorksheetLoading( false );
      }
    };
    getWorksheet();
    return () => {
      if ( instance ) {
        instance?.cancel();
      }
    };
  }, [ router.isReady, worksheetId, pickWorksheetFrom ] );
  const [ id, setId ] = useState( router?.query?.id )
  useEffect( () => {
    const getAdditionalResource = async () => {
      try {
        const result = await FetchadditionalResource( {
          id,
          organisationId,
        } );
        //@ts-ignore
        if ( result !== null ) {
          console.log( result, "mapping api called data" );
          //@ts-ignore
          setAdditionalResource( result );
        }
      } catch ( error ) {
        console.log( error );
      }
    };
    // if()
    getAdditionalResource();
  }, [ id, router.isReady, organisationId ] );
  console.log( "worksheet : ", worksheet );

  const closePopup = ( value: any ) => {
    setPrepQuestionnaire( value );
    accordName = "";
  };

  const openQuestionnairePopup = ( value: any ) => {
    setPrepQuestionnaire( value );
  };
  const closeAdditionalResourcePopUp = ( value: any ) => {
    setAdditionResourcePopUp( value );
  };
  const onClickAdditionalResource = () => {
    console.log( additionalResource, "6269" );
    setAdditionResourcePopUp( true );
  };
  useEffect( () => {
    setPrepSections( "6" );
  }, [] );

  const viewQuestionnaire = ( accordionName: any ) => {
    console.log( "view questionnaire accordion name", accordionName );
    accordName = accordionName;
    setCurrentPanel( accordionName );
    setPrepQuestionnaire( true );
  };
  const onSetUnsavedChanges = ( newVal: any ) => {
    console.log( "called save" );
    setUnsavedChanges( newVal );
  };
  // FETCH EMPLOYEE DETAILS
  useEffect( () => {
    const fetchNworxUser = async () => {
      try {
        if ( employeeEmail ) {
          const response = await getNworxUser( employeeEmail );
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
  }, [ employeeEmail, router?.isReady ] );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Prep Work</title>
        </Helmet>
      </HelmetProvider>
      <HeaderNav />
      <Box
        component="main"
        sx={ {
          width: { tablet: `calc(100% - ${ drawerWidth }px)` },
          ml: { tablet: "auto" },
          marginLeft: "250px",
        } }
      >
        <Box sx={ { backgroundColor: "#EAECEF", padding: "112px 32px 32px" } }>
          { employeeEmail ? (
            <>
              <UserDetails employeeData={ employeeData } />
              <br />
            </>
          ) : null }
          <Box className="prep_head_box">
            <Stack className="prep_head_flex">
              <Stack className="prep_title_box">
                <Typography
                  onClick={ () => router.back() }
                  sx={ { width: "20px" } }
                >
                  <ChevronLeftIcon />
                </Typography>
                <Typography className="prep_tile">
                  Prepare for the Milestone
                </Typography>
              </Stack>
              <Stack className="prep_head_right">
                {/* <Stack className="setting_flex">
                  <Typography className="setting_title">
                    The data you save can be accessed by NWORX experts and
                    managers
                  </Typography>
                  <Stack className="setting_icon_flex">
                    <SettingsOutlinedIcon sx={{ color: "#2E5DB0" }} />
                    <Typography className="setting_icon_label">
                      Permission settings
                    </Typography>
                  </Stack>
                </Stack> */}
                {/* <EnterAdditionalData /> */ }
              </Stack>
            </Stack>
          </Box>
          <Box className="prep_container">
            <Stack className="mile_goal_flex">
              <Box>
                <img
                  src="/images/milestone.png"
                  alt="milestone"
                  width={ 50 }
                  height={ 58 }
                ></img>
              </Box>
              <Box>
                <Typography className="prep_goal_title">
                  { milestoneName }
                </Typography>
              </Box>
            </Stack>
            <Stack className="rating_flex">
              <Box className="prep_score_box">
                <Typography className="prep_score_text">
                  Progress: { worksheet?.progressPercentage || 0 }%
                </Typography>
              </Box>
              { additionalResource?.length !== 0 && (
                <Typography
                  className="prep_adtnl_rsrc"
                  onClick={ () => onClickAdditionalResource() }
                >
                  Learning Resources
                </Typography>
              ) }
            </Stack>
            <Box className="roadmap_pb_box">
              <LinearProgress
                variant="determinate"
                value={ worksheet?.progressPercentage || 0 }
                className="prep_pb"
                sx={ {
                  height: "16px",
                  borderRadius: "22px",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#F58A43",
                    borderRadius: "22px",
                  },
                } }
              />
            </Box>
            <Box
              className="roadmap_container"
              sx={ {
                height:
                  showPrepSections === "3"
                    ? "800px"
                    : showPrepSections === "4"
                      ? "1130px"
                      : showPrepSections === "5"
                        ? "1390px"
                        : showPrepSections === "6"
                          ? "auto"
                          : "800px",
                overflow: "hidden",
              } }
            >
              { displayMode === DISPLAY_MODES.AI_WORKSHEET ? (
                <AIPrepQuestionnaireInPage
                  preparePage={ true }
                  closePopup={ closePopup }
                  open={ { showPrepQuestionnaire, accordName } }
                  openQuestionnairePopup={ openQuestionnairePopup }
                  worksheet={ worksheet }
                  goalId={ goalId }
                  milestoneId={ milestoneId }
                  // milestoneId={TEMP_MILESTONE_ID}
                  methodId={ methodId }
                  methodType={ methodType }
                  worksheetId={ worksheetId }
                  pickWorksheetFrom={ pickWorksheetFrom }
                  userWorkSheetId={ userWorksheetId }
                  viewQuestionnaire={ viewQuestionnaire }
                  currentPanel={ currentPanel }
                  setCurrentPanel={ setCurrentPanel }
                  setPickWorksheetFrom={ setPickWorksheetFrom }
                  displayMode={ displayMode }
                  setDisplayMode={ setDisplayMode }
                  DISPLAY_MODES={ DISPLAY_MODES }
                  collaborators={ collaborators }
                  employeeData={ employeeData }
                  pageType={ "PREPARATION" }
                  canEdit={ canEdit }
                  unsavedChanges={ unsavedChanges }
                  onSetUnsavedChanges={ onSetUnsavedChanges }
                  shareManager={ shareManager }
                  setShareManager={ setShareManager }
                />
              ) : null }
              { displayMode === DISPLAY_MODES.MILE_MARKERS ? (
                <>
                  {/* <Box className="mile_rating_box">
                    <Typography
                      component="legend"
                      className="mile_rating_title"
                    >
                      Milestone stars
                    </Typography>
                    <Rating
                      name="rating"
                      value={ratingValue}
                      onChange={(event, newValue) => {
                        //@ts-ignore
                        setRating(newValue);
                      }}
                    />
                  </Box> */}
                  <Box className="roadmap_img_box">
                    { " " }
                    { worksheetLoading ? (
                      <Spinner />
                    ) : (
                      <>
                        <img
                          src="/images/roadmap.png"
                          width="100%"
                          height="100%"
                          alt="roadmap"
                        ></img>
                        { worksheet &&
                          worksheet?.sections?.map(
                            ( section: any, index: number ) => {
                              return (
                                <MileLocator
                                  section={ section }
                                  key={ index }
                                  mileLocationCssName={ mileLocationIndex[ index ] }
                                  subMileLocationIndexMap={
                                    subMileLocationIndexMap
                                  }
                                  index={ index }
                                  worksheet={ worksheet }
                                  showPrepQuestionnaire={ showPrepQuestionnaire }
                                  setPrepQuestionnaire={ setPrepQuestionnaire }
                                  accordName={ accordName }
                                  viewQuestionnaire={ viewQuestionnaire }
                                  pickWorksheetFrom={ pickWorksheetFrom }
                                  displayMode={ displayMode }
                                  setDisplayMode={ setDisplayMode }
                                  DISPLAY_MODES={ DISPLAY_MODES }
                                />
                              );
                            }
                          ) }
                      </>
                    ) }
                  </Box>
                </>
              ) : null }
              { displayMode === DISPLAY_MODES.QUESTIONNAIRE ? (
                <PrepQuestionnaireInPage
                  preparePage={ true }
                  closePopup={ closePopup }
                  open={ { showPrepQuestionnaire, accordName } }
                  openQuestionnairePopup={ openQuestionnairePopup }
                  worksheet={ worksheet }
                  goalId={ goalId }
                  milestoneId={ milestoneId }
                  // milestoneId={TEMP_MILESTONE_ID}
                  methodId={ methodId }
                  methodType={ methodType }
                  worksheetId={ worksheetId }
                  pickWorksheetFrom={ pickWorksheetFrom }
                  userWorkSheetId={ userWorksheetId }
                  viewQuestionnaire={ viewQuestionnaire }
                  currentPanel={ currentPanel }
                  setCurrentPanel={ setCurrentPanel }
                  setPickWorksheetFrom={ setPickWorksheetFrom }
                  displayMode={ displayMode }
                  setDisplayMode={ setDisplayMode }
                  DISPLAY_MODES={ DISPLAY_MODES }
                  collaborators={ collaborators }
                  employeeData={ employeeData }
                  pageType={ "PREPARATION" }
                  canEdit={ canEdit }
                  unsavedChanges={ unsavedChanges }
                  onSetUnsavedChanges={ onSetUnsavedChanges }
                  shareManager={ shareManager }
                  setShareManager={ setShareManager }
                />
              ) : null }

            </Box>
          </Box>
        </Box>
      </Box>
      <AdditinalResoucePopUp
        open={ additionResourcePopUp }
        closePopup={ closeAdditionalResourcePopUp }
        additionalResource={ additionalResource }
      />
    </>
  );
};
export default Prepare;
