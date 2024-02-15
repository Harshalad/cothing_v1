import ManagerActionCenter from "../../components/ActionCenter/ManagerActionCenter";
import ActionCenter from "../../components/ActionCenter/ActionCenter";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../constants/auth";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";

import VerifyNworx from "../../zustand/HostNameUrl";
import { verifyNworxUserCentral } from "../../actions/auth/verifyNworxUserCentral";
import setHostUrl from "../../constants/setHostUrl";
import { useEffect, useState } from "react";
import { getNworxUser } from "../../actions/auth/fetchNworxUser";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
const ActionCenterPage = () => {
  const managerToggleView = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );

  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );

  if ( !user?.id ) return <LoginRedirect />;

  return (
    <>
      { managerToggleView === MANAGER_VIEW_STATE.LP ? (
        <ActionCenter />
      ) : (
        <ManagerActionCenter />
      ) }
      <PrivacyPolicy user={ user } />
    </>
  );
};

export default ActionCenterPage;
