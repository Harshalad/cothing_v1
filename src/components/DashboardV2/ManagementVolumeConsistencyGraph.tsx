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

const ManagementVolumeConsistencyGraph = ( { value, orgDashboard }: any ) => {
  let targetConsistency: any = [];
  let overAllConsistency: any = [];
  console.log( orgDashboard, "orgDashboard" );
  orgDashboard?.orgTargetConsistency?.map( ( data: any ) => {
    targetConsistency.push( { y: data?.consistency, yMin: 0, yMax: data?.consistency } );
  } )
  orgDashboard?.orgOverAllConsistency?.map( ( data: any ) => {
    overAllConsistency.push( { y: data?.consistency, yMin: 0, yMax: data?.consistency } );
  } )

  const chartRef = useRef<ChartJS>( null );

  useEffect( () => {
    const graphContainer: any = document.querySelector( '.visible_grpah_inner_container' )
    const chartInstance: any = chartRef.current;
    const barLength = chartInstance.config._config.data.labels.length;
    if ( barLength > 7 ) {
      const chartWidth = 450 + ( ( barLength - 7 ) * 30 );
      graphContainer.style.width = `${ chartWidth }px`;
    }
  }, [] );
  let mx: any = 0;

  if ( value === 0 && orgDashboard ) {
    mx = Math.max( ...orgDashboard?.orgTargetVolume?.map( ( data: any ) => data?.noOfPreps ) );
  } else if ( value === 1 && orgDashboard ) {
    mx = Math.max( ...orgDashboard?.orgOverAllVolume?.map( ( data: any ) => data?.noOfPreps ) );
  }

  return (
    <>
      <Box className="progresstracker_bar_graph_body">
        <Box className="invisible_grpah_container">
          <Chart
            type="bar"
            data={ {
              labels: getLabels( orgDashboard?.orgOverAllVolume, false ),
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
                  max: mx,
                  afterFit: ( ctx ) => {
                    ctx.width = 55;
                  },
                  title: {
                    display: true,
                    text: "Average Volume of Preparation Completed​",
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
                labels: getLabels( orgDashboard?.orgOverAllVolume, false ),
                datasets: [
                  {
                    type: 'bar',
                    yAxisID: 'A',
                    label: 'Dataset 1',
                    order: 2,
                    backgroundColor: "#96AED7",
                    hoverBackgroundColor: "#2E5DB0",
                    barThickness: 32,
                    stack: 'Stack 0',
                    data: value === 0 ? orgDashboard?.orgTargetVolume?.map( ( data: any ) => data?.noOfPreps ) : orgDashboard?.orgOverAllVolume?.map( ( data: any ) => data?.noOfPreps ),
                  },
                  {
                    type: BarWithErrorBarsController.id,
                    yAxisID: 'B',
                    label: 'Dataset 2',
                    order: 1,
                    backgroundColor: "transparent",
                    hoverBackgroundColor: "transparent",
                    errorBarWhiskerRatio: 2,
                    errorBarWhiskerLineWidth: 5,
                    errorBarLineWidth: 5,
                    errorBarWhiskerColor: "#2043C0",
                    errorBarColor: "#2043C0",
                    barThickness: 16,
                    stack: 'Stack 1',
                    data: value == 0 ? targetConsistency : overAllConsistency
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
                  B: {
                    beginAtZero: true,
                    min: 0,
                    max: 100,
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
                  }
                },
                plugins: {
                  tooltip: {
                    yAlign: "bottom",
                    callbacks: {
                      labelColor: function ( tooltipItem: any ) {
                        if ( tooltipItem.datasetIndex === 1 ) {
                          return {
                            borderColor: '#FFFFFF',
                            backgroundColor: '#2043C0',
                          };
                        };
                      },
                      label: function ( tooltipItem: any ) {
                        console.log( tooltipItem, "ADITYATOOLTIPITEM" )
                        if ( tooltipItem.datasetIndex === 0 ) {
                          return tooltipItem.dataset.data[ tooltipItem.dataIndex ];
                        }
                        if ( tooltipItem.datasetIndex === 1 ) {
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
              labels: orgDashboard?.orgOverAllVolume?.map( ( data: any ) => data?.name ),
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
                  right: 100
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
                    text: [ "Average Consistency of​ Preparation Completed" ],
                    color: "#3E4248",
                    font: {
                      size: 12,
                    },
                    padding: {
                      bottom: 0,
                      top: 0,
                      y: 0
                    }
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
                    padding: 0

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
export default ManagementVolumeConsistencyGraph;
