import { useSelector } from "react-redux";
import EmployeeProfile from "../../../components/Employee/Profile/EmployeeProfile/EmployeeProfile";
import VerifyNworx from "../../../zustand/HostNameUrl";
import { useEffect } from "react";
import { verifyNworxUserCentral } from "../../../actions/auth/verifyNworxUserCentral";
import setHostUrl from "../../../constants/setHostUrl";
import PrivacyPolicy from "../../../components/PrivacyPolicy/PrivacyPolicy";

const EmployeeProfilePage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  return <><EmployeeProfile /><PrivacyPolicy user={ user } /></>;

};

export default EmployeeProfilePage;
