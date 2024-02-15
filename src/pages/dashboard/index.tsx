import Dashboard from "../../components/Dashboard/Dashboard";
import TempDashboard from "../../components/Dashboard/TempDashboard";
import DashboardV2 from "../../components/DashboardV2/DashboardV2";
import NewDashboard from "../../components/NewDashboard/NewDashboard";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import { useSelector } from "react-redux";
import VerifyNworx from "../../zustand/HostNameUrl";
import { useEffect } from "react";
import { verifyNworxUserCentral } from "../../actions/auth/verifyNworxUserCentral";
import setHostUrl from "../../constants/setHostUrl";
const DashboardPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  console.log( program, "dashboardProgram" );
  if ( !user?.id ) return <LoginRedirect />;
  if ( program?.id === "f4bb3c3e-e10c-4c10-b53d-6b8503c5f36c" ) {
    return <> <TempDashboard /> <PrivacyPolicy user={ user } /> </>
  }
  if ( program !== null && program?.hasOwnProperty( "dashboardScreen" ) ) {
    if ( program?.dashboardScreen === null || program?.dashboardScreen?.length === 0 || program?.dashboardScreen === "default" ) {
      return <Dashboard />
    } else if ( program?.dashboardScreen === "v2" ) {
      return <DashboardV2 />

    }
    return <><NewDashboard /><PrivacyPolicy user={ user } /></>

  }
  return <> <Dashboard /><PrivacyPolicy user={ user } /></>;
};

export default DashboardPage;
