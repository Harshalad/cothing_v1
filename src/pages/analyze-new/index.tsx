import { useSelector } from "react-redux";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import AnalyzeNew from "../../components/AnalyzeNew/AnalyzeNew";
import VerifyNworx from "../../zustand/HostNameUrl";
import { verifyNworxUserCentral } from "../../actions/auth/verifyNworxUserCentral";
import { useEffect } from "react";
import setHostUrl from "../../constants/setHostUrl";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

const AnalyzeNewPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );

  if ( !user?.id ) return <LoginRedirect />;
  return <> <AnalyzeNew /> <PrivacyPolicy user={ user } /></>;
};

export default AnalyzeNewPage;
