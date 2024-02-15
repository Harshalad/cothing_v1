import { Box, Chip, Stack, Typography } from "@mui/material";
import { useState } from "react";

const MyTeam = ({ activeClass, handleClickedTeam }: any) => {

  const [active, setActive] = useState<any>("team");

  const handleActive = (clickedId: any) => {
    setActive(clickedId  ? clickedId : false);
  }

  return (
    <>
      <Typography className="dashboardv2_sub_title">My {activeClass === "two" ? "Team (20)" : "Organization"}</Typography>
      <Stack className="team_flex">
        <Chip
          label={activeClass === "two" ? "Team" : "All Teams"}
          variant="outlined"
          className={active === "team" ? "active" : ""}
          onClick={() => {
            handleActive("team"), handleClickedTeam("team");
          }}
        />
        {activeClass === "two"
        ?
          <>
            <Chip
              label="Rajashree Jhunjhunwala"
              variant="outlined"
              className={active === "1" ? "active" : ""}
              onClick={() => {
                handleActive("1"), handleClickedTeam("Rajashree Jhunjhunwala");
              }}
            />
            <Chip
              label="Shwetal Shubhadeep"
              variant="outlined"
              className={active === "2" ? "active" : ""}
              onClick={() => {
                handleActive("2"), handleClickedTeam("Shwetal Shubhadeep");
              }}
            />
            <Chip
              label="Daniel M"
              variant="outlined"
              className={active === "3" ? "active" : ""}
              onClick={() => {
                handleActive("3"), handleClickedTeam("Daniel M");
              }}
            />
            <Chip
              label="Gowtham"
              variant="outlined"
              className={active === "4" ? "active" : ""}
              onClick={() => {
                handleActive("4"), handleClickedTeam("Gowtham");
              }}
            />
            <Chip
              label="Hariraj Vijayakumar"
              variant="outlined"
              className={active === "6" ? "active" : ""}
              onClick={() => {
                handleActive("6"), handleClickedTeam("Hariraj Vijayakumar");
              }}
            />
            <Chip
              label="Aiswarya Krishnan"
              variant="outlined"
              className={active === "7" ? "active" : ""}
              onClick={() => {
                handleActive("7"), handleClickedTeam("Aiswarya Krishnan");
              }}
            />
            <Chip
              label="Naveen Kumar"
              variant="outlined"
              className={active === "9" ? "active" : ""}
              onClick={() => {
                handleActive("9"), handleClickedTeam("Naveen Kumar");
              }}
            />
            <Chip
              label="Manikandan"
              variant="outlined"
              className={active === "10" ? "active" : ""}
              onClick={() => {
                handleActive("10"), handleClickedTeam("Manikandan");
              }}
            />
            <Chip
              label="Pavithra"
              variant="outlined"
              className={active === "11" ? "active" : ""}
              onClick={() => {
                handleActive("11"), handleClickedTeam("Pavithra");
              }}
            />
            <Chip
              label="Reuben Thomas"
              variant="outlined"
              className={active === "12" ? "active" : ""}
              onClick={() => {
                handleActive("12"), handleClickedTeam("Reuben Thomas");
              }}
            />
            <Chip
              label="Abhinaya"
              variant="outlined"
              className={active === "13" ? "active" : ""}
              onClick={() => {
                handleActive("13"), handleClickedTeam("Abhinaya");
              }}
            />
          </>
        :
          <>
            <Chip
              label="Rajashree Jhunjhunwala - Sales Team"
              variant="outlined"
              className={active === "1" ? "active" : ""}
              onClick={() => {
                handleActive("1"), handleClickedTeam("Rajashree Jhunjhunwala");
              }}
            />
            <Chip
              label="Shwetal Shubhadeep - Design Team"
              variant="outlined"
              className={active === "2" ? "active" : ""}
              onClick={() => {
                handleActive("2"), handleClickedTeam("Shwetal Shubhadeep");
              }}
            />
            <Chip
              label="Daniel M - Engineering Team"
              variant="outlined"
              className={active === "3" ? "active" : ""}
              onClick={() => {
                handleActive("3"), handleClickedTeam("Daniel M");
              }}
            />
            <Chip
              label="Aiswarya Krishnan - Front-end team"
              variant="outlined"
              className={active === "4" ? "active" : ""}
              onClick={() => {
                handleActive("4"), handleClickedTeam("Gowtham");
              }}
            />
            <Chip
              label="Gowtham - Back-end Team"
              variant="outlined"
              className={active === "6" ? "active" : ""}
              onClick={() => {
                handleActive("6"), handleClickedTeam("Hariraj Vijayakumar");
              }}
            />
            <Chip
              label="Naveen Kumar - HR Team"
              variant="outlined"
              className={active === "7" ? "active" : ""}
              onClick={() => {
                handleActive("7"), handleClickedTeam("Aiswarya Krishnan");
              }}
            />
          </>
        }
        <Typography className="view_all_team">View All {activeClass === "two" ? "Employees" : "4 Teams"}</Typography>
      </Stack>
    </>
  );
}
export default MyTeam;