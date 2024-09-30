import ConfirmationPopup from "@components/ConfirmationPopup";
import ShowMorePopup from "@components/ShowMorePopup";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { deleteCampaign } from "@helpers/campaigns";
import { campaignListState } from "@typings/campaigns";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox, TrText, useTheme } from "@utils/Theme";
import moment from "moment";
import React, { useCallback, useState, useEffect } from "react";
import CircularProgress from "react-native-circular-progress-indicator";
import { getStatus } from "../utils/commonUtils";
import { useAppDispatch } from "@hooks/redux";
import { campaignsDetails } from "@store/reducers/campaigns";

interface itemProp {
  item: campaignListState;
  pageReload?: () => void;
}

export default ({ item, pageReload }: itemProp) => {
  const [progress, setProgress] = useState(0);
  const { colors } = useTheme();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const { salesCount = 0, jobs = [] } = item;
    const percentage = jobs.length ? (jobs.length / salesCount) * 100 : 0;
    setProgress(percentage);
  }, [item]);

  const handleConfirmDelete = useCallback(async () => {
    const onDelete = await deleteCampaign(item.id);
    if (onDelete.status === "success") {
      if (pageReload) pageReload();
      setShowDeletePopup(false);
    }
  }, [item.id, pageReload]);

  console.log("CampaignCard item :", item);

  return (
    <TouchableBox
      height={106}
      width="100%"
      borderWidth={1}
      marginVertical="m"
      justifyContent="space-between"
      borderRadius="l"
      borderColor="borderColor01"
      padding="m"
      flexDirection="row"
      activeOpacity={0.6}
      onPress={() => navigate(ROUTES.CAMPAIGN, { id: item.id })}
    >
      <Box justifyContent="center" marginLeft="m" marginRight="l">
        <CircularProgress
          radius={25}
          valueSuffixStyle={{ start: -(10 / 2) }}
          progressValueFontSize={9}
          value={progress}
          inActiveStrokeColor={colors.boxColor06}
          activeStrokeColor={
            progress >= 100
              ? colors.boxColor05
              : progress > 50
              ? colors.boxColor11
              : colors.boxColor03
          }
          progressValueColor={colors.textColor01}
          valueSuffix="%"
        />
      </Box>
      <Box flex={1} justifyContent="center">
        <Text variant="medium12" color="textColor01">
          {item.name}
        </Text>
        <Box flexDirection={"row"} alignItems="center" marginTop="m">
          <TrText variant="regular10" color="textColor06">
            DURATION
          </TrText>
          <Text variant="regular10" color="textColor06" marginLeft="xs">
            : {moment(item.startDate).format("MMMM DD")}-
          </Text>
          <Text variant="regular10" color="textColor06" marginStart="s">
            {moment(item.endDate).format("MMMM DD")}
          </Text>
        </Box>
        <Box flexDirection={"row"} alignItems="center" marginTop="m">
          <TrText variant="regular10" color="textColor06">
            PRICE
          </TrText>
          <Text variant="regular10" marginLeft="xs" color="textColor06">
            : {item.estimatedPrice}
          </Text>
        </Box>
        {/* <Box flexDirection="row" alignItems="center" marginTop="m">
          <IconBold name="star" size={11} color="boxColor03" />
          <Text marginLeft="s" variant="regular10" color="textColor01">
            {"4.3"}
          </Text>
        </Box> */}
      </Box>
      <Box
        justifyContent="center"
        alignItems="flex-end"
        marginStart="s"
        paddingRight="xxl"
      >
        {
          <Box flexDirection="row" alignItems="center" paddingRight="xs">
            <Box
              flexDirection="row"
              backgroundColor="borderColor01"
              padding="xss"
              alignItems="center"
              borderRadius="m"
              marginTop="l"
            >
              {/* <IconBold name="info" size={7} color="primary" /> */}
              <Text variant="regular7" color="textColor02" padding="xss">
                {getStatus(item.status)}
              </Text>
            </Box>
          </Box>
        }
      </Box>
      <Box
        end={5}
        top={10}
        padding="s"
        position="absolute"
        alignItems="center"
        justifyContent="center"
      >
        <ShowMorePopup
          cancel={true}
          onSelectEdit={() => {
            dispatch(campaignsDetails({ id: item?.id }));
            setTimeout(
              () =>
                navigate(ROUTES.ADDCAMPAIGNS, {
                  editCampaign: true,
                  item: item,
                }),
              500
            );
          }}
          onSelectDelete={() => setShowDeletePopup(true)}
        />
      </Box>
      <ConfirmationPopup
        visible={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        type="Delete"
        onConfirm={handleConfirmDelete}
      />
    </TouchableBox>
  );
};
