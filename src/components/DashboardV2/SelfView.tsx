import {
  Box,
  LinearProgress,
  Stack,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  Fade,
} from "@mui/material";
import { useEffect, useState } from "react";
import VolumeConsistencyGraph from "./VolumeConsistencyGraph";
import QualityThoroughnessGraph from "./QualityThoroughnessGraph";
import { CircularProgressbar } from "react-circular-progressbar";
import LinearGradient from "../DashboardV2/LinearGradient";
import { Value } from "sass";
import Common from "./Common";
import DashTooltip from "./DahTooltip";

const SelfView = ( { activeClass, handleActiveClass, selfDashboard, orgDashboard }: any ) => {
  const [ value, setValue ] = useState<any>( 0 );
  const [ showGraphOption, setGraphOption ] = useState<any>( "v&c" );
  const [ open, setOpen ] = useState( "" );
  const [ showQualityGraph, setQualityGraph ] = useState<any>( true );
  const [ showThoroughnessGraph, setThoroughnessGraph ] = useState<any>( true );
  const [ volandCon, setVolandCon ] = useState<any>( selfDashboard?.targetVolume );
  const [ qualityData, setQualityData ] = useState<any>( selfDashboard?.targetQuality );
  const [ benefitTab, setBenefitTab ] = useState( 0 );
  let grpah = <div>
    <span><span style={ { fontWeight: "bold" } }>Goals:</span> Prep completed across all Goals.</span>
    <br />
    <span> <span style={ { fontWeight: "bold" } }>All:</span> Prep completed across all Goals, Tools and Events.</span>
  </div>
  let mgrtool = <div>
    <span><span style={ { fontWeight: "bold" } }>Benefits for you​​:</span> What you stand to gain when you achieve your goals.</span>
    <br />
    <span> <span style={ { fontWeight: "bold" } }>Outcomes for the organization​:</span> What the organization stands to gain when you achieve your goals.</span>
  </div>
  const handleTooltipOpen = ( value: any ) => {
    setOpen(
      value
    );
  };
  const handleTooltipClose = () => {
    //@ts-ignore
    setOpen( false );
  };

  console.log( "selfDashboard", orgDashboard );


  const handleChange = ( event: any, newValue: any ) => {
    setValue( newValue );
  };
  const handleBenefitsChanges = ( event: any, newValue: any ) => {
    setBenefitTab( newValue );
  };
  useEffect( () => {
    if ( value === 0 ) {
      setVolandCon( selfDashboard?.targetVolume );
      setQualityData( selfDashboard?.targetQuality );
    } else {
      setVolandCon( selfDashboard?.overAllVolume );
      setQualityData( selfDashboard?.overAllQuality );
    }
  }, [ value, selfDashboard ] )
  console.log( setQualityData, "setQualityData" )

  const handleGraphOption = ( clickedOption: any ) => {
    setGraphOption( clickedOption ? clickedOption : false );
  }

  const handleQualityGraph = ( event: any ) => {
    if ( event.currentTarget.classList.contains( 'active' ) ) {
      event.currentTarget.classList.remove( 'active' );
      setQualityGraph( false );
      if ( event.currentTarget.nextElementSibling.classList.contains( 'active' ) ) {

      }
      else {
        event.currentTarget.nextElementSibling.classList.add( 'active' );
        setThoroughnessGraph( true );
      }
    } else {
      event.currentTarget.classList.add( 'active' );
      setQualityGraph( true );
    }
  };

  const handleThoroughnessGraph = ( event: any ) => {
    if ( event.currentTarget.classList.contains( 'active' ) ) {
      event.currentTarget.classList.remove( 'active' );
      setThoroughnessGraph( false );
      if ( event.currentTarget.previousElementSibling.classList.contains( 'active' ) ) {

      }
      else {
        event.currentTarget.previousElementSibling.classList.add( 'active' );
        setQualityGraph( true );
      }
    } else {
      event.currentTarget.classList.add( 'active' );
      setThoroughnessGraph( true );
    }
  };

  return (
    <>
      <Box className="dashboardv2_section">
        <Box className="dashboardv2_container predictors_container">
          <Stack className="predictors_flex">
            <Box className="predictors_tab_container">
              <Box sx={ { justifyContent: "space-between", display: "flex" } }>
                <Typography className="dashboardv2_sub_title">Critical actions</Typography>
                <DashTooltip openOn="TargetedVolTool" value={ grpah } />

              </Box>
              <Tabs className="predictors_tab" value={ value } onChange={ handleChange } centered>
                <Tab label="Goals" />
                <Tab label="All" />
              </Tabs>
              { value === 0
                ?
                <>
                  <Stack className={ `stat_container mtb ${ showGraphOption === "v&c" ? "active" : "" }` } onClick={ () => { handleGraphOption( "v&c" ) } }>
                    <Typography className="stat_title">Volume & Consistency</Typography>
                    {/*<Stack className="stat_inner_container">
                      <Tooltip
                        title="Volume"
                        placement="top"
                        arrow
                        open={ open === "volume" }
                        onClose={ handleTooltipClose }
                        disableTouchListener
                      >
                        <Stack
                        <Stack
                          id="volume"
                          className="stat_inner_flex"
                          onClick={ ( e ) => handleTooltipOpen( e, "volume" ) }
                          onMouseEnter={ ( e ) => handleTooltipOpen( e, "volume" ) }
                        >
                          <img
                            src="/images/icons/increase.svg"
                            alt="increase"
                            width="15px"
                            height="28px"
                          />
                          <Typography className="stat_text green">
                            40<span className="smaller">no's</span>
                          </Typography>
                        </Stack>
                      </Tooltip>
                      <Tooltip
                        title="Consistency"
                        placement="top"
                        arrow
                        open={ open === "consistency" }
                        onClose={ handleTooltipClose }
                        disableTouchListener
                      >
                        <Stack
                        <Stack
                          id="consistency"
                          className="stat_inner_flex"
                          onClick={ ( e ) => handleTooltipOpen( e, "consistency" ) }
                          onMouseEnter={ ( e ) => handleTooltipOpen( e, "consistency" ) }
                        >
                          <img
                            src="/images/icons/decrease.svg"
                            alt="decrease"
                            width="15px"
                            height="28px"
                          />
                          <Typography className="stat_text red">5%</Typography>
                        </Stack>
                      </Tooltip>
                    </Stack>*/}
                  </Stack>
                  <Stack className={ `stat_container mtb ${ showGraphOption === "q&t" ? "active" : "" }` } onClick={ () => { handleGraphOption( "q&t" ) } }>
                    <Typography className="stat_title">Quality & Completeness</Typography>
                    {/*<Stack className="stat_inner_container">
                      <Tooltip
                        title="Quality"
                        placement="top"
                        arrow
                        open={ open === "quality" }
                        onClose={ handleTooltipClose }
                        disableTouchListener
                      >
                        <Stack
                          id="quality"
                          className="stat_inner_flex"
                          onClick={ ( e ) => handleTooltipOpen( e, "quality" ) }
                          onMouseEnter={ ( e ) => handleTooltipOpen( e, "quality" ) }
                        >
                          <img src="/images/icons/increase.svg" alt="increase" width="15px" height="28px" />
                          <Typography className="stat_text green">50%</Typography>
                        </Stack>
                      </Tooltip>
                      <Tooltip
                        title="Thoroughness"
                        placement="top"
                        arrow
                        open={ open === "thoroughness" }
                        onClose={ handleTooltipClose }
                        disableTouchListener
                      >
                        <Stack
                          id="thoroughness"
                          className="stat_inner_flex"
                          onClick={ ( e ) => handleTooltipOpen( e, "thoroughness" ) }
                          onMouseEnter={ ( e ) => handleTooltipOpen( e, "thoroughness" ) }
                        >
                          <img src="/images/icons/decrease.svg" alt="decrease" width="15px" height="28px" />
                          <Typography className="stat_text red">10%</Typography>
                        </Stack>
                      </Tooltip>
                    </Stack>*/}
                  </Stack>
                </>
                :
                <>
                  <Stack className={ `stat_container mtb ${ showGraphOption === "v&c" ? "active" : "" }` } onClick={ () => { handleGraphOption( "v&c" ) } }>
                    <Typography className="stat_title">Volume & Consistency</Typography>
                    {/*<Stack className="stat_inner_container">
                      <Tooltip
                        title="Volume"
                        placement="top"
                        arrow
                        open={ open === "volume" }
                        onClose={ handleTooltipClose }
                        disableTouchListener
                      >
                        <Stack
                        <Stack
                          id="volume"
                          className="stat_inner_flex"
                          onClick={ ( e ) => handleTooltipOpen( e, "volume" ) }
                          onMouseEnter={ ( e ) => handleTooltipOpen( e, "volume" ) }
                        >
                          <img
                            src="/images/icons/increase.svg"
                            alt="increase"
                            width="15px"
                            height="28px"
                          />
                          <Typography className="stat_text green">
                            40<span className="smaller">no's</span>
                          </Typography>
                        </Stack>
                      </Tooltip>
                      <Tooltip
                        title="Consistency"
                        placement="top"
                        arrow
                        open={ open === "consistency" }
                        onClose={ handleTooltipClose }
                        disableTouchListener
                      >
                        <Stack
                        <Stack
                          id="consistency"
                          className="stat_inner_flex"
                          onClick={ ( e ) => handleTooltipOpen( e, "consistency" ) }
                          onMouseEnter={ ( e ) => handleTooltipOpen( e, "consistency" ) }
                        >
                          <img
                            src="/images/icons/decrease.svg"
                            alt="decrease"
                            width="15px"
                            height="28px"
                          />
                          <Typography className="stat_text red">5%</Typography>
                        </Stack>
                      </Tooltip>
                    </Stack>*/}
                  </Stack>
                  <Stack className={ `stat_container mtb ${ showGraphOption === "q&t" ? "active" : "" }` } onClick={ () => { handleGraphOption( "q&t" ) } }>
                    <Typography className="stat_title">Quality & Completeness</Typography>
                    {/*<Stack className="stat_inner_container">
                      <Tooltip
                        title="Quality"
                        placement="top"
                        arrow
                        open={ open === "quality" }
                        onClose={ handleTooltipClose }
                        disableTouchListener
                      >
                        <Stack
                          id="quality"
                          className="stat_inner_flex"
                          onClick={ ( e ) => handleTooltipOpen( e, "quality" ) }
                          onMouseEnter={ ( e ) => handleTooltipOpen( e, "quality" ) }
                        >
                          <img src="/images/icons/increase.svg" alt="increase" width="15px" height="28px" />
                          <Typography className="stat_text green">50%</Typography>
                        </Stack>
                      </Tooltip>
                      <Tooltip
                        title="Thoroughness"
                        placement="top"
                        arrow
                        open={ open === "thoroughness" }
                        onClose={ handleTooltipClose }
                        disableTouchListener
                      >
                        <Stack
                          id="thoroughness"
                          className="stat_inner_flex"
                          onClick={ ( e ) => handleTooltipOpen( e, "thoroughness" ) }
                          onMouseEnter={ ( e ) => handleTooltipOpen( e, "thoroughness" ) }
                        >
                          <img src="/images/icons/decrease.svg" alt="decrease" width="15px" height="28px" />
                          <Typography className="stat_text red">10%</Typography>
                        </Stack>
                      </Tooltip>
                    </Stack>*/}
                  </Stack>
                </>
              }
            </Box>
            <Box className="predictors_graph_container">
              { showGraphOption === "v&c"
                ?
                <Box className="vc_container">
                  <Stack className="graph_data_container">
                    <Stack className="graph_legend_container">
                      <Stack className="graph_legend_inner_flex">
                        <Box className="graph_legend_box purple"></Box>
                        <Typography className="graph_legend_text">
                          Your Volume
                        </Typography>
                      </Stack>
                      <Stack className="graph_legend_inner_flex">
                        <Box>
                          <span className="line_legand purple"> <hr
                            style={ {
                              height: "10px",
                              width: "30px",
                              color: "purple",
                              backgroundColor: "#2E5DB0"
                            } }
                          /></span>
                        </Box>
                        <Typography className="graph_legend_text">
                          Org Volume
                        </Typography>
                      </Stack>
                    </Stack>
                    <Stack className="graph_legend_container">
                      <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>

                        <Box className="graph_overall_container" sx={ { marginRight: "20px" } }>
                          <Typography className="graph_legend_sub_title">
                            {/*{ value === 0 ? "Targeted" : "Overall" } Score*/ }
                            Till Date
                          </Typography>
                          <Typography className="graph_legend_text regular">
                            Individual - Consistency -{ " " }
                            <span className="bold green">{ value == 0 ? selfDashboard?.targetConsistency : selfDashboard?.overAllConsistency }%</span>
                          </Typography>
                          <Typography className="graph_legend_text regular">
                            Org - Consistency -{ " " }
                            <span className="bold green">{ value === 0 ? orgDashboard?.targetConsistency : orgDashboard?.overAllConsistency }%</span>
                          </Typography>

                        </Box>

                        <Box className="graph_past_week_container" style={ { display: 'inline-block' } }>
                          <Typography className="graph_legend_sub_title">
                            Past 8 Week
                          </Typography>
                          <Typography className="graph_legend_text regular">
                            Individual - Consistency -{ " " }
                            <span className="bold green">{ value == 0 ? selfDashboard?.targetConsistencyXDays : selfDashboard?.overAllConsistencyXDays }%</span>
                          </Typography>
                          <Typography className="graph_legend_text regular">
                            Org - Consistency -{ " " }
                            <span className="bold green">{ value === 0 ? orgDashboard?.targetConsistencyXDays : orgDashboard?.overAllConsistencyXDays }%</span>
                          </Typography>

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
                      </Box >
                    </Stack>
                  </Stack>
                  <Box className="predictors_bar_graph_container">
                    <VolumeConsistencyGraph volandCon={ volandCon } orgDashboard={ orgDashboard } value={ value } />
                  </Box>
                </Box>
                :
                <Box className="qt_container">
                  <Stack className="graph_data_container">
                    <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>


                      <Stack className="graph_legend_container" >

                        <Stack className="graph_legend_inner_flex cursor active" onClick={ handleQualityGraph }>
                          <Box className="graph_legend_box blue"></Box>
                          <Typography className="graph_legend_text">
                            Your Quality
                          </Typography>
                        </Stack>
                        <Stack className="graph_legend_inner_flex cursor active" onClick={ handleThoroughnessGraph }>
                          <Box><img src="/images/icons/thoroughness.svg" alt="thoroughness" width="15px" height="14px" /></Box>
                          <Typography className="graph_legend_text">Your Completeness</Typography>
                        </Stack>
                        { showQualityGraph === true &&
                          <Stack className="graph_legend_inner_flex line">
                            <Box><span className="line_legand blue"> <hr
                              style={ {
                                height: "10px",
                                width: "30px",
                                color: "purple",
                                backgroundColor: "#F58A43"
                              } }
                            /></span></Box>
                            <Typography className="graph_legend_text"> Org Quality</Typography>
                          </Stack>
                        }
                        { showThoroughnessGraph === true &&
                          <Stack className="graph_legend_inner_flex line">
                            <Box><span className="line_legand tt"> <hr
                              style={ {
                                height: "10px",
                                width: "30px",
                                color: "purple",
                                backgroundColor: "#E74649"
                              } }
                            /></span>
                            </Box>
                            <Typography className="graph_legend_text">Org Completeness</Typography>
                          </Stack>
                        }


                      </Stack>
                      <Box style={ { display: 'inline-block', marginRight: "16px", marginTop: "5px", marginLeft: "70px" } } >
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
                    {/*<Box className="graph_overall_legend_container">
                      <Stack className="graph_qt_container">
                        <Typography className="graph_legend_sub_title">
                          { value === 0 ? "Targeted" : "Overall" } Score
                        </Typography>
                        <Box className="graph_qt_overall_container">
                          <Stack className="graph_qt_overall_flex">
                            <Typography className="graph_legend_text regular">
                              Quality
                            </Typography>
                            <Box className="qt_progress_bar_container">
                              <LinearProgress
                                variant="determinate"
                                value={ value === 0 ? orgDashboard?.targetAvgQR : orgDashboard?.overAllAvgQR }
                                sx={ {
                                  height: "6px",
                                  borderRadius: "24px",
                                  "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#1BAD70",
                                  },
                                } }
                              />
                            </Box>
                            <span className="graph_qt_legend_text green">
                              { value === 0 ? orgDashboard?.targetAvgQR : orgDashboard?.overAllAvgQR }%
                            </span>
                          </Stack>
                          <Stack className="graph_qt_overall_flex">
                            <Typography className="graph_legend_text regular">
                              Thoroughness
                            </Typography>
                            <Box className="qt_progress_bar_container">
                              <LinearProgress
                                variant="determinate"
                                value={ value === 0 ? orgDashboard?.targetAvgTR : orgDashboard?.overAllAvgTR }
                                sx={ {
                                  height: "6px",
                                  borderRadius: "24px",
                                  "& .MuiLinearProgress-bar": {
                                    backgroundColor: "#1BAD70",
                                  },
                                } }
                              />
                            </Box>
                            <span className="graph_qt_legend_text green">
                              { value === 0 ? orgDashboard?.targetAvgTR : orgDashboard?.overAllAvgTR }%

                            </span>
                          </Stack>
                        </Box>
                      </Stack>
                      <Stack className="line_graph_legand_container">
                        { showQualityGraph === true
                          ?
                          <Stack className="graph_legend_inner_flex">
                            <Box>
                              <span className="line_legand blue">- - -</span>
                            </Box>
                            <Typography className="graph_legend_text">
                              Org Quality Average
                            </Typography>
                          </Stack>
                          :
                          ""
                        }
                        { showThoroughnessGraph === true
                          ?
                          <Stack className="graph_legend_inner_flex">
                            <Box>
                              <span className="line_legand purple">- - -</span>
                            </Box>
                            <Typography className="graph_legend_text">
                              Org Thoroughness Average
                            </Typography>
                          </Stack>
                          :
                          ""
                        }
                      </Stack>
                    </Box>*/}
                  </Stack>
                  <Box className="predictors_bar_graph_container">
                    <QualityThoroughnessGraph showQualityGraph={ showQualityGraph } showThoroughnessGraph={ showThoroughnessGraph } qualityData={ qualityData } orgDashboard={ orgDashboard } value={ value } />
                  </Box>
                </Box>
              }
            </Box>
          </Stack>
        </Box>
        <Stack className="dashboardv2_flex mtb">
          <Box className="dashboardv2_container benefit_container">
            <Box style={ { justifyContent: 'space-between' } }>
              <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
                <Typography className="dashboardv2_sub_title">
                  Impact
                </Typography>
                <Box style={ { display: 'inline-block', marginRight: "16px" } } >
                  <DashTooltip openOn="OrgProgress" value={ mgrtool } />
                </Box>
              </Box>
              <Tabs className="predictors_tab" value={ benefitTab } onChange={ handleBenefitsChanges } centered>


                <Tab label="Benefits to you" />
                <Tab label="Outcome for the organisation" />


              </Tabs>
              { benefitTab === 0 ?
                <>
                  {/*<Box style={ { display: 'inline-block', marginRight: "16px" } } >*/ }

                  <Box className="table_container">
                    <Stack className="table_heading_container">
                      <Typography className="table_heading flex_2">Benefits</Typography>
                      {/*<Typography className="table_heading flex_1">No of User</Typography>*/ }
                      <Typography className="table_heading flex_1">No of Goals</Typography>
                    </Stack>
                    <Box className="table_content_container">
                      <Common mapData={ selfDashboard?.benefitMap } />
                    </Box>
                  </Box>
                  {/*</Box>*/ }
                </>
                :
                <>
                  {/*<Box style={ { display: 'inline-block', marginRight: "16px" } } >*/ }
                  <Box className="table_container">
                    <Stack className="table_heading_container">
                      <Typography className="table_heading flex_2">Outcomes</Typography>
                      {/*<Typography className="table_heading flex_1">No of User</Typography>*/ }
                      <Typography className="table_heading flex_1">No of Goals</Typography>
                    </Stack>
                    <Box className="table_content_container">
                      <Common mapData={ selfDashboard?.purposeMap } />
                    </Box>
                  </Box>
                  {/*<DashTooltip openOn="BenefitTool" value="BenefitTool" />*/ }
                  {/*</Box>*/ }
                </>
              }
              {/*<Typography className="dashboardv2_sub_title" style={ { display: 'inline-block' } }>
                Benefit to you
              </Typography>*/}

            </Box>
            {/*<Box className="statement_title green">
              <Typography className="statement_text green">
                You have made great progress on the organizational statements
              </Typography>
            </Box>*/}

            {/*</Box>*/ }
            {/*<Stack className="table_data_container">
                <Typography className="table_data flex_2">Organizational Development Goals</Typography>
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
                <Typography className="table_data flex_2">Growth Management</Typography>
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
              </Stack>*/}
            {/*</Box>*/ }
          </Box>
          <Box className="dashboardv2_container dev_container">
            <Box style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
              <Typography className="dashboardv2_sub_title" style={ { display: 'inline-block' } }>
                Capabilities addressed
              </Typography>
              <Box style={ { display: 'inline-block', marginRight: "16px" } } >
                <DashTooltip openOn="DevTool" value="Capabilities addressed as you work on your goals." />

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

            {/*<Box className="statement_title red">
              <Typography className="statement_text red">
                The quality of conversation responses have decreased by 10%
              </Typography>
            </Box>*/}
            <Box className="table_container">
              <Stack className="table_heading_container">
                <Typography className="table_heading flex_2">Capabilities</Typography>
                {/*<Typography className="table_heading flex_1">No of User</Typography>*/ }
                <Typography className="table_heading flex_1">No of Goals</Typography>
              </Stack>
              <Box className="table_content_container">
                <Common mapData={ selfDashboard?.devAreaMap } />
              </Box>
              {/*<Stack className="table_data_container">
                <Typography className="table_data flex_2">Maximize Profitability</Typography>
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
                <Typography className="table_data flex_2">Organizational Development Goals</Typography>
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
                <Typography className="table_data flex_2">Growth Management</Typography>
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
              </Stack>*/}
            </Box>
          </Box>
        </Stack >
        {/*<Stack className="dashboardv2_flex">
          <Box className="dashboardv2_container goals_container">
            <Typography className="dashboardv2_sub_title">Recent Goals</Typography>
            <Box className="goal_circular_progress_flex">
              <Box className="goal_circular_progress goal1">
                <CircularProgressbar
                  value={ 80 }
                  styles={ { path: { stroke: `url(#goal1)`, height: '100%' } } }
                />
                <LinearGradient
                  cssId={ "goal1" }
                  startColor={
                    "#21C262"
                  }
                  endColor={
                    "#9FE7BC"
                  }
                />
              </Box>
              <Typography className="goal_text">Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu diam nulla.</Typography>
            </Box>
            <Box className="goal_circular_progress_flex">
              <Box className="goal_circular_progress goal1">
                <CircularProgressbar
                  value={ 50 }
                  styles={ { path: { stroke: `url(#goal2)`, height: '100%' } } }
                />
                <LinearGradient
                  cssId={ "goal2" }
                  startColor={
                    "#FFBF00"
                  }
                  endColor={
                    "#FFECB1"
                  }
                />
              </Box>
              <Typography className="goal_text">Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu diam nulla.</Typography>
            </Box>
            <Box className="goal_circular_progress_flex">
              <Box className="goal_circular_progress goal1">
                <CircularProgressbar
                  value={ 50 }
                  styles={ { path: { stroke: `url(#goal2)`, height: '100%' } } }
                />
                <LinearGradient
                  cssId={ "goal2" }
                  startColor={
                    "#EE4412"
                  }
                  endColor={
                    "#E29C88"
                  }
                />
              </Box>
              <Typography className="goal_text">Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu diam nulla.</Typography>
            </Box>
            <Box className="goal_circular_progress_flex">
              <Box className="goal_circular_progress">
                <img src="/images/icons/goal-completed.svg" alt="goal completed" width="30px" height="30px" />
              </Box>
              <Typography className="goal_text">Lorem ipsum dolor sit amet consectetur. Fringilla mauris eu diam nulla.</Typography>
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
      </Box >
    </>
  );
};
export default SelfView;
