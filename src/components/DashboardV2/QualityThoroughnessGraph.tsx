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

const QualityThoroughnessGraph = ( { showQualityGraph, showThoroughnessGraph, qualityData, orgDashboard, value }: any ) => {
  console.log( qualityData, "qualityDataqualityData" );
  return (
    <>
      <Box className="predictors_bar_graph_body">
        <Chart
          id="qtGraph"
          type="bar"
          data={ {
            labels: getLabels( qualityData, true ),
            datasets: [
              {
                type: 'line',
                pointRadius: 0,
                tension: 0.4,
                borderColor: '#F58A43',
                borderWidth: 6,
                borderDash: [ 0, 0 ],

                fill: false,
                data: value === 0 ? orgDashboard?.orgTargetQuality?.map( ( data: any ) => data?.avgQR ) : orgDashboard?.orgOverAllQuality?.map( ( data: any ) => data?.avgQR ),
                hidden: showQualityGraph === true ? false : true,
              },
              {
                type: 'line',
                pointRadius: 0,
                tension: 0.4,
                borderColor: '#E74649',
                borderWidth: 6,

                borderDash: [ 0, 0 ],
                fill: false,
                data: value === 0 ? orgDashboard?.orgTargetQuality?.map( ( data: any ) => data?.avgTR ) : orgDashboard?.orgOverAllQuality?.map( ( data: any ) => data?.avgTR ),
                hidden: showThoroughnessGraph === true ? false : true,
              },
              {
                type: showQualityGraph && showThoroughnessGraph === true ? BarWithErrorBarsController.id : showThoroughnessGraph === true ? BarWithErrorBarsController.id : 'bar',
                backgroundColor: showQualityGraph === true ? "#FAC5A1" : "transparent",
                hoverBackgroundColor: showQualityGraph === true ? "#FF9500" : "transparent",
                errorBarWhiskerRatio: 0.7,
                errorBarWhiskerLineWidth: 4,
                errorBarLineWidth: 4,
                errorBarWhiskerColor: "#E74649",
                errorBarColor: "#E74649",
                barThickness: 32,
                //borderRadius: 8,
                data: ( ( showQualityGraph && showThoroughnessGraph === true ) || showThoroughnessGraph === true ) ?
                  qualityData?.map( ( data: any ) => (
                    {
                      y: data?.avgQR,
                      yMin: 0,
                      yMax: data?.avgTR
                    }
                  ) )
                  :
                  qualityData?.map( ( week: any ) => week.avgQR )
                ,
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
                  text: "Score",
                  color: "#3E4248",
                  font: {
                    size: 12,
                  },
                },
                ticks: {
                  callback: function ( value ) {
                    return value + "%";
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
                enabled: showQualityGraph === true ? true : false,
                yAlign: "bottom",
                filter: function ( tooltipItem ) {
                  return tooltipItem.datasetIndex === 2;
                }
              },
            },
          } } />
      </Box>
    </>
  );
};
export default QualityThoroughnessGraph;
