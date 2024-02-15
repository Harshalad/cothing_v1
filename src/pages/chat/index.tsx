import { useSelector } from "react-redux";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import Chat from "../../components/Chat/Chat";
import VerifyNworx from "../../zustand/HostNameUrl";
import { useEffect } from "react";
import { verifyNworxUserCentral } from "../../actions/auth/verifyNworxUserCentral";
import setHostUrl from "../../constants/setHostUrl";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

const ChatPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return (
    <div>
      <Chat />
      <PrivacyPolicy user={ user } />
    </div>
  );
};

export default ChatPage;
