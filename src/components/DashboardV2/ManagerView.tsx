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
import { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import LinearGradient from "./LinearGradient";
import VolumeConsistencyGraph from "./VolumeConsistencyGraph";
import QualityThoroughnessGraph from "./QualityThoroughnessGraph";
import ManagerQualityThoroughnessGraph from "./ManagerQualityThoroughnessGraph";
import ManagerVolumeConsistencyGraph from "./ManagerVolumeConsistencyGraph";
import SelfView from "./SelfView";
import { fetchDashboardUserId } from "../../actions/dashboard/fetchDashboardUserId";
import Spinner from "../common/Spinner/Spinner";
import Common from "./Common";
import DashTooltip from "./DahTooltip";

const ManagerView = ( { activeClass, handleActiveClass, managerDashboard, orgDashboard, from }: any ) => {

  const [ clickedTeam, setClickedTeam ] = useState<any>( "team" );
  const [ active, setActive ] = useState<any>( "team" );
  const [ value, setValue ] = useState<any>( 0 );
  const [ showGraphOption, setGraphOption ] = useState<any>( "v&c" );
  const [ showQualityGraph, setQualityGraph ] = useState<any>( true );
  const [ showThoroughnessGraph, setThoroughnessGraph ] = useState<any>( true );
  const [ nameTooltip, setNameTooltip ] = useState<any>( false );
  const [ open, setOpen ] = useState( "" );
  const [ benefitTab, setBenefitTab ] = useState( 0 );


  let grpah = <div>
    <span><span style={ { fontWeight: "bold" } }>Goals:</span> Prep completed across all Goals.</span>
    <br />
    <span> <span style={ { fontWeight: "bold" } }>All:</span> Prep completed across all Goals, Tools and Events.</span>
  </div>
  let mgrtool = <div>
    <span><span style={ { fontWeight: "bold" } }>Benefits for Direct Reports:</span> What the Direct Reports stand to gain when they achieve their goals.​</span>
    <br />
    <span> <span style={ { fontWeight: "bold" } }>Outcomes for the organization​:</span> What the organization stands to gain when the Direct Reports achieve their goals.​</span>
  </div>
  console.log( managerDashboard, "managerDashboard" );
  const handleClickedTeam = ( clickedValue: any ) => {
    setClickedTeam( clickedValue );
  };

  const handleActive = ( clickedId: any ) => {
    setActive( clickedId );
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

  const handleQualityGraph = ( event: any ) => {
    if ( event.currentTarget.classList.contains( "active" ) ) {
      event.currentTarget.classList.remove( "active" );
      setQualityGraph( false );
      if ( event.currentTarget.nextElementSibling.classList.contains( "active" ) ) {
      } else {
        event.currentTarget.nextElementSibling.classList.add( "active" );
        setThoroughnessGraph( true );
      }
    } else {
      event.currentTarget.classList.add( "active" );
      setQualityGraph( true );
    }
  };

  const handleThoroughnessGraph = ( event: any ) => {
    if ( event.currentTarget.classList.contains( "active" ) ) {
      event.currentTarget.classList.remove( "active" );
      setThoroughnessGraph( false );
      if (
        event.currentTarget.previousElementSibling.classList.contains( "active" )
      ) {
      } else {
        event.currentTarget.previousElementSibling.classList.add( "active" );
        setQualityGraph( true );
      }
    } else {
      event.currentTarget.classList.add( "active" );
      setThoroughnessGraph( true );
    }
  };

  const handleNameTooltipOpen = ( evt: any, value: any ) => {
    if ( value.length > 40 ) {
      setNameTooltip(
        value.length > 40 && evt.currentTarget.id === value ? value : false
      );
    } else {
      setNameTooltip( false );
    }
  };

  const handleNameTooltipClose = () => {
    setNameTooltip( false );
  };

  const [ selfDashboard, setSelfDashboard ] = useState<any>( null );
  const [ loading, setLoading ] = useState( false );

  const handleChipClick = async ( index: number, data: any ) => {
    setLoading( true );
    const response = await fetchDashboardUserId( { userId: data?.userId } );
    //@ts-ignore
    if ( response?.statusCode === 0 ) {
      //@ts-ignore
      setSelfDashboard( response?.response?.SELF );
      handleActive( index + '' );
      handleClickedTeam( data?.name );
    }
    setLoading( false );
  }
  console.log( active, "active" );


  const handleBenefitsChanges = ( event: any, newValue: any ) => {
    setBenefitTab( newValue );
  };

  return (
    <>
      <Box className="dashboardv2_section">
        { from === "main" && <Box className="dashboardv2_container myteam_container">
          <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>

            <Typography className="dashboardv2_sub_title">
              Your Direct Reports ({ managerDashboard?.individuals?.length })
            </Typography>

            <Box style={ { display: 'inline-block', marginRight: "16px" } } >
              {/*<DashTooltip openOn="Team" value="team" />*/ }

              {/*<Tooltip
                open={ open === "Team" }
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
                  onClick={ () => handleTooltipOpen( "Team" ) }
                  onMouseEnter={ () =>
                    handleTooltipOpen( "Team" )
                  }
                />
              </Tooltip>*/}
            </Box>
          </Box>
          <Stack className="team_flex">
            <Chip
              label="All Direct Reports"
              variant="outlined"
              className={ active === "team" ? "active" : "" }
              onClick={ () => {
                handleActive( "team" ), handleClickedTeam( "team" );
              } }
            />
            { managerDashboard?.individuals?.map( ( data: any, index: number ) => {
              return (
                <Chip
                  key={ index }
                  label={ data?.name }
                  variant="outlined"
                  className={ active === index + '' ? "active" : "" }
                  onClick={ () => {
                    handleChipClick( index, data );
                  } }
                />
              )
            } ) }


            {/*<Typography className="view_all_team">
              View All Employees
            </Typography>*/}
          </Stack>
        </Box> }
        { clickedTeam === "team" ? (
          ""
        ) : (
          <Typography className="dashboardv2_employee_name">
            { clickedTeam } Dashboard
          </Typography>
        ) }

        { loading ? <Spinner /> : clickedTeam === "team" ?
          <>
            <Box className="dashboardv2_container leaderboard_container">
              { clickedTeam === "team" ? (
                <>
                  <Box className="predictors_tab_container leaderboard_tab_container">
                    <Box style={ { justifyContent: 'space-between', alignItems: 'center' } }>
                      <Box style={ { display: 'flex', justifyContent: 'space-between', } }>
                        <Typography className="dashboardv2_sub_title">
                          Critical actions
                        </Typography>
                        <DashTooltip openOn="TargetedVolTool" value={ grpah } />

                      </Box>
                      <Box style={ { display: 'inline-block', marginRight: "16px", marginTop: "5px" } } >
                        {/*<DashTooltip openOn="TargetedVolTool" value="TargetedVolTool" />*/ }

                        {/*<Tooltip
                          open={ open === "TargetedVolTool" }
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
                            onClick={ () => handleTooltipOpen( "TargetedVolTool" ) }
                            onMouseEnter={ () =>
                              handleTooltipOpen( "TargetedVolTool" )
                            }
                          />
                        </Tooltip>*/}
                      </Box>
                    </Box>
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
                              Quality & Completeness
                            </Typography>
                          </Box>
                        </Stack>
                      </>
                    ) }
                  </Box>
                  <Stack className="predictors_flex leaderboard_flex">
                    {/*<Box className="leaderboard_table_container">
                      <Stack className="leaderboard_table_flex leaderboard_table_header">
                        <Typography className="leaderboard_table_header_text flex_2">
                          Employee Name
                        </Typography>
                        <Typography className="leaderboard_table_header_text flex_1">
                          Volume
                        </Typography>
                        <Typography className="leaderboard_table_header_text flex_1">
                          Consistency
                        </Typography>
                      </Stack>
                      <Box className="leaderboard_table_content_container">
                        { managerDashboard?.individuals?.map( ( data: any, index: number ) => {
                          return (
                            <Stack className="leaderboard_table_flex" key={ index }>
                              <Tooltip
                                title="Shwetal Shubhadeep"
                                placement="top"
                                arrow
                                open={ nameTooltip === "Shwetal Shubhadeep" }
                                onClose={ handleNameTooltipClose }
                                disableTouchListener
                              >
                                <Typography
                                  id="Shwetal Shubhadeep"
                                  className="leaderboard_table_data_text flex_2"
                                  onClick={ ( e ) =>
                                    handleNameTooltipOpen( e, "Shwetal Shubhadeep" )
                                  }
                                  onMouseEnter={ ( e ) =>
                                    handleNameTooltipOpen( e, "Shwetal Shubhadeep" )
                                  }
                                >
                                  { data?.name }

                                </Typography>
                              </Tooltip>
                              <Stack className="stat_inner_flex flex_1">
                                <img
                                  src="/images/icons/increase.svg"
                                  alt="increase"
                                  width="15px"
                                  height="28px"
                                />
                                <Typography className="stat_text green">
                                  10<span className="smaller">no's</span>
                                </Typography>
                              </Stack>
                              <Stack className="stat_inner_flex flex_1">
                                <img
                                  src="/images/icons/decrease.svg"
                                  alt="decrease"
                                  width="15px"
                                  height="28px"
                                />
                                <Typography className="stat_text red">20%</Typography>
                              </Stack>
                            </Stack>
                          )
                        } ) }

                      </Box>
                    </Box>*/}
                    <Box className="predictors_graph_container">
                      { showGraphOption === "v&c" ? (
                        <Box className="vc_container">
                          <Box className="graph_data_container">
                            <Stack className="graph_legend_containe">
                              <Stack className="graph_legend_inner_flex">
                                <Box className="graph_legend_box dark_purple"></Box>
                                <Typography className="graph_legend_text">
                                  Indv Volume
                                </Typography>
                              </Stack>
                              <Stack className="graph_legend_inner_flex">
                                <Box>
                                  <img
                                    src="/images/icons/consistency.svg"
                                    alt="consistency"
                                    width="15px"
                                    height="14px"
                                  />
                                </Box>
                                <Typography className="graph_legend_text">
                                  Indv Consistency
                                </Typography>
                              </Stack>
                              <Stack className="graph_legend_inner_flex">
                                <Box>
                                  <span className="line_legand dark_purple">
                                    <hr
                                      style={ {
                                        height: "10px",
                                        width: "30px",
                                        color: "purple",
                                        backgroundColor: "#A655C3"
                                      } }
                                    />
                                  </span>
                                </Box>
                                <Typography className="graph_legend_text">
                                  Org Volume
                                </Typography>
                              </Stack>
                              <Stack className="graph_legend_inner_flex">
                                <Box>
                                  <span className="line_legand dark_yellow">
                                    <hr
                                      style={ {
                                        height: "10px",
                                        width: "30px",
                                        color: "purple",
                                        backgroundColor: "#DEBD0F"
                                      } }
                                    />
                                  </span>
                                </Box>
                                <Typography className="graph_legend_text">
                                  Org Consistency
                                </Typography>
                              </Stack>
                            </Stack>
                          </Box>
                          <Box
                            className="predictors_bar_graph_container leaderboard_bar_graph_container"
                          >
                            <ManagerVolumeConsistencyGraph managerDashboard={ managerDashboard } value={ value } orgDashboard={ orgDashboard } />


                          </Box>
                        </Box>
                      ) : (
                        <Box className="qt_container">
                          <Box className="graph_data_container">
                            <Stack className="graph_legend_containe">
                              <Stack className="graph_legend_inner_flex">
                                <Box className="graph_legend_box light_yellow"></Box>
                                <Typography className="graph_legend_text">
                                  Indv Quality
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
                                  Indv Completeness
                                </Typography>
                              </Stack>
                              <Stack className="graph_legend_inner_flex">
                                <Box>
                                  <span className="line_legand qt">
                                    <hr
                                      style={ {
                                        height: "10px",
                                        width: "30px",
                                        color: "purple",
                                        backgroundColor: "#F58A43"
                                      } }
                                    />
                                  </span>
                                </Box>
                                <Typography className="graph_legend_text">
                                  Org Quality
                                </Typography>
                              </Stack>
                              <Stack className="graph_legend_inner_flex">
                                <Box>
                                  <span className="line_legand tt">
                                    <hr
                                      style={ {
                                        height: "10px",
                                        width: "30px",
                                        color: "purple",
                                        backgroundColor: "#E74649"
                                      } }
                                    />
                                  </span>
                                </Box>
                                <Typography className="graph_legend_text">
                                  Org Thoroughness
                                </Typography>
                              </Stack>
                            </Stack>
                          </Box>
                          <Box className="predictors_bar_graph_container leaderboard_bar_graph_container">
                            <ManagerQualityThoroughnessGraph managerDashboard={ managerDashboard } value={ value } orgDashboard={ orgDashboard } />
                          </Box>
                        </Box>
                      ) }
                    </Box>
                  </Stack>
                </>
              ) : (
                <></>
                //<Stack className="predictors_flex">
                //  <Box className="predictors_tab_container">
                //    <Typography className="dashboardv2_sub_title">
                //      Performance Predictors
                //    </Typography>
                //    <Tabs
                //      className="predictors_tab"
                //      value={ value }
                //      onChange={ handleChange }
                //      centered
                //    >
                //      <Tab label="Targeted" />
                //      <Tab label="Overall" />
                //    </Tabs>
                //    { value === 0 ? (
                //      <>
                //        <Stack
                //          className={ `stat_container mtb ${ showGraphOption === "v&c" ? "active" : ""
                //            }` }
                //          onClick={ () => {
                //            handleGraphOption( "v&c" );
                //          } }
                //        >
                //          <Typography className="stat_title">
                //            Volume & Consistency
                //          </Typography>
                //          <Stack className="stat_inner_container">
                //            <Tooltip
                //              title="Volume"
                //              placement="top"
                //              arrow
                //              open={ open === "volume" }
                //              onClose={ handleTooltipClose }
                //              disableTouchListener
                //            >
                //              <Stack
                //                id="volume"
                //                className="stat_inner_flex"
                //                onClick={ ( e ) => handleTooltipOpen( e, "volume" ) }
                //                onMouseEnter={ ( e ) => handleTooltipOpen( e, "volume" ) }
                //              >
                //                <img
                //                  src="/images/icons/increase.svg"
                //                  alt="increase"
                //                  width="15px"
                //                  height="28px"
                //                />
                //                <Typography className="stat_text green">
                //                  40<span className="smaller">nos</span>
                //                </Typography>
                //              </Stack>
                //            </Tooltip>
                //            <Tooltip
                //              title="Consistency"
                //              placement="top"
                //              arrow
                //              open={ open === "consistency" }
                //              onClose={ handleTooltipClose }
                //              disableTouchListener
                //            >
                //              <Stack
                //                id="consistency"
                //                className="stat_inner_flex"
                //                onClick={ ( e ) => handleTooltipOpen( e, "consistency" ) }
                //                onMouseEnter={ ( e ) =>
                //                  handleTooltipOpen( e, "consistency" )
                //                }
                //              >
                //                <img
                //                  src="/images/icons/decrease.svg"
                //                  alt="decrease"
                //                  width="15px"
                //                  height="28px"
                //                />
                //                <Typography className="stat_text red">
                //                  5%
                //                </Typography>
                //              </Stack>
                //            </Tooltip>
                //          </Stack>
                //        </Stack>
                //        <Stack
                //          className={ `stat_container mtb ${ showGraphOption === "q&t" ? "active" : ""
                //            }` }
                //          onClick={ () => {
                //            handleGraphOption( "q&t" );
                //          } }
                //        >
                //          <Typography className="stat_title">
                //            Quality & Thoroughness
                //          </Typography>
                //          <Stack className="stat_inner_container">
                //            <Tooltip
                //              title="Quality"
                //              placement="top"
                //              arrow
                //              open={ open === "quality" }
                //              onClose={ handleTooltipClose }
                //              disableTouchListener
                //            >
                //              <Stack
                //                id="quality"
                //                className="stat_inner_flex"
                //                onClick={ ( e ) => handleTooltipOpen( e, "quality" ) }
                //                onMouseEnter={ ( e ) =>
                //                  handleTooltipOpen( e, "quality" )
                //                }
                //              >
                //                <img
                //                  src="/images/icons/increase.svg"
                //                  alt="increase"
                //                  width="15px"
                //                  height="28px"
                //                />
                //                <Typography className="stat_text green">
                //                  50%
                //                </Typography>
                //              </Stack>
                //            </Tooltip>
                //            <Tooltip
                //              title="Thoroughness"
                //              placement="top"
                //              arrow
                //              open={ open === "thoroughness" }
                //              onClose={ handleTooltipClose }
                //              disableTouchListener
                //            >
                //              <Stack
                //                id="thoroughness"
                //                className="stat_inner_flex"
                //                onClick={ ( e ) =>
                //                  handleTooltipOpen( e, "thoroughness" )
                //                }
                //                onMouseEnter={ ( e ) =>
                //                  handleTooltipOpen( e, "thoroughness" )
                //                }
                //              >
                //                <img
                //                  src="/images/icons/decrease.svg"
                //                  alt="decrease"
                //                  width="15px"
                //                  height="28px"
                //                />
                //                <Typography className="stat_text red">
                //                  10%
                //                </Typography>
                //              </Stack>
                //            </Tooltip>
                //          </Stack>
                //        </Stack>
                //      </>
                //    ) : (
                //      <>
                //        <Stack
                //          className={ `stat_container mtb ${ showGraphOption === "v&c" ? "active" : ""
                //            }` }
                //          onClick={ () => {
                //            handleGraphOption( "v&c" );
                //          } }
                //        >
                //          <Typography className="stat_title">
                //            Volume & Consistency
                //          </Typography>
                //          <Stack className="stat_inner_container">
                //            <Tooltip
                //              title="Volume"
                //              placement="top"
                //              arrow
                //              open={ open === "volume" }
                //              onClose={ handleTooltipClose }
                //              disableTouchListener
                //            >
                //              <Stack
                //                id="volume"
                //                className="stat_inner_flex"
                //                onClick={ ( e ) => handleTooltipOpen( e, "volume" ) }
                //                onMouseEnter={ ( e ) => handleTooltipOpen( e, "volume" ) }
                //              >
                //                <img
                //                  src="/images/icons/increase.svg"
                //                  alt="increase"
                //                  width="15px"
                //                  height="28px"
                //                />
                //                <Typography className="stat_text green">
                //                  40<span className="smaller">nos</span>
                //                </Typography>
                //              </Stack>
                //            </Tooltip>
                //            <Tooltip
                //              title="Consistency"
                //              placement="top"
                //              arrow
                //              open={ open === "consistency" }
                //              onClose={ handleTooltipClose }
                //              disableTouchListener
                //            >
                //              <Stack
                //                id="consistency"
                //                className="stat_inner_flex"
                //                onClick={ ( e ) => handleTooltipOpen( e, "consistency" ) }
                //                onMouseEnter={ ( e ) =>
                //                  handleTooltipOpen( e, "consistency" )
                //                }
                //              >
                //                <img
                //                  src="/images/icons/decrease.svg"
                //                  alt="decrease"
                //                  width="15px"
                //                  height="28px"
                //                />
                //                <Typography className="stat_text red">
                //                  5%
                //                </Typography>
                //              </Stack>
                //            </Tooltip>
                //          </Stack>
                //        </Stack>
                //        <Stack
                //          className={ `stat_container mtb ${ showGraphOption === "q&t" ? "active" : ""
                //            }` }
                //          onClick={ () => {
                //            handleGraphOption( "q&t" );
                //          } }
                //        >
                //          <Typography className="stat_title">
                //            Quality & Thoroughness
                //          </Typography>
                //          <Stack className="stat_inner_container">
                //            <Tooltip
                //              title="Quality"
                //              placement="top"
                //              arrow
                //              open={ open === "quality" }
                //              onClose={ handleTooltipClose }
                //              disableTouchListener
                //            >
                //              <Stack
                //                id="quality"
                //                className="stat_inner_flex"
                //                onClick={ ( e ) => handleTooltipOpen( e, "quality" ) }
                //                onMouseEnter={ ( e ) =>
                //                  handleTooltipOpen( e, "quality" )
                //                }
                //              >
                //                <img
                //                  src="/images/icons/increase.svg"
                //                  alt="increase"
                //                  width="15px"
                //                  height="28px"
                //                />
                //                <Typography className="stat_text green">
                //                  50%
                //                </Typography>
                //              </Stack>
                //            </Tooltip>
                //            <Tooltip
                //              title="Thoroughness"
                //              placement="top"
                //              arrow
                //              open={ open === "thoroughness" }
                //              onClose={ handleTooltipClose }
                //              disableTouchListener
                //            >
                //              <Stack
                //                id="thoroughness"
                //                className="stat_inner_flex"
                //                onClick={ ( e ) =>
                //                  handleTooltipOpen( e, "thoroughness" )
                //                }
                //                onMouseEnter={ ( e ) =>
                //                  handleTooltipOpen( e, "thoroughness" )
                //                }
                //              >
                //                <img
                //                  src="/images/icons/decrease.svg"
                //                  alt="decrease"
                //                  width="15px"
                //                  height="28px"
                //                />
                //                <Typography className="stat_text red">
                //                  10%
                //                </Typography>
                //              </Stack>
                //            </Tooltip>
                //          </Stack>
                //        </Stack>
                //      </>
                //    ) }
                //  </Box>
                //  <Box className="predictors_graph_container">
                //    { showGraphOption === "v&c" ? (
                //      <Box className="vc_container">
                //        <Stack className="graph_data_container">
                //          <Stack className="graph_legend_container">
                //            <Stack className="graph_legend_inner_flex">
                //              <Box className="graph_legend_box purple"></Box>
                //              <Typography className="graph_legend_text">
                //                Volume
                //              </Typography>
                //            </Stack>
                //            <Stack className="graph_legend_inner_flex">
                //              <Box>
                //                <span className="line_legand purple">- - -</span>
                //              </Box>
                //              <Typography className="graph_legend_text">
                //                Org Average
                //              </Typography>
                //            </Stack>
                //          </Stack>
                //          <Stack className="graph_legend_container">
                //            <Box className="graph_overall_container">
                //              <Typography className="graph_legend_sub_title">
                //                Overall Score
                //              </Typography>
                //              <Typography className="graph_legend_text regular">
                //                Org - Consistency -{ " " }
                //                <span className="bold green">20%</span>
                //              </Typography>
                //              <Typography className="graph_legend_text regular">
                //                Individual - Consistency -{ " " }
                //                <span className="bold green">20%</span>
                //              </Typography>
                //            </Box>
                //            <Box className="graph_past_week_container">
                //              <Typography className="graph_legend_sub_title">
                //                Past 8 Week Score
                //              </Typography>
                //              <Typography className="graph_legend_text regular">
                //                Org - Consistency -{ " " }
                //                <span className="bold green">20%</span>
                //              </Typography>
                //              <Typography className="graph_legend_text regular">
                //                Individual - Consistency -{ " " }
                //                <span className="bold green">20%</span>
                //              </Typography>
                //            </Box>
                //          </Stack>
                //        </Stack>
                //        <Box className="predictors_bar_graph_container">
                //          <VolumeConsistencyGraph />
                //        </Box>
                //      </Box>
                //    ) : (
                //      <Box className="qt_container">
                //        <Stack className="graph_data_container">
                //          <Stack className="graph_legend_container">
                //            <Stack
                //              className="graph_legend_inner_flex cursor active"
                //              onClick={ handleQualityGraph }
                //            >
                //              <Box className="graph_legend_box blue"></Box>
                //              <Typography className="graph_legend_text">
                //                Quality
                //              </Typography>
                //            </Stack>
                //            <Stack
                //              className="graph_legend_inner_flex cursor active"
                //              onClick={ handleThoroughnessGraph }
                //            >
                //              <Box>
                //                <img
                //                  src="/images/icons/thoroughness.svg"
                //                  alt="thoroughness"
                //                  width="15px"
                //                  height="14px"
                //                />
                //              </Box>
                //              <Typography className="graph_legend_text">
                //                Thoroughness
                //              </Typography>
                //            </Stack>
                //          </Stack>
                //          <Box className="graph_overall_legend_container">
                //            <Stack className="graph_qt_container">
                //              <Typography className="graph_legend_sub_title">
                //                Overall Score
                //              </Typography>
                //              <Box className="graph_qt_overall_container">
                //                <Stack className="graph_qt_overall_flex">
                //                  <Typography className="graph_legend_text regular">
                //                    Quality
                //                  </Typography>
                //                  <Box className="qt_progress_bar_container">
                //                    <LinearProgress
                //                      variant="determinate"
                //                      value={ 80 }
                //                      sx={ {
                //                        height: "6px",
                //                        borderRadius: "24px",
                //                        "& .MuiLinearProgress-bar": {
                //                          backgroundColor: "#1BAD70",
                //                        },
                //                      } }
                //                    />
                //                  </Box>
                //                  <span className="graph_qt_legend_text green">
                //                    80%
                //                  </span>
                //                </Stack>
                //                <Stack className="graph_qt_overall_flex">
                //                  <Typography className="graph_legend_text regular">
                //                    Thoroughness
                //                  </Typography>
                //                  <Box className="qt_progress_bar_container">
                //                    <LinearProgress
                //                      variant="determinate"
                //                      value={ 70 }
                //                      sx={ {
                //                        height: "6px",
                //                        borderRadius: "24px",
                //                        "& .MuiLinearProgress-bar": {
                //                          backgroundColor: "#1BAD70",
                //                        },
                //                      } }
                //                    />
                //                  </Box>
                //                  <span className="graph_qt_legend_text green">
                //                    70%
                //                  </span>
                //                </Stack>
                //              </Box>
                //            </Stack>
                //            <Stack className="line_graph_legand_container">
                //              { showQualityGraph === true ? (
                //                <Stack className="graph_legend_inner_flex">
                //                  <Box>
                //                    <span className="line_legand blue">- - -</span>
                //                  </Box>
                //                  <Typography className="graph_legend_text">
                //                    Org Quality Average
                //                  </Typography>
                //                </Stack>
                //              ) : (
                //                ""
                //              ) }
                //              { showThoroughnessGraph === true ? (
                //                <Stack className="graph_legend_inner_flex">
                //                  <Box>
                //                    <span className="line_legand purple">
                //                      - - -
                //                    </span>
                //                  </Box>
                //                  <Typography className="graph_legend_text">
                //                    Org Thoroughness Average
                //                  </Typography>
                //                </Stack>
                //              ) : (
                //                ""
                //              ) }
                //            </Stack>
                //          </Box>
                //        </Stack>
                //        <Box className="predictors_bar_graph_container">
                //          <QualityThoroughnessGraph
                //            showQualityGraph={ showQualityGraph }
                //            showThoroughnessGraph={ showThoroughnessGraph }
                //          />
                //        </Box>
                //      </Box>
                //    ) }
                //  </Box>
                //</Stack>
              ) }
            </Box>
            <Stack className="dashboardv2_flex mtb">
              <Box className="dashboardv2_container benefit_container">
                <Box style={ { justifyContent: 'space-between', alignItems: 'center' } }>
                  <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                    <Typography className="dashboardv2_sub_title">
                      Impact
                    </Typography>
                    <Box style={ { display: 'inline-block', marginRight: "16px" } } >
                      <DashTooltip openOn="OrgProgress" value={ mgrtool } />
                    </Box>
                  </Box>
                  <Tabs className="predictors_tab" value={ benefitTab } onChange={ handleBenefitsChanges } centered>
                    <Tab label="Benefits for Direct Reports" />
                    <Tab label="Outcome for the organisation" />
                  </Tabs>
                  { benefitTab === 0 ?
                    <>
                      <Box className="table_container">
                        <Stack className="table_heading_container">
                          <Typography className="table_heading flex_2">
                            Benefits
                          </Typography>
                          <Typography className="table_heading flex_1">No. of Direct Reports</Typography>
                          <Typography className="table_heading flex_1">
                            No of Goals
                          </Typography>
                        </Stack>
                        <Box className="table_content_container">
                          <Common mapData={ managerDashboard?.benefitMap } from={ "Manager" } />
                        </Box>
                      </Box>
                    </> :
                    <>
                      <Box className="table_container">
                        <Stack className="table_heading_container">
                          <Typography className="table_heading flex_2">
                            Outcomes
                          </Typography>
                          <Typography className="table_heading flex_1">No. of Direct Reports</Typography>
                          <Typography className="table_heading flex_1">
                            No of Goals
                          </Typography>
                        </Stack>
                        <Box className="table_content_container">
                          <Common mapData={ managerDashboard?.purposeMap } from={ "Manager" } />
                        </Box>
                      </Box>
                    </> }

                  <Box style={ { display: 'inline-block', marginRight: "16px" } } >
                    {/*<DashTooltip openOn="BenifitTool" value="BenifitTool" />*/ }

                    {/*<Tooltip
                      open={ open === "BenifitTool" }
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
                        onClick={ () => handleTooltipOpen( "BenifitTool" ) }
                        onMouseEnter={ () =>
                          handleTooltipOpen( "BenifitTool" )
                        }
                      />
                    </Tooltip>*/}
                  </Box>
                </Box>
                {/* <Box className="statement_title green">
                  <Typography className="statement_text green">
                    You have made great progress on the organizational statements
                  </Typography>
                </Box> */}

              </Box>
              <Box className="dashboardv2_container dev_container">
                <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                  <Typography className="dashboardv2_sub_title" style={ { display: 'inline-block' } }>
                    Capabilities addressed
                  </Typography>
                  <Box style={ { display: 'inline-block', marginRight: "16px" } } >
                    <DashTooltip openOn="DevTool" value="Capabilities addressed as Direct Report work on their goals." />

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
                      No. of Direct Reports
                    </Typography>
                    <Typography className="table_heading flex_1">
                      No of Goals
                    </Typography>
                  </Stack>
                  <Box className="table_content_container">
                    <Common mapData={ managerDashboard?.devAreaMap } from={ "Manager" } />
                  </Box>
                  {/*<Box className="table_content_container">
                <Stack className="table_data_container">
                  <Typography className="table_data flex_2">
                    Maximize Profitability
                  </Typography>
                  <Box className="table_data_progress_bar flex_1">
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
                  </Box>
                  <Typography className="table_data flex_1">5</Typography>
                </Stack>
                <Stack className="table_data_container">
                  <Typography className="table_data flex_2">
                    Organizational Development Goals
                  </Typography>
                  <Box className="table_data_progress_bar flex_1">
                    <LinearProgress
                      variant="determinate"
                      value={ 50 }
                      sx={ {
                        height: "6px",
                        borderRadius: "24px",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#DEBD0F",
                        },
                      } }
                    />
                  </Box>
                  <Typography className="table_data flex_1">6</Typography>
                </Stack>
                <Stack className="table_data_container">
                  <Typography className="table_data flex_2">
                    Growth Management
                  </Typography>
                  <Box className="table_data_progress_bar flex_1">
                    <LinearProgress
                      variant="determinate"
                      value={ 30 }
                      sx={ {
                        height: "6px",
                        borderRadius: "24px",
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#E74649",
                        },
                      } }
                    />
                  </Box>
                  <Typography className="table_data flex_1">25</Typography>
                </Stack>
              </Box>*/}
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
                    value={80}
                    styles={{ path: { stroke: `url(#goal1)`, height: "100%" } }}
                  />
                  <LinearGradient
                    cssId={"goal1"}
                    startColor={"#21C262"}
                    endColor={"#9FE7BC"}
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
                    value={50}
                    styles={{ path: { stroke: `url(#goal2)`, height: "100%" } }}
                  />
                  <LinearGradient
                    cssId={"goal2"}
                    startColor={"#FFBF00"}
                    endColor={"#FFECB1"}
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
                    value={50}
                    styles={{ path: { stroke: `url(#goal2)`, height: "100%" } }}
                  />
                  <LinearGradient
                    cssId={"goal2"}
                    startColor={"#EE4412"}
                    endColor={"#E29C88"}
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
          </> : <SelfView selfDashboard={ selfDashboard } value={ value } orgDashboard={ orgDashboard } />
        }
      </Box >
    </>
  );
};
export default ManagerView;
