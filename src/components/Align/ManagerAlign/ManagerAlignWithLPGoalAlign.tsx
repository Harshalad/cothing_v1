import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Stack,
  Collapse,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Pagination,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ViewPurpose from "../../common/ViewPurpose/ViewPurpose";
import CheckIn from "../../Achieve/ManagerAchieve/CheckIn";
import Review from "../../Achieve/ManagerAchieve/Review";
import { fetchAllReporteeUserGoals } from "../../../actions/achieve/fetchAllReporteeUserGoals";
import ReporteeRow from "./ReporteeRow/ReporteeRow";
import Spinner from "../../common/Spinner/Spinner";
import { useSelector } from "react-redux";
import ReporteeRowTab from "./ReporteeRowTab/ReporteeRowTab";

var popUpName = "";

const drawerWidth = 250;

const ManagerAlignWithLPGoalAlign = () => {
  const [ directReports, setDirectReports ] = useState<any>( null );
  const [ loadingReportees, setLoadingReportees ] = useState( false );
  const [ value, setValue ] = useState( "all" );
  const [ showViewPurpose, setViewPurpose ] = useState( false );
  const [ showCheckIn, setCheckIn ] = useState( false );
  const [ showReview, setReview ] = useState( false );
  const [ selectedDirectReport, setSelectedDirectReport ] = useState( null );
  const [ selectedGoal, setSelectedGoal ] = useState<any>( null );
  const [ sortOrder, setSortOrder ] = useState( 'asc' );
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );

  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );


  const fetchDirectReports = useCallback( async () => {
    try {
      setLoadingReportees( true );
      //@ts-ignore
      // let  = await firebaseUser.getIdToken().then(function(idToken){
      //   return idToken
      // })

      const response = await fetchAllReporteeUserGoals( {
        managerId: user?.id,
        role: currentUserRole,
      } );
      //@ts-ignore
      if ( response?.allReporteeUserGoals ) {
        //@ts-ignore
        setDirectReports( response?.allReporteeUserGoals );

        // for sorting data
        //@ts-ignore
        const sortedData = [ ...( response?.allReporteeUserGoals ) ].sort( ( a, b ) => {
          const nameA = a.userName.toLowerCase();
          const nameB = b.userName.toLowerCase();

          if ( sortOrder === 'asc' ) {
            return nameA.localeCompare( nameB );
          } else {
            return nameB.localeCompare( nameA );
          }
        } );
        setSortOrder( sortOrder === 'asc' ? 'desc' : 'asc' );
        setDirectReports( sortedData );

      }
    } catch ( error ) {
      console.log( error );
    }
    setLoadingReportees( false );
  }, [ currentUserRole, user?.id ] );
  useEffect( () => {
    fetchDirectReports();
  }, [ fetchDirectReports ] );


  const handleSort = () => {
    const sortedData = [ ...directReports ].sort( ( a, b ) => {
      const nameA = a.userName.toLowerCase();
      const nameB = b.userName.toLowerCase();

      if ( sortOrder === 'asc' ) {
        return nameA.localeCompare( nameB );
      } else {
        return nameB.localeCompare( nameA );
      }
    } );

    setDirectReports( sortedData );
    setSortOrder( sortOrder === 'asc' ? 'desc' : 'asc' );
  };

  console.log( directReports );
  const radioTab = ( event: any ) => {
    setValue( event.target.value );
  };

  const viewGoal = () => {
    setViewPurpose( true );
    popUpName = "ManagerAchieveGoalOverview";
  };

  const viewCheckIn = () => {
    setCheckIn( true );
  };

  const viewReview = () => {
    setReview( true );
  };

  const closePopup = ( value: any ) => {
    setViewPurpose( value );
    setCheckIn( value );
    setReview( value );
  };

  const [ expanded, setExpanded ] = useState( false );

  const toggleTblAccord = ( id: any ) => {
    var accordClass = document.getElementById( id );
    //@ts-ignore
    if ( accordClass.classList.contains( "MuiCollapse-hidden" ) ) {
      setExpanded( id );
    } else {
      setExpanded( false );
    }
  };

  return (
    <>
      <Box
        sx={ {
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          padding: "24px",
        } }
      >
        <Stack
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="15px"
          className="mngr_achv_top_flex tab"
        >
          {/* <TextField
            id="search"
            placeholder="Search"
            variant="outlined"
            size="small"
            fullWidth
            inputProps={{
              sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500" },
              className: "serach",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton aria-label="search" edge="start" size="small">
                    <SearchIcon sx={{ color: "#989EA5" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              maxWidth: "350px",
              margin: "24px 0 16px",
              "& ::placeholder": { color: "#999CA0" },
            }}
            className="search_field"
          /> */}
          {/*<FormControl className="ach_algn">
            <RadioGroup
              row
              aria-labelledby="manager-achieve"
              name="manager-achieve"
              value={ value }
              onChange={ radioTab }
            >
              <FormControlLabel
                value="in_progress"
                control={
                  <Radio
                    sx={ {
                      color: "#3E4248",
                      "&.Mui-checked": { color: "#3E4248" },
                    } }
                  />
                }
                label="In-Progress Goals"
                className="mngr_achv_radiolbl"
              />
              <FormControlLabel
                value="priority"
                control={
                  <Radio
                    sx={ {
                      color: "#3E4248",
                      "&.Mui-checked": { color: "#3E4248" },
                    } }
                  />
                }
                label="Priority Goals"
                className="mngr_achv_radiolbl"
              />
              <FormControlLabel
                value="all"
                control={
                  <Radio
                    sx={ {
                      color: "#3E4248",
                      "&.Mui-checked": { color: "#3E4248" },
                    } }
                  />
                }
                label="All Goals"
                className="mngr_achv_radiolbl"
              />
            </RadioGroup>
          </FormControl>*/}
        </Stack>
        <Box className="mng_achv_tbl desk">
          <Stack className="mngr_achv_header_box">
            <Typography className="mngr_achv_header mngr_achv_flx4">
              No of Goals
            </Typography>
            <Stack
              flexDirection="row"
              alignItems="center"
              gap="10px"
              className="mngr_achv_header mngr_achv_flx7"
            >
              <Typography sx={ { fontSize: "12px" } }>Employee Name</Typography>
              <span onClick={ handleSort } style={ { cursor: 'pointer' } }>
                <img
                  src="/images/sort.png"
                  alt="sort"
                  width={ 9 }
                  height={ 12 }
                  style={ { cursor: "pointer" } }
                />
              </span>
            </Stack>
            {/*<Typography className="mngr_achv_header mngr_achv_flx2">
              Alignment
            </Typography>*/}
            <Typography className="mngr_achv_header mngr_achv_flx2">
              Overall Progress
            </Typography>
            {/* <Typography className="mngr_achv_header mngr_achv_flx2">
              Analyze
            </Typography> */}
            <Typography className="mngr_achv_header mngr_achv_flx8 align_center" >
              Action
            </Typography>
          </Stack>
          { value === "in_progress" ? (
            <div>
              { loadingReportees ? (
                <Spinner />
              ) : directReports && directReports?.length ? (
                directReports.map( ( reportee: any, index: any ) => {
                  return (
                    <ReporteeRow
                      key={ index }
                      uqId={ index + 1 }
                      viewGoal={ viewGoal }
                      viewReview={ viewReview }
                      viewCheckIn={ viewCheckIn }
                      reportee={ reportee }
                      goalsType={ value }
                      fetchDirectReports={ fetchDirectReports }
                    />
                  );
                } )
              ) : null }
            </div>
          ) : value === "priority" ? (
            <div>
              { loadingReportees ? (
                <Spinner />
              ) : directReports && directReports?.length ? (
                directReports.map( ( reportee: any, index: any ) => {
                  return (
                    <ReporteeRow
                      key={ index }
                      uqId={ index + 1 }
                      viewGoal={ viewGoal }
                      viewReview={ viewReview }
                      viewCheckIn={ viewCheckIn }
                      reportee={ reportee }
                      goalsType={ value }
                      fetchDirectReports={ fetchDirectReports }
                    />
                  );
                } )
              ) : null }
            </div>
          ) : (
            <div>
              { loadingReportees ? (
                <Spinner />
              ) : directReports && directReports?.length ? (
                directReports.map( ( reportee: any, index: any ) => {
                  return (
                    <ReporteeRow
                      key={ index }
                      uqId={ index + 1 }
                      viewGoal={ viewGoal }
                      viewReview={ viewReview }
                      viewCheckIn={ viewCheckIn }
                      reportee={ reportee }
                      goalsType={ value }
                      setSelectedDirectReport={ setSelectedDirectReport }
                      setSelectedGoal={ setSelectedGoal }
                      fetchDirectReports={ fetchDirectReports }
                    />
                  );
                } )
              ) : null }
            </div>
          ) }
        </Box>
        <Box className="mng_achv_tbl tab">
          { value === "in_progress" ? (
            loadingReportees ? (
              <Spinner />
            ) : directReports && directReports?.length ? (
              directReports.map( ( reportee: any, index: any ) => {
                return (
                  <ReporteeRowTab
                    key={ index }
                    uqId={ index + 1 }
                    viewGoal={ viewGoal }
                    viewReview={ viewReview }
                    viewCheckIn={ viewCheckIn }
                    reportee={ reportee }
                    goalsType={ value }
                    setSelectedDirectReport={ setSelectedDirectReport }
                    setSelectedGoal={ setSelectedGoal }
                    fetchDirectReports={ fetchDirectReports }
                  />
                );
              } )
            ) : null
          ) : value === "priority" ? (
            loadingReportees ? (
              <Spinner />
            ) : directReports && directReports?.length ? (
              directReports.map( ( reportee: any, index: any ) => {
                return (
                  <ReporteeRowTab
                    key={ index }
                    uqId={ index + 1 }
                    viewGoal={ viewGoal }
                    viewReview={ viewReview }
                    viewCheckIn={ viewCheckIn }
                    reportee={ reportee }
                    goalsType={ value }
                    setSelectedDirectReport={ setSelectedDirectReport }
                    setSelectedGoal={ setSelectedGoal }
                    fetchDirectReports={ fetchDirectReports }
                  />
                );
              } )
            ) : null
          ) : loadingReportees ? (
            <Spinner />
          ) : directReports && directReports?.length ? (
            directReports.map( ( reportee: any, index: any ) => {
              return (
                <ReporteeRowTab
                  key={ index }
                  uqId={ index + 1 }
                  viewGoal={ viewGoal }
                  viewReview={ viewReview }
                  viewCheckIn={ viewCheckIn }
                  reportee={ reportee }
                  goalsType={ value }
                  setSelectedDirectReport={ setSelectedDirectReport }
                  setSelectedGoal={ setSelectedGoal }
                  fetchDirectReports={ fetchDirectReports }
                />
              );
            } )
          ) : null }
        </Box>
      </Box>

      <ViewPurpose
        closePopup={ closePopup }
        open={ { showViewPurpose, popUpName } }
      />
      <CheckIn
        closePopup={ closePopup }
        open={ showCheckIn }
        selectedDirectReport={ selectedDirectReport }
        selectedGoal={ selectedGoal }
      />
      <Review
        closePopup={ closePopup }
        open={ showReview }
        selectedDirectReport={ selectedDirectReport }
      />
    </>
  );
};
export default ManagerAlignWithLPGoalAlign;
