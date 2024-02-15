import { useSelector } from "react-redux";
import QuestionMainPage from "../../../components/AssessmentComps/QuestionMainPage";
import VerifyNworx from "../../../zustand/HostNameUrl";
import { useEffect } from "react";
import { verifyNworxUserCentral } from "../../../actions/auth/verifyNworxUserCentral";
import setHostUrl from "../../../constants/setHostUrl";

const Section = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  return <QuestionMainPage />;
};

export default Section;
