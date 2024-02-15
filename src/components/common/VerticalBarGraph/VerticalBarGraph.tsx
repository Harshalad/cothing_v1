import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { useSelector } from "react-redux";
import { MANAGER_VIEW_STATE } from "../../../constants/auth";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler
);

// const labels = [
//   "Hazel",
//   "Micheal",
//   "Sam",
//   "Ravi",
//   "Kuldeep",
//   "Rakesh",
//   "Naveen",
//   "Watan",
//   "Pavithra",
//   "Vidhi",
// ];

const modes = [ "Align", "Achieve", "Assure" ];
const modeValues = [ 20, 65, 10 ];

const VerticalBarGraph = ( { chartData, teamScore }: any ) => {
  const labels = teamScore?.teamIndividualScore?.map(
    ( individual: any ) => individual?.userName
  );

  const modeValues = teamScore?.teamIndividualScore?.map( ( individual: any ) => {
    if ( chartData === "Align" ) return individual?.alignScore;
    else return individual?.achieveScore;
  } );

  const designations = teamScore?.teamIndividualScore?.map(
    ( individual: any ) => individual?.designation
  );

  const alignScores = teamScore?.teamIndividualScore?.map(
    ( individual: any ) => individual?.alignScore
  );
  const achieveScores = teamScore?.teamIndividualScore?.map(
    ( individual: any ) => individual?.achieveScore
  );
  const program = useSelector(
    // @ts-ignore
    ( state ) => state?.user?.program
  );
  const currentUserRole = useSelector(
    //@ts-ignore
    ( state ) => state?.auth?.managerToggleView
  );
  // const assureScore = teamScore?.teamIndividualScore?.map((individual: any) => individual?.assureScore);
  return (
    <>
      <Box className="bar_graph_body">
        <Bar
          id="barGraph"
          data={ {
            labels,
            datasets: [
              {
                data: modeValues,
                //@ts-ignore
                modes,
                designations,
                alignScores,
                achieveScores,
                modeValues,
                backgroundColor: chartData === "Align" ? "#6755C3" : "#A655C3",
                hoverBackgroundColor:
                  chartData === "Align" ? "#6755C3" : "#A655C3",
                fill: "none",
                barThickness: 16,
                borderRadius: 8.5,
                borderSkipped: false,
              },
              // {
              //   data: labels.map(() =>
              //     faker.datatype.number({ min: 0, max: 100 })
              //   ),
              //   //@ts-ignore
              //   modes,
              //   modeValues,
              //   backgroundColor: "#55B6C3",
              //   hoverBackgroundColor: "#55B6C3",
              //   fill: "none",
              //   barThickness: 16,
              //   borderRadius: 8.5,
              //   borderSkipped: false,
              // },
            ],
          } }
          options={ {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
                ticks: {
                  color: "#989EA5",
                  font: {
                    size: 12,
                    //@ts-ignore
                    weight: 500,
                  },
                },
                grid: {
                  display: false,
                },
                border: {
                  display: false,
                },
              },
              y: {
                beginAtZero: true,
                min: 0,
                max: 100,
                ticks: {
                  color: "#989EA5",
                  stepSize: 20,
                  padding: 8,
                  font: {
                    size: 12,
                    //@ts-ignore
                    weight: 500,
                  },
                },
                grid: {
                  color: "#EAECEF",
                  lineWidth: 2,
                },
                border: {
                  display: false,
                },
              },
            },
            plugins: {
              tooltip: {
                yAlign: "bottom",
                displayColors: false,
                backgroundColor: "#FFFFFF",
                padding: 16,
                footerAlign: "center",
                footerFont: {
                  //@ts-ignore
                  weight: 600,
                  size: 12,
                },
                footerColor: "#1C2129",
                footerSpacing: 0,
                footerMarginTop: 0,
                titleMarginBottom: 0,
                titleAlign: "center",
                titleColor: "#1C2129",
                titleFont: {
                  //@ts-ignore
                  weight: 600,
                  size: 14,
                },
                cornerRadius: 6.8,
                borderColor: chartData === "alignData" ? "#6755C3" : "#A655C3",
                borderWidth: 1.6,
                callbacks: {
                  // beforeTitle: function (context) {
                  //   //@ts-ignore
                  //   if (context[0].dataset.modeValues[0] !== 0) {
                  //     return (
                  //       //@ts-ignore
                  //       context[0].dataset.modes[0] +
                  //       ": " +
                  //       //@ts-ignore
                  //       context[0].dataset.modeValues[0] +
                  //       "%"
                  //     );
                  //   } else {
                  //     return `${context[0].label} has no goals`;
                  //   }
                  // },
                  title: function ( context ) {
                    //  if (currentUserRole === MANAGER_VIEW_STATE.EXPERT || currentUserRole === MANAGER_VIEW_STATE.JP ||
                    //(currentUserRole === MANAGER_VIEW_STATE.MANAGER &&
                    //  program?.configMap.enableAlign)) {
                    //   return `Align: ${
                    //     //@ts-ignore
                    //     context[0]?.dataset?.alignScores?.[
                    //       context?.[0]?.dataIndex
                    //     ]
                    //   }%`;
                    //  }
                    return;
                  },
                  afterTitle: function ( context ) {
                    return `Achieve: ${
                      //@ts-ignore
                      context[ 0 ]?.dataset?.achieveScores?.[
                      context?.[ 0 ]?.dataIndex
                      ]
                      }%`;
                  },
                  footer: function ( context ) {
                    return `${ context[ 0 ].label }`;
                  },
                  afterFooter: function ( context ) {
                    //@ts-ignore
                    return context[ 0 ]?.dataset?.designations[
                      context?.[ 0 ]?.dataIndex
                    ];
                  },
                },
              },
            },
          } }
        />
      </Box>
    </>
  );
};
export default VerticalBarGraph;
