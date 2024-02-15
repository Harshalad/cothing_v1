import Achieve from "../../components/Achieve/Achieve";
import { useSelector } from "react-redux";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
//@ts-ignore
import setHostUrl from "../../constants/setHostUrl";

import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
const AchievePage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <> <Achieve /><PrivacyPolicy user={ user } /></>;
};

export default AchievePage;
