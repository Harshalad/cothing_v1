// import 
import EventPrep from "../../components/Events/EventPrep";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import { useSelector } from "react-redux";
import setHostUrl from "../../constants/setHostUrl";
const PreparePage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <><EventPrep /> <PrivacyPolicy user={ user } /></>

};

export default PreparePage;
