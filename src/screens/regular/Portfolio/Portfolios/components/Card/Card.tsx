import ConfirmationPopup from "@components/ConfirmationPopup";
import ShowMorePopup from "@components/ShowMorePopup";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { deletePortfolio, portfolioTypes } from "@helpers/portfolio";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox } from "@utils/Theme";
import React, { useCallback, useState } from "react";
import Info from "./Info";
import { portfolioListState } from "@typings/portfolio";

interface itemProp {
  item: portfolioListState;
}

export default ({ item }: itemProp) => {
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const type = portfolioTypes[item.type];

  const handleConfirmDelete = useCallback(async () => {
    const onDelete = await deletePortfolio(item.portfolioName);
    if (onDelete.status === "success") setShowDeletePopup(false);
  }, [item.portfolioName]);

  return (
    <TouchableBox
      width="100%"
      marginVertical="m"
      flexDirection="row"
      borderRadius="l"
      alignItems="center"
      paddingVertical="xxl"
      backgroundColor="secondary"
      borderColor="borderColor01"
      borderWidth={1}
    >
      <Box
        borderRadius="x4l"
        marginLeft="xl"
        height={60}
        width={60}
        backgroundColor="primary"
        alignItems="center"
        justifyContent="center"
      >
        <IconBold name="portfolioIcon" size={21} color="secondary" />
      </Box>
      <Box marginStart="xl">
        <Text variant="medium15" color="textColorGrey">
          {item.portfolioName}
        </Text>
        <Info label="Type" content={type} />
        <Info label="Category" content={item.category?.name} />
      </Box>
      <Box
        end={10}
        top={10}
        padding="s"
        position="absolute"
        alignItems="center"
        justifyContent="center"
      >
        <ShowMorePopup
          onSelectEdit={() => {
            navigate(ROUTES.EDITPORTFOLIO, { item });
          }}
          onSelectDelete={() => setShowDeletePopup(true)}
        />
      </Box>
      <ConfirmationPopup
        type="Delete"
        visible={showDeletePopup}
        onConfirm={handleConfirmDelete}
        onClose={() => setShowDeletePopup(false)}
      />
    </TouchableBox>
  );
};
