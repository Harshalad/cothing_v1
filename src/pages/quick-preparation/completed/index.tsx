import PrivacyPolicy from "../../../components/PrivacyPolicy/PrivacyPolicy";
import QuickPreparationCompleted from "../../../components/QuickPreparation/QuickPreparationCompleted/QuickPreparationCompleted";
import LoginRedirect from "../../../components/common/LoginRedirect/LoginRedirect";
import { useSelector } from "react-redux";
//@ts-ignore
import setHostUrl from "../../../constants/setHostUrl";

const QuickPreparationCompletedPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <><QuickPreparationCompleted /> <PrivacyPolicy user={ user } /> </>;
};

export default QuickPreparationCompletedPage;
