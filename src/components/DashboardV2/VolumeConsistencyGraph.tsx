import { Box } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Filler,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { getLabels } from "./commons";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Filler
);

const VolumeConsistencyGraph = ( { volandCon, orgDashboard, value }: any ) => {
  const label: any = getLabels( volandCon, "false" );
  console.log( volandCon, "volandCon" );
  return (
    <>
      <Box className="predictors_bar_graph_body">
        <Chart
          id="vcGraph"
          data={ {
            labels: label,
            datasets: [
              {
                type: 'line',
                pointRadius: 0,
                tension: 0.4,
                borderColor: '#2E5DB0',
                borderWidth: 6,
                borderDash: [ 0, 0 ],
                fill: false,
                data: value === 0 ? orgDashboard?.orgTargetVolume?.map( ( data: any ) => data?.noOfPreps ) : orgDashboard?.orgOverAllVolume?.map( ( data: any ) => data?.noOfPreps )
              },
              {
                type: 'bar',
                data: volandCon?.map( ( data: any ) => ( data.noOfPreps ) ),
                backgroundColor: "#96AED7",
                hoverBackgroundColor: "#2e5DB0",
                //@ts-ignore
                fill: "none",
                barThickness: 32,
              },
            ],
          } }
          options={ {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                //stacked: true,
                title: {
                  display: true,
                  text: "Weeks",
                  color: "#3E4248",
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
                  color: "#EAECEF",
                },
              },
              y: {
                beginAtZero: true,
                min: 0,
                //max: 3,
                title: {
                  display: true,
                  text: "Volume of Prepration Completed",
                  color: "#3E4248",
                  font: {
                    size: 12,
                  },
                },
                ticks: {
                  stepSize: 1,
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
                  color: "#EAECEF",
                },
              },
            },
            plugins: {
              tooltip: {
                yAlign: "bottom",
                filter: function ( tooltipItem ) {
                  return tooltipItem.datasetIndex === 1
                }
              },
            },
          } }
        />
      </Box>
    </>
  );
};
export default VolumeConsistencyGraph;
