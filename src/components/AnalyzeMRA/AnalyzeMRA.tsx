import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
// import { DatePicker, LocalizationProvider } from "@mui/lab";
// import AdapterDayjs from "@mui/lab/AdapterDayjs";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddNewPerson from "./AddNewPerson";
import { fetchMRADetails } from "../../actions/mra/fetchMRADetails";
import { useSelector } from "react-redux";
import { describe } from "node:test";
import { Description, Margin } from "@mui/icons-material";
import { fetchAllChatUsersFromOrg } from "../../actions/chat/fetchAllChatUserFromOrg";
import { AddAssessor } from "./AddAssessor";
import { Any } from "@grpc/grpc-js/build/src/generated/google/protobuf/Any";
import { updateMRAAssessor } from "../../actions/mra/updateMRAAssessor";
import { scheduleMRA } from "../../actions/mra/scheduleMRA";
import { toast } from "react-toastify";
// import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { updateAssessee } from "../../actions/mra/updateAssessee";
import { useRouter } from "next/router";
// import AdapterDayjs from "@mui/lab/AdapterDayjs";

const drawerWidth = 250;

const AanalyzeMRA = () => {
  const router = useRouter();
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const [ isReadMore, setIsReadMore ] = useState( true );
  const [ showAddNewPerson, setAddNewPerson ] = useState( false );
  const [ mraDetails, setMraDetails ] = useState<any>( null );
  const [ orgMembers, setOrgMembers ] = useState<any>( null );
  const [ addDialog, setAddDialog ] = useState( false );
  const [ currentAssessor, setCurrentAssessor ] = useState<Map<any, any>>(
    new Map()
  );
  const [ searchQuery, setSearchQuery ] = useState( "" );
  const [ filteredMembers, setFilteredMembers ] = useState( orgMembers );
  const [ currentMember, setCurrentMember ] = useState<any>( null );
  const [ orgRoleMap, setOrgRoleMap ] = useState<Map<any, any>>( new Map() );
  const [ message, setMessage ] = useState<any>( "" );
  const [ clicked, setClicked ] = useState( false );
  dayjs.extend( customParseFormat );
  const [ perMsgForUser, setPerMsgForUser ] = useState<Map<any, any>>( new Map() );
  const [ startDate, setStartDate ] = useState( dayjs() );
  const [ endDate, setEndDate ] = useState( dayjs().add( 10, "day" ) );
  const [ personalizedMsgArray, setPersonalizedMsgArray ] = useState<any>( [] );
  const [ labelRole, setLabelRole ] = useState<Map<any, any>>( new Map() );
  const [ dateSeted, setDateSeted ] = useState( false );
  const [ scheduled, setScheduled ] = useState( false );
  const [ currentRole, setCurrentRole ] = useState<any>( -1 );

  const toggleReadMore = () => {
    setIsReadMore( !isReadMore );
  };

  const handleAddNewPerson = () => {
    setAddNewPerson( true );
  };

  const closePopup = ( value: any ) => {
    setAddNewPerson( value );
  };
  const handleEndDateChange = ( newValue: any ) => {
    if ( dayjs( newValue ).isAfter( startDate ) ) {
      setEndDate( newValue );
    } else {
      toast.error( "End date must be After Start Date" );
    }
  };
  //function for Handling Personal Message TextFeild
  const handlePerMsgChange = ( role: any, event: any ) => {
    console.log( role, event, "revent" );
    let tempMap = new Map( perMsgForUser );
    tempMap.set( role, event?.target?.value );
    console.log( tempMap, "setting map" );
    setPerMsgForUser( tempMap );
    console.log( perMsgForUser, "revent" );
  };

  const handleChangeInCurrentAssessor = async ( e: any, obj: any, index: number ) => {
    console.log( obj, "initial satge" );
    // console.log(e, obj, "eobj");
    setCurrentRole( index );
    const selectedOption = e.target.value;
    const newEnable = !currentAssessor.get( selectedOption )?.enable;
    console.log( selectedOption, "selected" );
    const response = await updateAssessee( {
      userId: user?.id,
      mraId: mraDetails?.id,
      role: selectedOption,
      enable: obj.enable ? false : true,
    } );
    //@ts-ignore
    if ( response?.statusCode === 7 ) {
      //@ts-ignore
      toast.error( response?.extra );
    }
    //@ts-ignore
    setMraDetails( response?.response );
    //@ts-ignore
    if ( response?.statusCode === 0 ) {
      if ( obj?.role === "SELF" ) {
        const response = await updateMRAAssessor( {
          userId: user?.id,
          mraId: mraDetails?.id,
          assessorId: user?.id,
          role: "SELF",
          status: obj?.enable ? "REMOVED" : "ADDED",
        } );
        //  console.log(response,"aditya1234");
        //@ts-ignore
        if ( response?.statusCode === 7 ) {
          //@ts-ignore
          toast.error( response?.extra );
        }
        //@ts-ignore
        setMraDetails( response?.response );
      }
    }
    setCurrentRole( -1 );
    toast.success( "Preferences Updated" );

  };

  // checking if mra is scheduled
  useEffect( () => {
    if ( mraDetails?.status === "SCHEDULED" ) {
      setScheduled( true );
    } else {
      setScheduled( false );
    }
  }, [ mraDetails ] );
  //setMradetails
  const setMraDetailsHandle = ( e: any ) => {
    setMraDetails( e );
  };

  // const mraId = "0kmbnYY8AArJHqb2URli";
  const mraId = router?.query?.id;

  console.log( orgMembers, "members" );
  useEffect( () => {
    if ( orgMembers !== null ) {
      let tempOrgMap = new Map();
      orgMembers.map( ( member: any ) => {
        tempOrgMap.set( member?.id, member );
      } );
      console.log( tempOrgMap, "orgMap" );
      setOrgRoleMap( tempOrgMap );
    }
  }, [ orgMembers ] );

  console.log( "mra details", mraDetails );

  const handelClick = ( e: any ) => {
    setCurrentMember( e );
    setAddDialog( true );
  };

  const handleOpenAddDialog = () => {
    setAddDialog( !addDialog );
  };
  // let clicked = 0;

  // const personalizedMsgArray = Array.from(personalizedMsg);
  console.log( personalizedMsgArray, "personalizedMsg" );

  const handleScheduleClick = async () => {
    console.log( perMsgForUser, "calling schedule" );
    const response = await scheduleMRA( {
      userdId: user?.id,
      mraId: mraDetails?.id,
      //@ts-ignore
      startDate: new Date( startDate ).getTime(),
      //@ts-ignore
      endDate: new Date( endDate ).getTime(),
      generalMessage: message,
      personalMsgs: perMsgForUser,
    } );
    //@ts-ignore
    if ( response?.statusCode === 7 ) {
      //@ts-ignore
      toast.error( response?.extra );
      return;
    }
    //@ts-ignore
    toast.success( "Succesfully scheduled feedback" );
    router.back();
  };

  const handleInputChange = ( e: any ) => {
    setMessage( e.target.value );
  };

  const handleAddDialog = async ( role: any, value: any ) => {
    setAddDialog( !addDialog );
    if (
      value?.assessors?.filter(
        ( assessor: any ) => assessor?.status !== "REMOVED"
      ).length >= value?.maxAllowed
    ) {
      toast.warning( "Maximum limit exceeded" );
      return;
    }
    const response = await updateMRAAssessor( {
      userId: user?.id,
      mraId: mraDetails?.id,
      assessorId: currentMember?.id,
      role: role,
      status: "ADDED",
    } );
    //@ts-ignore
    if ( response?.statusCode === 7 ) {
      //@ts-ignore
      toast.error( response?.extra );
    }
    //@ts-ignore
    setMraDetails( response?.response );
  };

  //handleing crossClick in add person
  const handleCrossClick = async ( role: any, assessor: any ) => {
    const response = await updateMRAAssessor( {
      userId: user?.id,
      mraId: mraDetails?.id,
      assessorId: assessor?.assessorUserId,
      role: role?.role,
      status: "REMOVED",
    } );
    //@ts-ignore
    if ( response?.statusCode === 7 ) {
      //@ts-ignore
      toast.error( response?.extra );
    }
    //@ts-ignore
    setMraDetails( response?.response );
    setClicked( !clicked );
  };

  // function for seting mraDetails
  useEffect( () => {
    const getMraDetails = async () => {
      const response = await fetchMRADetails( {
        mraId: mraId,
        userId: user?.id,
      } );
      const orgMembers: any = await fetchAllChatUsersFromOrg( {
        orgId: user?.organisationId,
      } );
      console.log( orgMembers, "members" );
      if ( response ) {
        setMraDetails( response );
        //@ts-ignore
        setMessage( response?.generalMessage );
        let perMsgMap = new Map();
        //@ts-ignore
        response?.assessingRoles?.map( ( role: any ) => {
          if ( role?.role !== "SELF" ) {
            perMsgMap.set( role?.role, role?.personalMessage );
          }
        } );
        setPerMsgForUser( perMsgMap );

      }
      if ( orgMembers ) {
        // const filteredMember
        setOrgMembers( orgMembers );
      }
    };
    getMraDetails();
  }, [ mraId, user?.id ] );

  // for seting personal message from mraDetails
  useEffect( () => {
    let tempPersonalizedMsgArray: any = [];
    let tempLabelMap = new Map();
    mraDetails?.assessingRoles
      ?.filter( ( role: any ) => role?.role !== "SELF" && role?.enable )
      .map( ( role: any ) => {
        tempPersonalizedMsgArray.push( role?.role );
        tempLabelMap.set( role?.role, role?.label );
      } );

    setPersonalizedMsgArray( tempPersonalizedMsgArray );
    setLabelRole( tempLabelMap );
  }, [ mraDetails ] );
  console.log( labelRole, "tempPersonalized" );
  // for handling search in orgMember
  useEffect( () => {
    if ( searchQuery.trim() === "" ) {
      setFilteredMembers( orgMembers );
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = orgMembers.filter( ( member: any ) =>
        member.name.toLowerCase().includes( query )
      );
      setFilteredMembers( filtered );
    }
  }, [ searchQuery, orgMembers ] );

  //for Handling personal message for roles
  // useEffect(() => {
  //   setMessage(mraDetails?.generalMessage);
  //   let perMsgMap = new Map();
  //   mraDetails?.assessingRoles?.map((role: any) => {
  //     if (role?.role !== "SELF") {
  //       perMsgMap.set(role?.role, role?.personalMessage);
  //     }
  //   });
  //   setPerMsgForUser(perMsgMap);
  // }, [mraDetails]);
  // useEffect(()=>{
  //   if(mraDetails?.startDate!==null){
  //     setDateSeted(true);
  //   }
  // },[mraDetails])
  //for handling current Assessor and seting it
  useEffect( () => {
    console.log( mraDetails, "usemap" );
    const setCurrentAssessorMap = () => {
      let assessorMap = new Map();
      mraDetails?.assessingRoles?.map( ( role: any, index: any ) => {
        if ( role?.assessors?.length > 0 ) {
          assessorMap.set( role?.role, role );
        }
      } );
      setCurrentAssessor( assessorMap );
    };
    setCurrentAssessorMap();
    if ( mraDetails?.startDate !== undefined && mraDetails?.startDate !== null && mraDetails?.endDate !== undefined && mraDetails?.endDate !== null ) {

      setStartDate( dayjs( mraDetails?.startDate ) );
      setEndDate( dayjs( mraDetails?.endDate ) );
    }
  }, [ mraDetails ] );
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | MRA</title>
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
        <Box
          sx={ { backgroundColor: "#EAECEF", padding: "112px 32px 32px" } }
          className="analyze_mra"
        >
          <Typography
            //@ts-ignore
            variant="span"
            sx={ {
              fontWeight: "500",
              color: "#2D3648",
              marginBottom: "24px",
              cursor: "pointer",
            } }
            className="go_back_flex"
            onClick={ () => router.back() }
          >
            <ChevronLeftIcon /> Go Back
          </Typography>
          <Box className="mra_header">
            <Typography
              variant="h1"
              sx={ { fontWeight: "700", color: "#1C2129" } }
              className="dash_title mra_title"
            >
              { mraDetails?.name }
            </Typography>
            <Typography className="mra_subtext">
              { isReadMore
                ? mraDetails?.description?.length > 200
                  ? mraDetails?.description?.slice( 0, 200 ) + "..."
                  : mraDetails?.description
                : mraDetails?.description }
              { mraDetails?.description?.length > 300 ? (
                <span className="mra_subtext_readmr" onClick={ toggleReadMore }>
                  { isReadMore ? " Read more" : " Read less" }
                </span>
              ) : (
                ""
              ) }
            </Typography>
            <Stack className="mra_survey_dtls">
              <Typography className="mra_survey_quests_title">
                Questions:{ " " }
                <span className="mra_survey_quests_cntnt">
                  { mraDetails?.questionRange }
                </span>
              </Typography>
              <Typography className="mra_survey_durtn_title">
                Duration:{ " " }
                <span className="mra_survey_durtn_cntnt">
                  { mraDetails?.duration } { " " } minutes
                </span>
              </Typography>
            </Stack>
          </Box>
          <Box className="mra_survey_fill_contr">
            <Box className="mra_survey_fill_header">
              <Typography className="mra_survey_fill_title">
                Who should take the survey?
              </Typography>
              {/* <Typography className="mra_survey_msg">
                *Note - Select one more option along with “Myself” to proceed
                further
              </Typography> */}
            </Box>
            <Box className="mra_survey_fill_checkbx">
              <FormControl>
                <FormGroup className="mra_survey_chckbx_flx">
                  { mraDetails?.assessingRoles?.map(
                    ( role: any, index: number ) => {
                      return (
                        // console.log(role,"roleee")
                        <FormControlLabel
                          key={ index }
                          control={
                            <Checkbox
                              checked={ role?.enable }
                              value={ role?.role }
                              onChange={ ( event: any ) =>
                                handleChangeInCurrentAssessor( event, role, index )
                              }
                              disabled={ currentRole !== -1 }
                            />
                          }
                          label={ role?.label === "My Self" ? "Self" : role?.label }
                        />
                      );
                    }
                  ) }

                  {/* <FormControlLabel control={<Checkbox />} label="Manager" />
                  <FormControlLabel control={<Checkbox />} label="Peers" />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Direct reportees"
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Stakeholders"
                  />
                  <FormControlLabel control={<Checkbox />} label="Others" /> */}
                </FormGroup>
              </FormControl>
              {/* <Typography className="mra_survey_msg">
                ! Error message - Select one more option along with “Myself” to
                proceed further
              </Typography> */}
            </Box>
            {/* <Typography className="mra_view_quests">
              View Question's that will be presented
            </Typography> */}
          </Box>
          {/*<Box className="mra_add_cntxtmsg_contr">
            <Typography className="mra_add_cntxtmsg_title">
              Add context message / reason
            </Typography>
            <TextField
              placeholder="Type Message..."
              variant="outlined"
              size="small"
              fullWidth
              inputProps={ {
                sx: { fontSize: "16px", color: "#1C2129" },
              } }
              value={ message }
              onChange={ handleInputChange }
            />
            <Typography
              className="mra_add_persnlmsg_title"
              sx={ { marginTop: "20px" } }
            >
              Add personalized message
            </Typography>
            { personalizedMsgArray?.map( ( perMessage: any, index: any ) => {
              return (
                <Box
                  key={ index }
                  className="mra_add_persnlmsg_contr"
                  sx={ {
                    marginTop: "15px",
                    display: "flex",
                    alignItems: "center",
                  } }
                >
                  <Typography
                    className="mra_send_msg_to"
                    sx={ { marginRight: "40px", width: "170px" } }
                  >
                    { labelRole.get( perMessage ) } :
                  </Typography>
                  <TextField
                    placeholder="Type Message..."
                    variant="outlined"
                    size="small"
                    fullWidth
                    inputProps={ {
                      sx: { fontSize: "16px", color: "#1C2129" },
                    } }
                    sx={ { alignContent: "right" } }
                    value={
                      perMsgForUser.has( perMessage )
                        ? perMsgForUser.get( perMessage )
                        : ""
                    }
                    onChange={ ( e: any ) => handlePerMsgChange( perMessage, e ) }
                  />
                </Box>
              );
            } ) }
          </Box>*/}

          <Box className="mra_survey_duration_contr">
            <Typography className="mra_duration_title">
              Select Duration
            </Typography>
            <Stack className="mra_date_contr">
              <Stack className="mra_date_flex">
                <Typography className="mra_date_text">From</Typography>
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
                    value={ startDate }
                    onChange={ ( newValue: any ) => {
                      console.log( newValue, "new date value" );
                      if ( newValue ) {
                        let selectedDate = new Date( newValue );
                        let date = new Date();
                        date.setDate( date.getDate() - 1 );
                        if ( date.getTime() <= selectedDate.getTime() ) {
                          setStartDate( newValue );
                        } else {
                          toast.error(
                            "You have selected a date before today. Please select a future date.",
                            { toastId: "INVALID_DATE_ADD_PURPOSE_MODAL" }
                          );

                          return;
                        }
                      }
                    } }
                  />
                </LocalizationProvider>
              </Stack>
              <Stack className="mra_todate_contr">
                <Stack className="mra_date_flex">
                  <Typography className="mra_date_text">To</Typography>
                  <LocalizationProvider dateAdapter={ AdapterDayjs }>
                    <DatePicker
                      sx={ { width: "100%" } }
                      format="DD-MM-YYYY"
                      disablePast={ true }
                      slotProps={ {
                        textField: {
                          id: "endDate",
                        },
                      } }
                      value={ endDate }
                      onChange={ ( newValue: any ) => handleEndDateChange( newValue ) }
                    // onChange={(newValue:any) =>{console.log(newValue, "new date value");
                    // if (newValue) {
                    //   let selectedDate = new Date(newValue);
                    //   let date = startDate;
                    //   date.setDate(date.getDate() - 1);
                    //   if (date.getTime() <= selectedDate.getTime()) {
                    //     setEndDate(newValue);
                    //   } else {
                    //     toast.error(
                    //       "You have selected a date before today. Please select a future date.",
                    //       { toastId: "INVALID_DATE_ADD_PURPOSE_MODAL" }
                    //     );
                    //     setStartDate(null);
                    //     return;
                    //   }
                    // }}}
                    />
                  </LocalizationProvider>
                </Stack>
                {/* <Typography className="mra_view_quests">
                  Add Reminder
                </Typography> */}
              </Stack>
            </Stack>
          </Box>
          <Box className="mra_add_people_contr">
            <Typography className="mra_addppl_title">Add People</Typography>
            <Typography className="mra_addppl_subtext">
              Click + and select the level of the person and then add it to the
              left column
            </Typography>
            <Stack className="mra_addppl_flex">
              <Box className="mra_addppl_left_contr">
                <TextField
                  id="search"
                  placeholder="Search by"
                  variant="outlined"
                  size="small"
                  fullWidth
                  inputProps={ {
                    sx: {
                      fontSize: "16px",
                      color: "#3E4248",
                      fontWeight: "500",
                    },
                    className: "serach",
                  } }
                  InputProps={ {
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton
                          aria-label="search"
                          edge="start"
                          size="small"
                        >
                          <SearchIcon sx={ { color: "#989EA5" } } />
                        </IconButton>
                      </InputAdornment>
                    ),
                  } }
                  sx={ {
                    "& ::placeholder": { color: "#999CA0", opacity: "1" },
                  } }
                  className="search_field"
                  value={ searchQuery }
                  onChange={ ( e ) => setSearchQuery( e.target.value ) }
                />
                <Box className="mra_remngppl_contr">
                  { filteredMembers?.filter( ( orgMembers: any ) => orgMembers?.name !== user?.name ).map( ( member: any, index: number ) => {
                    return (
                      <Stack className="mra_addppl_flxbx" key={ index }>
                        <Stack className="mra_addppl_innr_flxbx">
                          <Box>
                            <Avatar
                              sx={ {
                                width: "32px",
                                height: "32px",
                                bgcolor: "#DFFFF2",
                                color: "#1BAD70",
                                fontSize: "16px",
                                fontWeight: "600",
                              } }
                            >
                              { member?.name[ 0 ] }
                            </Avatar>
                          </Box>
                          <Box>
                            <Typography className="mra_add_ppl_name">
                              { member?.name }
                            </Typography>
                            <Typography className="mra_add_ppl_desgn">
                              { member?.designation }
                            </Typography>
                          </Box>
                        </Stack>
                        <Typography
                          className="mra_add_ppl_btn"
                          onClick={ () => handelClick( member ) }
                        >
                          <AddCircleRoundedIcon sx={ { color: "#BFBFBF" } } />
                        </Typography>
                      </Stack>
                    );
                  } ) }
                </Box>
              </Box>
              <Box className="mra_addppl_right_contr">
                <Typography
                  className="mra_view_quests"
                  onClick={ () => handleAddNewPerson() }
                >
                  Add New Person
                </Typography>
                {/* <Stack className="mra_no_addedppl_contr">
                  <Typography className="mra_no_addedppl_text">No one is added, please select<br /> from the left column</Typography>
                </Stack> */}
                <Box className="mra_addedppl_contr">
                  <Stack className="mra_addedppl_header">
                    <Typography className="mra_addedppl_title">
                      Added People
                    </Typography>
                    {/* <Box className="mra_addedppl_err_box">
                      <Stack className="mra_addedppl_err_flx">
                        <Typography className="mra_addedppl_err_msg">
                          Oops!. You can add only 2 respondents, You have
                          reached the limit
                        </Typography>
                        <CloseRoundedIcon
                          sx={{ color: "#5D636B", cursor: "pointer" }}
                        />
                      </Stack>
                    </Box> */}
                  </Stack>
                  {/* {console.log(mraDetails, "mradetails")} */ }
                  { mraDetails && (
                    <Box className="mra_addedppl_box">
                      { mraDetails?.assessingRoles
                        ?.filter(
                          ( role: any ) =>
                            role.role !== "SELF" && role?.enable === true
                        )
                        .map( ( role: any, index: number ) => {
                          return role?.assessors?.length > 0 ? (
                            <Box className="mra_addedmngr_contr">
                              <Stack className="mra_addedmngr_header">
                                <Typography className="mra_addedmngr_title">
                                  { role?.label }
                                </Typography>
                                <Typography className="mra_addedmngr_limit error">
                                  ( Limit { role?.maxAllowed } respondents )
                                </Typography>
                              </Stack>
                              <Divider className="mra_addedppl_hr" />
                              { role?.assessors
                                .filter(
                                  ( assessor: any ) => assessor.status === "ADDED"
                                )
                                .map( ( assessor: any, index: any ) => {
                                  return (
                                    <Stack
                                      className="mra_addppl_flxbx"
                                      key={ index }
                                    >
                                      <Stack className="mra_addppl_innr_flxbx">
                                        <Box>
                                          <Avatar
                                            sx={ {
                                              width: "32px",
                                              height: "32px",
                                              bgcolor: "#DFFFF2",
                                              color: "#1BAD70",
                                              fontSize: "16px",
                                              fontWeight: "600",
                                            } }
                                          >
                                            { assessor?.assessorName[ 0 ] }
                                          </Avatar>
                                        </Box>
                                        <Box>
                                          <Typography className="mra_add_ppl_name">
                                            { assessor?.assessorName }
                                          </Typography>
                                          <Typography className="mra_add_ppl_desgn">
                                            { assessor?.assessorDesignation }
                                          </Typography>
                                        </Box>
                                      </Stack>
                                      <Typography
                                        className="mra_add_ppl_btn"
                                        onClick={
                                          ( ( status = "REMOVED" ),
                                            () =>
                                              handleCrossClick( role, assessor ) )
                                        }
                                      >
                                        <CancelRoundedIcon
                                          sx={ { color: "#BFBFBF" } }
                                        />
                                      </Typography>
                                    </Stack>
                                  );
                                } ) }
                              {/* <Stack className="mra_addppl_flxbx">
                              <Stack className="mra_addppl_innr_flxbx">
                                <Box>
                                  <Avatar
                                    sx={{
                                      width: "32px",
                                      height: "32px",
                                      bgcolor: "#DFFFF2",
                                      color: "#1BAD70",
                                      fontSize: "16px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    R
                                  </Avatar>
                                </Box>
                                <Box>
                                  <Typography className="mra_add_ppl_name">
                                    Radhe Shyam
                                  </Typography>
                                  <Typography className="mra_add_ppl_desgn">
                                    Your Reporting Manager-Marketing
                                  </Typography>
                                </Box>
                              </Stack>
                              <Typography className="mra_add_ppl_btn">
                                <CancelRoundedIcon sx={{ color: "#BFBFBF" }} />
                              </Typography>
                            </Stack> */}
                            </Box>
                          ) : null;
                        } ) }
                      {/* 
                    <Box className="mra_addedpeers_contr">
                      <Stack className="mra_addedmngr_header">
                        <Typography className="mra_addedmngr_title">
                          Peers
                        </Typography>
                        <Typography className="mra_addedmngr_limit">
                          ( Limit 2 respondents )
                        </Typography>
                      </Stack>
                      <Divider className="mra_addedppl_hr" />
                      <Stack className="mra_addppl_flxbx">
                        <Stack className="mra_addppl_innr_flxbx">
                          <Box>
                            <Avatar
                              sx={{
                                width: "32px",
                                height: "32px",
                                bgcolor: "#DFFFF2",
                                color: "#1BAD70",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              M
                            </Avatar>
                          </Box>
                          <Box>
                            <Typography className="mra_add_ppl_name">
                              Mathew Mantis
                            </Typography>
                            <Typography className="mra_add_ppl_desgn">
                              Your Reporting Manager-Marketing
                            </Typography>
                          </Box>
                        </Stack>
                        <Typography>
                          <CancelRoundedIcon sx={{ color: "#BFBFBF" }} className="mra_add_ppl_btn" />
                        </Typography>
                      </Stack>
                      <Stack className="mra_addppl_flxbx">
                        <Stack className="mra_addppl_innr_flxbx">
                          <Box>
                            <Avatar
                              sx={{
                                width: "32px",
                                height: "32px",
                                bgcolor: "#DFFFF2",
                                color: "#1BAD70",
                                fontSize: "16px",
                                fontWeight: "600",
                              }}
                            >
                              R
                            </Avatar>
                          </Box>
                          <Box>
                            <Typography className="mra_add_ppl_name">
                              Radhe Shyam
                            </Typography>
                            <Typography className="mra_add_ppl_desgn">
                              Your Reporting Manager-Marketing
                            </Typography>
                          </Box>
                        </Stack>
                        <Typography>
                          <CancelRoundedIcon sx={{ color: "#BFBFBF" }} className="mra_add_ppl_btn" />
                        </Typography>
                      </Stack>
                    </Box> */}
                    </Box>
                  ) }
                </Box>
              </Box>
            </Stack>
          </Box>
          <Box className="mra_survey_cta">
            <Button
              className="standard_cta"
              onClick={ () => handleScheduleClick() }
            >
              Schedule
            </Button>
          </Box>
        </Box>
      </Box>
      <AddNewPerson
        closePopup={ closePopup }
        open={ showAddNewPerson }
        currentAssessor={ currentAssessor }
        mraDetails={ mraDetails }
        setMraDetailsHandle={ setMraDetailsHandle }
      />
      <AddAssessor
        openAddDialog={ addDialog }
        handleAddDialog={ handleAddDialog }
        mraDetails={ mraDetails }
        handleOpenAddDialog={ handleOpenAddDialog }
        labelRole={ labelRole }
      />
    </>
  );
};
export default AanalyzeMRA;
