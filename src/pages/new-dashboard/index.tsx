import NewDashboard from "../../components/NewDashboard/NewDashboard";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import { useSelector } from "react-redux";
import setHostUrl from "../../constants/setHostUrl";
const NewDashboardPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <><NewDashboard /> <PrivacyPolicy user={ user } /> </>;

};

export default NewDashboardPage;
