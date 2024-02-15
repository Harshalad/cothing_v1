import EventsComp from "../../components/Events/Events";
import { useSelector } from "react-redux";
import LoginRedirect from "../../components/common/LoginRedirect/LoginRedirect";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";
import setHostUrl from "../../constants/setHostUrl";
const Events = () => {
  //@ts-ignore
  const user = useSelector( ( state ) => state?.auth?.nWorxUser );
  setHostUrl( user );
  if ( !user?.id ) return <LoginRedirect />;
  return <><EventsComp /> <PrivacyPolicy user={ user } /></>;

};
export default Events;