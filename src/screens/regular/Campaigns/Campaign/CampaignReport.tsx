import Header from "@components/Header";
import { useAppSelector } from "@hooks/redux";
import { Box, Text } from "@utils/Theme";
import React, { useState, useEffect } from "react";
import Activity from "./components/Activity";
import CampaignResult from "./components/CampaignResult";
import HeaderReport from "./components/HeaderReport";
import Overview from "./components/Overview";
import Payment from "./components/Payment";
import Progress from "./components/Progress";
import ProgressBar from "./components/ProgressBar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@typings/Navigation";
import { ROUTES } from "@config/routes";
import { getCampaignDetails } from "@store/selector/campaigns";
import { getStatus } from "../../../../utils/commonUtils";

export default ({
  route: { params },
}: NativeStackScreenProps<AppStackParamList, ROUTES.CAMPAIGN>) => {
  const [progress, setProgress] = useState(0);
  const [selected, setSelected] = useState("OVERVIEW");
  const details = useAppSelector(getCampaignDetails);
  useEffect(() => {
    if (details) {
      console.log("details :", details);
      const { salesCount = 0, jobs = [] } = details;
      const percentage = jobs.length ? (jobs.length / salesCount) * 100 : 0;
      setProgress(percentage);
    }
  }, [details]);
  return (
    <Box flex={1} backgroundColor="secondary">
      <Header headerText={details?.name || ""} iconName="menu" />
      <ProgressBar progress={progress} />
      <HeaderReport selected={selected} setSelected={setSelected} />
      {selected === "OVERVIEW" && <Overview id={params.id} />}
      {selected === "PROGRESS" && <Progress />}
      {selected === "CAMPAIGN RESULT" ? (
        details?.status != "draft" ? (
          <CampaignResult />
        ) : (
          <Box alignItems={"center"}>
            <Text>No Data Available</Text>
          </Box>
        )
      ) : null}
      {selected === "PAYMENT" && <Payment />}
      {selected === "ACTIVITY" && <Activity />}
    </Box>
  );
};
