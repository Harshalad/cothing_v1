import { useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Button,
  Link,
  TextField,
} from "@mui/material";
import { useRouter } from "next/router";
import { HelmetProvider, Helmet } from "react-helmet-async";
import worksheet from "../../../constants/proto/fetchWorksheet/fetch-work-sheet_grpc_web_pb";
import EnterAdditionalData from "../../Prepare/EnterAdditionalData/EnterAdditionalData";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MileLocator from "../../Prepare/MileLocator/MileLocator";
import PrepQuestionnaireInPage from "../../Prepare/PrepareQuestionnaire/PrepQuestionnaireInPage/PrepQuestionnaireInPage";
import HeaderNav from "../../common/HeaderNav/HeaderNav";
import Spinner from "../../common/Spinner/Spinner";
import UserDetails from "../../common/UserDetails/UserDetails";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { fetchWorksheet } from "../../../actions/prepare/fetchWorksheet";
import { fetchMyCollaboratorsAsLP } from "../../../actions/align/posts/fetchMyCollaboratorsAsLP";
// import fetchRatingRequests from "../../../actions/prepare/rating/fetchRatingRequests";
import { useSelector } from "react-redux";
import { getNworxUser } from "../../../actions/auth/fetchNworxUser";
import { fetchQuickPrepWorksheetByStreaming } from "../../../actions/quickPrep/fetchQuickPrepWorksheetByStreaming";
import { updateWorksheetTitle } from "../../../actions/quickPrep/updateWorksheetTitle";
import { FetchadditionalResource } from "../../../actions/quickPrep/wp-cpMapping";
import AdditinalResoucePopUp from "../../../components/QuickPreparation/QuickPreparationPrepare/AdditionalResourcePopUp";
import { fetchRatingRequestQp } from "../../../actions/quickPrep/rating/fetchRatingRequest";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";

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
};

const QuickPreparationPrepare = () => {
  const router = useRouter();
  const [ ratingValue, setRating ] = useState( 2 );
  const [ showTooltip, setTooltip ] = useState( "default" );
  const [ showPrepQuestionnaire, setPrepQuestionnaire ] = useState( false );
  const [ showPrepSections, setPrepSections ] = useState( "3" );
  const [ worksheetLoading, setWorksheetLoading ] = useState( false );
  const [ displayMode, setDisplayMode ] = useState( DISPLAY_MODES.QUESTIONNAIRE );
  console.log( router, "qprouter" );
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
  const [ ratingRequests, setRatingRequests ] = useState<any>( null );
  const [ collaborators, setCollaborators ] = useState<any>( null );
  const [ customTitle, setCustomTitle ] = useState( "" ); // TODO Integrate API
  const [ editCustomTitle, setEditCustomTitle ] = useState( false );
  const [ additionalResource, setAdditionalResource ] = useState<any>( null );
  const [ additionResourcePopUp, setAdditionResourcePopUp ] = useState( false );
  const [ shareManager, setShareManager ] = useState<any>( null );

  const [ event, setEvent ] = useState( false );
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const organisationId = user.organisationId;
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  //@ts-ignore
  const program = useSelector( ( state ) => state?.user?.program );
  //@ts-ignore
  const roleBasedAccess = useSelector( ( state ) => state?.auth?.roleBasedAccess );
  const permissions =
    roleBasedAccess?.[ currentUserRole ]?.permissions?.PREPARATION || [];
  const canEdit = permissions.includes( "EDIT" );
  console.log( user, event, "userherereherehe" );
  useEffect( () => {
    if ( router?.query?.type === "event" ) {
      setEvent( true );
    }
  }, [ router?.isReady ] )
  let email = router?.query?.employeeEmail;
  console.log( email, "email123" );
  const [ employeeData, setEmployeeData ] = useState<any>( null );
  if ( currentUserRole !== MANAGER_VIEW_STATE.LP ) {
    const fetchNworxUser = async () => {
      try {
        const response = await getNworxUser( email );
        //@ts-ignore
        if ( response?.nWorxUser ) {
          console.log( response, "Success" );
          //@ts-ignore
          setEmployeeData( response.nWorxUser );
        }
      } catch ( error ) {
        console.log( error );
      }
    };
    if ( employeeData === null ) {
      fetchNworxUser();
    }
  }
  console.log( employeeData, router, "empData" );
  useEffect( () => {
    const getRatingRequests = async () => {
      try {
        // if (currentUserRole !== MANAGER_VIEW_STATE.LP) return;
        const response =
          currentUserRole !== MANAGER_VIEW_STATE.LP
            ? await fetchRatingRequestQp( {
              userWorksheetId: userWorksheetId,
              userId: employeeData?.id,
              programId: employeeData?.activeProgramId,
            } )
            : await fetchRatingRequestQp( {
              userWorksheetId: userWorksheetId,
              userId: user?.id,
              programId: user?.activeProgramId,
            } );
        if ( response !== null ) {
          setRatingRequests( response );
        }
      } catch ( error ) {
        console.log( error );
      }
    };
    getRatingRequests();
  }, [ currentUserRole, userWorksheetId ] );

  console.log( ratingRequests, "RATING REQUESTS" );
  console.log( collaborators, "collaborators" );

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
          console.log( user, "user_work_sheet" );
          instance =
            currentUserRole !== MANAGER_VIEW_STATE.LP
              ? await fetchQuickPrepWorksheetByStreaming( {
                worksheetId: userWorksheetId ? userWorksheetId : worksheetId,
                userId: employeeData?.id,
                programId: employeeData?.activeProgramId,
              } )
              : await fetchQuickPrepWorksheetByStreaming( {
                worksheetId: userWorksheetId ? userWorksheetId : worksheetId,
                userId: user?.id,
                programId: user?.activeProgramId,
              } );
          instance.on( "data", function ( response: any ) {
            parsedResponse = JSON.parse( response?.array?.[ 0 ] );
            console.log( "data:  ", parsedResponse );
            setWorksheet( parsedResponse?.response );
            setUserWorksheetId( parsedResponse?.response?.id );
            setShareManager( parsedResponse?.response?.shareWithManager );

          } );

          // const response = await fetchUserWorksheet({ worksheetId });
          if ( parsedResponse?.response ) {
            setWorksheet( parsedResponse?.response );
            //@ts-ignore
            setUserWorksheetId( parsedResponse?.response?.id );
          }
          setWorksheetLoading( false );
        }

        if ( pickWorksheetFrom === "work_sheet" ) {
          const response: any = await fetchWorksheet( {
            worksheetId,
          } );
          console.log( "pickWorksheetFrom : response ", response );
          if ( response ) {
            setWorksheet( response );
            setCustomTitle( event ? `${ response?.name }` : ( `${ response?.name } ${ new Date().toDateString() }` ) );
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
  }, [ router.isReady, worksheetId, pickWorksheetFrom, employeeData ] );

  console.log( worksheet, "user worksheet id" );

  useEffect( () => {
    if ( worksheet?.name ) {
      setCustomTitle( worksheet?.name );
    }
  }, [ worksheet?.name ] );

  const onSaveTitleClick = async () => {
    setEditCustomTitle( false );
    const response = await updateWorksheetTitle( {
      programId: user?.activeProgramId,
      userId: user?.id,
      userWorkSheetId: userWorksheetId,
      worksheetId,
      title: customTitle,
    } );
    console.log( response );
  };

  console.log( worksheet?.name );
  const closePopup = ( value: any ) => {
    setPrepQuestionnaire( value );
    accordName = "";
  };

  const closeAdditionalResourcePopUp = ( value: any ) => {
    setAdditionResourcePopUp( value );
  };

  const openQuestionnairePopup = ( value: any ) => {
    setPrepQuestionnaire( value );
  };

  useEffect( () => {
    setPrepSections( "6" );
  }, [] );
  console.log( worksheet, "currWorksheet" );
  const viewQuestionnaire = ( accordionName: any ) => {
    console.log( "view questionnaire accordion name", accordionName );
    accordName = accordionName;
    setCurrentPanel( accordionName );
    setPrepQuestionnaire( true );
  };

  const onClickAdditionalResource = () => {
    setAdditionResourcePopUp( true );
  };

  // FETCH EMPLOYEE DETAILS
  console.log( employeeData, "employeeData" );
  useEffect( () => {
    const getAdditionalResource = async () => {

      const id = router?.query?.id
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
    if ( !event )
      getAdditionalResource();
  }, [ worksheetId, organisationId ] );
  console.log( user );
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
          { employeeData ? (
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
                <Typography className="prep_tile">{ event ? "Prep" : " Tools" } </Typography>
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
                { ( editCustomTitle && !event ) ? (
                  <Stack flexDirection="row" gap="8px">
                    <TextField
                      id="edit"
                      placeholder="Edit.."
                      variant="outlined"
                      size="small"
                      sx={ { width: "500px" } }
                      fullWidth
                      value={ customTitle }
                      onChange={ ( e ) => setCustomTitle( e.target.value ) }
                      inputProps={ {
                        sx: { fontSize: "16px", color: "#1C2129" },
                      } }
                    />
                    <Button
                      onClick={ () => onSaveTitleClick() }
                      className="standard_cta Qp_edit"
                    >
                      Save
                    </Button>
                  </Stack>
                ) : (
                  <div>
                    <Typography className="prep_goal_title">
                      { customTitle }
                    </Typography>

                    { ( currentUserRole === MANAGER_VIEW_STATE.LP && !event ) ? (
                      <Button
                        onClick={ () => setEditCustomTitle( true ) }
                        className="standard_cta Qp_edit"
                      >
                        Edit
                      </Button>
                    ) : null }
                  </div>
                ) }
              </Box>
            </Stack>
            <Stack className="rating_flex">
              <Box className="prep_score_box">
                <Typography className="prep_score_text">
                  Progress: { worksheet?.progressPercentage || 0 }%
                </Typography>
              </Box>
              { !event && additionalResource?.length !== 0 && (
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
                  preparePage={ false }
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
                  ratingRequests={ ratingRequests }
                  setRatingRequests={ setRatingRequests }
                  employeeData={ employeeData }
                  pageType={ router?.query?.type === "event" ? "EVENT" : "QUICK_PREPARATION" }
                  canEdit={ canEdit }
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

export default QuickPreparationPrepare;
