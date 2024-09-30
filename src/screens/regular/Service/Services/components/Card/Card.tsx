import ConfirmationPopup from "@components/ConfirmationPopup";
import ShowMorePopup from "@components/ShowMorePopup";
import { navigate } from "@config/NavigationHelper";
import { ROUTES } from "@config/routes";
import { deleteService } from "@helpers/service";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, TouchableBox } from "@utils/Theme";
import React, { useCallback, useState } from "react";
import Info from "./Info";
import { serviceListState } from "@typings/service";
import { useSelector } from "react-redux";
import { getServiceType } from "@store/selector/service";
import { serviceListing } from "@store/reducers/service";
import { useAppDispatch } from "@hooks/redux";

interface itemProp {
  item: serviceListState;
  index: number;
}

export default ({ item, index }: itemProp) => {
  const types = useSelector(getServiceType);
  const [loader, setLoader] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const dispatch = useAppDispatch();

  const type = types?.find((state) => state.id === item.service.service_type);

  const handleConfirmDelete = useCallback(async () => {
    setLoader(true);
    const onDelete = await deleteService(item.service.id);
    if (onDelete.status === "success") {
      dispatch(serviceListing({ arg: { limit: 10, ordering: "service_name" } }));
      setShowDeletePopup(false);
    }
    setLoader(false);
  }, [item.service.id]);

  return (
    <TouchableBox
      width="100%"
      borderRadius="l"
      marginVertical="m"
      alignItems="center"
      flexDirection="row"
      paddingVertical="xl"
      backgroundColor="secondary"
      borderColor="borderColor01"
      borderWidth={1}
    >
      <Box
        borderRadius="x4l"
        marginLeft="xl"
        height={60}
        width={60}
        backgroundColor={index % 2 === 0 ? "boxColor24" : "primary"}
        alignItems="center"
        justifyContent="center"
      >
        <IconBold name="serviceIcon" size={23} color="secondary" />
      </Box>
      <Box marginTop="s" marginStart="xl">
        <Text variant="medium15" color="textColorGrey">
          {item.service.service_name}
        </Text>
        <Info label="Type of Service" content={type?.type_name} />
        <Info label="Service Area" content={item.service_loc[0].area} />
        <Info label="Price" content={item.service.price} />
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
          onSelectEdit={() => navigate(ROUTES.ADDSERVICES, { item: item })}
          onSelectDelete={() => setShowDeletePopup(true)}
        />
      </Box>
      <ConfirmationPopup
        type="Delete"
        loader={loader}
        visible={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleConfirmDelete}
      />
    </TouchableBox>
  );
};
