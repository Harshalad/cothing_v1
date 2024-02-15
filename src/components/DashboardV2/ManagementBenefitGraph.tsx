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
import { faker } from "@faker-js/faker";

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

const labels = [ "Shwetal Shubhadeep", "Reuben Thomas", "Rajashree Jhunjhunwala", "Gowtham", "Hariraj Vijayakumar" ];
const ManagementBenefitGraph = ( { benefitMap }: any ) => {
  const label = benefitMap?.map( ( data: any ) => data?.name );
  console.log( label, benefitMap, "orgDashboard" )
  return (
    <>
      <Box className="predictors_bar_graph_body">
        <Chart
          id="vcGraph"
          type='bar'
          data={ {
            labels: benefitMap?.map( ( data: any ) => data?.name ),
            datasets: [
              {
                data: benefitMap?.map( ( data: any ) => data?.completed ),
                backgroundColor: "#1BAD70",
                hoverBackgroundColor: "#1BAD70",
                //@ts-ignore
                fill: "none",
                barThickness: 16,
              },
              {
                data: benefitMap?.map( ( data: any ) => data?.overdueToComplete ),
                backgroundColor: "#55B6C3",
                hoverBackgroundColor: "#55B6C3",
                //@ts-ignore
                fill: "none",
                barThickness: 16,
              }
              ,
              {
                data: benefitMap?.map( ( data: any ) => data?.inProgress ),
                backgroundColor: "#DEBD0F",
                hoverBackgroundColor: "#DEBD0F",
                //@ts-ignore
                fill: "none",
                barThickness: 16,
              }
              ,
              {
                data: benefitMap?.map( ( data: any ) => data?.overdueToStart ),
                backgroundColor: "#FF9F2D",
                hoverBackgroundColor: "#FF9F2D",
                //@ts-ignore
                fill: "none",
                barThickness: 16,
              }
              ,
              {
                data: benefitMap?.map( ( data: any ) => data?.yetToStart ),
                backgroundColor: "#E74649",
                hoverBackgroundColor: "#E74649",
                //@ts-ignore
                fill: "none",
                barThickness: 16,
              }
            ],
          } }
          options={ {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                stacked: true,
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
                      return this.getLabelForValue( value ) + "'s Org";
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
                stacked: true,
                beginAtZero: true,
                min: 0,
                //max: 15,
                title: {
                  display: true,
                  text: "No.of Goals",
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
                yAlign: "top",
              },
            },
          } }
        />
      </Box>
    </>
  );
};
export default ManagementBenefitGraph;
