import { TabPanel } from "@mui/lab";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../common/Spinner/Spinner";
import { fetchAlignUserGoals } from "../../../../actions/user/fetchUserGoals";
import UserGoalRow from "./UserGoalRow/UserGoalRow";
import { Search } from "@mui/icons-material";
import { RadioGroup, FormControlLabel, Radio, Icon } from "@mui/material";
import router from "next/router";
import { styled, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import { logUserEngagement } from "../../../../actions/actionCenter/logUserEngagement";

const UserGoalsTab = () => {
  //@ts-ignore
  const nWorxUser = useSelector( ( state ) => state?.auth?.nWorxUser );
  const [ userGoals, setUserGoals ] = useState<any>( null );
  const [ loading, setLoading ] = useState( true );
  const [ valueRadio, setValueRadio ] = useState( "All" );

  const SearchIconWrapper = styled( "div" )( ( { theme } ) => ( {
    padding: theme.spacing( 0, 2 ),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } ) );

  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  const StyledInputBase = styled( InputBase )( ( { theme } ) => ( {
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing( 1, 1, 1, 0 ),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${ theme.spacing( 4 ) })`,
      transition: theme.transitions.create( "width" ),
      width: "100%",
      [ theme.breakpoints.up( "md" ) ]: {
        width: "20ch",
      },
    },
  } ) );



  useEffect( () => {
    const fetchGoals = async () => {
      try {
        setLoading( true );
        //@ts-ignore

        const userGoals = await fetchAlignUserGoals( {
          userId: nWorxUser?.id,
          programId: nWorxUser?.activeProgramId,

        } );

        // let filteredGoals: any[] = [];

        // //@ts-ignore
        // userGoals?.map((goal: any, key: number) => {
        //   if (goal?.status !== "ADDED") {
        //     filteredGoals.push();
        //   }
        // });

        console.log( "ALIGN userGoals REQ", {
          userId: nWorxUser?.id,
          programId: nWorxUser?.activeProgramId,
        } );

        console.log( "ALIGN userGoals ", userGoals );

        setUserGoals( userGoals || [] );
        setLoading( false );
      } catch ( error ) {
        setLoading( false );
        console.log( error );
      }
    };
    fetchGoals();
  }, [] );

  const handleChangeRadio = ( event: any ) => {
    setValueRadio( event.target.value );
  };

  return (
    <>
      <TabPanel value="1">
        <div className="tabs-nav-panel">
          <div className="tab-search-element">
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search by"
                inputProps={{ "aria-label": "search" }}
              />
            </Search> */}
          </div>
          <div style={ { display: "flex" } }>
            {/*<RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={ valueRadio }
              onChange={ handleChangeRadio }
            >
              <FormControlLabel value="All" control={ <Radio /> } label="All" />
              <FormControlLabel
                value="Not Aligned"
                control={ <Radio /> }
                label="Not Aligned"
              />
            </RadioGroup>*/}
            <article
              className="add-goal-btn"
              onClick={ () => {
                if ( currentUserRole === MANAGER_VIEW_STATE.LP ) {
                  logUserEngagement( {
                    userId: nWorxUser?.id,
                    //@ts-ignore
                    goalId: "NA",
                    programId: nWorxUser?.activeProgramId,
                    type: "curiosity",
                    action: "employee_added_goal",
                    //@ts-ignore
                    contentName: "NA",
                    contentId: "NA",
                    milestoneId: "NA",
                    marks: 4,
                  } );
                }
                router.push( "/align/add-goal" );
              } }
              role="button"
              style={ { cursor: "pointer" } }
            >
              <Icon sx={ { color: "#F58A43" } }>
                <AddCircleOutlineIcon />
              </Icon>
              &nbsp;Add Goal
            </article>
          </div>
        </div>

        <div className="align-panel-details">
          <div className="details-panel-nav">
            {/* <div className="flx-1">
              <article className="dtls-pnl-navtxt">SNo</article>
            </div> */}
            <div className="flx-5">
              <article className="dtls-pnl-navtxt">Goals</article>
            </div>
            <div className="flx-2">
              <article className="dtls-pnl-navtxt">Selected By</article>
            </div>
            {/*<div className="flx-3">
              <article className="dtls-pnl-navtxt">Goal alignment</article>
            </div>*/}
            <div className="flx-5">
              <article className="dtls-pnl-navtxt">Action</article>
            </div>
          </div>
          <div className="mygols-tabs-holder">
            { loading ? (
              <Spinner />
            ) : (
              userGoals &&
              userGoals
                .filter( ( goal: any ) => {
                  if ( valueRadio === "Not Aligned" ) {
                    if (
                      goal?.status !== "ALIGNED"
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                  return true
                } )
                .map( ( goal: any, key: number ) => {
                  return (
                    <UserGoalRow key={ key } goal={ goal } serialNo={ key + 1 } />
                  );
                } )
            ) }
          </div>
        </div>
      </TabPanel>
    </>
  );
};

export default UserGoalsTab;
