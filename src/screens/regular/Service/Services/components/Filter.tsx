import CustomDoubleButton from "@components/CustomDoubleButton";
import Dropdown from "@components/Dropdown";
import { IconBold } from "@utils/IconRegular";
import { Box, TouchableBox, TrText } from "@utils/Theme";
import React, { useState } from "react";
import { Modal } from "react-native";
import { useAppSelector } from "@hooks/redux";
import { filterParamsState } from "@typings/service";
import { getServiceType } from "@store/selector/service";

const price = {
  "50": { min: 50, max: 200 },
  "200": { min: 200, max: 500 },
  "500": { min: 500, max: 1000 },
  "1000": { min: 1000, max: 2000 },
};

const priceRanges = [
  { data: "₹ 50 - 200", value: "50" },
  { data: "₹ 200 - 500", value: "200" },
  { data: "₹ 500 - 1000", value: "500" },
  { data: "₹ 1000 - 2000", value: "1000" },
];

export interface optionProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (params: filterParamsState | null) => void;
}

interface filterProps {
  ascending?: boolean;
  priceRange: keyof typeof price;
  category?: string;
}

export default ({ onClose, visible, onSubmit }: optionProps) => {
  const categories = useAppSelector(getServiceType);
  const [filter, setFilter] = useState<filterProps>({
    priceRange: "50",
    ascending: true,
  });

  const handleSubmit = () => {
    onSubmit({
      category_name: filter.category,
      min_price: price[filter.priceRange].min,
      max_price: price[filter.priceRange].max,
      ordering: `${filter.ascending ? "" : "-"}updated_date`,
    });
  };

  return (
    <Modal
      onRequestClose={onClose}
      transparent={true}
      visible={visible}
      statusBarTranslucent
    >
      <Box
        flex={1}
        backgroundColor="boxColorTransparent"
        justifyContent="center"
      >
        <Box
          marginHorizontal="xxl"
          borderRadius="l"
          elevation={5}
          backgroundColor="secondary"
        >
          <Box
            height={74}
            borderTopRightRadius="l"
            borderTopLeftRadius="l"
            backgroundColor="headerColor"
            flexDirection="row"
            justifyContent="space-between"
            padding="xxl"
            alignItems="center"
          >
            <TrText variant="regular16" color="primary">
              FILTER
            </TrText>
            <TouchableBox
              height={27}
              width={27}
              onPress={onClose}
              padding="s"
              backgroundColor="boxColor32"
              justifyContent="center"
              alignItems="center"
              borderRadius="xl"
            >
              <IconBold size={8} name="close" color="primary" />
            </TouchableBox>
          </Box>
          <Box marginHorizontal="xxl">
            <Box marginVertical="l">
              <TrText marginBottom="xxl" variant="regular12">
                SORT BY
              </TrText>
              <Box flexDirection="row">
                <TouchableBox
                  onPress={() => setFilter({ ...filter, ascending: true })}
                  flexDirection="row"
                  alignItems="center"
                  marginRight="x3l"
                >
                  <Box
                    width={18}
                    height={18}
                    borderWidth={1}
                    borderColor="borderColor01"
                    backgroundColor="secondary"
                    borderRadius="l"
                    justifyContent="center"
                    alignItems="center"
                    marginRight="m"
                  >
                    <Box
                      width={10}
                      height={10}
                      borderRadius="l"
                      backgroundColor={
                        filter.ascending === true ? "primary" : "secondary"
                      }
                    />
                  </Box>
                  <TrText variant="regular12">ASCENDING</TrText>
                </TouchableBox>
                <TouchableBox
                  flexDirection="row"
                  alignItems="center"
                  onPress={() => setFilter({ ...filter, ascending: false })}
                >
                  <Box
                    borderColor="borderColor01"
                    borderWidth={1}
                    width={18}
                    height={18}
                    backgroundColor="secondary"
                    borderRadius={"l"}
                    justifyContent="center"
                    alignItems="center"
                    marginRight="m"
                  >
                    <Box
                      width={10}
                      height={10}
                      borderRadius="l"
                      backgroundColor={
                        filter.ascending === false ? "primary" : "secondary"
                      }
                    />
                  </Box>
                  <TrText variant="regular12">DESCENDING</TrText>
                </TouchableBox>
              </Box>
            </Box>
            <Dropdown
              label="PRICE"
              value={filter.priceRange}
              setCategory={(value) =>
                setFilter({
                  ...filter,
                  priceRange: value as keyof typeof price,
                })
              }
              dropdownData={priceRanges}
              labelField="data"
              valueField="value"
            />
            <Dropdown
              label="TYPE"
              value={filter.category}
              setCategory={(category) => setFilter({ ...filter, category })}
              dropdownData={categories}
              labelField="type_name"
              valueField="id"
            />
          </Box>
          <Box paddingHorizontal="xxl">
            <CustomDoubleButton
              primaryButton="SEARCH"
              secondaryButton="CLEAR ALL"
              onPressPrimary={handleSubmit}
              onPressSecondary={() => onSubmit(null)}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
