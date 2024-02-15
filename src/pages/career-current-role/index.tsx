import { useSelector } from "react-redux";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import CareerCurrentRole from "../../components/CareerCurrentRole/CareerCurrentRole"
import VerifyNworx from "../../zustand/HostNameUrl";
import { useEffect } from "react";
import { verifyNworxUserCentral } from "../../actions/auth/verifyNworxUserCentral";
import setHostUrl from "../../constants/setHostUrl";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

const Career = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );

  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <><CareerCurrentRole /> <PrivacyPolicy user={ user } /></>

};
export default Career;