import CustomButton from "@components/CustomButton";
import React, { useState } from "react";
import ImportantNote from "./ImportantNote";
import ImageUpload from "./ImageUpload";
import FileInput from "@components/FileInput";

export default () => {
  const [catalogue, setCatalogue] = useState<Array<string>>([]);

  const handleSelect = async (file: string) => {
    setCatalogue([file]);
  };

  return (
    <>
      <ImportantNote Title="IMPORTANT NOTE" Message="LOREM" mBottom="xx3l" />
      <FileInput
        label="CATALOGUE UPLOAD"
        fileName={catalogue[0]}
        onChooseFile={handleSelect}
        mandatory
      />
      <FileInput
        label="PRICE LIST CATALOGUE"
        fileName={catalogue[0]}
        onChooseFile={handleSelect}
        mandatory
      />
      <ImportantNote
        Title="INFO"
        Message="INFO IMAGE"
        mBottom="xx3l"
        action="CLICK"
      />
      <ImageUpload />
      <CustomButton label="ADD CATALOGUE" />
    </>
  );
};
