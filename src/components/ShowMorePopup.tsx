import { IconBold } from "@utils/IconRegular";
import { Box, Text, useTheme } from "@utils/Theme";
import React from "react";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { StyleSheet } from "react-native";

interface MoreProps {
  cancel?: boolean;
  onSelectEdit: () => void;
  onSelectDelete: () => void;
}

export default ({ cancel, onSelectEdit, onSelectDelete }: MoreProps) => {
  const { iconSize } = useTheme();

  return (
    <Menu>
      <MenuTrigger>
        <IconBold name="more" size={iconSize.xl} color="primary" />
      </MenuTrigger>
      <MenuOptions optionsContainerStyle={style.menuStyle}>
        <MenuOption style={style.cardStyle} onSelect={onSelectEdit}>
          <Box
            flexDirection="row"
            paddingHorizontal="l"
            paddingVertical="l"
            alignItems="center"
          >
            <IconBold name="edit" color="primary" size={14} />
            <Text variant="regular14" color="primary" marginStart="l">
              Edit
            </Text>
          </Box>
        </MenuOption>
        <MenuOption onSelect={onSelectDelete}>
          <Box
            flexDirection="row"
            paddingHorizontal="l"
            alignItems="center"
            paddingVertical="l"
          >
            <IconBold name="delete" color="primary" size={14} />
            <Text variant="regular14" color="primary" marginStart="l">
              Delete
            </Text>
          </Box>
        </MenuOption>
        {cancel && (
          <MenuOption>
            <Box
              flexDirection="row"
              paddingHorizontal="l"
              alignItems="center"
              paddingVertical="l"
            >
              <Box
                width={20}
                height={20}
                borderRadius="x4l"
                backgroundColor="primary"
                justifyContent="center"
                alignItems="center"
              >
                <IconBold name="close" size={10} color="secondary" />
              </Box>
              <Text variant="regular14" color="primary" marginStart="l">
                Cancel
              </Text>
            </Box>
          </MenuOption>
        )}
      </MenuOptions>
    </Menu>
  );
};

const style = StyleSheet.create({
  menuStyle: { alignItems: "flex-start", borderRadius: 5 },
  cardStyle: { width: 200 },
});
