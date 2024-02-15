import { useSelector } from "react-redux";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
// import Analyze from "../../components/Analyze/Analyze";
import AnalyzeNew from "../analyze-new";
import VerifyNworx from "../../zustand/HostNameUrl";
import { verifyNworxUserCentral } from "../../actions/auth/verifyNworxUserCentral";
import { useEffect } from "react";
import setHostUrl from "../../constants/setHostUrl";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

const AnalyzePage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <><AnalyzeNew /> <PrivacyPolicy user={ user } /></>;
};

export default AnalyzePage;
