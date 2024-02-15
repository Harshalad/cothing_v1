import { useSelector } from "react-redux";
import LoginRedirect from "../../../components/common/LoginRedirect/LoginRedirect";
import QuickPreparationPrepare from "../../../components/QuickPreparation/QuickPreparationPrepare/QuickPreparationPrepare";
//@ts-ignore
import setHostUrl from "../../../constants/setHostUrl";
import PrivacyPolicy from "../../../components/PrivacyPolicy/PrivacyPolicy";
const QuickPreparationPreparePage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );

  if ( !user?.id ) return <LoginRedirect />;
  setHostUrl( user );

  return <> <QuickPreparationPrepare /> <PrivacyPolicy user={ user } /> </>;
};

export default QuickPreparationPreparePage;
