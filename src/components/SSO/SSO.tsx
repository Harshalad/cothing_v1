import { useEffect, useRef, useState } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import {
    AUTH_STATES,
    AUTH_TAB_TYPES,
    AUTH_OPTION_TYPES,
} from "../../constants/auth";
import { useRouter } from "next/router";
import { defultLogin, hulLogin } from "../../constants/customLogin";
import signInWithSSO from "../../actions/auth/signInWithSSO";
import { fetchNworxUser, getNworxUser } from "../../actions/auth/fetchNworxUser";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { verifyNworxUser } from "../../actions/auth/verifyNworxUser";
import React from "react";
import { toast } from "react-toastify";


const SSO = () => {

    const hostUrl = window.location.host.toLowerCase();
    const [loginObj, setLoginObj] = useState<any>(null);
    const host = hostUrl.includes("loc");
    const dispatch = useDispatch<AppDispatch>();
    const hostRef = useRef(host);
    useEffect(() => {
        setLoginObj(defultLogin);
    }, [host])
    const router = useRouter();
    const [autoResultCalled, setAutoResultCalled] = useState(false);

    useEffect(() => {
        if (!autoResultCalled) {
            getResult();
            setAutoResultCalled(true);
        }
    }, [autoResultCalled]);
    console.log(loginObj, "adityaloginobj");
    const getResult = async () => {
        const result = await signInWithSSO();
        console.log("resultSSO",result);
        // if (result) {
            let email = result?.user?.email;
            console.log(email, "isNWORXRegisteredUser");
            // @ts-ignore
            const isNWORXRegisteredUser = await dispatch(verifyNworxUser(email));
            if (isNWORXRegisteredUser?.payload?.isVerifiedUser === undefined || !isNWORXRegisteredUser?.payload?.isVerifiedUser) {
                toast.error("You are not register with NWORX!. Please contact your admin team")
                return;
            }
            // @ts-ignore
            await dispatch(fetchNworxUser(email));
            const userObj: any = await getNworxUser(email);
            const user = userObj?.nWorxUser;
            console.log("SIGN UP FORM", user);
            if (!user?.onboarded) {
                router.push("/onboarding");
                return;
            }
            console.log("SIGN UP FORM 22", user);
            if (user?.onboarded && user?.showGoalOverview) {
                router.push("/goal/overview");
                return;
            } else {
                console.log("SIGN UP FORM 3333", user);
                router.push("/action-center");
                return;
            }
        // }
    };
    return (
        <>
            <Stack direction="row" spacing={0} className="flex_card">
                <Box className={loginObj?.cardClass}>
                    <Box className="logo_box">
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            width={175}
                            height={40}
                        ></img>
                    </Box>

                    <Box className="hero_box">
                        <img src={loginObj?.imgUrl} alt="hero" />
                    </Box>
                </Box>
                <Box className="right_card">
                    <Box className="typo_box">
                        <Typography variant="h1" align="center" className="h1_typo">
                            {loginObj?.title}
                        </Typography>
                        <Typography variant="h3" align="center" className="h3_typo">
                            {loginObj?.description}
                        </Typography>
                    </Box>
                    <Box className="right_inner_box">
                        <Button
                            variant="contained"
                            sx={{
                                marginTop: "10px",
                                color: "#FFFFFF",
                                backgroundColor: loginObj?.buttonColor,
                                boxShadow: "none",
                                "&:hover": { backgroundColor: loginObj?.buttonColor, boxShadow: "none" },
                                textTransform: "capitalize",
                            }}
                            onClick={getResult}
                        >
                            SSO Login
                        </Button>
                    </Box>
                </Box>
            </Stack>
        </>
    );
};

export default React.memo(SSO);

