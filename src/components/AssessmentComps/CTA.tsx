import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { UPDATE_CURRENT_QUESTION_ANSWER } from "../../actions/assessment/UpdateAction";
import { questionsMap } from "../../constants/golbals";
import { useSelector } from "react-redux";
import { submitTestAnswer } from "../../actions/assessment/submitAnswer";
const CTA = ({ handleSaveAndNextClick }: any) => {
  let attemptNo = "occaecat dolore sed et Duis";
  let testId = "9362f62b-68b3-4010-91ef-0383ffe972e9";
  let userId = "abc";
  //@ts-ignore
  const qId = useSelector((state) => state?.assessment?.qId);
  //@ts-ignore
  const sectionId = useSelector((state) => state?.assessment?.sectionId);
  const dispatch = useDispatch();
  const handleSave = async () => {};
  return (
    <>
      <Box className="btn_contr">
        <Box className="test_instructs_cta">
          <Button
            className="standard_cta"
            onClick={() => handleSaveAndNextClick()}
          >
            Save and Next
          </Button>
          {/* Last Question in Test */}
          {/* <Button className="standard_cta">Save and Finish</Button> */}
        </Box>
      </Box>
    </>
  );
};
export default CTA;