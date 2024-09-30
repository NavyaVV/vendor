import { useAppDispatch } from "@hooks/redux";
import { logout } from "@store/reducers/auth";
import { IconBold } from "@utils/IconRegular";
import { Box, Text, useTheme } from "@utils/Theme";
import React, { useCallback } from "react";
import { Modal } from "react-native";
import CustomDoubleButton from "./CustomDoubleButton";

interface optionProps {
  visible: boolean;
  close: () => void;
}
export default ({ visible, close }: optionProps) => {
  const { colors } = useTheme();
  const color = colors.primary;
  const dispatch = useAppDispatch();

  const handleLogout = useCallback(() => {
    close();
    dispatch(logout());
  }, [close, dispatch]);

  return (
    <Modal visible={visible} transparent onRequestClose={close}>
      <Box flex={1}>
        <Box flex={1} />
        <Box
          flex={1.5}
          marginHorizontal="xxl"
          backgroundColor="secondary"
          paddingVertical="x2l"
          alignItems="center"
          borderRadius="l"
          justifyContent="center"
          paddingHorizontal="_xl"
          elevation={10}
        >
          <Box
            height={100}
            width={100}
            borderRadius="xx4l"
            alignItems="center"
            justifyContent="center"
            style={{ backgroundColor: `${color}13` }}
          >
            <Box
              height={92}
              width={92}
              borderRadius="xx4l"
              alignItems="center"
              justifyContent="center"
              style={{ backgroundColor: `${color}23` }}
            >
              <Box
                height={82}
                width={82}
                justifyContent="center"
                alignItems="center"
                backgroundColor="primary"
                borderRadius="x4l"
              >
                <IconBold name="logout" size={33} color="secondary" />
              </Box>
            </Box>
          </Box>
          <Text
            variant="regular17"
            color="textColor01"
            marginTop="xxl"
            textAlign="center"
            paddingHorizontal="x4l"
          >
            Are you sure to you want to logout?
          </Text>
          <CustomDoubleButton
            secondaryButton="CANCEL"
            primaryButton="CONFIRM"
            onPressPrimary={handleLogout}
            onPressSecondary={close}
          />
        </Box>
        <Box flex={1} />
      </Box>
    </Modal>
  );
};
