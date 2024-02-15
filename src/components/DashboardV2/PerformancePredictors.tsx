import { Box, LinearProgress, Stack, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { useRef, useState } from "react";
import VolumeConsistencyGraph from "./VolumeConsistencyGraph";
import QualityThoroughnessGraph from "./QualityThoroughnessGraph";

const PerformancePredictors = () => {

  //const popUpRef = useRef(null);
  // const [showPopUp, setPopUp] = useState<any>(false);
  const [ value, setValue ] = useState<any>( 0 );
  const [ showGraphOption, setGraphOption ] = useState<any>( "v&c" );
  const [ open, setOpen ] = useState<any>( false );
  const [ showQualityGraph, setQualityGraph ] = useState<any>( true );
  const [ showThoroughnessGraph, setThoroughnessGraph ] = useState<any>( true );

  const handleTooltipOpen = ( evt: any, value: any ) => {
    setOpen( evt.currentTarget.id === value ? value : false );
  };

  const handleTooltipClose = () => {
    setOpen( false );
  };

  // const handlePopUp = (clickedId: any) => {
  //   setPopUp(clickedId ? clickedId : false);
  // }

  const handleChange = ( event: any, newValue: any ) => {
    setValue( newValue );
  };

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
  }

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
  }

  // useEffect(() => {
  //   const handleClickOutside = (event: any) => {
  //     //@ts-ignore
  //     if (!popUpRef?.current?.contains(event.target)) {
  //       setPopUp(false);
  //     }
  //   };

  //   document.addEventListener("click", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [popUpRef]);

  return (
    <>
      <Stack className="predictors_flex">
        <Box className="predictors_tab_container">
          <Typography className="dashboardv2_sub_title">
            Performance Predictors
          </Typography>
          <Tabs
            className="predictors_tab"
            value={ value }
            onChange={ handleChange }
            centered
          >
            <Tab label="Targeted" />
            <Tab label="Overall" />
          </Tabs>
          { value === 0 ? (
            <>
              <Stack
                className={ `stat_container mtb ${ showGraphOption === "v&c" ? "active" : ""
                  }` }
                onClick={ () => {
                  handleGraphOption( "v&c" );
                } }
              >
                <Typography className="stat_title">
                  Volume & Consistency
                </Typography>
                <Stack className="stat_inner_container">
                  <Tooltip
                    title="Volume"
                    placement="top"
                    arrow
                    open={ open === "volume" }
                    onClose={ handleTooltipClose }
                    disableTouchListener
                  >
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
                        40<span className="smaller">nos</span>
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
                </Stack>
              </Stack>
              <Stack
                className={ `stat_container mtb ${ showGraphOption === "q&t" ? "active" : ""
                  }` }
                onClick={ () => {
                  handleGraphOption( "q&t" );
                } }
              >
                <Typography className="stat_title">
                  Quality & Thoroughness
                </Typography>
                <Stack className="stat_inner_container">
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
                      <img
                        src="/images/icons/increase.svg"
                        alt="increase"
                        width="15px"
                        height="28px"
                      />
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
                      <img
                        src="/images/icons/decrease.svg"
                        alt="decrease"
                        width="15px"
                        height="28px"
                      />
                      <Typography className="stat_text red">10%</Typography>
                    </Stack>
                  </Tooltip>
                </Stack>
              </Stack>
            </>
          ) : (
            <>
              <Stack
                className={ `stat_container mtb ${ showGraphOption === "v&c" ? "active" : ""
                  }` }
                onClick={ () => {
                  handleGraphOption( "v&c" );
                } }
              >
                <Typography className="stat_title">
                  Volume & Consistency
                </Typography>
                <Stack className="stat_inner_container">
                  <Tooltip
                    title="Volume"
                    placement="top"
                    arrow
                    open={ open === "volume" }
                    onClose={ handleTooltipClose }
                    disableTouchListener
                  >
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
                        40<span className="smaller">nos</span>
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
                </Stack>
              </Stack>
              <Stack
                className={ `stat_container mtb ${ showGraphOption === "q&t" ? "active" : ""
                  }` }
                onClick={ () => {
                  handleGraphOption( "q&t" );
                } }
              >
                <Typography className="stat_title">
                  Quality & Thoroughness
                </Typography>
                <Stack className="stat_inner_container">
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
                      <img
                        src="/images/icons/increase.svg"
                        alt="increase"
                        width="15px"
                        height="28px"
                      />
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
                      <img
                        src="/images/icons/decrease.svg"
                        alt="decrease"
                        width="15px"
                        height="28px"
                      />
                      <Typography className="stat_text red">10%</Typography>
                    </Stack>
                  </Tooltip>
                </Stack>
              </Stack>
            </>
          ) }
        </Box>
        <Box className="predictors_graph_container">
          { showGraphOption === "v&c" ? (
            <Box className="vc_container">
              <Stack className="graph_data_container">
                <Stack className="graph_legend_container">
                  <Stack className="graph_legend_inner_flex">
                    <Box className="graph_legend_box purple"></Box>
                    <Typography className="graph_legend_text">
                      Volume
                    </Typography>
                  </Stack>
                  <Stack className="graph_legend_inner_flex">
                    <Box>
                      <span className="line_legand purple">- - -</span>
                    </Box>
                    <Typography className="graph_legend_text">
                      Org Average
                    </Typography>
                  </Stack>
                </Stack>
                <Stack className="graph_legend_container">
                  <Box className="graph_overall_container">
                    <Typography className="graph_legend_sub_title">
                      Overall Score
                    </Typography>
                    <Typography className="graph_legend_text regular">
                      Org - Consistency -{ " " }
                      <span className="bold green">20%</span>
                    </Typography>
                    <Typography className="graph_legend_text regular">
                      Individual - Consistency -{ " " }
                      <span className="bold green">20%</span>
                    </Typography>
                  </Box>
                  <Box className="graph_past_week_container">
                    <Typography className="graph_legend_sub_title">
                      Past 8 Week Score
                    </Typography>
                    <Typography className="graph_legend_text regular">
                      Org - Consistency -{ " " }
                      <span className="bold green">20%</span>
                    </Typography>
                    <Typography className="graph_legend_text regular">
                      Individual - Consistency -{ " " }
                      <span className="bold green">20%</span>
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
              <Box className="predictors_bar_graph_container">
                <VolumeConsistencyGraph />
              </Box>
            </Box>
          ) : (
            <Box className="qt_container">
              <Stack className="graph_data_container">
                <Stack className="graph_legend_container">
                  <Stack
                    className="graph_legend_inner_flex cursor active"
                    onClick={ handleQualityGraph }
                  >
                    <Box className="graph_legend_box blue"></Box>
                    <Typography className="graph_legend_text">
                      Quality
                    </Typography>
                  </Stack>
                  <Stack
                    className="graph_legend_inner_flex cursor active"
                    onClick={ handleThoroughnessGraph }
                  >
                    <Box>
                      <img
                        src="/images/icons/thoroughness.svg"
                        alt="thoroughness"
                        width="15px"
                        height="14px"
                      />
                    </Box>
                    <Typography className="graph_legend_text">
                      Thoroughness
                    </Typography>
                  </Stack>
                </Stack>
                <Box className="graph_overall_legend_container">
                  <Stack className="graph_qt_container">
                    <Typography className="graph_legend_sub_title">
                      Overall Score
                    </Typography>
                    <Box className="graph_qt_overall_container">
                      <Stack className="graph_qt_overall_flex">
                        <Typography className="graph_legend_text regular">
                          Quality
                        </Typography>
                        <Box className="qt_progress_bar_container">
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
                        <span className="graph_qt_legend_text green">80%</span>
                      </Stack>
                      <Stack className="graph_qt_overall_flex">
                        <Typography className="graph_legend_text regular">
                          Thoroughness
                        </Typography>
                        <Box className="qt_progress_bar_container">
                          <LinearProgress
                            variant="determinate"
                            value={ 70 }
                            sx={ {
                              height: "6px",
                              borderRadius: "24px",
                              "& .MuiLinearProgress-bar": {
                                backgroundColor: "#1BAD70",
                              },
                            } }
                          />
                        </Box>
                        <span className="graph_qt_legend_text green">70%</span>
                      </Stack>
                    </Box>
                  </Stack>
                  <Stack className="line_graph_legand_container">
                    { showQualityGraph === true ? (
                      <Stack className="graph_legend_inner_flex">
                        <Box>
                          <span className="line_legand blue">- - -</span>
                        </Box>
                        <Typography className="graph_legend_text">
                          Org Quality Average
                        </Typography>
                      </Stack>
                    ) : (
                      ""
                    ) }
                    { showThoroughnessGraph === true ? (
                      <Stack className="graph_legend_inner_flex">
                        <Box>
                          <span className="line_legand purple">- - -</span>
                        </Box>
                        <Typography className="graph_legend_text">
                          Org Thoroughness Average
                        </Typography>
                      </Stack>
                    ) : (
                      ""
                    ) }
                  </Stack>
                </Box>
              </Stack>
              <Box className="predictors_bar_graph_container">
                <QualityThoroughnessGraph
                  showQualityGraph={ showQualityGraph }
                  showThoroughnessGraph={ showThoroughnessGraph }
                />
              </Box>
            </Box>
          ) }
        </Box>
      </Stack>
    </>
  );
};
export default PerformancePredictors;
