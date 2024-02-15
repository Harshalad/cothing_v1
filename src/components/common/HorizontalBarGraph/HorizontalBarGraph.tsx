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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler
);

const HorizontalBarGraph = ({ teamScore, showData }: any) => {
  console.log(teamScore, showData, " TEAM SCORE");

  const labels =
    showData === "Align"
      ? ["Highest Alignment", "Self Alignment", "Average Alignment"]
      : ["Highest Progress", "Self Progress", "Average Progress"];

  //changes done --- TODO Sateesh change response data and structure
  const data =
    showData === "Align"
      ? [
          teamScore?.response?.highestAlignScore,
          teamScore?.response?.myAlignScore,
          teamScore?.response?.teamAlignScoreAggregated,
        ]
      : [
          teamScore?.response?.highestAchieveScore,
          teamScore?.response?.myAchieveScore,
          teamScore?.response?.teamAchieveScoreAggregated,
        ];
  return (
    <>
      <Box className="horizontal_bar_graph">
        <Bar
          id="barGraph"
          data={{
            labels,
            datasets: [
              {
                data,
                backgroundColor: ["#1BAD70", "#6755C3", "#558EC3"],
                hoverBackgroundColor: "#1BAD70",
                //@ts-ignore
                fill: "none",
                barThickness: 16,
                borderRadius: 8.5,
                borderSkipped: false,
              },
            ],
          }}
          options={{
            indexAxis: "y",
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                beginAtZero: true,
                min: 0,
                max: 100,
                ticks: {
                  color: "#989EA5",
                  padding: 8,
                  stepSize: 20,
                  font: {
                    size: 12,
                    //@ts-ignore
                    weight: 500,
                  },
                  callback: function (value) {
                    return value + "%";
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
              y: {
                ticks: {
                  color: "#989EA5",
                  padding: 8,
                  font: {
                    size: 12,
                    //@ts-ignore
                    weight: 500,
                  },
                },
                grid: {
                  offset: false,
                  color: "#EAECEF",
                  lineWidth: 2,
                },
                border: {
                  display: false,
                },
              },
            },
          }}
        />
      </Box>
    </>
  );
};
export default HorizontalBarGraph;
