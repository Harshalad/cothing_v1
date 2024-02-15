import Prepare from "../../components/Prepare/Prepare";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import { useSelector } from "react-redux";
//@ts-ignore
import setHostUrl from "../../constants/setHostUrl";
const PreparePage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <> <Prepare /> <PrivacyPolicy user={ user } />  </>;

};

export default PreparePage;
