import ManagerViewEmployeeAchieve from "../../../components/Achieve/ManagerViewEmployeeAchieve/ManagerViewEmployeeAchieve";
import PrivacyPolicy from "../../../components/PrivacyPolicy/PrivacyPolicy";
import LoginRedirect from "../../../components/common/LoginRedirect/LoginRedirect";
import { useSelector } from "react-redux";
import VerifyNworx from "../../../zustand/HostNameUrl";
import { useEffect } from "react";
import { verifyNworxUserCentral } from "../../../actions/auth/verifyNworxUserCentral";
import setHostUrl from "../../../constants/setHostUrl";

const ManagerViewEmployeeAchievePage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );

  if ( !user?.id ) return <LoginRedirect />;
  return <> <ManagerViewEmployeeAchieve /> <PrivacyPolicy user={ user } /></>;
};

export default ManagerViewEmployeeAchievePage;
