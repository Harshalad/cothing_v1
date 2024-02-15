import { useSelector } from "react-redux";
import AddGoal from "../../../components/Align/AddGoal/AddGoal";
import LoginRedirect from "../../../components/common/LoginRedirect/LoginRedirect";
import VerifyNworx from "../../../zustand/HostNameUrl";
import { useEffect } from "react";
import { verifyNworxUserCentral } from "../../../actions/auth/verifyNworxUserCentral";
import setHostUrl from "../../../constants/setHostUrl";
import PrivacyPolicy from "../../../components/PrivacyPolicy/PrivacyPolicy";

const AddGoalPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );

  setHostUrl( user );

  if ( !user?.id ) return <LoginRedirect />;
  return <> <AddGoal /> <PrivacyPolicy user={ user } /></>;
};

export default AddGoalPage;
