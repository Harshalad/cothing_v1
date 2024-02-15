import { useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  Divider,
  Tab,
  Tabs,
} from "@mui/material";
import { useState } from "react";
import AddGoalPurpose from "../AddGoalPurpose/AddGoalPurpose";
import Guidance from "./Guidance";
import { useSelector } from "react-redux";
import SelectGoals from "../SelectGoals/SelectGoals";
import { fetchCurrentGoals } from "../../../../actions/achieve/fetchCurrentGoals";
import { getProgramGoals } from "../../../../actions/align/fetchProgramGoals";
import CurrentGoals from "../CurrentGoals/CurrentGoals";
import SavedForLaterGoals from "../SaveForLaterGoals/SavedForLaterGoals";
import { fetchDevelopmentAreas } from "../../../../actions/align/fetchDevelopmentAreas";
import nworxuser from "../../../../constants/proto/verifyUser/verify-nworx-user_grpc_web_pb";
import Spinner from "../../../common/Spinner/Spinner";
var popUpName = "";
import { TabContext, TabPanel } from "@mui/lab";
import PreviousGoals from "../PreviousGoals/PreviousGoals";
import ViewPurpose from "../../../common/ViewPurpose/ViewPurpose";
import { fetchPreviousGoals } from "../../../../actions/align/fetchPreviousGoals";
import { MANAGER_VIEW_STATE } from "../../../../constants/auth";
import CustomGoalPurpose from "../CustomGoalPurpose/CustomGoalPurpose";

const EmployeeAlignAddGoal = () => {
  //@ts-ignore
  const user = useSelector((state) => state?.auth?.nWorxUser);
  const [tabName, setTabName] = useState("current_goals");
  const [showViewPurpose, setViewPurpose] = useState(false);
  const [selectGoalsLoading, setSelectGoalsLoading] = useState(false);
  const [topGoals, setTopGoals] = useState<any>([]);
  const [remainingGoals, setRemainingGoals] = useState<any>([]);
  const [currentGoals, setCurrentGoals] = useState<any>([]);
  const [currentGoalsLoading, setCurrentGoalsLoading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<any>(null);
  const [developmentAreas, setDevelopmentAreas] = useState<any>(null);
  const [goalIdDevAreaMap, setGoalIdDevAreaMap] = useState<any>(null);

  const [previousGoals, setPreviousGoals] = useState<any>(null);
  const [openCustomPopUp, setOpenCustomPopUp] = useState<any>(false);

  const [completedGoalsLoading, setCompletedGoalsLoading] =
    useState<any>(false);

  const program = useSelector(
    // @ts-ignore
    (state) => state?.user?.program
  );


  const getCurrentGoals = useCallback(async () => {
    try {
      setCurrentGoalsLoading(true);
      //@ts-ignore
      // let  = await firebaseUser.getIdToken().then(function (idToken) {
      //   return idToken;
      // });

      const response = await fetchCurrentGoals({
        userId: user.id,
        programId: user.activeProgramId,

      });
      //@ts-ignore
      if (response?.currentGoals?.length) {
        //@ts-ignore
        setCurrentGoals(response?.currentGoals);
      }
      setCurrentGoalsLoading(false);
    } catch (error) {
      console.log(error);
      setCurrentGoalsLoading(false);
    }
  }, [user.activeProgramId, user.id]);

  const currentUserRole = useSelector(
    //@ts-ignore
    (state) => state?.auth?.managerToggleView
  );

  const fetchProgramGoals = useCallback(async () => {
    try {
      setSelectGoalsLoading(true);

      const programGoalsObject: any = await getProgramGoals({
        //@ts-ignore
        programId: user?.activeProgramId,
        userId: user?.id,
        department: user?.department,

      });
      console.log(programGoalsObject?.programGoals, "PGO ** ");
      //@ts-ignore
      if (programGoalsObject?.programGoals?.length) {
        //@ts-ignore
        const topGoals = programGoalsObject?.programGoals?.filter(
          (programGoal: any) => programGoal.recommended
        );
        setTopGoals(topGoals);
        //@ts-ignore
        const remainingGoals = programGoalsObject?.programGoals?.filter(
          (programGoal: any) => {
            if (programGoal?.recommended) return false;
            return true;
          }
        );
        setRemainingGoals(remainingGoals);
      }
      setSelectGoalsLoading(false);
    } catch (error) {
      console.log(error);
      setSelectGoalsLoading(false);
    }
  }, [user?.activeProgramId]);

  const getCompletedGoals = useCallback(async () => {
    try {
      setCompletedGoalsLoading(true);

      const response = await fetchPreviousGoals({
        userId: user.id,
        programId: user.activeProgramId,

      });
      //@ts-ignore
      if (response?.previousGoals?.length) {
        //@ts-ignore
        setPreviousGoals(response?.previousGoals);
      }
      setCompletedGoalsLoading(false);
    } catch (error) {
      console.log(error);
      setCompletedGoalsLoading(false);
    }
  }, [user.activeProgramId, user.id]);


  const getDevelopmentAreas = useCallback(async () => {
    try {

      const response = await fetchDevelopmentAreas({
        programId: user?.activeProgramId,

      });
      //@ts-ignore
      if (response?.length) {
        setDevelopmentAreas(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?.activeProgramId]);


  useEffect(() => {
    const getAllGoals = async () => {
      await getDevelopmentAreas();
      await getCompletedGoals();
      await getCurrentGoals();
      await fetchProgramGoals();
    };
    getAllGoals();
  }, [
    fetchProgramGoals,
    getCompletedGoals,
    getCurrentGoals,
    getDevelopmentAreas,
  ]);

  const tabSwitch = (event: any, newValue: any) => {
    setTabName(newValue);
  };

  useEffect(() => {
    let goalIdDevAreaMapLocal = new Map();
    developmentAreas?.map((curDevArea: any, index: number) => {
      if (curDevArea?.goals?.length) {
        curDevArea?.goals?.map((goal: any, index: number) => {
          if (goalIdDevAreaMapLocal.has(goal.goalId)) {
            let value = goalIdDevAreaMapLocal.get(goal.goalId);
            value.push(curDevArea.devAreaName);
            goalIdDevAreaMapLocal.set(goal.goalId, value);
          } else {
            goalIdDevAreaMapLocal.set(goal.goalId, [curDevArea.devAreaName]);
          }
        });
      }
    });
    setGoalIdDevAreaMap(goalIdDevAreaMapLocal);
  }, [developmentAreas]);

  console.log("goalIdDevAreaMap ", goalIdDevAreaMap);

  const addPurpose = (event: any) => {
    setEditOption(true);
    if (!program?.configMap?.customAlignQuestion) {

      var purposeBtns = document.getElementsByClassName("purpose_btn");
      for (let i = 0; i < purposeBtns.length; i++) {
        //@ts-ignore
        if (purposeBtns[i].innerText === "Add Purpose") {
          setDisableBtn(false);
          break;
        } else {
          setDisableBtn(true);
        }
      }
      //@ts-ignore
      if (document.getElementById(event.target.id).innerText === "Add Purpose") {
        popUpName = "addPurpose";
        setPopUp(true);
      } else {
        popUpName = "editPurpose";
        setPopUp(true);
      }
    } else {
      setOpenCustomPopUp(true);
    }
  };

  const viewPurpose = (event: any) => {
    setViewPurpose(true);
  };

  const closePopup = (value: any) => {
    setPopUp(value);
    setViewPurpose(value);
    setSelectedGoal(null);
    setOpenCustomPopUp(false);
  };


  const [showEditOption, setEditOption] = useState(false);
  const [isDisableBtn, setDisableBtn] = useState(false);
  const [showPopUp, setPopUp] = useState(false);
  const [showGuidance, setGuidance] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState<any>([]);
  const [goalsForLater, setGoalsForLater] = useState<any>([]);
  const [goal, setGoal] = useState<any>();

  const assignGoal = () => { };

  const addGoal = (goal: any, e: any) => {
    setGoal(goal);
    addPurpose(e);
  };
  console.log(program, "dvinaddgoal");
  return (
    <>
      <Box className="manager_grid">
        <Box className="manager_left_box">
          {selectGoalsLoading ? (
            <Spinner />
          ) : topGoals?.length || remainingGoals?.length ? (
            <SelectGoals
              topGoals={topGoals}
              remainingGoals={remainingGoals}
              currentGoals={currentGoals}
              setCurrentGoals={setCurrentGoals}
              PROGRAM_ID_TEMP={user.activeProgramId}
              ASSIGNEE_USER_ID_TEMP={user.id}
              developmentAreas={developmentAreas}
              previousGoals={previousGoals}
              goalIdDevAreaMap={goalIdDevAreaMap}
            />
          ) : null}
          {/* <NewGoalAdded /> */}
        </Box>
        <Box className="manager_right_box">
          <Box className="manager_tab_box">
            <Tabs value={tabName} onChange={tabSwitch} className="manager_tabs">
              <Tab
                value="current_goals"
                label="Current Goals"
                sx={{ textTransform: "capitalize" }}
              />
              <Tab
                value="previous_goals"
                label="Completed Goals"
                sx={{ textTransform: "capitalize" }}
              />
            </Tabs>
          </Box>
          <Box className="managerTabContent" mt="12px">
            <TabContext value={tabName}>
              <TabPanel value="current_goals">
                <>
                  <Typography
                    sx={{
                      marginBottom: "12px",
                      color: "#989EA5",
                      fontSize: "12px",
                    }}
                  >
                    {currentUserRole === MANAGER_VIEW_STATE.LP
                      ? program?.checkForOnStart ? "Goals for the journey" : user?.noAlignRequired
                        ? "Goals selected by you appear here"
                        : "Goals selected by you or for you by key stakeholders appear here."
                      : "Add details and assign goals."}
                  </Typography>
                  {/* <Box className="goals_main no_goals_main">
                    <Typography sx={{ color: "#5D636B", fontSize: "16px" }}>
                      Start assigning the goals
                    </Typography>
                  </Box> */}
                  {currentGoalsLoading ? (
                    <Spinner />
                  ) : (
                    <CurrentGoals
                      currentGoals={currentGoals}
                      setCurrentGoals={setCurrentGoals}
                      PROGRAM_ID_TEMP={user.activeProgramId}
                      ASSIGNEE_USER_ID_TEMP={user.id}
                      addPurpose={addPurpose}
                      selectedGoal={selectedGoal}
                      setSelectedGoal={setSelectedGoal}
                      viewPurpose={viewPurpose}
                      getCurrentGoals={getCurrentGoals}
                    />
                  )}
                </>
              </TabPanel>
              <TabPanel value="previous_goals">
                <PreviousGoals
                  previousGoals={previousGoals}
                  completedGoalsLoading={completedGoalsLoading}
                />
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
      </Box>
      <AddGoalPurpose
        closePopup={closePopup}
        open={{ showPopUp, popUpName }}
        goal={selectedGoal}
        setGoal={setSelectedGoal}
        getCurrentGoals={getCurrentGoals}
      />
      <CustomGoalPurpose
        closePopup={closePopup}
        open={openCustomPopUp}
        goal={selectedGoal}
        setGoal={setSelectedGoal}
        getCurrentGoals={getCurrentGoals}
      />
      <ViewPurpose
        closePopup={closePopup}
        open={{ showViewPurpose, popUpName }}
        goal={selectedGoal}
      />
    </>
  );
};
export default EmployeeAlignAddGoal;
