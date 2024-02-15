import { useSelector } from "react-redux";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import QuickPreparationPrepare from "../../components/QuickPreparation/QuickPreparationPrepare/QuickPreparationPrepare";
import setHostUrl from "../../constants/setHostUrl";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
const QuickPreparationPreparePage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  // return <EventListing/>
  return <><QuickPreparationPrepare /> <PrivacyPolicy user={ user } /></>;

};

export default QuickPreparationPreparePage;
