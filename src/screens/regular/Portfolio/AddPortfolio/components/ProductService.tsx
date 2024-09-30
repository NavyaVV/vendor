import MultiselectDropDown from "@components/MultiselectDropDown";
import { Box } from "@utils/Theme";
import React from "react";
import DropDownSelectedComponent from "./SelectedProducts";
import {
  portfolioProductState,
  portfolioServiceState,
} from "@typings/portfolio";

interface productSelectorProps {
  label: string;
  selected?: Array<number>;
  products: Array<portfolioProductState>;
  services: Array<portfolioServiceState>;
  errorMessage?: Array<string> | string | null;
  onChange: (id: number) => void;
  onClear: (id: number) => void;
}

export default ({
  label,
  products,
  services,
  selected,
  errorMessage,
  onChange,
  onClear,
}: productSelectorProps) => {
  const productList = products
    ?.filter((product) => !selected?.includes(product.id))
    .map((state) => ({
      id: state.id,
      label: state.productName,
    }));
  const serviceList = services
    ?.filter((service) => !selected?.includes(service.id))
    .map((state) => ({
      id: state.id,
      label: state.serviceName,
    }));
  const list = label === "SERVICES" ? serviceList : productList;

  return (
    <Box marginBottom="xxl">
      <MultiselectDropDown
        label={label}
        mandatory={true}
        setCategory={(change) => onChange(change.id)}
        dropdownData={list}
        valueField="id"
        labelField="label"
        errorMessage={errorMessage}
      />
      <Box
        borderColor="borderColor01"
        paddingHorizontal="l"
        paddingVertical="m"
        borderWidth={1}
        borderRadius="m"
        minHeight={120}
        width="100%"
      >
        {selected?.map((item, index) => {
          const selectedName =
            label === "SERVICES"
              ? services.find((service) => service.id === item)?.serviceName
              : products.find((product) => product.id === item)?.productName;
          return (
            <DropDownSelectedComponent
              key={index}
              productName={selectedName ?? "Please select"}
              onClear={() => onClear(item)}
            />
          );
        })}
      </Box>
    </Box>
  );
};
