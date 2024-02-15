import { Helmet, HelmetProvider } from "react-helmet-async";
import { Box } from "@mui/material";
import AssessmentNav from "../../components/AssessmentComps/AssessmentNav";
import TestInstructions from "./TestInstructions";
import TestInstructionsModal from "./TestInstructionsModal";
import SectionInstructions from "./SectionInstructions";
import SectionInstructionsModal from "./SectionInstructionsModal";
import TestLevel from "./TestLevel";
import SectionLevel from "./SectionLevel";
import Progressbar from "./Progressbar";
import Paginations from "./Paginations";
import Questions from "./Questions";
import CTA from "./CTA";
import Review from "./Review";
import ThankYou from "./ThankYou";
import { useEffect, useState } from "react";
import { fetchUserTestDetails, fetchUserTestDetailsApi } from "../../actions/assessment/fetchTestDetails";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { useRouter } from "next/router";
import FileOverwriteModal from "./FileOverwriteModal";

const Main = () => {
  const router = useRouter();

  const testId = router?.query?.id;
  const dispatch = useDispatch();
  const [testDetail, setTestDetails] = useState<any>(null);
  const [testInstruction, setTestInstructions] = useState(true);

  const setTestInstructionState = (e: any) => {
    setTestInstructions(e);
  };

  useEffect(() => {
    const fetchTestDetails = async () => {
      //@ts-ignore
      await dispatch(fetchUserTestDetails({
          userTestMapId: testId,
        })
      );
      //   console.log(userId, testId, attemptNo, "aditya1234");
      let response = await fetchUserTestDetailsApi({
        userTestMapId: testId,
      });
      //@ts-ignore
      setTestDetails(response?.response);
      console.log(response, "aditya");
    };
    
    fetchTestDetails();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>NWORX | Assessment</title>
        </Helmet>
      </HelmetProvider>
      <AssessmentNav testDetail={testDetail} mainPage={true}/>
      <Box className="test_instructs_body">
        <TestInstructions/>
        {/* <TestInstructionsModal
          testDetail={testDetail}
          testInstruction={testInstruction}
          setTestInstructionState={setTestInstructionState}
        /> */}
        {/* <SectionInstructions /> */}
        {/* <SectionInstructionsModal />
        <TestLevel /> */}
        {/* <Progressbar /> */}
        {/* <SectionLevel /> */}
        {/* <Paginations /> */}
        {/* <Questions /> */}
        {/* <CTA /> */}
        {/* <Review /> */}
        {/* <ThankYou /> */}
        {/* <FileOverwriteModal /> */}
      </Box>
    </>
  );
};
export default Main;
