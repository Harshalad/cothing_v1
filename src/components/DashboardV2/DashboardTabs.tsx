import { Box, Stack, Typography } from "@mui/material";
import { MANAGER_VIEW_STATE } from "../../constants/auth";

const DashboardTabs = ( { handleActiveClass, activeClass, currentUserRole, user }: any ) => {

  return (
    <>
      <Box className="dashboardv2_tabs_contr">
        <Stack className="dashboardv2_tabs_flex">
          { currentUserRole === MANAGER_VIEW_STATE.LP && <Box className={ `dashboardv2_tab_cont ${ activeClass === "one" ? "active" : "" }` } onClick={ () => { handleActiveClass( "one" ) } }>
            <Typography className={ `dash_tab_name ${ activeClass === "one" ? "active" : "" }` }>Self View</Typography>
          </Box> }
          { currentUserRole === MANAGER_VIEW_STATE.MANAGER && <Box className={ `dashboardv2_tab_cont ${ activeClass === "two" ? "active" : "" }` } onClick={ () => { handleActiveClass( "two" ) } }>
            <Typography className={ `dash_tab_name ${ activeClass === "two" ? "active" : "" }` }>Reporting Manager View</Typography>
          </Box> }
          { user?.showManagementView && <Box className={ `dashboardv2_tab_cont ${ activeClass === "three" ? "active" : "" }` } onClick={ () => { handleActiveClass( "three" ) } }>
            <Typography className={ `dash_tab_name ${ activeClass === "three" ? "active" : "" }` }>Management View</Typography>
          </Box> }
        </Stack>
      </Box>
    </>
  );
}
export default DashboardTabs;