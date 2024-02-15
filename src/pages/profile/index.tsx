import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import Profile from "../../components/Profile/Profile";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import { useSelector } from "react-redux";
//@ts-ignore
import setHostUrl from "../../constants/setHostUrl";

const ProfilePage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );

  if ( !user?.id ) return <LoginRedirect />;
  return (
    <div>
      <Profile />
      <PrivacyPolicy user={ user } />
    </div>
  );
};

export default ProfilePage;
