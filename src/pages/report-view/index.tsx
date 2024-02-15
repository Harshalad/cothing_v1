import { useSelector } from "react-redux";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import ReportView from "../../components/ReportView/ReportViews";
import setHostUrl from "../../constants/setHostUrl";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

const ReportViewPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );

  if ( !user?.id ) return <LoginRedirect />;
  return <><ReportView /> <PrivacyPolicy user={ user } /> </>;
};
export default ReportViewPage;