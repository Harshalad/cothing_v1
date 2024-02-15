import { useEffect, useState } from "react";
import { fetchUserTestDetails } from "../../actions/assessment/fetchTestDetails";
import router, { useRouter } from "next/router";
import React from "react";
export const TestDetails = () => {
  const router = useRouter();

  const testId = router?.query?.id;

  const [testDeatail, setTestDetails] = useState<any>(null);
  useEffect(() => {
    const fetchTestDetails = async () => {
      //   console.log(userId, testId, attemptNo, "aditya1234");
      let response = await fetchUserTestDetails({
        userTestMapId: testId,
      });
      setTestDetails(response);
    };
    fetchTestDetails();
  }, []);
  return (
    <>
      <h1>{testDeatail?.name}</h1>
      <div style={{ display: "inline" }}>
        <h3 style={{ display: "inline" }}>Test Instructions </h3>
        <p style={{ display: "inline" }}>{testDeatail?.duration} mins</p>
      </div>
      <p>{testDeatail?.instructions} </p>
      <table>
        <tr>
          <td>Section No. </td>
          <td> Section Name </td>
          <td> No. of Questions </td>
        </tr>
        {testDeatail?.sections.map((section: any, index: any) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td> {section.name} </td>
              <td> {section.questions.length} </td>
            </tr>
          );
        })}
      </table>
      <button
        onClick={() => {
          router.push("/section");
        }}
      >
        Start Test
      </button>
      <p>
        By clicking on start survey your {testDeatail?.duration} minutes
        countdown for test completion will start
      </p>
    </>
  );
};
