import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box, Stack, Typography } from "@mui/material";
import HeaderNav from "../common/HeaderNav/HeaderNav";
import DashboardComps from "./DashboardComps";
import { useEffect, useState } from "react";
import { fetchDashboard } from "../../actions/dashboard/fetchDashboard";
import { useSelector } from "react-redux";

const drawerWidth = 250;

const Dashboard = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  const [ dashboardData, setDashboardData ] = useState<any>( null );

  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  useEffect( () => {
    const getDashboard = async () => {
      try {
        const response = await fetchDashboard( { userId: user?.id } );
        console.log( response, "DASHBPARD RESPONSE" );
        if ( response ) {
          //@ts-ignorets-i
          setDashboardData( response?.dashboardInfo?.response?.data );
        }
      } catch ( error ) {
        console.log( error );
      }
    };
    getDashboard();
  }, [ user ] );

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Dashboard</title>
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
          <Typography
            variant="h1"
            sx={ { fontWeight: "700", color: "#1C2129", marginBottom: "24px" } }
            className="dash_title"
          >
            Dashboard
          </Typography>
          <Stack className="db_header">
            {/*{program?.configMap.enableAlign ? (
              <Typography className="db_header_title">Alignment</Typography>
            ) : null}*/}
            <Typography className="db_header_title">Engagement</Typography>
            <Typography className="db_header_title">
              Performance Predictor
            </Typography>
            <Typography className="db_header_title">
              Potential Impact
            </Typography>
          </Stack>

          { dashboardData &&
            dashboardData.map( ( dashRow: any, index: number ) => {
              return (
                <Box className="db_cntnt_cont" key={ index }>
                  <Typography className="db_cntnt_title">
                    { dashRow?.title }
                  </Typography>
                  <DashboardComps
                    name={ "individualContributors" }
                    align={ dashRow?.alignScore }
                    achieve={ dashRow?.achieveScore || 0 }
                    effectivenessScore={ dashRow?.effectivenessScore }
                    alignCssId={ "ic_align_cpb" }
                    achieveCssId={ "ic_achieve_cpb" }
                    collapseId={ `${ index + 1 }` }
                    alignQuot={ 5 }
                    curoScore={ dashRow?.curiosityScore }
                    prepContncy={ dashRow?.preparationConsistency }
                    alignIntsty={ dashRow?.alignIntensity }
                    prepComp={ dashRow?.preparationCompletion }
                    refQuot={ dashRow?.reflectionQuotient }
                    top3={ dashRow?.top3 }
                    allUsers={ dashRow.all }
                    goalProgressByvalue={ dashRow.goalProgressByValue }
                    goalProgressByPurpose={ dashRow.goalProgressByPurpose }
                    score3={ dashRow?.engageScoreMap?.[ "monthly" ] }
                    score1={ dashRow?.engageScoreMap?.[ "quarterly" ] }
                    score2={ dashRow?.engageScoreMap?.[ "biMonthly" ] }
                  />
                </Box>
              );
            } ) }
        </Box>
      </Box>
    </>
  );
};
export default Dashboard;
