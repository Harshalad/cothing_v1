import { useEffect, useState } from "react";
import { TabPanel } from "@mui/lab";
import { fetchOrgGoals } from "../../../../actions/align/fetchOrgGoals";
import { useSelector } from "react-redux";
import Spinner from "../../../common/Spinner/Spinner";
import { getAuth, User } from "firebase/auth";
import React from "react";

const OrganisationGoalsTab = () => {
  const [orgGoals, setOrgGoals] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const nWorxUser = useSelector((state) => state?.auth?.nWorxUser);

  //@ts-ignore
  const firebaseUser = useSelector((state) => state?.auth?.firebaseUser);
  //@ts-ignore
  const token = useSelector((state) => state?.auth?.idToken);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        // const auth = getAuth();
        // const user = auth.currentUser;
        // console.log(user,'Firebase user');
        console.log(token, "Firebase User");
        const orgGoals = await fetchOrgGoals(nWorxUser?.activeProgramId);
        setOrgGoals(orgGoals || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  return (
    <TabPanel value="2">
      <div className="align-panel-details">
        <article className="align-intab-head">
          Organization Goals for 2023 - 2024
        </article>
        <div className="aln-orggols-holder">
          {loading ? (
            <Spinner />
          ) : (
            orgGoals &&
            orgGoals.map((item: any, key: number) => {
              return (
                <div key={key} className="orgnz-gols-box">
                  <article className="goals-box-headtxt">{item.label}</article>
                  <article className="goals-box-subtxt">
                    {item.description
                      .split("|")
                      .map((part: any, index: any) => (
                        <React.Fragment key={index}>
                          {part}
                          <br /> <br />
                        </React.Fragment>
                      ))}
                  </article>
                  {/* <article className="goalbox-cmnt-btn">
                    <img src={"/images/icons/chat-icon.svg"} alt="guidance" />
                    &nbsp;&nbsp; Comment
                  </article> */}
                </div>
              );
            })
          )}
        </div>
      </div>
    </TabPanel>
  );
};

export default OrganisationGoalsTab;
