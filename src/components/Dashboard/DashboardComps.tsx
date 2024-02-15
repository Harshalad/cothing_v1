import { MouseEvent, SetStateAction, useEffect, useState } from "react";
import {
  Box,
  Stack,
  Typography,
  Tooltip,
  Collapse,
  Avatar,
  Grid,
  Tabs,
  Tab,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowRightRoundedIcon from "@mui/icons-material/ArrowRightRounded";
import ArrowLeftRoundedIcon from "@mui/icons-material/ArrowLeftRounded";
import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import { CircularProgressbar } from "react-circular-progressbar";
import LinearGradient from "./LinearGradient";
import { fetchDashboard } from "../../actions/dashboard/fetchDashboard";
import { useSelector } from "react-redux";
import DashboardGraph from "./DashboardGraph";

const DashboardComps = ( {
  name,
  align,
  achieve,
  alignCssId,
  achieveCssId,
  collapseId,
  alignQuot,
  curoScore,
  prepContncy,
  alignIntsty,
  prepComp,
  refQuot,
  effectivenessScore,
  top3,
  allUsers,
  goalProgressByvalue,
  goalProgressByPurpose,
  score1,
  score2,
  score3,
}: any ) => {
  const [ open, setOpen ] = useState<any>( false );
  const [ expanded, setExpanded ] = useState( false );
  const [ tabName, setTabName ] = useState( "purpose" );

  const toggleTblAccord = ( id: any ) => {
    //@ts-ignore
    var accordionStatus = document
      ?.getElementById( id )
      ?.getAttribute( "data-attr" );
    //@ts-ignore
    setExpanded( accordionStatus === "false" ? id : false );
  };

  const handleTooltipOpen = ( evt: any, value: any ) => {
    setOpen( evt.currentTarget.id === value ? value : false );
  };

  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );

  const handleTooltipClose = () => {
    setOpen( false );
  };

  const tabSwitch = ( event: any, newValue: any ) => {
    setTabName( newValue );
  };

  return (
    <>
      { top3 && top3?.length > 0 ? (
        <Stack className="db_top_emp_flex">
          <Stack className="top_emp_flex">
            <Typography className="top_emp_title">
              Top { top3?.length === 1 ? "" : top3?.length }
            </Typography>
            <Typography className="top_emp_subtext">Direct Reports</Typography>
          </Stack>

          <Stack className="top_emp_flex">
            <Avatar
              sx={ {
                width: "32px",
                height: "32px",
                bgcolor: "#DFFFF2",
                color: "#1BAD70",
                fontSize: "16px",
                fontWeight: "600",
              } }
            >
              { top3?.[ 0 ]?.name
                ? top3?.[ 0 ]?.name?.substring( 0, 1 ).toUpperCase()
                : "?" }
            </Avatar>
            <Box>
              <Typography className="top_emp_name">
                { top3?.[ 0 ]?.name ? top3?.[ 0 ]?.name : "XXXXX" }
              </Typography>
              <Typography className="top_emp_desg">
                { top3?.[ 0 ]?.designation ? top3?.[ 0 ]?.designation : "xxx" }
              </Typography>
            </Box>
          </Stack>
          { top3?.length > 1 && (
            <Stack className="top_emp_flex">
              <Avatar
                sx={ {
                  width: "32px",
                  height: "32px",
                  bgcolor: "#D9F6FF",
                  color: "#55B6C3",
                  fontSize: "16px",
                  fontWeight: "600",
                } }
              >
                { top3?.[ 1 ]?.name
                  ? top3?.[ 1 ]?.name?.substring( 0, 1 ).toUpperCase()
                  : "?" }{ " " }
              </Avatar>
              <Box>
                <Typography className="top_emp_name">
                  { top3?.[ 1 ]?.name ? top3?.[ 1 ]?.name : "XXXXX" }
                </Typography>
                <Typography className="top_emp_desg">
                  { top3?.[ 0 ]?.designation ? top3?.[ 0 ]?.designation : "xxx" }
                </Typography>
              </Box>
            </Stack>
          ) }
          { top3?.length > 2 && (
            <Stack className="top_emp_flex">
              <Avatar
                sx={ {
                  width: "32px",
                  height: "32px",
                  bgcolor: "#E8E3FF",
                  color: "#6755C3",
                  fontSize: "16px",
                  fontWeight: "600",
                } }
              >
                { top3?.[ 2 ]?.name
                  ? top3?.[ 2 ]?.name?.substring( 0, 1 ).toUpperCase()
                  : "?" }{ " " }
              </Avatar>
              <Box>
                <Typography className="top_emp_name">
                  { top3?.[ 2 ]?.name ? top3?.[ 2 ]?.name : "XXXXX" }
                </Typography>
                <Typography className="top_emp_desg">
                  { top3?.[ 0 ]?.designation ? top3?.[ 0 ]?.designation : "xxx" }
                </Typography>
              </Box>
            </Stack>
          ) }
        </Stack>
      ) : (
        ""
      ) }
      <Stack className="db_cntnt_flex">
        {/*{ program?.configMap.enableAlign ? (
          <Box className="db_cntnt_box">
            <Stack className="db_cntnt_bx_inner">
              <Typography className="db_cntnt_subtitle">
                Alignment score
              </Typography>
              <Box className="tooltip_box">
                <Tooltip
                  open={
                    //@ts-ignore
                    open === "ba_align_score"
                  }
                  onClose={ handleTooltipClose }
                  title="Alignment score measures the alignment conversation effort between each manager and their team members."
                  arrow
                  disableTouchListener
                  placement="bottom-end"
                >
                  <img
                    id="ba_align_score"
                    src="/images/more-info.png"
                    alt="more info"
                    width={ 20 }
                    height={ 20 }
                    style={ { cursor: "pointer" } }
                    onClick={ ( e ) => handleTooltipOpen( e, "ba_align_score" ) }
                    onMouseEnter={ ( e ) => handleTooltipOpen( e, "ba_align_score" ) }
                  />
                </Tooltip>
              </Box>
            </Stack>

            <Box className={ "circular_progress_outer " + name + "_pcon_pb " + alignCssId }>
              <CircularProgressbar value={ align } text={ align + "%" } />
              <LinearGradient
                cssId={ name + "_pcon_pb_" + alignCssId }
                startColor={
                  align > 33 && align <= 66
                    ? "#FFBF00"
                    : align > 66
                      ? "#21C262"
                      : "#EE4412"
                }
                endColor={
                  align > 33 && align <= 66
                    ? "#FFECB1"
                    : align > 66
                      ? "#9FE7BC"
                      : "#E29C88"
                }
              />
            </Box>
          </Box>
        ) : null }*/}
        <Box className="db_cntnt_box">
          <Stack className="db_cntnt_bx_inner">
            <Typography className="db_cntnt_subtitle">
              Engagement score
            </Typography>
            <Box className="tooltip_box">
              <Tooltip
                open={ open === "ba_nworx_engmnt_trend" }
                onClose={ handleTooltipClose }
                title="The intensity of effort put into making progress on goals."
                arrow
                disableTouchListener
                placement="bottom-end"
              >
                <img
                  id="ba_nworx_engmnt_trend"
                  src="/images/more-info.png"
                  alt="more info"
                  width={ 20 }
                  height={ 20 }
                  style={ { cursor: "pointer" } }
                  onClick={ ( e ) => handleTooltipOpen( e, "ba_nworx_engmnt_trend" ) }
                  onMouseEnter={ ( e ) =>
                    handleTooltipOpen( e, "ba_nworx_engmnt_trend" )
                  }
                />
              </Tooltip>
            </Box>
          </Stack>
          <Box className="db_graph_cont">
            <DashboardGraph
              id={ name }
              score1={ score1 }
              score2={ score2 }
              score3={ score3 }
            />
          </Box>
        </Box>
        <Box className="db_cntnt_box">
          <Stack className="db_cntnt_bx_inner">
            <Typography className="db_cntnt_subtitle">
              Effectiveness score
            </Typography>
            <Box className="tooltip_box">
              <Tooltip
                open={ open === "ba_perfmnc_effect" }
                onClose={ handleTooltipClose }
                title="Consistency of completing preparation over a period of last 90 days."
                arrow
                disableTouchListener
                placement="bottom-end"
              >
                <img
                  id="ba_perfmnc_effect"
                  src="/images/more-info.png"
                  alt="more info"
                  width={ 20 }
                  height={ 20 }
                  style={ { cursor: "pointer" } }
                  onClick={ ( e ) => handleTooltipOpen( e, "ba_perfmnc_effect" ) }
                  onMouseEnter={ ( e ) =>
                    handleTooltipOpen( e, "ba_perfmnc_effect" )
                  }
                />
              </Tooltip>
            </Box>
          </Stack>
          <Box className="linrpb_box">
            <Stack className="linrpb_cntnt_flx">
              <Typography className="linrpb_cntnt_left">
                { effectivenessScore?.initScore }
              </Typography>
              <Typography className="linrpb_cntnt_center">
                { effectivenessScore?.duration }
              </Typography>
              <Typography className="linrpb_cntnt_right">
                { effectivenessScore?.finalScore }
              </Typography>
            </Stack>
            <Box
              className={
                effectivenessScore?.initScore > 33 &&
                  effectivenessScore?.initScore <= 66 &&
                  effectivenessScore?.finalScore > 66
                  ? "linrpb linrpb_ygc"
                  : effectivenessScore?.initScore > 33 &&
                    effectivenessScore?.initScore <= 66 &&
                    effectivenessScore?.finalScore > 33 &&
                    effectivenessScore?.finalScore <= 66
                    ? "linrpb linrpb_yc"
                    : effectivenessScore?.initScore > 33 &&
                      effectivenessScore?.initScore <= 66 &&
                      effectivenessScore?.finalScore <= 33
                      ? "linrpb linrpb_yrc"
                      : effectivenessScore?.initScore > 66 &&
                        effectivenessScore?.finalScore > 33 &&
                        effectivenessScore?.finalScore <= 66
                        ? "linrpb linrpb_gyc"
                        : effectivenessScore?.initScore > 66 &&
                          effectivenessScore?.finalScore > 66
                          ? "linrpb linrpb_gc"
                          : effectivenessScore?.initScore > 66 &&
                            effectivenessScore?.finalScore <= 33
                            ? "linrpb linrpb_grc"
                            : effectivenessScore?.initScore <= 33 &&
                              effectivenessScore?.finalScore > 33 &&
                              effectivenessScore?.finalScore <= 66
                              ? "linrpb linrpb_ryc"
                              : effectivenessScore?.initScore <= 33 &&
                                effectivenessScore?.finalScore <= 33
                                ? "linrpb linrpb_rc"
                                : effectivenessScore?.initScore <= 33 &&
                                  effectivenessScore?.finalScore > 66
                                  ? "linrpb linrpb_rgc"
                                  : ""
              }
            ></Box>
            <Stack className="linrpb_btm_flx">
              <Typography className="linrpb_cntnt_btm">
                { new Date( effectivenessScore?.initDate ).toDateString() }
              </Typography>
              <Typography className="linrpb_cntnt_btm">
                { new Date( effectivenessScore?.finalDate ).toDateString() }
              </Typography>
            </Stack>
          </Box>
        </Box>

        <Grid className="db_drpdwn_cont lst_drpdwn_cont">
          <Box className="db_lst_drpdwn_box">
            <Stack className="db_lst_drpdwn_flex">
              <Typography className="drpdwn_pb_title">
                Goals Progress
              </Typography>
              <Box className="tooltip_box">
                <Tooltip
                  open={ open === name + "pi" }
                  onClose={ handleTooltipClose }
                  title="Progress on each stated Purpose statements across chosen goals."
                  arrow
                  disableTouchListener
                  placement="bottom-end"
                >
                  <img
                    id={ name + "pi" }
                    src="/images/more-info.png"
                    alt="more info"
                    width={ 20 }
                    height={ 20 }
                    style={ { cursor: "pointer" } }
                    onClick={ ( e ) => handleTooltipOpen( e, name + "pi" ) }
                    onMouseEnter={ ( e ) => handleTooltipOpen( e, name + "pi" ) }
                  />
                </Tooltip>
              </Box>
            </Stack>
            <Box className="db_drpdwn_tab">
              <Box className="manager_tab_box">
                <Tabs
                  value={ tabName }
                  onChange={ tabSwitch }
                  className="manager_tabs"
                >
                  <Tab
                    value="purpose"
                    label="Purpose"
                    sx={ { textTransform: "capitalize" } }
                  />
                  { goalProgressByvalue && goalProgressByvalue.length ? (
                    <Tab
                      value="value_type"
                      label="Value Type"
                      sx={ { textTransform: "capitalize" } }
                    />
                  ) : null }
                </Tabs>
              </Box>
              <Box className="db_tab_content" mt="12px">
                { tabName === "value_type" ? (
                  <Box className="db_tab_grid">
                    <Grid className="db_header_grid">
                      <Typography></Typography>
                      <Typography className="header_title">Goals</Typography>
                      <Typography className="header_title">Status</Typography>
                    </Grid>
                    <Box className="db_data_box">
                      { goalProgressByvalue?.map(
                        ( curGoal: any, index: number ) => {
                          return (
                            <Grid key={ index } className="db_data_grid">
                              <Typography className="data_title">
                                { curGoal.name }
                              </Typography>
                              <Typography className="data_cntnt">
                                { curGoal.count }
                              </Typography>
                              <Typography className="data_cntnt">
                                { curGoal.status }%
                              </Typography>
                            </Grid>
                          );
                        }
                      ) }
                    </Box>
                  </Box>
                ) : (
                  <Box className="db_tab_grid">
                    <Grid className="db_header_grid">
                      <Typography></Typography>
                      <Typography className="header_title">Goals</Typography>
                      <Typography className="header_title">Status</Typography>
                    </Grid>
                    <Box className="db_data_box">
                      { goalProgressByPurpose?.map(
                        ( curGoal: any, index: number ) => {
                          return (
                            <div key={ index }>
                              <Grid className="db_data_grid">
                                <Typography className="data_title">
                                  { curGoal.name }
                                </Typography>
                                <Typography className="data_cntnt">
                                  { curGoal.goalCount }
                                </Typography>
                                <Typography className="data_cntnt">
                                  { curGoal.achieveScore }%
                                </Typography>
                              </Grid>
                            </div>
                          );
                        }
                      ) }
                    </Box>
                  </Box>
                ) }
              </Box>
            </Box>
          </Box>
        </Grid>
      </Stack>
      <Collapse
        id={ collapseId }
        data-attr={ expanded === collapseId }
        in={ expanded === collapseId }
      >
        { alignQuot && ( !allUsers || allUsers?.length <= 0 ) ? (
          <Grid className="db_drpdwn_grid">
            {/*{ program?.configMap.enableAlign ? (
              <Grid className="db_drpdwn_cont">
                <Box className="db_drpdwn_box">
                  <Stack className="db_drpdwn_inner">
                    <Box
                      className={
                        "circular_progress_outer " +
                        name +
                        "_aq_pb " +
                        alignCssId
                      }
                    >
                      <CircularProgressbar value={ alignQuot } />
                      <LinearGradient
                        cssId={ name + "_aq_pb_" + alignCssId }
                        startColor={
                          alignQuot > 33 && alignQuot <= 66
                            ? "#FFBF00"
                            : alignQuot > 66
                              ? "#21C262"
                              : "#EE4412"
                        }
                        endColor={
                          alignQuot > 33 && alignQuot <= 66
                            ? "#FFECB1"
                            : alignQuot > 66
                              ? "#9FE7BC"
                              : "#E29C88"
                        }
                      />
                    </Box>
                    <Box>
                      <Typography className="drpdwn_pb_title">
                        Alignment Quotient
                      </Typography>
                      <Typography className="drpdwn_pb_primtxt">
                        { alignQuot }{ " " }
                        <span className="drpdwn_pb_secdtxt">/ 100</span>
                      </Typography>
                    </Box>
                  </Stack>
                  <Box className="tooltip_box">
                    <Tooltip
                      open={ open === name + "aq" }
                      onClose={ handleTooltipClose }
                      title="Average Quality Rating of In-App Alignment Conversations across Goals."
                      arrow
                      disableTouchListener
                      placement="bottom-end"
                    >
                      <img
                        id={ name + "aq" }
                        src="/images/more-info.png"
                        alt="more info"
                        width={ 20 }
                        height={ 20 }
                        style={ { cursor: "pointer" } }
                        onClick={ ( e ) => handleTooltipOpen( e, name + "aq" ) }
                        onMouseEnter={ ( e ) => handleTooltipOpen( e, name + "aq" ) }
                      />
                    </Tooltip>
                  </Box>
                </Box>
                <Box className="db_drpdwn_box">
                  <Stack className="db_drpdwn_inner">
                    <Box
                      className={
                        "circular_progress_outer " +
                        name +
                        "_ai_pb " +
                        alignCssId
                      }
                    >
                      <CircularProgressbar value={ alignIntsty } />
                      <LinearGradient
                        cssId={ name + "_ai_pb_" + alignCssId }
                        startColor={
                          alignIntsty > 33 && alignIntsty <= 66
                            ? "#FFBF00"
                            : alignIntsty > 66
                              ? "#21C262"
                              : "#EE4412"
                        }
                        endColor={
                          alignIntsty > 33 && alignIntsty <= 66
                            ? "#FFECB1"
                            : alignIntsty > 66
                              ? "#9FE7BC"
                              : "#E29C88"
                        }
                      />
                    </Box>
                    <Box>
                      <Typography className="drpdwn_pb_title">
                        Alignment Intensity
                      </Typography>
                      <Typography className="drpdwn_pb_primtxt">
                        { alignIntsty }{ " " }
                        <span className="drpdwn_pb_secdtxt">/ 100</span>
                      </Typography>
                    </Box>
                  </Stack>
                  <Box className="tooltip_box">
                    <Tooltip
                      open={ open === name + "ai" }
                      onClose={ handleTooltipClose }
                      title="Effort put into gaining alignment."
                      arrow
                      disableTouchListener
                      placement="bottom-end"
                    >
                      <img
                        id={ name + "ai" }
                        src="/images/more-info.png"
                        alt="more info"
                        width={ 20 }
                        height={ 20 }
                        style={ { cursor: "pointer" } }
                        onClick={ ( e ) => handleTooltipOpen( e, name + "ai" ) }
                        onMouseEnter={ ( e ) => handleTooltipOpen( e, name + "ai" ) }
                      />
                    </Tooltip>
                  </Box>
                </Box>
              </Grid>
            ) : null }*/}

            <Grid className="db_drpdwn_cont">
              <Box className="db_drpdwn_box">
                <Stack className="db_drpdwn_inner">
                  <Box
                    className={
                      "circular_progress_outer " + name + "_cs_pb " + alignCssId
                    }
                  >
                    <CircularProgressbar value={ curoScore } />
                    <LinearGradient
                      cssId={ name + "_cs_pb_" + alignCssId }
                      startColor={
                        curoScore > 33 && curoScore <= 66
                          ? "#FFBF00"
                          : curoScore > 66
                            ? "#21C262"
                            : "#EE4412"
                      }
                      endColor={
                        curoScore > 33 && curoScore <= 66
                          ? "#FFECB1"
                          : curoScore > 66
                            ? "#9FE7BC"
                            : "#E29C88"
                      }
                    />
                  </Box>
                  <Box>
                    <Typography className="drpdwn_pb_title">
                      Learning Agility
                    </Typography>
                    <Typography className="drpdwn_pb_primtxt">
                      { curoScore }{ " " }
                      <span className="drpdwn_pb_secdtxt">/ 100</span>
                    </Typography>
                  </Box>
                </Stack>
                <Box className="tooltip_box">
                  <Tooltip
                    open={ open === name + "cs" }
                    onClose={ handleTooltipClose }
                    title="Exploration of frameworks and tools."
                    arrow
                    disableTouchListener
                    placement="bottom-end"
                  >
                    <img
                      id={ name + "cs" }
                      src="/images/more-info.png"
                      alt="more info"
                      width={ 20 }
                      height={ 20 }
                      style={ { cursor: "pointer" } }
                      onClick={ ( e ) => handleTooltipOpen( e, name + "cs" ) }
                      onMouseEnter={ ( e ) => handleTooltipOpen( e, name + "cs" ) }
                    />
                  </Tooltip>
                </Box>
              </Box>
              <Box className="db_drpdwn_box">
                <Stack className="db_drpdwn_inner">
                  <Box
                    className={
                      "circular_progress_outer " +
                      name +
                      "_pcom_pb " +
                      alignCssId
                    }
                  >
                    <CircularProgressbar value={ prepComp } />
                    <LinearGradient
                      cssId={ name + "_pcom_pb_" + alignCssId }
                      startColor={
                        prepComp > 33 && prepComp <= 66
                          ? "#FFBF00"
                          : prepComp > 66
                            ? "#21C262"
                            : "#EE4412"
                      }
                      endColor={
                        prepComp > 33 && prepComp <= 66
                          ? "#FFECB1"
                          : prepComp > 66
                            ? "#9FE7BC"
                            : "#E29C88"
                      }
                    />
                  </Box>
                  <Box>
                    <Typography className="drpdwn_pb_title">
                      Preparation Completion
                    </Typography>
                    <Typography className="drpdwn_pb_primtxt">
                      { prepComp }{ " " }
                      <span className="drpdwn_pb_secdtxt">/ 100</span>
                    </Typography>
                  </Box>
                </Stack>
                <Box className="tooltip_box">
                  <Tooltip
                    open={ open === name + "pcom" }
                    onClose={ handleTooltipClose }
                    title="Completion of preparation across chosen goals."
                    arrow
                    disableTouchListener
                    placement="bottom-end"
                  >
                    <img
                      id={ name + "pcom" }
                      src="/images/more-info.png"
                      alt="more info"
                      width={ 20 }
                      height={ 20 }
                      style={ { cursor: "pointer" } }
                      onClick={ ( e ) => handleTooltipOpen( e, name + "pcom" ) }
                      onMouseEnter={ ( e ) => handleTooltipOpen( e, name + "pcom" ) }
                    />
                  </Tooltip>
                </Box>
              </Box>
            </Grid>
            {/* <Grid className="db_drpdwn_cont">
              <Box className="db_drpdwn_box">
                <Stack className="db_drpdwn_inner">
                  <Box
                    className={
                      "circular_progress_outer " +
                      name +
                      "_pcon_pb " +
                      alignCssId
                    }
                  >
                    <CircularProgressbar value={prepContncy} />
                    <LinearGradient
                      cssId={name + "_pcon_pb_" + alignCssId}
                      startColor={
                        prepContncy > 33 && prepContncy <= 66
                          ? "#FFBF00"
                          : prepContncy > 66
                          ? "#21C262"
                          : "#EE4412"
                      }
                      endColor={
                        prepContncy > 33 && prepContncy <= 66
                          ? "#FFECB1"
                          : prepContncy > 66
                          ? "#9FE7BC"
                          : "#E29C88"
                      }
                    />
                  </Box>
                  <Box>
                    <Typography className="drpdwn_pb_title">
                      Preparation Consistency
                    </Typography>
                    <Typography className="drpdwn_pb_primtxt">
                      {prepContncy}{" "}
                      <span className="drpdwn_pb_secdtxt">/ 100</span>
                    </Typography>
                  </Box>
                </Stack>
                <Box className="tooltip_box">
                  <Tooltip
                    open={open === name + "pcon"}
                    onClose={handleTooltipClose}
                    title="Consistency of completing preparation to make progress on the goal over past 6 weeks."
                    arrow
                    disableTouchListener
                    placement="bottom-end"
                  >
                    <img
                      id={name + "pcon"}
                      src="/images/more-info.png"
                      alt="more info"
                      width={20}
                      height={20}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleTooltipOpen(e, name + "pcon")}
                      onMouseEnter={(e) => handleTooltipOpen(e, name + "pcon")}
                    />
                  </Tooltip>
                </Box>
              </Box>
              <Box className="db_drpdwn_box">
                <Stack className="db_drpdwn_inner">
                  <Box
                    className={
                      "circular_progress_outer " + name + "_rq_pb " + alignCssId
                    }
                  >
                    <CircularProgressbar value={refQuot} />
                    <LinearGradient
                      cssId={name + "_rq_pb_" + alignCssId}
                      startColor={
                        refQuot > 33 && refQuot <= 66
                          ? "#FFBF00"
                          : refQuot > 66
                          ? "#21C262"
                          : "#EE4412"
                      }
                      endColor={
                        refQuot > 33 && refQuot <= 66
                          ? "#FFECB1"
                          : refQuot > 66
                          ? "#9FE7BC"
                          : "#E29C88"
                      }
                    />
                  </Box>
                  <Box>
                    <Typography className="drpdwn_pb_title">
                      Reflection Quotient
                    </Typography>
                    <Typography className="drpdwn_pb_primtxt">
                      {refQuot} <span className="drpdwn_pb_secdtxt">/ 100</span>
                    </Typography>
                  </Box>
                </Stack>
                <Box className="tooltip_box">
                  <Tooltip
                    open={open === name + "rq"}
                    onClose={handleTooltipClose}
                    title="Quality of preparation to make progress on the goal."
                    arrow
                    disableTouchListener
                    placement="bottom-end"
                  >
                    <img
                      id={name + "rq"}
                      src="/images/more-info.png"
                      alt="more info"
                      width={20}
                      height={20}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleTooltipOpen(e, name + "rq")}
                      onMouseEnter={(e) => handleTooltipOpen(e, name + "rq")}
                    />
                  </Tooltip>
                </Box>
              </Box>
            </Grid> */}
            <Box className="db_cntnt_box">
              <Stack className="db_cntnt_bx_inner">
                <Typography className="db_cntnt_subtitle">
                  Preparation Consistency
                </Typography>
                <Box className="tooltip_box">
                  <Tooltip
                    open={ open === name + "pcon" }
                    onClose={ handleTooltipClose }
                    title="Consistency of completing preparation to make progress on the goal over past 6 weeks."
                    arrow
                    disableTouchListener
                    placement="bottom-end"
                  >
                    <img
                      id={ name + "pcon" }
                      src="/images/more-info.png"
                      alt="more info"
                      width={ 20 }
                      height={ 20 }
                      style={ { cursor: "pointer" } }
                      onClick={ ( e ) => handleTooltipOpen( e, name + "pcon" ) }
                      onMouseEnter={ ( e ) => handleTooltipOpen( e, name + "pcon" ) }
                    />
                  </Tooltip>
                </Box>
              </Stack>
              <Box
                className={
                  "circular_progress_outer " + name + "_pcon_pb " + alignCssId
                }
              >
                <CircularProgressbar
                  value={ prepContncy }
                  text={ prepContncy + "%" }
                />
                <LinearGradient
                  cssId={ name + "_pcon_pb_" + alignCssId }
                  startColor={
                    prepContncy > 33 && prepContncy <= 66
                      ? "#FFBF00"
                      : prepContncy > 66
                        ? "#21C262"
                        : "#EE4412"
                  }
                  endColor={
                    prepContncy > 33 && prepContncy <= 66
                      ? "#FFECB1"
                      : prepContncy > 66
                        ? "#9FE7BC"
                        : "#E29C88"
                  }
                />
              </Box>
              {/* <Box>
                <Typography className="drpdwn_pb_primtxt">
                  {prepContncy} <span className="drpdwn_pb_secdtxt">/ 100</span>
                </Typography>
              </Box> */}
              {/* </Stack> */ }
            </Box>
            <Box className="db_cntnt_box">
              <Stack className="db_cntnt_bx_inner">
                <Typography className="db_cntnt_subtitle">Progress</Typography>
                <Box className="tooltip_box">
                  <Tooltip
                    open={ open === "ba_achieve_score" }
                    onClose={ handleTooltipClose }
                    title="Overall progress across all chosen goals."
                    arrow
                    disableTouchListener
                    placement="bottom-end"
                  >
                    <img
                      id="ba_achieve_score"
                      src="/images/more-info.png"
                      alt="more info"
                      width={ 20 }
                      height={ 20 }
                      style={ { cursor: "pointer" } }
                      onClick={ ( e ) => handleTooltipOpen( e, "ba_achieve_score" ) }
                      onMouseEnter={ ( e ) =>
                        handleTooltipOpen( e, "ba_achieve_score" )
                      }
                    />
                  </Tooltip>
                </Box>
              </Stack>
              <Box className={ "circular_progress_outer " + achieveCssId }>
                <CircularProgressbar value={ achieve } text={ achieve + "%" } />
                <LinearGradient
                  cssId={ achieveCssId }
                  startColor={
                    achieve > 33 && achieve <= 66
                      ? "#FFBF00"
                      : achieve > 66
                        ? "#21C262"
                        : "#EE4412"
                  }
                  endColor={
                    achieve > 33 && achieve <= 66
                      ? "#FFECB1"
                      : achieve > 66
                        ? "#9FE7BC"
                        : "#E29C88"
                  }
                />
              </Box>
            </Box>
          </Grid>
        ) : (
          ""
        ) }

        { allUsers && allUsers?.length > 0 ? (
          <>
            <Grid className="rptr_emp_drpdwn_grid">
              {/*{ program?.configMap.enableAlign ? (
                <Box className="db_reports_grid">
                  <Grid className="reports_header_grid">
                    <Typography></Typography>
                    <Typography></Typography>
                    <Typography className="reports_header_title">
                      Goal Alignment
                    </Typography>
                  </Grid>

                  { allUsers?.map( ( currentUser: any, index: number ) => {
                    return (
                      <Box key={ index }>
                        <Grid className="reports_data_grid">
                          <Typography className="reports_data_title">
                            { currentUser?.name }
                          </Typography>
                          <Typography></Typography>
                          <Typography
                            className={
                              currentUser?.alignScore > 33 &&
                                currentUser?.alignScore <= 66
                                ? "reports_data_cntnt ytg"
                                : currentUser?.alignScore > 66
                                  ? "reports_data_cntnt gtg"
                                  : "reports_data_cntnt rtg"
                            }
                          >
                            { currentUser?.alignScore }{ " " }
                            <span className="reports_data_subcntnt">/ 100</span>
                          </Typography>
                        </Grid>
                      </Box>
                    );
                  } ) }
                </Box>
              ) : null }*/}
              <Box className="db_reports_grid rprts_secnd_box">
                <Grid className="db_rprts_hr_grid">
                  <Box></Box>
                  <Box></Box>
                  <Box></Box>
                  <Grid className="db_rprts_icon_grid">
                    <Box className="db_rprts_hr"></Box>
                    <ArrowRightRoundedIcon
                      fontSize="small"
                      sx={ { color: "#C8CDD4" } }
                    />
                    <ArrowLeftRoundedIcon
                      fontSize="small"
                      sx={ { color: "#C8CDD4" } }
                    />
                    <FiberManualRecordRoundedIcon
                      sx={ { color: "#C8CDD4", fontSize: "8px" } }
                    />
                  </Grid>
                </Grid>
                <Grid className="reports_header_grid rprts_secnd_grid">
                  <Typography className="db_cntnt_subtitle">
                    Engagement score
                  </Typography>

                  <Typography className="reports_header_title">
                    last
                    <br />
                    90
                    <br />
                    days
                  </Typography>
                  <Typography className="reports_header_title">
                    last
                    <br />
                    60
                    <br />
                    days
                  </Typography>
                  <Typography className="reports_header_title">
                    last
                    <br />
                    30
                    <br />
                    days
                  </Typography>
                </Grid>

                { allUsers?.map( ( currentUser: any, index: number ) => {
                  return (
                    <Box key={ index } className="">
                      <Grid className="reports_data_grid rprts_secnd_grid">
                        <Typography className="reports_data_title">
                          { currentUser?.name }
                        </Typography>
                        <Typography className="reports_data_subcntnt">
                          { currentUser?.engageScore?.quarterly }
                        </Typography>
                        <Typography className="reports_data_subcntnt">
                          { currentUser?.engageScore?.biMonthly }
                        </Typography>
                        <Typography className="reports_data_subcntnt">
                          { currentUser?.engageScore?.monthly }
                        </Typography>
                      </Grid>
                    </Box>
                  );
                } ) }
              </Box>
              <Box className="db_reports_grid rprts_thrid_box">
                <Typography className="db_cntnt_subtitle">
                  Effectiveness score
                </Typography>

                <Grid className="reports_header_grid">
                  <Typography></Typography>
                  <Typography className="reports_header_title">
                    90 days
                  </Typography>
                  <Typography className="reports_header_title">
                    Current
                  </Typography>
                </Grid>
                {/* <Grid className="db_rprts_hr_grid">
                  <Box></Box>
                  <Box></Box>
                  <Grid className="db_rprts_icon_grid">
                    <Box
                      className={
                        align > 33 && align <= 66 && achieve > 66
                          ? "linrpb linrpb_ygc"
                          : align > 33 &&
                            align <= 66 &&
                            achieve > 33 &&
                            achieve <= 66
                          ? "linrpb linrpb_yc"
                          : align > 33 && align <= 66 && achieve <= 33
                          ? "linrpb linrpb_yrc"
                          : align > 66 && achieve > 33 && achieve <= 66
                          ? "linrpb linrpb_gyc"
                          : align > 66 && achieve > 66
                          ? "linrpb linrpb_gc"
                          : align > 66 && achieve <= 33
                          ? "linrpb linrpb_grc"
                          : align <= 33 && achieve > 33 && achieve <= 66
                          ? "linrpb linrpb_ryc"
                          : align <= 33 && achieve <= 33
                          ? "linrpb linrpb_rc"
                          : align <= 33 && achieve > 66
                          ? "linrpb linrpb_rgc"
                          : ""
                      }
                    ></Box>
                    <FiberManualRecordRoundedIcon
                      className={
                        align > 33 && align <= 66
                          ? "rprts_lft_round_gradnt yrg"
                          : align > 66
                          ? "rprts_lft_round_gradnt grg"
                          : "rprts_lft_round_gradnt rrg"
                      }
                    />
                    <FiberManualRecordRoundedIcon
                      className={
                        achieve > 33 && achieve <= 66
                          ? "rprts_rgt_round_gradnt yrg"
                          : achieve > 66
                          ? "rprts_rgt_round_gradnt grg"
                          : "rprts_rgt_round_gradnt rrg"
                      }
                    />
                  </Grid>
                </Grid> */}

                { allUsers?.map( ( currentUser: any, index: number ) => {
                  return (
                    <Box key={ index } className="">
                      <Grid className="reports_data_grid">
                        <Typography className="reports_data_title">
                          { currentUser?.name }
                        </Typography>
                        <Typography
                          className={
                            currentUser?.effectivenessScore?.quarterly > 33 &&
                              currentUser?.effectivenessScore?.quarterly <= 66
                              ? "reports_data_cntnt ytg"
                              : currentUser?.effectivenessScore?.quarterly > 66
                                ? "reports_data_cntnt gtg"
                                : "reports_data_cntnt rtg"
                          }
                        >
                          { currentUser?.effectivenessScore?.quarterly
                            ? currentUser?.effectivenessScore?.quarterly
                            : currentUser?.effectivenessScore?.quaterly }
                        </Typography>
                        <Typography
                          className={
                            currentUser?.effectivenessScore?.current > 33 &&
                              currentUser?.effectivenessScore?.current <= 66
                              ? "reports_data_cntnt ytg"
                              : currentUser?.effectivenessScore?.current > 66
                                ? "reports_data_cntnt gtg"
                                : "reports_data_cntnt rtg"
                          }
                        >
                          { currentUser?.effectivenessScore?.current }
                        </Typography>
                      </Grid>
                    </Box>
                  );
                } ) }

                <Box className="reports_data_box"></Box>
              </Box>
              <Box className="db_reports_grid">
                <Grid className="reports_header_grid">
                  <Typography></Typography>
                  <Typography></Typography>
                  <Typography className="reports_header_title">
                    Achievement score
                  </Typography>
                </Grid>

                { allUsers?.map( ( currentUser: any, index: number ) => {
                  return (
                    <Box key={ index } className="">
                      <Grid className="reports_data_grid">
                        <Typography className="reports_data_title">
                          { currentUser?.name }
                        </Typography>
                        <Typography></Typography>
                        <Typography
                          className={
                            currentUser?.achieveScore > 33 &&
                              currentUser?.achieveScore <= 66
                              ? "reports_data_cntnt ytg"
                              : currentUser?.achieveScore > 66
                                ? "reports_data_cntnt gtg"
                                : "reports_data_cntnt rtg"
                          }
                        >
                          { currentUser?.achieveScore }{ " " }
                          <span className="reports_data_subcntnt">/ 100</span>
                        </Typography>
                      </Grid>
                    </Box>
                  );
                } ) }
              </Box>
            </Grid>
          </>
        ) : (
          ""
        ) }
      </Collapse>
      <Box className="db_viwmor_box">
        <Stack
          className="db_viwmor_flex"
          onClick={ () => toggleTblAccord( collapseId ) }
        >
          <Typography className="db_viwmor_text">
            { name === "reportingEmployees"
              ? "My Direct Reports"
              : "View " +
              ( expanded === collapseId ? "Less" : "More" ) +
              " Details" }
          </Typography>
          { expanded === collapseId ? (
            <ExpandLessIcon sx={ { color: "#F58A43" } } />
          ) : (
            <ExpandMoreIcon sx={ { color: "#F58A43" } } />
          ) }
        </Stack>
      </Box>
    </>
  );
};
export default DashboardComps;
