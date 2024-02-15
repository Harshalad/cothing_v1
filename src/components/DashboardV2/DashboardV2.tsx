import { Helmet, HelmetProvider } from "react-helmet-async";
import {
  Box, Stack, Typography
} from "@mui/material";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import DashboardTabs from "./DashboardTabs";
import SlefView from "./SelfView";
import ManagerView from "./ManagerView";
import ManagementView from "./ManagementView";
import { useEffect, useState } from "react";
import { fetchDashboardUserId } from "../../actions/dashboard/fetchDashboardUserId";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../constants/auth";
const drawerWidth = 250;

const DashboardV2 = () => {

  const [ activeClass, setActiveClass ] = useState<any>( null );
  const [ selfDashboard, setSelfDashboard ] = useState<any>( null );
  const [ managerDashboard, setManagerDashboard ] = useState<any>( null );
  const [ orgDashboard, setOrgDashboard ] = useState<any>( null );
  const [ date, setDate ] = useState<any>( null );

  const handleActiveClass = ( clickedId: any ) => {
    setActiveClass( clickedId );
  }
  const getDate = ( d: any ) => {
    const date = new Date( d );
    const day = date.getDate().toString().padStart( 2, '0' );
    const month = date.toLocaleString( 'en-US', { month: 'short' } );
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart( 2, '0' );
    const minutes = date.getMinutes().toString().padStart( 2, '0' );
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';

    const formattedDate = `${ day } ${ month } ${ year } ${ hours }:${ minutes } ${ ampm }`;
    return formattedDate;
  };
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  useEffect( () => {
    if ( currentUserRole === MANAGER_VIEW_STATE.LP ) {
      setActiveClass( "one" )
    } else if ( currentUserRole === MANAGER_VIEW_STATE.MANAGER ) {
      setActiveClass( "two" )
    }
    if ( user?.showManagementView ) {
      setActiveClass( "three" )
    }
  }, [ currentUserRole, user ] )

  useEffect( () => {
    const fetchDashboard = async () => {
      const response = await fetchDashboardUserId( { userId: user?.id } );
      //@ts-ignore
      if ( response?.statusCode === 0 ) {
        //@ts-ignore
        setSelfDashboard( response?.response?.SELF );
        //@ts-ignore
        setManagerDashboard( response?.response?.MANAGER );
        //@ts-ignore
        setOrgDashboard( response?.response?.ORGANIZATION );
        //@ts-ignore
        setDate( response?.response?.date )
      }
    }
    fetchDashboard();
  }, [ user ] )

  console.log( selfDashboard, "slefDashboard" );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Dashboard V2</title>
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
          className="analyze"
        >
          <Stack className="dashboardv2_header_flex">
            {/*<Typography
              variant="h1"
              sx={ { fontWeight: "700", color: "#1C2129" } }
              className="dash_title"
            >
              Dashboard
              
              
            </Typography>*/}
            <DashboardTabs
              activeClass={ activeClass }
              handleActiveClass={ handleActiveClass }
              currentUserRole={ currentUserRole }
              user={ user }
            />
            <Typography className="last_update_text">Last updated on { getDate( date ).toString() }</Typography>
          </Stack>
          {/*<DashboardTabs
            activeClass={ activeClass }
            handleActiveClass={ handleActiveClass }
            currentUserRole={ currentUserRole }
            user={ user }
          />*/}
          { activeClass === "one" ? (
            <SlefView
              activeClass={ activeClass }
              handleActiveClass={ handleActiveClass }
              selfDashboard={ selfDashboard }
              orgDashboard={ orgDashboard }
            />
          ) : activeClass === "two" ? (
            <ManagerView
              activeClass={ activeClass }
              handleActiveClass={ handleActiveClass }
              managerDashboard={ managerDashboard }
              orgDashboard={ orgDashboard }
              from="main"
            />
          ) : activeClass === "three" &&
          <ManagementView activeClass={ activeClass } orgDashboard={ orgDashboard } />
          }
        </Box>
      </Box>
    </>
  );
}
export default DashboardV2;