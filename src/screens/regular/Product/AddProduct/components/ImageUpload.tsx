import ErrorMessage from "@components/ErrorMessage";
import { addImageParams } from "@typings/product";
import { WIDTH } from "@utils/dimensions";
import { IconBold } from "@utils/IconRegular";
import { Box, ImageBox, TouchableBox } from "@utils/Theme";
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { FlatList } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import { deleteAssets } from "@store/reducers/common";
import { useAppDispatch } from "@hooks/redux";
import { alert } from "@helpers/commonAlert";

export type imageState = Array<addImageParams> | undefined;

export default forwardRef<{ getImages: () => imageState }>(
  ({ formData }, ref) => {
    const [imageData, setImageData] = useState<imageState>();
    const [error, setError] = useState("");

    const dispatch = useAppDispatch();

    useImperativeHandle(ref, () => ({
      getImages: () => {
        if (imageData?.length) return imageData;
        setError("Product image is required");
        return [];
      },
    }));

    useEffect(() => {
      if (formData && formData.length) {
        setImageData(formData);
      }
    }, [formData]);

    const handleRemove = (index: number) => {
      if (imageData && imageData[index] && imageData[index].id) {
        dispatch(
          deleteAssets({
            imageParams: { asset_id_list: [imageData[index].id] },
          })
        );
      }
      setImageData(imageData?.filter((_, i) => i !== index));
    };

    const choosePhotoFromLibrary = () => {
      setError("");
      ImageCropPicker.openPicker({
        width: 300,
        height: 1000,
        cropping: true,
        multiple: true,
        includeBase64: true,
        compressImageQuality: 0.8,
      })
        .then((response) => {
          if (response.length < 5) {
            const newData = response.map((data) => ({
              is_active: true,
              image_ref: data.path,
              product: data.filename,
              base64: data.data,
              mime: data.mime,
            }));
            const existing = imageData ?? [];
            setImageData([...existing, ...newData]);
          } else {
            alert("You can upload maximum 5 images");
          }
        })
        .catch((error) => {
          console.log("[Image picker] Exception: ", error);
        });
    };

    const render = ({
      item,
      index,
    }: {
      item: addImageParams;
      index: number;
    }) => {
      return (
        <Box
          height={WIDTH / 3.8}
          width={WIDTH / 3.8}
          borderRadius="m"
          marginHorizontal="s"
          marginVertical={"s"}
          justifyContent="center"
          backgroundColor="boxColor32"
          alignItems="center"
          padding="m"
        >
          <ImageBox
            source={{
              uri: item.base64
                ? item.image_ref
                : `data:image/png;base64,${item.image_ref}`,
            }}
            height={WIDTH / 4.2}
            width={WIDTH / 4.2}
            overflow="hidden"
            borderRadius="m"
            marginHorizontal="s"
            alignItems="flex-end"
            padding="m"
          >
            <TouchableBox
              padding="m"
              opacity={0.7}
              borderRadius="xl"
              backgroundColor="secondary"
              onPress={() => handleRemove(index)}
            >
              <IconBold name="close" size={13} color="primary" />
            </TouchableBox>
          </ImageBox>
        </Box>
      );
    };

    const footer = () => {
      return !imageData?.length || imageData.length < 5 ? (
        <TouchableBox
          width={WIDTH / 3.8}
          height={WIDTH / 3.8}
          borderWidth={1}
          borderRadius="m"
          borderStyle="dashed"
          alignItems="center"
          marginHorizontal="s"
          justifyContent="center"
          borderColor="textColor04"
          backgroundColor="boxColor34"
          marginTop={imageData?.length ? "s" : "s"}
          onPress={choosePhotoFromLibrary}
        >
          <IconBold name="addCircle" size={18} color="primary" />
        </TouchableBox>
      ) : undefined;
    };

    return (
      <Box>
        <FlatList
          numColumns={3}
          data={imageData ?? []}
          renderItem={render}
          ListFooterComponent={footer}
        />
        <ErrorMessage errorMessage={error} />
      </Box>
    );
  }
);
