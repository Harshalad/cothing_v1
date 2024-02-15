import Onboarding from "../../components/Onboarding/Onboarding";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import { useSelector } from "react-redux";
import setHostUrl from "../../constants/setHostUrl";
const OnboardingPage = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );

  if ( !user?.id ) return <LoginRedirect />;
  return (
    <div>
      <Onboarding />
      <PrivacyPolicy user={ user } />
    </div>
  );
};

export default OnboardingPage;
