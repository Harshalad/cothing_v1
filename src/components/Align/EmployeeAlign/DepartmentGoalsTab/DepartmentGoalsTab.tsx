import { TabPanel } from "@mui/lab";
import React, { useState, useEffect } from "react";
import { fetchDepartmentGoals } from "../../../../actions/align/fetchDepartmentGoals";
import Spinner from "../../../common/Spinner/Spinner";
import { useSelector } from "react-redux";
const DepartmentGoalsTab = () => {
  const [departmentGoals, setDepartmentGoals] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  //@ts-ignore
  const nWorxUser = useSelector((state) => state?.auth?.nWorxUser);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);

        const departmentGoals = await fetchDepartmentGoals({
          programId: nWorxUser?.activeProgramId,
          department: nWorxUser?.department,
        });
        setDepartmentGoals(departmentGoals || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  return (
    <TabPanel value="3">
      <div className="align-panel-details">
        <article className="align-intab-head">
          Team Goals for 2023 - 2024
        </article>
        <div className="aln-orggols-holder">
          {loading ? (
            <Spinner />
          ) : (
            departmentGoals &&
            departmentGoals.map((item: any, key: number) => {
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

export default DepartmentGoalsTab;
