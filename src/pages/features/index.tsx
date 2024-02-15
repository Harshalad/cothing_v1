import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/auth/logout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import PrivacyPolicy from "../../components/PrivacyPolicy/PrivacyPolicy";

const Features = () => {
  const router = useRouter();
  //@ts-ignore
  const firebaseUser = useSelector( ( state ) => state.auth?.firebaseUser );
  //@ts-ignore
  const nWorxUser = useSelector( ( state ) => state.auth?.nWorxUser );
  console.log( firebaseUser, nWorxUser );
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch( logout() );
  };

  useEffect( () => {
    if ( !nWorxUser && !firebaseUser ) {
      router.push( "/" );
    }
  }, [ firebaseUser, nWorxUser, router ] );

  return (
    <div>
      <button onClick={ onSignOut }>Signout</button>
      <PrivacyPolicy user={ nWorxUser } />
    </div>
  );
};

export default Features;
