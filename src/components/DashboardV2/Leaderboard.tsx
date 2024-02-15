import { Box, Stack, Tab, Tabs, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import ManagerQualityThoroughnessGraph from "./ManagerQualityThoroughnessGraph";
import ManagerVolumeConsistencyGraph from "./ManagerVolumeConsistencyGraph";

const Leaderboard = () => {
  const [ value, setValue ] = useState<any>( 0 );
  const [ showGraphOption, setGraphOption ] = useState<any>( "v&c" );
  const [ nameTooltip, setNameTooltip ] = useState<any>( false );

  const handleNameTooltipOpen = ( evt: any, value: any ) => {
    if ( value.length > 40 ) {
      setNameTooltip( value.length > 10 && evt.currentTarget.id === value ? value : false );
    } else {
      setNameTooltip( false );
    }
  };

  const handleNameTooltipClose = () => {
    setNameTooltip( false );
  };

  const handleChange = ( event: any, newValue: any ) => {
    setValue( newValue );
  };

  const handleGraphOption = ( clickedOption: any ) => {
    setGraphOption( clickedOption ? clickedOption : false );
  };

  return (
    <>
      <Box className="predictors_tab_container leaderboard_tab_container">
        <Typography className="dashboardv2_sub_title">Leaderboard</Typography>
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
      <Stack className="predictors_flex leaderboard_flex">
        <Box className="leaderboard_table_container">
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
            <Stack className="leaderboard_table_flex">
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
                  onClick={ ( e ) => handleNameTooltipOpen( e, "Shwetal Shubhadeep" ) }
                  onMouseEnter={ ( e ) =>
                    handleNameTooltipOpen( e, "Shwetal Shubhadeep" )
                  }
                >
                  Shwetal Shubhadeep
                  {/* {employee_name.length > 40 ?
                    `${employee_name.substring(0, 40)}...` : employee_name
                  } */}
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
                  10<span className="smaller">no</span>
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
            <Stack className="leaderboard_table_flex">
              <Tooltip
                title="Reuben Thomas"
                placement="top"
                arrow
                open={ nameTooltip === "Reuben Thomas" }
                onClose={ handleNameTooltipClose }
                disableTouchListener
              >
                <Typography
                  id="Reuben Thomas"
                  className="leaderboard_table_data_text flex_2"
                  onClick={ ( e ) => handleNameTooltipOpen( e, "Reuben Thomas" ) }
                  onMouseEnter={ ( e ) =>
                    handleNameTooltipOpen( e, "Reuben Thomas" )
                  }
                >
                  Reuben Thomas
                  {/* {employee_name.length > 40 ?
                    `${employee_name.substring(0, 40)}...` : employee_name
                  } */}
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
                  5<span className="smaller">nos</span>
                </Typography>
              </Stack>
              <Stack className="stat_inner_flex flex_1">
                <img
                  src="/images/icons/increase.svg"
                  alt="increase"
                  width="15px"
                  height="28px"
                />
                <Typography className="stat_text green">30%</Typography>
              </Stack>
            </Stack>
            <Stack className="leaderboard_table_flex">
              <Tooltip
                title="Rajashree Jhunjhunwala"
                placement="top"
                arrow
                open={ nameTooltip === "Rajashree Jhunjhunwala" }
                onClose={ handleNameTooltipClose }
                disableTouchListener
              >
                <Typography
                  id="Rajashree Jhunjhunwala"
                  className="leaderboard_table_data_text flex_2"
                  onClick={ ( e ) => handleNameTooltipOpen( e, "Rajashree Jhunjhunwala" ) }
                  onMouseEnter={ ( e ) =>
                    handleNameTooltipOpen( e, "Rajashree Jhunjhunwala" )
                  }
                >
                  Rajashree Jhunjhunwala
                  {/* {employee_name.length > 40 ?
                    `${employee_name.substring(0, 40)}...` : employee_name
                  } */}
                </Typography>
              </Tooltip>
              <Stack className="stat_inner_flex flex_1">
                <img
                  src="/images/icons/decrease.svg"
                  alt="decrease"
                  width="15px"
                  height="28px"
                />
                <Typography className="stat_text red">
                  5<span className="smaller">nos</span>
                </Typography>
              </Stack>
              <Stack className="stat_inner_flex flex_1">
                <img
                  src="/images/icons/decrease.svg"
                  alt="decrease"
                  width="15px"
                  height="28px"
                />
                <Typography className="stat_text red">10%</Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box className="predictors_graph_container">
          { showGraphOption === "v&c" ? (
            <Box className="vc_container">
              <Box className="graph_data_container">
                <Stack className="graph_legend_containe">
                  <Stack className="graph_legend_inner_flex">
                    <Box className="graph_legend_box dark_purple"></Box>
                    <Typography className="graph_legend_text">
                      Volume
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
                      Consistency
                    </Typography>
                  </Stack>
                  <Stack className="graph_legend_inner_flex">
                    <Box>
                      <span className="line_legand dark_purple">- - -</span>
                    </Box>
                    <Typography className="graph_legend_text">
                      Org Volume Avg
                    </Typography>
                  </Stack>
                  <Stack className="graph_legend_inner_flex">
                    <Box>
                      <span className="line_legand dark_yellow">- - -</span>
                    </Box>
                    <Typography className="graph_legend_text">
                      Org Consistency Avg
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <Box className="predictors_bar_graph_container leaderboard_bar_graph_container">
                <ManagerVolumeConsistencyGraph />
              </Box>
            </Box>
          ) : (
            <Box className="qt_container">
              <Box className="graph_data_container">
                <Stack className="graph_legend_containe">
                  <Stack className="graph_legend_inner_flex">
                    <Box className="graph_legend_box light_yellow"></Box>
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
                      Thoroughness
                    </Typography>
                  </Stack>
                  <Stack className="graph_legend_inner_flex">
                    <Box>
                      <span className="line_legand light_yellow">- - -</span>
                    </Box>
                    <Typography className="graph_legend_text">
                      Org Quality Avg
                    </Typography>
                  </Stack>
                  <Stack className="graph_legend_inner_flex">
                    <Box>
                      <span className="line_legand dark_purple">- - -</span>
                    </Box>
                    <Typography className="graph_legend_text">
                      Org Thoroughness Avg
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
              <Box className="predictors_bar_graph_container leaderboard_bar_graph_container">
                <ManagerQualityThoroughnessGraph />
              </Box>
            </Box>
          ) }
        </Box>
      </Stack>
    </>
  );
};
export default Leaderboard;
