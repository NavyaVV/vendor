import FileInput from "@components/FileInput";
import { useAppDispatch } from "@hooks/redux";
import { setError } from "@store/reducers/profile";
import { getProfileInfo } from "@store/selector/profile";
import { companyFilesParams, profileErrorState } from "@typings/profile";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { useSelector } from "react-redux";

interface companyFileProps {
  errors: profileErrorState | null | undefined;
}

type paramState = companyFilesParams | undefined;

export default forwardRef<
  { getData: () => companyFilesParams | undefined },
  companyFileProps
>(({ errors }, ref) => {
  const userDetails = useSelector(getProfileInfo);
  const profile = { ...userDetails?.company_files[0] };
  delete profile?.created_date;
  delete profile?.updated_date;
  const [params, setParams] = useState<paramState>(profile);
  const dispatch = useAppDispatch();

  useImperativeHandle(ref, () => ({ getData: () => params }));

  const handleTextChange = (
    key: keyof companyFilesParams,
    value: string
  ) => {
    setParams({ ...params, [key]: value });
    dispatch(setError({ ...errors, [key]: "" }));
  };

  return (
    <>
      <FileInput
        label="COMPANY FILES"
        fileName={params?.company_file_ref}
        onChooseFile={(file) => handleTextChange("company_file_ref", file)}
        errorMessage={errors?.company_file_ref}
      />
    </>
  );
});
