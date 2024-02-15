import {
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography,
  Tab,
  Tabs,
  Tooltip,
  Fade,
} from "@mui/material";
import { useEffect, useState } from "react";
import LinearGradient from "./LinearGradient";
import { CircularProgressbar } from "react-circular-progressbar";
import ManagementVolumeConsistencyGraph from "./ManagementVolumeConsistencyGraph";
import ManagementQualityThoroughnessGraph from "./ManagementQualityThoroughnessGraph";
import ManagementBenefitGraph from "./ManagementBenefitGraph";
import ManagerView from "./ManagerView";
import { fetchDashboardUserId } from "../../actions/dashboard/fetchDashboardUserId";
import Spinner from "../common/Spinner/Spinner";
import Common from "./Common";
import DashTooltip from "./DahTooltip";

const ManagementView = ( { activeClass, handleActiveClass, orgDashboard }: any ) => {
  const [ clickedTeam, setClickedTeam ] = useState<any>( "team" );
  const [ active, setActive ] = useState<any>( "team" );
  const [ value, setValue ] = useState<any>( 0 );
  const [ showGraphOption, setGraphOption ] = useState<any>( "v&c" );
  const [ nameTooltip, setNameTooltip ] = useState<any>( false );
  const [ benefitMap, setBenefitMap ] = useState<any>( null );
  const [ selectedBenefit, setSelectedBenefit ] = useState<any>( 0 );
  const [ managerDashboard, setManagerDashboard ] = useState<any>( null );
  const [ loading, setLoading ] = useState<any>( false );
  const [ open, setOpen ] = useState( "" );

  let mgrtool = <div>
    <span><span style={ { fontWeight: "bold" } }>Goals:</span> Prep completed across all Goals.</span>
    <br />
    <span> <span style={ { fontWeight: "bold" } }>All:</span> Prep completed across all Goals, Tools and Events.</span>
  </div>



  console.log( orgDashboard, "orgDashboard" );
  useEffect( () => {
    setBenefitMap( orgDashboard?.benefitDetailMap?.[ 0 ]?.headData )
  }, [ orgDashboard ] )

  const handleClickedTeam = ( clickedValue: any ) => {
    setClickedTeam( clickedValue );
  };

  const handleActive = ( clickedId: any ) => {
    setActive( clickedId ? clickedId : false );
  };
  const handleTooltipOpen = ( value: any ) => {
    setOpen(
      value
    );
  };
  const handleTooltipClose = () => {
    //@ts-ignore
    setOpen( false );
  };
  const handleChange = ( event: any, newValue: any ) => {
    setValue( newValue );
  };

  const handleGraphOption = ( clickedOption: any ) => {
    setGraphOption( clickedOption ? clickedOption : false );
  };

  const handleNameTooltipOpen = ( evt: any, value: any ) => {
    if ( value.length > 25 ) {
      setNameTooltip(
        value.length > 25 && evt.currentTarget.id === value ? value : false
      );
    } else {
      setNameTooltip( false );
    }
  };

  const handleNameTooltipClose = () => {
    setNameTooltip( false );
  };

  const handleBenefitClick = ( data: any, index: number ) => {
    setSelectedBenefit( index );
    setBenefitMap( data?.headData );
  }

  const handleChipClick = async ( data: any, index: any ) => {
    setLoading( true );
    const response = await fetchDashboardUserId( { userId: data?.userId } );
    console.log( response, "fetchDashboardUserId" );
    //@ts-ignore
    if ( response?.statusCode === 0 ) {
      //@ts-ignore
      setManagerDashboard( response?.response?.MANAGER );
      handleActive( index + "" ), handleClickedTeam( data?.name + '' );
    }
    setLoading( false );
  }



  return (
    <>
      <Box className="dashboardv2_section">
        <Box className="dashboardv2_container myteam_container">
          <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>

            <Typography className="dashboardv2_sub_title">
              Your Organization
            </Typography>
            <Box style={ { display: 'inline-block', marginRight: "16px" } } >
              {/*<DashTooltip openOn="OrgTool" value="OrgTool" />*/ }

              {/*<Tooltip
                open={ open === "OrgTool" }
                onClose={ handleTooltipClose }
                title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                arrow
                disableTouchListener
                placement="bottom-end"
              >
                <img
                  src="/images/more-info.png"
                  alt="more info"
                  width={ 20 }
                  height={ 20 }
                  style={ { cursor: "pointer" } }
                  onClick={ () => handleTooltipOpen( "OrgTool" ) }
                  onMouseEnter={ () =>
                    handleTooltipOpen( "OrgTool" )
                  }
                />
              </Tooltip>*/}
            </Box>
          </Box>
          <Stack className="team_flex">
            <Chip
              label="All Employees"
              variant="outlined"
              className={ active === "team" ? "active" : "" }
              onClick={ () => {
                handleActive( "team" ), handleClickedTeam( "team" );
              } }
            />
            { orgDashboard?.heads?.map( ( data: any, index: number ) => {
              return (
                <Chip
                  key={ index }
                  label={ <Typography>{ `${ data?.name }'s Org` }
                    {/*- <span className="font_color">{ data?.designation }</span>*/ }
                  </Typography> }
                  variant="outlined"
                  className={ active === index + '' ? "active" : "" }
                  onClick={ () => {
                    handleChipClick( data, index );
                  } }
                />
              );
            } ) }


            {/*<Typography className="view_all_team">View All 4 Teams</Typography>*/ }
          </Stack>

        </Box>
        { clickedTeam === "team" ? (
          ""
        ) : (
          <Typography className="dashboardv2_employee_name">
            { clickedTeam } Dashboard
          </Typography>
        ) }
        { loading ? <Spinner /> : clickedTeam === "team" ? <>
          <Box className="dashboardv2_container management_benefit_container">
            <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>

              <Typography className="dashboardv2_sub_title">
                Targeted Outcomes for the organization
              </Typography>
              <Box style={ { display: 'inline-block', marginRight: "30px" } } >
                <DashTooltip openOn="OrgBenefit" value="What the organization gains when employess achieve their goals." />

                {/*<Tooltip
                  open={ open === "OrgBenefit" }
                  onClose={ handleTooltipClose }
                  title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                  arrow
                  disableTouchListener
                  placement="bottom-end"
                >
                  <img
                    src="/images/more-info.png"
                    alt="more info"
                    width={ 20 }
                    height={ 20 }
                    style={ { cursor: "pointer" } }
                    onClick={ () => handleTooltipOpen( "OrgBenefit" ) }
                    onMouseEnter={ () =>
                      handleTooltipOpen( "OrgBenefit" )
                    }
                  />
                </Tooltip>*/}
              </Box>
            </Box>
            {/*<Box className="statement_title green">
            <Typography className="statement_text green">
              You have made great progress on the organizational statements
            </Typography>
          </Box>*/}
            <Stack className="predictors_flex leaderboard_flex">
              <Box className="management_benefit_table_container">
                <Stack className="table_heading_container">
                  <Typography className="table_heading flex_2">
                    Outcomes
                  </Typography>
                  {/*<Typography className="table_heading flex_1">
                  Progress
                </Typography>*/}
                  <Typography className="table_heading flex_1">
                    No of Goals
                  </Typography>
                </Stack>
                <Box className="leaderboard_table_content_container">
                  { orgDashboard?.benefitDetailMap?.map( ( data: any, index: number ) => {
                    return (
                      <Stack className={ selectedBenefit === index ? "table_data_container selected" : "table_data_container" } onClick={ () => handleBenefitClick( data, index ) } key={ index }>
                        <Tooltip
                          title="Maximize Profitability"
                          placement="top"
                          arrow
                          open={ nameTooltip === "Maximize Profitability" }
                          onClose={ handleNameTooltipClose }
                          disableTouchListener
                        >
                          <Typography
                            id="Maximize Profitability"
                            className="table_data flex_2"
                            onClick={ ( e ) =>
                              handleNameTooltipOpen( e, "Maximize Profitability" )
                            }
                            onMouseEnter={ ( e ) =>
                              handleNameTooltipOpen( e, "Maximize Profitability" )
                            }
                          >
                            { data?.name }
                            {/* {employee_name.length > 25 ?
                        `${employee_name.substring(0, 25)}...` : employee_name
                      } */}
                          </Typography>
                        </Tooltip>
                        {/*<Box className="table_data_progress_bar flex_1">
                      <LinearProgress
                        variant="determinate"
                        value={ 80 }
                        sx={ {
                          height: "6px",
                          borderRadius: "24px",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: "#1BAD70",
                          },
                        } }
                      />
                    </Box>*/}
                        <Typography className="table_data flex_1">{ data?.totalNoOfGoals }</Typography>
                      </Stack>
                    )
                  } ) }

                </Box>
              </Box>
              <Box className="management_benefit_graph_container">
                <Box className="vc_container">
                  <Box className="management_graph_data_container">
                    <Stack className="graph_legend_container">
                      <Stack className="graph_legend_inner_flex">
                        <Box className="graph_legend_box dark_green"></Box>
                        <Typography className="graph_legend_text">
                          Completed
                        </Typography>
                      </Stack>
                      <Stack className="graph_legend_inner_flex">
                        <Box className="graph_legend_box dark_blue"></Box>
                        <Typography className="graph_legend_text">
                          Overdue to complete
                        </Typography>
                      </Stack>
                      <Stack className="graph_legend_inner_flex">
                        <Box className="graph_legend_box dark_yellow"></Box>
                        <Typography className="graph_legend_text">
                          In Progress
                        </Typography>
                      </Stack>
                      <Stack className="graph_legend_inner_flex">
                        <Box className="graph_legend_box orange"></Box>
                        <Typography className="graph_legend_text">
                          Overdue to start
                        </Typography>
                      </Stack>
                      <Stack className="graph_legend_inner_flex">
                        <Box className="graph_legend_box red"></Box>
                        <Typography className="graph_legend_text">
                          Yet to start
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                  <Box className="predictors_bar_graph_container benefit_bar_graph_container">
                    <ManagementBenefitGraph benefitMap={ benefitMap } />
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Box>
          <Stack className="dashboardv2_flex mtb">
            <Box className="dashboardv2_container benefit_container progress_tracker_container">
              <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                <Typography className="dashboardv2_sub_title">
                  Performance Predictors: Critical actions
                </Typography>
                <Box style={ { display: 'inline-block', marginRight: "16px" } } >
                  <DashTooltip openOn="OrgProgress" value={ mgrtool } />

                  {/*<Tooltip
                    open={ open === "OrgProgress" }
                    onClose={ handleTooltipClose }
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    arrow
                    disableTouchListener
                    placement="bottom-end"
                  >
                    <img
                      src="/images/more-info.png"
                      alt="more info"
                      width={ 20 }
                      height={ 20 }
                      style={ { cursor: "pointer" } }
                      onClick={ () => handleTooltipOpen( "OrgProgress" ) }
                      onMouseEnter={ () =>
                        handleTooltipOpen( "OrgProgress" )
                      }
                    />
                  </Tooltip>*/}
                </Box>
              </Box>
              {/*<Box className="statement_title green">
              <Typography className="statement_text green">
                You have made great progress on the organizational statements
              </Typography>
            </Box>*/}
              <Box className="progress_tracker_tab_container">
                <Tabs
                  className="predictors_tab"
                  value={ value }
                  onChange={ handleChange }
                  centered
                >
                  <Tab label="Goals" />
                  <Tab label="All" />
                </Tabs>
                { value === 0 ? (
                  <>
                    <Stack className="leaderboard_graph_tab">
                      <Box
                        className={ `stat_container mt ${ showGraphOption === "v&c" ? "active" : ""
                          }` }
                        onClick={ () => {
                          handleGraphOption( "v&c" );
                        } }
                      >
                        <Typography className="stat_title">
                          Volume & Consistency
                        </Typography>
                      </Box>
                      <Box
                        className={ `stat_container mt ${ showGraphOption === "q&t" ? "active" : ""
                          }` }
                        onClick={ () => {
                          handleGraphOption( "q&t" );
                        } }
                      >
                        <Typography className="stat_title">
                          Quality & Completeness
                        </Typography>
                      </Box>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Stack className="leaderboard_graph_tab">
                      <Box
                        className={ `stat_container mt ${ showGraphOption === "v&c" ? "active" : ""
                          }` }
                        onClick={ () => {
                          handleGraphOption( "v&c" );
                        } }
                      >
                        <Typography className="stat_title">
                          Volume & Consistency
                        </Typography>
                      </Box>
                      <Box
                        className={ `stat_container mt ${ showGraphOption === "q&t" ? "active" : ""
                          }` }
                        onClick={ () => {
                          handleGraphOption( "q&t" );
                        } }
                      >
                        <Typography className="stat_title">
                          Quality & Thoroughness
                        </Typography>
                      </Box>
                    </Stack>
                  </>
                ) }
              </Box>
              <Box className="progress_tracker_graph_container">
                { showGraphOption === "v&c" ? (
                  <Box className="vc_container">
                    <Box className="predictors_bar_graph_container progresstracker_bar_graph_container">
                      <ManagementVolumeConsistencyGraph value={ value } orgDashboard={ orgDashboard } />
                    </Box>
                    <Box className="progresstracker_graph_data_container">
                      <Stack className="graph_legend_container">
                        <Stack className="graph_legend_inner_flex">
                          <Box className="graph_legend_box sky_blue"></Box>
                          <Typography className="graph_legend_text">
                            Volume
                          </Typography>
                        </Stack>
                        <Stack className="graph_legend_inner_flex">
                          <Box>
                            <img
                              src="/images/icons/management-consistency.svg"
                              alt="consistency"
                              width="15px"
                              height="14px"
                            />
                          </Box>
                          <Typography className="graph_legend_text">
                            Consistency
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                ) : (
                  <Box className="qt_container">
                    <Box className="predictors_bar_graph_container progresstracker_bar_graph_container">
                      <ManagementQualityThoroughnessGraph value={ value } orgDashboard={ orgDashboard } />
                    </Box>
                    <Box className="progresstracker_graph_data_container">
                      <Stack className="graph_legend_container">
                        <Stack className="graph_legend_inner_flex">
                          <Box className="graph_legend_box light_green"></Box>
                          <Typography className="graph_legend_text">
                            Quality
                          </Typography>
                        </Stack>
                        <Stack className="graph_legend_inner_flex">
                          <Box>
                            <img
                              src="/images/icons/leaderboard-thoroughness.svg"
                              alt="leaderboard thoroughness"
                              width="15px"
                              height="14px"
                            />
                          </Box>
                          <Typography className="graph_legend_text">
                            Completeness
                          </Typography>
                        </Stack>
                      </Stack>
                    </Box>
                  </Box>
                ) }
              </Box>
            </Box>
            <Box className="dashboardv2_container dev_container management_dev_container">
              <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>

                <Typography className="dashboardv2_sub_title">Capabilities addressed​</Typography>
                <Box style={ { display: 'inline-block', marginRight: "16px" } } >
                  <DashTooltip openOn="DevTool" value="Capabilities addressed as Employees work on their goals.​" />

                  {/*<Tooltip
                    open={ open === "DevTool" }
                    onClose={ handleTooltipClose }
                    title="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                    arrow
                    disableTouchListener
                    placement="bottom-end"
                  >
                    <img
                      src="/images/more-info.png"
                      alt="more info"
                      width={ 20 }
                      height={ 20 }
                      style={ { cursor: "pointer" } }
                      onClick={ () => handleTooltipOpen( "DevTool" ) }
                      onMouseEnter={ () =>
                        handleTooltipOpen( "DevTool" )
                      }
                    />
                  </Tooltip>*/}
                </Box>
              </Box>
              {/* <Box className="statement_title red">
                <Typography className="statement_text red">
                  The quality of conversation responses have decreased by 10%
                </Typography>
              </Box> */}
              <Box className="table_container">
                <Stack className="table_heading_container">
                  <Typography className="table_heading flex_2">
                    Capabilities
                  </Typography>
                  <Typography className="table_heading flex_1">
                    No. of Employees
                  </Typography>
                  <Typography className="table_heading flex_1">
                    No of Goals
                  </Typography>
                </Stack>
                <Box className="table_content_container_mg">
                  <Common mapData={ orgDashboard?.devAreaMap } from={ "Manager" } />

                </Box>
              </Box>
            </Box>
          </Stack>
          {/*<Stack className="dashboardv2_flex">
          <Box className="dashboardv2_container goals_container">
            <Typography className="dashboardv2_sub_title">
              Recent Goals
            </Typography>
            <Box className="goals_content_container">
              <Box className="goal_circular_progress_flex">
                <Box className="goal_circular_progress goal1">
                  <CircularProgressbar
                    value={ 80 }
                    styles={ { path: { stroke: `url(#goal1)`, height: "100%" } } }
                  />
                  <LinearGradient
                    cssId={ "goal1" }
                    startColor={ "#21C262" }
                    endColor={ "#9FE7BC" }
                  />
                </Box>
                <Typography className="goal_text">
                  Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu
                  diam nulla.
                </Typography>
              </Box>
              <Box className="goal_circular_progress_flex">
                <Box className="goal_circular_progress goal1">
                  <CircularProgressbar
                    value={ 50 }
                    styles={ { path: { stroke: `url(#goal2)`, height: "100%" } } }
                  />
                  <LinearGradient
                    cssId={ "goal2" }
                    startColor={ "#FFBF00" }
                    endColor={ "#FFECB1" }
                  />
                </Box>
                <Typography className="goal_text">
                  Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu
                  diam nulla.
                </Typography>
              </Box>
              <Box className="goal_circular_progress_flex">
                <Box className="goal_circular_progress goal1">
                  <CircularProgressbar
                    value={ 50 }
                    styles={ { path: { stroke: `url(#goal2)`, height: "100%" } } }
                  />
                  <LinearGradient
                    cssId={ "goal2" }
                    startColor={ "#EE4412" }
                    endColor={ "#E29C88" }
                  />
                </Box>
                <Typography className="goal_text">
                  Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu
                  diam nulla.
                </Typography>
              </Box>
              <Box className="goal_circular_progress_flex">
                <Box className="goal_circular_progress">
                  <img
                    src="/images/icons/goal-completed.svg"
                    alt="goal completed"
                    width="30px"
                    height="30px"
                  />
                </Box>
                <Typography className="goal_text">
                  Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu
                  diam nulla.
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="dashboardv2_container achievements_container">
            <Typography className="dashboardv2_sub_title">
              Achievements
            </Typography>
            <Box className="achievements_content_container">
              <Box className="achievement_flex">
                <Box className="achievement_image_container">
                  <img
                    src="/images/icons/achievement.svg"
                    alt="achievement"
                    width="24px"
                    height="24px"
                  />
                </Box>
                <Typography className="achievement_text">
                  7 Days in a row
                </Typography>
              </Box>
              <Box className="achievement_flex">
                <Box className="achievement_image_container">
                  <img
                    src="/images/icons/achievement.svg"
                    alt="achievement"
                    width="24px"
                    height="24px"
                  />
                </Box>
                <Typography className="achievement_text">
                  10 Goals completed successfully within the timeframe
                </Typography>
              </Box>
            </Box>
          </Box>
        </Stack>*/}
        </> : <ManagerView managerDashboard={ managerDashboard } orgDashboard={ orgDashboard } from="org" /> }
      </Box>
    </>
  );
};
export default ManagementView;
