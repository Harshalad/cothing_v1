import { Box, Stack, Avatar, Typography, Link, Dialog } from "@mui/material";
import { getNworxUser } from "../../../../../actions/auth/fetchNworxUser";
import { useState, useEffect } from "react";
import Spinner from "../../../../common/Spinner/Spinner";
import { NEXT_6_MONTHS_FOCUS_OPTIONS } from "../../../../../constants/profile";
import router from "next/router";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import PreviousActivity from "../../../../Achieve/EmployeeAchieve/PreviousActivity/PreviousActivity";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../../../constants/auth";

const EmployeeDetails = ( { email }: any ) => {
  const [ detailsLoading, setDetailsLoading ] = useState( false );
  const [ userData, setUserData ] = useState<any>( null );
  const [ viewState, setViewState ] = useState( "" );
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  useEffect( () => {
    const fetchNworxUser = async () => {
      try {
        setDetailsLoading( true );
        const response = await getNworxUser( email );
        //@ts-ignore
        if ( response?.nWorxUser ) {
          //@ts-ignore
          setUserData( response.nWorxUser );
        }
        setDetailsLoading( false );
      } catch ( error ) {
        console.log( error );
        setDetailsLoading( false );
      }
    };
    fetchNworxUser();
  }, [ email ] );
  console.log( userData, "userData" );
  return (
    <Box className="emp_dtls_block">
      { detailsLoading ? (
        <Spinner />
      ) : (
        <>
          <Stack className="emp_avatar_flex">
            <Avatar className="emp_avatar">
              { userData?.name?.substring( 0, 1 ) }
            </Avatar>
            <Typography className="emp_name">{ userData?.name }</Typography>
          </Stack>
          <Stack className="emp_info_flex">
            <Box className="emp_info_left">
              <Typography className="emp_info_title">
                Designation
                <span className="emp_info_txt">{ userData?.designation }</span>
              </Typography>
              <Typography className="emp_info_title">
                Team
                <span className="emp_info_txt">{ userData?.department }</span>
              </Typography>
              <Typography className="emp_info_title">
                Email Address
                <span className="emp_info_txt">{ email }</span>
              </Typography>
              <Typography
                className="emp_info_title"
                onClick={ () =>
                  router.push( {
                    pathname: "/quick-preparation",
                    query: {
                      employeeEmail: email,
                    },
                  } )
                }
                style={ {
                  paddingTop: "4px",
                  textDecoration: "none",
                  color: "blue",
                  cursor: "pointer",
                } }
              >
                View Tools
              </Typography>
              <Typography
                className="emp_info_title"
                onClick={ () => setViewState( "RECENT_ACTIVITY" ) }
                style={ {
                  paddingTop: "4px",
                  textDecoration: "none",
                  color: "blue",
                  cursor: "pointer",
                } }
              >
                View Recent Activity
              </Typography>
              <Typography
                className="emp_info_title"
                onClick={ () =>
                  router.push( {
                    pathname: "/event-prep",
                    query: {
                      employeeEmail: email,
                    },
                  } )
                }
                style={ {
                  paddingTop: "4px",
                  textDecoration: "none",
                  color: "blue",
                  cursor: "pointer",
                } }
              >
                View Event Prep
              </Typography>
              { currentUserRole === MANAGER_VIEW_STATE.EXPERT && <Typography
                className="emp_info_title"
                onClick={ () =>
                  router.push( {
                    pathname: "/reports",
                    query: {
                      userId: userData?.id,
                      id: userData?.activeProgramId,
                    },
                  } )
                }
                style={ {
                  paddingTop: "4px",
                  textDecoration: "none",
                  color: "blue",
                  cursor: "pointer",
                } }
              >
                View Reports
              </Typography> }
            </Box>
            <Box className="emp_info_right">
              <Typography className="emp_info_title">
                Focus Area
                <span className="emp_info_txt">
                  {
                    //@ts-ignore
                    NEXT_6_MONTHS_FOCUS_OPTIONS[ userData?.nextSixMonthsFocus ]
                  }
                </span>
              </Typography>
              <Typography className="emp_info_title">
                Primary Reporting Manager
                <span className="emp_info_txt">{ userData?.manager }</span>
              </Typography>
              {/* <Typography className="emp_info_title">
            Secondary Reporting Manager
            <span className="emp_info_txt"></span>
          </Typography> */}
            </Box>
          </Stack>
        </>
      ) }
      { viewState === "RECENT_ACTIVITY" && (
        <Dialog open={ viewState === "RECENT_ACTIVITY" } fullScreen>

          { " " }
          <Stack
            flexDirection="row"
            alignItems="center"
            gap="15px"
            justifyContent="space-between"
            mb="24px"
          >
            <Stack
              flexDirection="row"
              alignItems="center"
              onClick={ () => setViewState( "" ) }
              sx={ { cursor: "pointer" } }
            >
              <Typography
                //@ts-ignore
                variant="span"
                sx={ {
                  fontWeight: "500",
                  color: "#2D3648",
                  cursor: "pointer",
                } }
                className="go_back_flex"
              >
                <ChevronLeftIcon />
              </Typography>
              <Typography
                sx={ {
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#2D3648",
                } }
              >
                Go Back
              </Typography>
            </Stack>
          </Stack>
          <Box>
            <PreviousActivity
              userId={ userData?.id }
              programId={ router?.query?.employeeProgramId }
              name={ userData?.name }
            />
          </Box>

        </Dialog>
      ) }
    </Box>
  );
};

export default EmployeeDetails;
