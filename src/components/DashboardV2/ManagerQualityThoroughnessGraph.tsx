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


const ManagerQualityThoroughnessGraph = ( { managerDashboard, value, orgDashboard }: any ) => {
  let labels: any = [];
  let targetQR: any = [];
  let targetTR: any = [];
  let overAllQR: any = [];
  let overAllTR: any = [];
  let orgTargetQR: any = [];
  let orgTargetTR: any = [];
  let orgOverAllTR: any = [];
  let orgOverAllQR: any = [];


  managerDashboard?.individuals?.map( ( data: any ) => (
    labels.push( data?.name ),
    targetQR.push( data?.targetAvgQR ),
    targetTR.push( {
      y: data?.targetAvgTR,
      yMin: 0,
      yMax: data?.targetAvgTR,
    } ),
    overAllQR.push( data?.overAllAvgQR ),
    orgTargetQR.push( orgDashboard?.targetAvgQR ),
    orgTargetTR.push( orgDashboard?.targetAvgTR ),
    orgOverAllTR.push( orgDashboard?.overAllAvgTR ),
    orgOverAllQR.push( orgDashboard?.overAllAvgQR ),


    overAllTR.push( {
      y: data?.overAllAvgTR,
      yMin: 0,
      yMax: data?.overAllAvgTR,
    } )
  ) )
  console.log( labels, targetQR, targetTR, overAllQR, overAllTR, value, orgDashboard, "datamanagerDashboard" )

  return (
    <>
      <Box className="predictors_bar_graph_body">
        <Chart
          id="qtGraph"
          type="bar"
          data={ {
            labels,
            datasets: [
              {
                type: 'line',
                yAxisID: 'A',
                pointRadius: 0,
                tension: 0,
                borderColor: '#F58A43',
                borderWidth: 4,
                borderDash: [ 0, 0 ],
                fill: false,
                data: value === 0 ? orgTargetQR : orgOverAllQR
              },
              {
                type: 'line',
                yAxisID: 'A',
                pointRadius: 0,
                tension: 0,
                borderColor: '#E74649',
                borderWidth: 4,
                borderDash: [ 0, 0 ],
                fill: false,
                data: value === 0 ? orgTargetTR : orgOverAllTR
              },
              {
                type: 'bar',
                yAxisID: 'A',
                order: 2,
                backgroundColor: "#FAC5A1",
                hoverBackgroundColor: "#FF9500",
                barThickness: 64,
                borderRadius: 4,
                stack: 'Stack 0',
                data: value == 0 ? targetQR : overAllQR
              },
              {
                type: BarWithErrorBarsController.id,
                yAxisID: 'A',
                order: 1,
                backgroundColor: "transparent",
                hoverBackgroundColor: "transparent",
                errorBarWhiskerRatio: 2,
                errorBarWhiskerLineWidth: 5,
                errorBarLineWidth: 5,
                errorBarWhiskerColor: "#E74649",
                errorBarColor: "#E74649",
                barThickness: 16,
                borderRadius: 4,
                stack: 'Stack 1',
                data: value === 0 ? targetTR : overAllTR
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
                  text: "Employee Name",
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
                  callback: function ( value: any ) {
                    if ( this.getLabelForValue( value ).length > 4 ) {
                      return this.getLabelForValue( value ).substring( 0, 8 ) + '...';
                    } else {
                      return this.getLabelForValue( value );
                    }
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
              A: {
                //type: 'linear',
                position: 'left',
                beginAtZero: true,
                min: 0,
                max: 100,
                title: {
                  display: true,
                  text:
                    [ "Average Quality and Average Completeness", " of preparation Completed per week" ],
                  color: "#3E4248",
                  font: {
                    size: 12,
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
                filter: function ( tooltipItem: any ) {
                  if ( tooltipItem.datasetIndex === 2 ) {
                    return tooltipItem.datasetIndex;
                  }
                  if ( tooltipItem.datasetIndex === 3 ) {
                    return tooltipItem.datasetIndex;
                  }
                },
                callbacks: {
                  labelColor: function ( tooltipItem: any ) {
                    if ( tooltipItem.datasetIndex === 3 ) {
                      return {
                        borderColor: '#FFFFFF',
                        backgroundColor: '#A655C3',
                      };
                    };
                  },
                  label: function ( tooltipItem: any ) {
                    if ( tooltipItem.datasetIndex === 2 ) {
                      return tooltipItem.dataset.data[ tooltipItem.dataIndex ];
                    }
                    if ( tooltipItem.datasetIndex === 3 ) {
                      return tooltipItem.dataset.data[ tooltipItem.dataIndex ].y;
                    }
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
export default ManagerQualityThoroughnessGraph;
