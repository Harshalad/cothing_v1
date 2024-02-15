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
import { BarWithErrorBarsController, BarWithErrorBar } from 'chartjs-chart-error-bars';
import { faker } from "@faker-js/faker";
import { useEffect } from "react";
import { getLabels } from "./commons";

ChartJS.register(
  BarWithErrorBarsController,
  BarWithErrorBar,
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

const labels = [ [ 'Week of', '11 Dec' ], [ 'Week of', '11 Dec' ], [ 'Week of', '11 Dec' ], [ 'Week of', '11 Dec' ], [ 'Week of', '11 Dec' ] ];

const ManagementQualityThoroughnessGraph = ( { value, orgDashboard }: any ) => {
  let targetQRAndTR: any = [];
  let overAllQRAndTR: any = [];
  console.log( orgDashboard, "orgDashboard" );
  orgDashboard?.orgTargetQuality?.map( ( data: any ) => {
    targetQRAndTR.push( { y: data?.avgQR, yMin: 0, yMax: data?.avgTR } );
  } )
  orgDashboard?.orgOverAllQuality?.map( ( data: any ) => {
    overAllQRAndTR.push( { y: data?.avgQR, yMin: 0, yMax: data?.avgTR } );
  } )
  return (
    <>
      <Box className="predictors_bar_graph_body">
        <Chart
          id="qtGraph"
          type="bar"
          data={ {
            labels: getLabels( orgDashboard?.orgOverAllQuality, false ),
            datasets: [
              {
                type: BarWithErrorBarsController.id,
                backgroundColor: "#FAC5A1",
                hoverBackgroundColor: "#FF9500",
                errorBarWhiskerRatio: 1.1,
                errorBarWhiskerLineWidth: 5,
                errorBarLineWidth: 5,
                errorBarWhiskerColor: "#E74649",
                errorBarColor: "#E74649",
                barThickness: 32,
                data: value === 0 ? targetQRAndTR : overAllQRAndTR
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
                max: 100,
                title: {
                  display: true,
                  text: "Average Quality and Average Thoroughness of Preparation Completed​",
                  color: "#3E4248",
                  font: {
                    size: 9,
                  },
                },
                ticks: {
                  callback: function ( value ) {
                    return value + "%"
                  },
                  stepSize: 10,
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
              },
            },
          } }
        />
      </Box>
    </>
  );
};
export default ManagementQualityThoroughnessGraph;
