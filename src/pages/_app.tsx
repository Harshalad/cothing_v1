import "../styles/globals.css";
import "../styles/index.css"
import "../styles/dash-align.css";
import "../styles/App.css";
import "../styles/Pagination.scss";
import type { AppProps } from "next/app";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { persistor } from "../store/store";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import { CacheProvider, EmotionCache, ThemeProvider } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import { StyledEngineProvider } from "@mui/material/styles";
// import { Head } from "next/document";
import theme from "../styles/theme";
import { CssBaseline } from "@mui/material";
import { Suspense, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { verifyNworxUser } from "../actions/auth/verifyNworxUser";
import { fetchFirebaseUser } from "../actions/auth/fetchFirebaseUser";
import SplashScreen from "../components/common/SplashScreen/SplashScreen";
import { fetchNworxUser } from "../actions/auth/fetchNworxUser";
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <CacheProvider value={emotionCache}>
        <StyledEngineProvider injectFirst>
          {/* <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head> */}
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Provider store={store}>
              <ToastContainer theme="light" />
              <PersistGate loading={null} persistor={persistor}>
                {() => <Component {...pageProps} />}
              </PersistGate>
            </Provider>
          </ThemeProvider>
        </StyledEngineProvider>
      </CacheProvider>
    );
  }
}

export default MyApp;

// const App = ({ Component, pageProps }: any) => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(false);
//   //@ts-ignore
//   const isVerifiedUser = useSelector((state) => state?.auth?.isVerifiedUser);
//   //@ts-ignore
//   const nWorxUser = useSelector((state) => state?.auth?.nWorxUser);
//   //@ts-ignore
//   // const firebaseUser = useSelector((state) => state?.auth?.firebaseUser);
//   const initialRender = useRef(true);

//   useEffect(() => {
//     if (initialRender.current) {
//       initialRender.current = false;
//       return;
//     }
//     const getUserDetails = async () => {
//       try {
//         // setLoading(true);
//         if (nWorxUser?.email) {
//           //@ts-ignore
//           await dispatch(verifyNworxUser(nWorxUser?.email));
//           //@ts-ignore
//           await dispatch(fetchNworxUser(nWorxUser?.email));
//           //@ts-ignore
//           await dispatch(fetchFirebaseUser());
//         }
//         // setLoading(false);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     getUserDetails();
//   }, [dispatch, nWorxUser?.email]);

//   useEffect(() => {
//     console.log(nWorxUser);
//     // TODO Fix Nikhil, figure out why it is showing auth

//     if (!nWorxUser?.id && router.pathname !== "/") {
//       toast.error("Please sign in to view this page", {
//         toastId: "PLEASE_SIGN_IN_ROOT",
//       });
//       router.push("/");
//       setLoading(false);
//       return;
//     }
//     if (nWorxUser && !nWorxUser?.onboarded) {
//       router.push("/onboarding");
//       setLoading(false);
//       return;
//     }
//     // // TODO Sateesh check with BE
//     if (nWorxUser && nWorxUser?.showGoalOverview) {
//       router.push("/goal/overview");
//       setLoading(false);
//       return;
//     }
//     // else {
//     //   router.push("/action-center");
//     //   setLoading(false);
//     // }
//   }, [nWorxUser?.id]);

//   return (
//     <>
//       {loading ? (
//         <div>
//           <SplashScreen />
//         </div>
//       ) : (
//         <Component {...pageProps} />
//       )}
//     </>
//   );
// };
