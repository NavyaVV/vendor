import Header from "@components/Header";

import { Box } from "@utils/Theme";
import React, { useState } from "react";
import Activity from "./components/Activity";
import CampaignResult from "./components/CampaignResult";
import CompletedOverView from "./components/CompletedOverView";
import HeaderReport from "./components/HeaderReport";
import Payment from "./components/Payment";
import Progress from "./components/Progress";
import ProgressBar from "./components/ProgressBar";
import { getCampaignDetails } from "@store/selector/campaigns";
import { useAppSelector } from "@hooks/redux";

export default () => {
  const [selected, setSelected] = useState("OVERVIEW");
  const details = useAppSelector(getCampaignDetails);
  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerText={details?.name || ""} iconName="menu" />
      <ProgressBar />
      <Box flex={0.095}>
        <HeaderReport selected={selected} setSelected={setSelected} />
      </Box>
      {selected === "OVERVIEW" && <CompletedOverView />}
      {selected === "PROGRESS" && <Progress />}
      {selected === "CAMPAIGN RESULT" && <CampaignResult />}
      {selected === "PAYMENT" && <Payment />}
      {selected === "ACTIVITY" && <Activity />}
    </Box>
  );
};
