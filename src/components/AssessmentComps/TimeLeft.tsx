import { Stack, Typography } from "@mui/material";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { submitUserTest, submitUserTestRedux } from "../../actions/assessment/submitTest";
import { useRouter } from "next/router";
import { fetchUserTestDetails } from "../../actions/assessment/fetchTestDetails";
import { toast } from "react-toastify";
import { fetchTestQuestions } from "../../actions/assessment/fetchQuestions";
import Spinner from "../common/Spinner/Spinner";

export const TimeLeft = () => {
  //@ts-ignore
  const test = useSelector((state) => state?.assessment?.testDetails);

  const dispatch = useDispatch();
  const router = useRouter();
  const testId = router?.query?.id;
  const [attempt, setAttempt] = useState(useSelector((state: any) => state?.assessment?.attempt));
  const [change, setChange] = useState(false);
  const [seconds, setSeconds] = useState(attempt?.timeLeft);
  useEffect(() => {
    const testStartDate = attempt?.testStartDateTime;
    const testDuration = attempt?.duration;
    const testStartDateInDate = new Date(testStartDate);
    const currentDate = new Date();
    const timeDifferenceMs =
      currentDate.getTime() - testStartDateInDate.getTime();
    const timeDifferenceSec = Math.floor(timeDifferenceMs / 1000);
    const testDurationInSec = 60 * testDuration;
    setSeconds(testDurationInSec - timeDifferenceSec)
  }, [attempt, change])


  useEffect(() => {
    const interval = setInterval(() => {
      setChange(!change);
      if (seconds <= 0) {
        clearInterval(interval);
        toast.success("Alert: The allocated time is up. Quiz will be auto submitted with the saved answers.");
        setSeconds(0);
        const response = submitUserTest({
          userTestMapId: testId,
          autoSubmitted: true,
        });
        //@ts-ignore
        if (response) {
        router.push("/assessment/thank-you");
}
        return;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [change]);
  console.log(test, seconds, "njsfdbljfb");
  return (
    <>

      {seconds && <Stack className="test_instructs_time_flex">
        <AccessTimeRoundedIcon />
        <Typography className="test_time_numb">
          {Math.floor(seconds / 60)} Min : {seconds % 60 < 10 ? "0" : ""}
          {seconds % 60} Sec
        </Typography>
      </Stack>}

    </>
  );
};
