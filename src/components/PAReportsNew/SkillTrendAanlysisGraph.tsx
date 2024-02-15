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

const labels = [
  "1",
  "2",
  "3",
  "4",
  "5",
];

const SkillTrendAanlysisGraph = () => {
  return (
    <>
      <Box className="rprts_bar_graph_body">
        <Bar
          id="barGraph"
          data={{
            labels,
            datasets: [
              {
                data: labels.map(() =>
                  faker.datatype.number({ min: 0, max: 100 })
                ),
                backgroundColor: [
                  "#EFD02E",
                  "#1BAD70",
                  "#E74649",
                  "#1BAD70",
                  "#EFD02E",
                ],
                hoverBackgroundColor: [
                  "#EFD02E",
                  "#1BAD70",
                  "#E74649",
                  "#1BAD70",
                  "#EFD02E",
                ],
                //@ts-ignore
                fill: "none",
                barThickness: 16,
                borderRadius: 4,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Attempt",
                  color: "#5D636B",
                  font: {
                    size: 12,
                  },
                },
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
                  display: true,
                  color: "#989EA5",
                },
              },
              y: {
                beginAtZero: true,
                min: 0,
                max: 100,
                title: {
                  display: true,
                  text: "Scores",
                  color: "#5D636B",
                  font: {
                    size: 12,
                  },
                },
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
                  display: false,
                },
                border: {
                  display: true,
                  color: "#989EA5",
                },
              },
            },
          }}
        />
      </Box>
    </>
  );
};
export default SkillTrendAanlysisGraph;