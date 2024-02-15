import { useSelector } from "react-redux";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import QuickPreparation from "../../components/QuickPreparation/QuickPreparation";
//@ts-ignore
import setHostUrl from "../../constants/setHostUrl";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

const QuickPreparationPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user )
  if ( !user?.id ) return <LoginRedirect />;

  return <><QuickPreparation /> <PrivacyPolicy user={ user } />  </>;
};

export default QuickPreparationPage;
