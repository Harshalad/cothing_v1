import type { NextPage } from "next";
import Head from "next/head";
import Auth from "../components/Auth/Auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import SplashScreen from "../components/common/SplashScreen/SplashScreen";
import { useSelector } from "react-redux";
import { verifyNworxUser } from "../actions/auth/verifyNworxUser";
import { fetchNworxUser, getNworxUser } from "../actions/auth/fetchNworxUser";
import { fetchFirebaseUser } from "../actions/auth/fetchFirebaseUser";
//@ts-ignore
import { auth } from "../utils/firebase";
import { verifyNworxUserCentral } from "../actions/auth/verifyNworxUserCentral";
import VerifyNworx from "../zustand/HostNameUrl";

const Home: NextPage = () => {
  const { hostUrl } = VerifyNworx();

  const router = useRouter();
  const dispatch = useDispatch();
  const [ loading, setLoading ] = useState( true );

  const [ lastFetchTime, setLastFetchTime ] = useState<any>( null );

  //@ts-ignore
  const isVerifiedUser = useSelector( ( state ) => state?.auth?.isVerifiedUser );
  //@ts-ignore
  // const firebaseUser = useSelector((state) => state?.auth?.nWorxUser);
  //@ts-ignore
  const firebaseUser = useSelector( ( state ) => state?.auth?.firebaseUser );
  //const [ nWorxUser, setNWorxUser ] = useState<any>( null );

  const [ currentUser, setCurrentUser ] = useState( null );
  function onAuthStateChange ( callback: any ) {
    //@ts-ignore
    return auth.onAuthStateChanged( async ( userAuth: any ) => {
      console.log( userAuth, "userAuth" );
      if ( userAuth ) {
        // const userRef = await createUserDocument(userAuth);
        // userRef.onSnapshot(snapShot => {
        //   callback({
        //     id: snapShot.id,
        //     ...snapShot.data()
        //   })
        // })
        //@ts-ignore

        console.log( "in user auth", userAuth, auth );
      } else {
        router.push( "/" );
        //@ts-ignore
        console.log( "in else", auth );
        // callback(null);
      }
    } );
  }

  console.log( firebaseUser, firebaseUser?.email, lastFetchTime, "FIREBASE USER EMAIL" );
  let nWorxUser: any = null;
  useEffect( () => {
    const startupLogic = async () => {
      try {
        // setLoading(true);
        if (
          firebaseUser?.email

        ) {
          const isNWORXRegisteredUser = await verifyNworxUserCentral( firebaseUser?.email, hostUrl )

          //@ts-ignore
          await dispatch( verifyNworxUser( firebaseUser?.email ) );
          console.log( "fetchNworxuserr" );

          nWorxUser = await getNworxUser( firebaseUser?.email );
          nWorxUser = nWorxUser?.nWorxUser;
          //console.log( "user", user, firebaseUser?.email );

          //@ts-ignore
          await dispatch( fetchNworxUser( firebaseUser?.email ) );

          //@ts-ignore
          await dispatch( fetchFirebaseUser() );

          setLastFetchTime( new Date() );
        }
        // const unsubscribe = onAuthStateChange(setCurrentUser);
        console.log( nWorxUser, "Nworx user here is" );
        // TODO Fix Nikhil, figure out why it is showing auth

        if ( !nWorxUser?.id && router.pathname !== "/" ) {
          toast.error( "Please sign in to view this page", {
            toastId: "PLEASE_SIGN_IN_ROOT",
          } );
          router.push( "/" );
          setLoading( false );
          return;
        }
        // if (nWorxUser) {
        //   router.push("/action-center");
        //   setLoading(false);
        //   return;
        // }

        console.log( nWorxUser?.nWorxUser, "nWorxUser12344556   " );
        console.log( nWorxUser?.onboarded, "is onboarded" );
        console.log( nWorxUser?.showGoalOverview, "show goal overview" );
        if ( nWorxUser ) {
          if ( nWorxUser && !nWorxUser?.onboarded ) {
            router.push( "/onboarding" );
            setLoading( false );
            return;
          }
          // // TODO Sateesh check with BE
          if ( nWorxUser && nWorxUser?.showGoalOverview ) {
            router.push( "/goal/overview" );
            setLoading( false );
            return;
          }
          if ( nWorxUser && nWorxUser?.id ) {
            router.push( "/action-center" );
            setLoading( false );
            return;
          }
        }
        setLoading( false );

        // return () => {
        //   unsubscribe();
        // };
      } catch ( error ) {
        console.log( error );
      }
    };
    startupLogic();
  }, [

  ] );

  return (
    <div>
      <Head>
        <title>NWORX 4</title>
        <meta name="description" content="NWORX 4" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        { loading ? (
          <div>
            <SplashScreen />
          </div>
        ) : (
          <Auth />
        ) }
      </main>
    </div>
  );
};

export default Home;

