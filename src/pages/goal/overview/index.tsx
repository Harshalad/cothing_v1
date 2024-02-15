import { useEffect } from "react";
import GoalOverview from "../../../components/Goal/GoalOverview/GoalOverview";
import LoginRedirect from "../../../components/common/LoginRedirect/LoginRedirect";
import { useSelector } from "react-redux";
import setHostUrl from "../../../constants/setHostUrl";
import PrivacyPolicy from "../../../components/PrivacyPolicy/PrivacyPolicy";
const GoalsOverviewPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <><GoalOverview /><PrivacyPolicy user={ user } /> </>;

};

export default GoalsOverviewPage;
