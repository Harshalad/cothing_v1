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
import { useEffect, useRef } from "react";

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
const ManagerVolumeConsistencyGraph = ( { managerDashboard, value, orgDashboard }: any ) => {
  let labels: any = [];
  let targetVolumeData: any = [];
  let targetConsistencyData: any = [];
  let overAllVolumeData: any = [];
  let overAllConsistencyData: any = [];
  let orgTargetConsistencyData: any = [];
  let orgOverAllVolumeData: any = [];
  let orgTargetVolumeData: any = [];
  let orgOverAllConsistencyData: any = [];
  const chartRef = useRef<ChartJS>( null );


  managerDashboard?.individuals?.map( ( data: any ) => (
    labels.push( data?.name ),
    targetVolumeData.push( data?.targetAvgVolume ),
    targetConsistencyData.push( {
      y: data?.targetConsistency,
      yMin: 0,
      yMax: data?.targetConsistency,
    } ),
    overAllVolumeData.push( data?.overAllAvgVolume ),
    orgTargetVolumeData.push( orgDashboard?.targetVolAvg ),
    orgTargetConsistencyData.push( orgDashboard?.targetConsistency ),
    orgOverAllVolumeData.push( orgDashboard?.overAllVolAvg ),
    orgOverAllConsistencyData.push( orgDashboard?.overAllConsistency ),


    overAllConsistencyData.push( {
      y: data?.overAllConsistency,
      yMin: 0,
      yMax: data?.overAllConsistency,
    } )
  ) )

  useEffect( () => {
    const graphContainer: any = document.querySelector( '.visible_grpah_inner_container' )
    const chartInstance: any = chartRef.current;
    const barLength = chartInstance.config._config.data.labels.length;
    if ( barLength > 7 ) {
      const chartWidth = 650 + ( ( barLength - 7 ) * 30 );
      graphContainer.style.width = `${ chartWidth }px`;
    }
  }, [] );

  console.log( managerDashboard, labels, targetVolumeData, targetConsistencyData, overAllVolumeData, overAllConsistencyData, value, orgDashboard, "datamanagerDashboard" )

  return (
    <>
      <Box className="leaderboard_bar_graph_body">
        <Box className="invisible_grpah_container">
          <Chart
            type="bar"
            data={ {
              labels,
              datasets: [
                {
                  yAxisID: "A",
                  data: [],
                },
              ],
            } }
            options={ {
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  bottom: 42.5,
                  top: 0,
                  left: 0,
                  right: 0
                }
              },
              scales: {
                x: {
                  title: {
                    display: false,
                  },
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
                A: {
                  type: "linear",
                  position: "left",
                  beginAtZero: true,
                  min: 0,
                  max: 10,
                  afterFit: ( ctx ) => {
                    ctx.width = 55;
                  },
                  title: {
                    display: true,
                    text: [ "Average Volume of Prepration", "Completed per week" ],
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
            } }
          />
        </Box>
        <Box className="visible_grpah_container">
          <Box className="visible_grpah_inner_container">
            <Chart
              ref={ chartRef }
              id="qtGraph"
              type="bar"
              data={ {
                labels,
                datasets: [
                  {
                    type: 'line',
                    yAxisID: 'A',
                    label: 'Dataset 1',
                    pointRadius: 0,
                    tension: 0,
                    borderColor: '#A655C3',
                    borderWidth: 6,
                    borderDash: [ 0, 0 ],
                    fill: false,
                    data: value === 0 ? orgTargetVolumeData : orgOverAllVolumeData
                  },
                  {
                    type: 'line',
                    yAxisID: 'B',
                    label: 'Dataset 2',
                    pointRadius: 0,
                    tension: 0,
                    borderColor: '#DEBD0F',
                    borderWidth: 6,
                    borderDash: [ 0, 0 ],
                    fill: false,
                    data: value === 0 ? orgTargetConsistencyData : orgOverAllConsistencyData
                  },
                  {
                    type: 'bar',
                    yAxisID: 'A',
                    label: 'Dataset 3',
                    order: 2,
                    backgroundColor: "#96AED7",
                    hoverBackgroundColor: "#2e5DB0",
                    barThickness: 64,
                    borderRadius: 4,
                    stack: 'Stack 0',
                    data: value === 0 ? targetVolumeData : overAllVolumeData
                  },
                  {
                    type: BarWithErrorBarsController.id,
                    yAxisID: 'B',
                    label: 'Dataset 4',
                    order: 1,
                    backgroundColor: "transparent",
                    hoverBackgroundColor: "transparent",
                    errorBarWhiskerRatio: 2,
                    errorBarWhiskerLineWidth: 5,
                    errorBarLineWidth: 5,
                    errorBarWhiskerColor: "#DEBD0F",
                    errorBarColor: "#DEBD0F",
                    barThickness: 16,
                    borderRadius: 4,
                    stack: 'Stack 1',
                    data: value === 0 ? targetConsistencyData : overAllConsistencyData
                  },
                ]
              } }
              options={ {
                responsive: true,
                maintainAspectRatio: false,
                layout: {
                  padding: {
                    top: 10,
                    left: 0,
                    right: 0
                  },
                },
                scales: {
                  x: {
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
                    beginAtZero: true,
                    min: 0,
                    //max: 10,
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
                  B: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
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
                            backgroundColor: '#DEBD0F',
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
        </Box>
        <Box className="invisible_grpah_container">
          <Chart
            type="bar"
            data={ {
              labels,
              datasets: [
                {
                  yAxisID: "B",
                  data: [],
                },
              ],
            } }
            options={ {
              responsive: true,
              maintainAspectRatio: false,
              layout: {
                padding: {
                  bottom: 42.5,
                  top: 0,
                  left: 0,
                  right: 0
                }
              },
              scales: {
                x: {
                  title: {
                    display: false,
                  },
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
                B: {
                  type: "linear",
                  position: "right",
                  beginAtZero: true,
                  min: 0,
                  max: 100,
                  afterFit: ( ctx ) => {
                    ctx.width = 55;
                  },
                  title: {
                    display: true,
                    text: "Consistency",
                    color: "#3E4248",
                    font: {
                      size: 12,
                    },
                    padding: 1
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
            } }
          />
        </Box>
      </Box>
    </>
  );
};
export default ManagerVolumeConsistencyGraph;
