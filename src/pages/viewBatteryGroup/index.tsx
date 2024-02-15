import { useSelector } from "react-redux";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import ViewBatteryGroup from "../../components/AnalyzeNew/ViewGroupBattery";
import setHostUrl from "../../constants/setHostUrl";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
const Battery = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <><ViewBatteryGroup />  <PrivacyPolicy user={ user } /> </>;
};
export default Battery;
