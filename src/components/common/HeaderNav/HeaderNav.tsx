import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Box,
  Dialog,
  DialogContent,
  useMediaQuery,
  AppBar,
  TextField,
  InputAdornment,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Drawer,
  Typography,
  Switch,
  Stack,
  FormControl,
  InputLabel,
  Select,
  ThemeProvider,
  DialogTitle,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import AlignHorizontalLeftOutlinedIcon from "@mui/icons-material/AlignHorizontalLeftOutlined";
import GpsFixedOutlinedIcon from "@mui/icons-material/GpsFixedOutlined";
import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../actions/auth/logout";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";
import { toggleManagerView } from "../../../actions/user/toggleManagerView";
import theme from "../../../styles/theme";
import { getRoleBasedAccess } from "../../../actions/auth/fetchRoleBasedAccess";
import CloseIcon from "@mui/icons-material/Close";
import { Report } from "@mui/icons-material";
import { fetchProgram } from "../../../actions/align/fetchProgram";
import { fetchChatUsersByStreaming } from "../../../actions/chat/fetchChatUsersByStreaming";
import { isEmptyObject } from "../../../utils/isEmptyObject";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import MailOutlinedIcon from '@mui/icons-material/MailOutlined';
import { logOut } from "../../../actions/user/logout";
import { resetToken } from "../../../actions/auth/token";
import { getAuth, signOut } from "firebase/auth";

const HeaderNav = () => {
  const matches = useMediaQuery( "(max-width:991px)" );
  const hostUrl = window.location.host.toLowerCase();
  const dispatch = useDispatch();
  const router = useRouter();
  const [ anchorEl, setAnchorEl ] = useState( null );
  const [ showNotify, setNotify ] = useState( false );
  const [ showProfile, setProfile ] = useState( false );
  const [ showDrawer, setDrawer ] = useState( false );
  const [ isToggleSwitch, setToggleSwitch ] = useState( false );
  const [ loading, setLoading ] = useState( false );
  const [ chatUsersObject, setChatUsersObject ] = useState<any>( {} );
  const [ updatePostFlag, setUpdatePostFlag ] = useState( 0 );
  const [ hul, setHul ] = useState( hostUrl.includes( "hul" ) );
  const [ totalUsersUnreadCount, setTotalUsersUnreadCount ] = useState( 0 );
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
    // (state) => console.log(state)
  );

  //@ts-ignore
  const roleBasedAccess = useSelector( ( state ) => state?.auth?.roleBasedAccess );

  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  console.log( "jdbsgkjdbsgkjdsbgkd", user, program, currentUserRole );
  useEffect( () => {
    const fetchRoleBasedAccess = async () => {
      try {
        setLoading( true );
        //@ts-ignore
        await dispatch( getRoleBasedAccess( { userId: user?.id } ) );
        setLoading( false );
      } catch ( error ) {
        console.log( error );
        setLoading( false );
      }
    };
    fetchRoleBasedAccess();
  }, [] );

  useEffect( () => {
    const getProgram = async () => {
      try {
        ///@ts-ignore
        await dispatch( fetchProgram( { programId: user?.activeProgramId } ) );
      } catch ( error ) {
        console.log( error );
      }
    };
    getProgram();
  }, [ user?.activeProgramId ] );

  let localChatUsers: any = {};

  useEffect( () => {
    const getChatUsers = async () => {
      let parsedResponse: any;
      try {
        const instance = await fetchChatUsersByStreaming( {
          userId: user?.id,
        } );
        instance.on( "data", function ( response: any ) {
          parsedResponse = JSON.parse( response?.array?.[ 0 ] );
          if ( !isEmptyObject( parsedResponse ) ) {
            localChatUsers[ parsedResponse?.response?.document?.id ] =
              parsedResponse?.response?.document;
          }

          setChatUsersObject( localChatUsers );
          setUpdatePostFlag( ( prevState: any ) => prevState + 1 );
          //   setChatUsersObject(parsedResponse?.response);
        } );

        // const response = await fetchUserWorksheet({ worksheetId });

        return { instance, unmount: true };
      } catch ( error ) {
        console.log( error );
      }
    };
    const res = getChatUsers();
    //@ts-ignore
    if ( res.unmount ) {
      //@ts-ignore
      res?.instance?.cancel();
    }
  }, [ user?.id ] );
  console.log( "program aditya", program );
  useEffect( () => {
    if ( updatePostFlag ) {
      const totalUnreadUsers = Object.entries( chatUsersObject ).filter(
        ( user: any, index: number ) => {
          if ( user[ 1 ].unreadMessageCount && user[ 1 ].unreadMessageCount > 0 ) {
            return true;
          }
          return false;
        }
      );

      setTotalUsersUnreadCount( totalUnreadUsers?.length );
      console.log( totalUnreadUsers?.length, "UNREAD LENGTH" );
    }
  }, [ updatePostFlag ] );
  console.log( program, "12435ytgfds456ytgfdsawe45trfdsr45" );
  const isManager = user?.roles?.includes( "MANAGER" );
  const isExpert = user?.roles?.includes( "EXPERT" );
  const isJP = user?.roles?.includes( "JP" );
  const showNotifyMenu = ( event: any ) => {
    setAnchorEl( event.currentTarget );
    setNotify( true );
  };

  const showProfileMenu = ( event: any ) => {
    setAnchorEl( event.currentTarget );
    setProfile( true );
  };

  const closeNotifyMenu = () => {
    setAnchorEl( null );
    setNotify( false );
  };

  const closeProfileMenu = async () => {
    setAnchorEl( null );
    setProfile( false );
  };

  const showDrawerNav = () => {
    setDrawer( true );
  };

  const closeDrawerNav = () => {
    setDrawer( false );
  };

  const onProfileClick = () => {
    router.push( "/profile" );
  };

  const onSignOutClick = async () => {
    // const response = await logOut(user?.id);
    // console.log("logout response",response);
    const auth = getAuth();
    signOut( auth ).then( () => {
      resetToken();
      dispatch( logout() );
      router.push( "/" );

      // Sign-out successful.
    } ).catch( ( error ) => {
      console.log( error );
    } );

  };

  const [ openSearchDialog, setOpenSearchDialog ] = useState( false );

  const handleClickOpen = () => {
    setOpenSearchDialog( true );
  };

  const handleClose = () => {
    setOpenSearchDialog( false );
  };

  const drawer = (
    <>
      {/* <HighlightOffRoundedIcon
        sx={{
          position: "absolute",
          right: "10px",
          top: "8px",
          cursor: "pointer",
          color: "#FFFFFF",
          display: { tablet: "none" },
        }}
        onClick={closeDrawerNav}
      /> */}
      <Stack height="100%" justifyContent="space-between">
        <Box>
          <Box className="drawerLogo">
            <img
              src={ program?.serviceProvider === "DICe" ? "/images/inside_logo.png" : program?.configMap?.serviceProviderLogo }
              alt="logo"
              width={ 175 }
              height={ 40 }
            ></img>
          </Box>
          { roleBasedAccess?.[ currentUserRole ]?.pages
            ?.filter( ( curItem: any ) => {
              if ( curItem.key === "ALIGN" ) {
                if ( !program?.configMap.enableAlign ) {
                  if (
                    currentUserRole == MANAGER_VIEW_STATE.LP ||
                    currentUserRole == MANAGER_VIEW_STATE.MANAGER
                  ) {
                    return false;
                  }
                }
              }
              if ( curItem.key === "EVENT" ) {
                if ( !program?.configMap.enableEvents ) {
                  if (
                    currentUserRole == MANAGER_VIEW_STATE.LP ||
                    currentUserRole == MANAGER_VIEW_STATE.MANAGER
                  ) {
                    return false;
                  }
                }
              }
              if ( curItem.key === "EVALUATE" ) {
                if ( !program?.configMap.enableEvaluation ) {
                  if (
                    currentUserRole == MANAGER_VIEW_STATE.MANAGER
                  ) {
                    return false;
                  }
                }
              }

              if ( curItem.key === "ANALYZE" ) {
                if ( !program?.configMap.enableMra ) {
                  if (
                    currentUserRole == MANAGER_VIEW_STATE.LP ||
                    currentUserRole == MANAGER_VIEW_STATE.MANAGER
                  ) {
                    return false;
                  }
                }
              }

              if ( curItem.key === "QUICK_PREP" ) {
                if ( !program?.configMap.enableQuickPrep ) {
                  if (
                    currentUserRole == MANAGER_VIEW_STATE.LP ||
                    currentUserRole == MANAGER_VIEW_STATE.MANAGER
                  ) {
                    return false;
                  }
                }
              }

              if ( curItem.key === "CHAT" ) {
                if ( !program?.configMap.enableChat ) {
                  if (
                    currentUserRole == MANAGER_VIEW_STATE.LP ||
                    currentUserRole == MANAGER_VIEW_STATE.MANAGER
                  ) {
                    return false;
                  }
                }
              }

              if ( curItem.key === "REPORTS" ) {
                if ( !program?.configMap.enableNavbarAssessmentReports ) {
                  if (
                    currentUserRole == MANAGER_VIEW_STATE.LP ||
                    currentUserRole == MANAGER_VIEW_STATE.MANAGER
                  ) {
                    return false;
                  }
                }
              }

              if ( curItem.key === "DASHBOARD" ) {
                if ( program?.hasOwnProperty( "dashboardScreen" ) ) {
                  if (
                    program?.dashboardScreen === "disabled"
                  ) {
                    return false;
                  }
                }
              }

              return true;
            } )
            ?.map( ( page: any, index: number ) => {
              return (
                <Box className="drawerMenu" key={ index }>
                  <Link href={ page.route } style={ { textDecoration: "none" } }>
                    <Box
                      className={ `drawerMenuList ${ router.pathname === page.route ? "activeMenu" : ""
                        }` }
                    >
                      { page.key === "ACTION_CENTER" ? (
                        <TrackChangesOutlinedIcon
                          className={
                            currentUserRole === MANAGER_VIEW_STATE.LP
                              ? "drawerMenuIcon"
                              : "drawerMenuIcon drawerMenuIconForOthers"
                          }
                        />
                      ) : page.key === "ALIGN" ? (
                        <AlignHorizontalLeftOutlinedIcon
                          className={
                            currentUserRole === MANAGER_VIEW_STATE.LP
                              ? "drawerMenuIcon"
                              : "drawerMenuIcon drawerMenuIconForOthers"
                          }
                        />
                      ) : page.key === "ACHIEVE" ? (
                        <GpsFixedOutlinedIcon
                          className={
                            currentUserRole === MANAGER_VIEW_STATE.LP
                              ? "drawerMenuIcon"
                              : "drawerMenuIcon drawerMenuIconForOthers"
                          }
                        />
                      ) : page.key === "ANALYZE" ? (
                        <BeenhereOutlinedIcon
                          className={
                            currentUserRole === MANAGER_VIEW_STATE.LP
                              ? "drawerMenuIcon"
                              : "drawerMenuIcon drawerMenuIconForOthers"
                          }
                        />
                      ) : page.key === "DASHBOARD" ? (
                        <DashboardOutlinedIcon
                          className={
                            currentUserRole === MANAGER_VIEW_STATE.LP
                              ? "drawerMenuIcon"
                              : "drawerMenuIcon drawerMenuIconForOthers"
                          }
                        />
                      ) : page.key === "QUICK_PREP" ? (
                        <ContentPasteOutlinedIcon
                          className={
                            currentUserRole === MANAGER_VIEW_STATE.LP
                              ? "drawerMenuIcon"
                              : "drawerMenuIcon drawerMenuIconForOthers"
                          }
                        />
                      ) : page.key === "CHAT" ? (
                        <ChatOutlinedIcon
                          className={
                            currentUserRole === MANAGER_VIEW_STATE.LP
                              ? "drawerMenuIcon"
                              : "drawerMenuIcon drawerMenuIconForOthers"
                          }
                        />
                      ) : page.key === "REPORTS" ? (
                        <ContentPasteOutlinedIcon
                          className={
                            currentUserRole === MANAGER_VIEW_STATE.LP
                              ? "drawerMenuIcon"
                              : "drawerMenuIcon drawerMenuIconForOthers"
                          }
                        />
                      ) : (
                        <ContentPasteOutlinedIcon
                          className={
                            currentUserRole === MANAGER_VIEW_STATE.LP
                              ? "drawerMenuIcon"
                              : "drawerMenuIcon drawerMenuIconForOthers"
                          }
                        />
                      ) }
                      <Typography
                        //@ts-ignore
                        variant="span"
                        className={
                          currentUserRole === MANAGER_VIEW_STATE.LP
                            ? "drawerMenuText"
                            : "drawerMenuTextForOthers"
                        }
                        sx={ { color: "#fff", fontWeight: "500" } }
                      >
                        { page.label }
                        { page.key === "CHAT" && totalUsersUnreadCount ? (
                          <Box
                            sx={ {
                              position: "relative",
                              left: "45px",
                              top: "-10px",
                            } }
                          >
                            <Box className="new_msg_badge">
                              <Typography className="badge_text">
                                { totalUsersUnreadCount }
                              </Typography>
                            </Box>
                          </Box>
                        ) : null }
                      </Typography>
                    </Box>
                  </Link>
                </Box>
              );
            } ) }
          { program?.configMap?.enablePrivacyNotice && currentUserRole !== MANAGER_VIEW_STATE.REPORT_VIEWER && <Link
            href={ program?.configMap?.privacyNoticeLink }
            target="_blank"
            style={ {
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: "500",
              fontSize: "14px",
              color: "#F4F7FA",
            } }
          >
            { program?.configMap?.privacyNoticeLabel }<OpenInNewIcon sx={ { fontSize: "18px" } } />
          </Link> }


          { program?.configMap?.userGuideLabel && currentUserRole !== MANAGER_VIEW_STATE.REPORT_VIEWER && program?.configMap?.userGuidePath && <Link
            href={ program?.configMap?.userGuidePath }
            target="_blank"
            style={ {
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: "500",
              fontSize: "14px",
              color: "#F4F7FA",
              margin: "24px 0"
            } }
          >
            { program?.configMap?.userGuideLabel }{ " " }<DescriptionOutlinedIcon sx={ { fontSize: "18px" } } />
          </Link> }
          { program?.configMap?.supportLabel && currentUserRole !== MANAGER_VIEW_STATE.REPORT_VIEWER && program?.configMap?.supportEmail && program?.configMap?.supportSubject && program?.configMap?.supportBody && <Link
            href={ `mailto:${ program?.configMap?.supportEmail }?subject=${ program?.configMap?.supportSubject }&body=${ encodeURIComponent( program?.configMap?.supportBody ) }` }
            target="_blank"
            style={ {
              display: "flex",
              alignItems: "center",
              gap: "4px",
              fontWeight: "500",
              fontSize: "14px",
              color: "#F4F7FA"
            } }
          >
            { program?.configMap?.supportLabel }{ " " }<MailOutlinedIcon sx={ { fontSize: "18px" } } />
          </Link> }
        </Box>
        { program?.serviceProvider !== "DICe" && <Stack flexDirection="row" alignItems="center" gap="14px" position="absolute" bottom="46px">
          <Typography sx={ { fontSize: "12px", color: "#FFFFFF" } }>powered by</Typography>
          <img
            src="/images/powered-by.png"
            alt="logo"
            width={ 119 }
            height={ 29 }
          />
        </Stack> }
      </Stack>
      {/* <Box className="drawerMenu">
        <Link href="/action-center" style={{ textDecoration: "none" }}>
          <Box
            className={`drawerMenuList ${
              router.pathname === "/action-center" ? "activeMenu" : ""
            }`}
          >
            <TrackChangesOutlinedIcon className="drawerMenuIcon" />
            <Typography
              //@ts-ignore
              variant="span"
              className="drawerMenuText"
              sx={{ color: "#fff", fontWeight: "500" }}
            >
              Action Center
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box className="drawerMenu">
        <Link href="/align" style={{ textDecoration: "none" }}>
          <Box
            className={`drawerMenuList ${
              router.pathname === "/align" ||
              router.pathname === "/align/add-goal"
                ? "activeMenu"
                : ""
            }`}
          >
            <AlignHorizontalLeftOutlinedIcon className="drawerMenuIcon" />
            <Typography
              //@ts-ignore
              variant="span"
              className="drawerMenuText"
              sx={{ color: "#fff", fontWeight: "500" }}
            >
              Align
            </Typography>
          </Box>
        </Link>
      </Box>
      <Box className="drawerMenu">
        <Link href="/achieve" style={{ textDecoration: "none" }}>
          <Box
            className={`drawerMenuList ${
              router.pathname === "/achieve" ? "activeMenu" : ""
            }`}
          >
            <GpsFixedOutlinedIcon className="drawerMenuIcon" />
            <Typography
              //@ts-ignore
              variant="span"
              className="drawerMenuText"
              sx={{ color: "#fff", fontWeight: "500" }}
            >
              Act & Achieve
            </Typography>
          </Box>
        </Link>
      </Box>

      <Box className="drawerMenu">
        {/* <Link href="/assure" style={{ textDecoration: "none" }}> */}
      {/* <Box
          className={`drawerMenuList ${
            router.pathname === "/assure" ? "activeMenu" : ""
          }`}
        >
          <BeenhereOutlinedIcon className="drawerMenuIcon" />
          <Typography
            //@ts-ignore
            variant="span"
            className="drawerMenuText"
            sx={{ color: "#fff", fontWeight: "500" }}
          >
            Analyze
          </Typography>
        </Box> */}
      {/* </Link> */ }
      {/* </Box> */ }
      {/* <Box className="drawerMenu">
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <Box
            className={`drawerMenuList ${
              router.pathname === "/dashboard" ? "activeMenu" : ""
            }`}
          >
            <GpsFixedOutlinedIcon className="drawerMenuIcon" />
            <Typography
              //@ts-ignore
              variant="span"
              className="drawerMenuText"
              sx={{ color: "#fff", fontWeight: "500" }}
            >
              Dashboard
            </Typography>
          </Box>
        </Link>
      </Box> */}
    </>
  );

  return (
    <>
      { loading ? (
        <div>Loading</div>
      ) : (
        <Box>
          <AppBar
            position="fixed"
            sx={ {
              backgroundColor: "#ffffff",
              width: { tablet: "calc(100% - 250px)" },
            } }
          >
            <Toolbar sx={ { minHeight: "80px", marginLeft: "250px" } }>
              <IconButton
                size="large"
                edge="start"
                aria-label="menu"
                sx={ {
                  color: "#3E4248",
                  "&:hover": { color: "#3E4248" },
                  mr: 2,
                } }
                className="hamburger_menu"
                onClick={ showDrawerNav }
              >
                <MenuIcon />
              </IconButton>
              {/* <TextField
                onClick={(e) => {matches === true ? handleClickOpen() : e.preventDefault()} }
                id="search"
                placeholder="Search"
                variant="outlined"
                size="small"
                fullWidth
                inputProps={{
                  sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500", padding: "12px 6px !important" },
                  className: "serach",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" sx={{marginRight: "0"}}>
                      <IconButton aria-label="search" edge="start" size="small">
                        <SearchIcon sx={{ color: "#989EA5" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  maxWidth: "250px",
                  marginRight: "auto",
                  "& ::placeholder": { color: "#999CA0" },
                }}
                className="search_field header_nav_search"
              /> */}
              <Box className="service_provider_name_contr">
                <Typography className="service_provider_name">
                  { program?.configMap?.programNameLabel }
                </Typography>
              </Box>
              { program?.clientLogo && <Box className="service_provider_logo_box">
                <img
                  className="service_provider_logo"
                  src={ program?.clientLogo }
                  alt="logo"
                  width="175px"
                  height="40px"
                />
              </Box> }
              <Box sx={ { marginLeft: program?.clientLogo ? "0px" : "auto", padding: "0 16px" } } className="top_nav_profile_dtls">
                <Typography className="top_nav_profile_text" sx={ { fontWeight: "600", fontSize: "16px", color: "#1C2129" } }>
                  { `${ user?.name }` }
                </Typography>
                <Typography className="top_nav_profile_text" sx={ { fontWeight: "600", fontSize: "12px", color: "#5D636B" } }>
                  { `${ user?.designation }` }
                </Typography>
              </Box>
              { isManager || isExpert || isJP ? (
                <Box sx={ { padding: "0 16px" } }>
                  <ThemeProvider theme={ theme }>
                    <FormControl sx={ { m: 1, minWidth: 120 } } size="small">
                      <InputLabel id="demo-select-small-label">Role</InputLabel>
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={ currentUserRole }
                        label="Role"
                        sx={ {
                          color: ( currentUserRole === MANAGER_VIEW_STATE.LP && program?.configMap?.customLPColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customLPColor : ( currentUserRole === MANAGER_VIEW_STATE.MANAGER && program?.configMap?.customManagerColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customManagerColor :
                            roleBasedAccess?.[ currentUserRole ]?.themeColor,
                          "&:before": {
                            borderColor:
                              ( currentUserRole === MANAGER_VIEW_STATE.LP && program?.configMap?.customLPColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customLPColor : ( currentUserRole === MANAGER_VIEW_STATE.MANAGER && program?.configMap?.customManagerColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customManagerColor :
                                roleBasedAccess?.[ currentUserRole ]?.themeColor,
                          },
                          "& :hover:not(.Mui-disabled):before": {
                            borderColor:
                              ( currentUserRole === MANAGER_VIEW_STATE.LP && program?.configMap?.customLPColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customLPColor : ( currentUserRole === MANAGER_VIEW_STATE.MANAGER && program?.configMap?.customManagerColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customManagerColor :
                                roleBasedAccess?.[ currentUserRole ]?.themeColor,
                          },
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
                        } }
                        onChange={ ( e ) => {
                          console.log( e.target.value, "daskfvkshvfjhdsvf" )
                          dispatch( toggleManagerView( e.target.value ) );
                          if ( e.target.value === MANAGER_VIEW_STATE.REPORT_VIEWER ) {
                            router.push( "/dashboard" );
                          } else {
                            router.push( "/action-center" );
                          }
                        } }
                      >
                        { user?.roles &&
                          user?.roles?.map( ( role: any, index: number ) => {
                            return (
                              <MenuItem value={ role } key={ index }>
                                { role === MANAGER_VIEW_STATE.LP
                                  ? "EMPLOYEE"
                                  : role === MANAGER_VIEW_STATE.JP
                                    ? "PARTNER"
                                    : role === MANAGER_VIEW_STATE.REPORT_VIEWER ? "REPORT VIEWER" : role }
                              </MenuItem>
                            );
                          } ) }
                      </Select>
                    </FormControl>
                  </ThemeProvider>
                </Box>
              ) : // <Box>
                //   <Stack className="prog_lvl_box">
                //     <img
                //       src="/images/bronze.png"
                //       alt="prep goal icon"
                //       width={28}
                //       height={28}
                //     ></img>
                //     <Typography className="prog_lvl_title">Bronze</Typography>
                //   </Stack>
                // </Box>
                null }
              {/* <Box sx={{ padding: "0 16px" }}>
                <IconButton
                  size="large"
                  aria-label="notification"
                  aria-controls="notification-appbar"
                  aria-haspopup="true"
                  onClick={showNotifyMenu}
                  sx={{
                    color: "#3E4248",
                    "&:hover": { color: "#3E4248" },
                    border: "2px solid #EAECEF",
                  }}
                >
                  <CircleNotificationsOutlinedIcon />
                </IconButton>
                <Menu
                  id="notification-appbar"
                  anchorEl={anchorEl}
                  open={showNotify}
                  onClose={closeNotifyMenu}
                >
                  <MenuItem onClick={closeNotifyMenu}>Notice 1</MenuItem>
                  <MenuItem onClick={closeNotifyMenu}>Notice 2</MenuItem>
                </Menu>
              </Box> */}
              <Box>
                <IconButton
                  size="large"
                  aria-label="profile"
                  aria-controls="profile-appbar"
                  aria-haspopup="true"
                  onClick={ showProfileMenu }
                  sx={ {
                    color: "#3E4248",
                    "&:hover": { color: "#3E4248" },
                    border: "2px solid #EAECEF",
                  } }
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
                <Menu
                  id="profile-appbar"
                  anchorEl={ anchorEl }
                  open={ showProfile }
                  onClose={ closeProfileMenu }
                >
                  <MenuItem className="prof_name_desgn">{ `${ user?.name }, ${ user?.designation } ` }</MenuItem>
                  { ( !program?.configMap?.hasOwnProperty( "onboardingProfile" ) || ( program?.configMap.onboardingProfile ) ) ? <MenuItem onClick={ onProfileClick }>Profile</MenuItem> : null }
                  <MenuItem onClick={ onSignOutClick }>Sign Out</MenuItem>
                </Menu>
              </Box>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={ {
              width: {
                mobile: "calc(100% - 200px)",
                tablet: "calc(100% - 250px)",
              },
              ml: { tablet: "auto" },
            } }
          >
            <Drawer
              variant="temporary"
              open={ showDrawer }
              ModalProps={ {
                keepMounted: true,
              } }
              sx={ {
                display: { mobile: "block", tablet: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: "200px",
                  backgroundColor: ( currentUserRole === MANAGER_VIEW_STATE.LP && program?.configMap?.customLPColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customLPColor : ( currentUserRole === MANAGER_VIEW_STATE.MANAGER && program?.configMap?.customManagerColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customManagerColor :
                    roleBasedAccess?.[ currentUserRole ]?.themeColor,
                  border: 0,
                  padding: "0 15px",
                },
              } }
            >
              { drawer }
            </Drawer>
            <Drawer
              sx={ {
                display: { mobile: "none", tablet: "block" },
                width: "250px",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: "250px",
                  boxSizing: "border-box",
                  backgroundColor: ( currentUserRole === MANAGER_VIEW_STATE.LP && program?.configMap?.customLPColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customLPColor : ( currentUserRole === MANAGER_VIEW_STATE.MANAGER && program?.configMap?.customManagerColor && program?.configMap?.customLPColor.length !== 0 && program?.configMap?.customLPColor !== "default" ) ? program?.configMap?.customManagerColor :
                    roleBasedAccess?.[ currentUserRole ]?.themeColor,
                  border: 0,
                  padding: "0 25px",
                },
              } }
              variant="permanent"
              anchor="left"
            >
              { drawer }
            </Drawer>
          </Box>
        </Box>
      ) }
      <Dialog
        open={ openSearchDialog }
        onClose={ handleClose }
        aria-labelledby="dialog-serach"
        aria-describedby="serach-dialog"
        className="search_dialog"
      >
        <DialogTitle>
          <IconButton
            aria-label="close"
            onClick={ handleClose }
            sx={ {
              position: "absolute",
              right: 8,
              top: 8,
              color: ( theme ) => theme.palette.grey[ 500 ],
            } }
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="search"
            placeholder="Search"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={ {
              sx: {
                fontSize: "16px",
                color: "#3E4248",
                fontWeight: "500",
                padding: "12px 6px !important",
              },
              className: "serach",
            } }
            InputProps={ {
              startAdornment: (
                <InputAdornment position="start" sx={ { marginRight: "0" } }>
                  <IconButton aria-label="search" edge="start" size="small">
                    <SearchIcon sx={ { color: "#989EA5" } } />
                  </IconButton>
                </InputAdornment>
              ),
            } }
            sx={ {
              marginRight: "auto",
              "& ::placeholder": { color: "#999CA0" },
            } }
            className="search_field"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
export default HeaderNav;
