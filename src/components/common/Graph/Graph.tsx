import { Box } from "@mui/material";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const labels = ["January", "February", "March", "April", "May", "June", "July"];
var gradientPostv = "";
var gradientNegtv = "";

const Graph = ({ id, graphStaus }: any) => {
  useEffect(() => {
    var canvas = document.getElementById(id);
    //@ts-ignore
    var ctx = canvas.getContext("2d");
    gradientPostv = ctx.createLinearGradient(0, 0, 0, 50);
    //@ts-ignore

    gradientPostv.addColorStop(0, "rgba(223, 255, 242, 100)");
    //@ts-ignore

    gradientPostv.addColorStop(0.5, "rgba(223, 255, 242, 50)");
    //@ts-ignore

    gradientPostv.addColorStop(1, "rgba(223, 255, 242, 0)");
    gradientNegtv = ctx.createLinearGradient(0, 0, 0, 50);
    //@ts-ignore

    gradientNegtv.addColorStop(0, "rgba(255, 222, 223, 100)");
    //@ts-ignore

    gradientNegtv.addColorStop(0.5, "rgba(255, 222, 223, 50)");
    //@ts-ignore

    gradientNegtv.addColorStop(1, "rgba(255, 222, 223, 0)");
    for (var i = 0; i < id.length; i++) {
      if (graphStaus === "positive") {
        ctx.fillStyle = gradientPostv;
      } else {
        ctx.fillStyle = gradientNegtv;
      }
    }
  }, []);

  return (
    <>
      <Box className="graph">
        <Line
          id={id}
          data={{
            labels,
            datasets: [
              {
                data: labels.map(() =>
                  faker.datatype.number({ min: -1000, max: 1000 })
                ),
                backgroundColor:
                  graphStaus === "positive" ? gradientPostv : gradientNegtv,
                fill: "start",
                borderColor:
                  graphStaus === "positive"
                    ? "rgb(27, 173, 112)"
                    : "rgb(231, 70, 73)",
                tension: 0.4,
                pointRadius: 0,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
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
          }}
        />
      </Box>
    </>
  );
};
export default Graph;
