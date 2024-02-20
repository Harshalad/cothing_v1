import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import { useSelector } from "react-redux";
//@ts-ignore
import setHostUrl from "../../constants/setHostUrl";
import CothinkPrepare from "../../components/CothinkPrepare/CothinkPrepare";
import FeedbackReportPage from "../../components/FeedbackAndReport/FeedbackReport";
const PreparePage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <> <FeedbackReportPage /> <PrivacyPolicy user={ user } />  </>;

};

export default PreparePage;
