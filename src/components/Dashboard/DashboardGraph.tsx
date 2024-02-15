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
// import annotationPlugin from "chartjs-plugin-annotation";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Filler
  // annotationPlugin
);

const DashboardGraph = ({ id, score1, score2, score3 }: any) => {
  const [addYellowGradnt, setYellowGradnt] = useState("rgba(255,236,177,1)");
  const [addGreenGradnt, setGreenGradnt] = useState("rgba(159,231,188,1)");
  const [addRedGradnt, setRedGradnt] = useState("rgba(226,156,136,1)");
  var labels = [score1, score2, score3];
  var chart;

  var data = {
    datasets: [
      {
        data: labels.map((scores) => scores),
        backgroundColor: [
          score1 > 33 && score1 <= 66
            ? addYellowGradnt
            : score1 > 66
            ? addGreenGradnt
            : addRedGradnt,
          score2 > 33 && score2 <= 66
            ? addYellowGradnt
            : score2 > 66
            ? addGreenGradnt
            : addRedGradnt,
          score3 > 33 && score3 <= 66
            ? addYellowGradnt
            : score3 > 66
            ? addGreenGradnt
            : addRedGradnt,
        ],
        hoverBackgroundColor: [
          score1 > 33 && score1 <= 66
            ? addYellowGradnt
            : score1 > 66
            ? addGreenGradnt
            : addRedGradnt,
          score2 > 33 && score2 <= 66
            ? addYellowGradnt
            : score2 > 66
            ? addGreenGradnt
            : addRedGradnt,
          score3 > 33 && score3 <= 66
            ? addYellowGradnt
            : score3 > 66
            ? addGreenGradnt
            : addRedGradnt,
        ],
        fill: "none",
        barThickness: 16,
      },
    ],
  };

  var options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        labels: [score1, score2, score3],
        ticks: {
          color: "#3E4248",
          font: {
            size: 12,
            weight: 500,
          },
        },
        grid: {
          display: false,
        },
        border: {
          color: "#C8CDD4",
        },
      },
      x2: {
        ticks: {
          color: "#5D636B",
          font: {
            size: 10,
            weight: 400,
          },
        },
        labels: [
          ["60 - 90", "days"],
          ["30 - 60", "days"],
          ["0 - 30", "days"],
        ],
        border: {
          display: false,
        },
        grid: {
          display: false,
          drawOnChartArea: false,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      annotation: {
        clip: false,
        annotations: {
          label1: {
            type: "label",
            afterDraw: (chart: any) => {
              var ctx = chart.chart.ctx;
              ctx.save();
              ctx.font = "400 9px Inter, sans-serif";
              ctx.fillStyle = "#5D636B";
              var y = 94;
              ctx.textAlign = "left";
              ctx.fillText("Score", 0, y);
              ctx.restore();
            },
          },
        },
      },
    },
  };

  useEffect(() => {
    var yellowGradnt;
    var greenGradnt;
    var redGradnt;
    var canvas = document.getElementById(id);
    //@ts-ignore
    chart = canvas?.getContext("2d");

    yellowGradnt = chart.createLinearGradient(0, 0, 0, 140);
    yellowGradnt.addColorStop(0, "rgba(255,191,0,1)");
    yellowGradnt.addColorStop(0.43, "rgba(255,236,177,1)");

    greenGradnt = chart.createLinearGradient(0, 0, 0, 140);
    greenGradnt.addColorStop(0, "rgba(33,194,98,1)");
    greenGradnt.addColorStop(0.43, "rgba(159,231,188,1)");

    redGradnt = chart.createLinearGradient(0, 0, 0, 140);
    redGradnt.addColorStop(0, "rgba(238,68,18,1)");
    redGradnt.addColorStop(0.43, "rgba(226,156,136,1)");

    for (let i = 0; i < id.length; i++) {
      for (let j = 0; j < data.datasets[0].data.length; j++) {
        if (data.datasets[0].data[j] > 33 && data.datasets[0].data[j] <= 66) {
          data.datasets[0].backgroundColor[j] = yellowGradnt;
          setYellowGradnt(yellowGradnt);
        } else if (data.datasets[0].data[j] > 66) {
          data.datasets[0].backgroundColor[j] = greenGradnt;
          setGreenGradnt(greenGradnt);
        } else {
          data.datasets[0].backgroundColor[j] = redGradnt;
          setRedGradnt(redGradnt);
        }
      }
    }
  }, []);

  return (
    <>
      <Box className="db_graph_inner">
        <Bar
          id={id}
          data={data}
          //@ts-ignore
          options={options}
        />
      </Box>
    </>
  );
};
export default DashboardGraph;
