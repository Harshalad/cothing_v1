import { useEffect } from "react";
import ThankYou from "../../../components/AssessmentComps/ThankYou";
import VerifyNworx from "../../../zustand/HostNameUrl";
import { verifyNworxUserCentral } from "../../../actions/auth/verifyNworxUserCentral";
import { useSelector } from "react-redux";
import setHostUrl from "../../../constants/setHostUrl";

const Section = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  return <ThankYou />;
};

export default Section;
