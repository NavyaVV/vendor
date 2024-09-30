import { IconBold } from "@utils/IconRegular";
import { Box, Image, TouchableBox } from "@utils/Theme";
import React, { useState } from "react";
import { PermissionsAndroid } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";
import ChangeImagePopup from "./ChangeImagePopup";
import { businessProfileParams } from "@typings/profile";
import PlaceholderIcon from "@components/PlaceholderIcon";

interface imageProp {
  handleImage?: (key: keyof businessProfileParams, image: string) => void;
  updatedImage?: string;
}

export default ({ handleImage, updatedImage }: imageProp) => {
  const [showPopup, setShowPopup] = useState(false);

  const takeNewPhoto = () => {
    ImageCropPicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((response) => {
        const profileAsset = {
          is_active: true,
          image_ref: response.path,
          product: response.filename,
          base64: response.data,
          mime: response.mime,
        };
        if (handleImage) handleImage(profileAsset);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 1000,
      cropping: true,
      multiple: false,
      includeBase64: true,
      compressImageQuality: 0.8,
    })
      .then((response) => {
        const profileAsset = {
          is_active: true,
          image_ref: response.path,
          product: response.filename,
          base64: response.data,
          mime: response.mime,
        };
        if (handleImage) handleImage(profileAsset);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) takeNewPhoto();
      else console.log("Camera permission denied");
    } catch (err) {
      console.warn(err);
    }
  };

  const requestGalleryPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Cool Photo App Gallery Permission",
          message:
            "Cool Photo App needs access to your Gallery " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED)
        choosePhotoFromLibrary();
      else console.log("Gallery permission denied");
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Box height={118} width={118}>
      <Box
        backgroundColor="boxColor18"
        justifyContent="center"
        borderRadius="x5l"
        alignItems="center"
        overflow="hidden"
        height={118}
        width={118}
      >
        <PlaceholderIcon icon="user" size={60} />
        <Image
          source={{ uri: updatedImage }}
          borderRadius="x5l"
          height={108}
          width={108}
        />
      </Box>
      <TouchableBox
        height={35}
        width={35}
        position="absolute"
        backgroundColor="primary"
        alignItems="center"
        justifyContent="center"
        borderRadius="x5l"
        bottom={4}
        right={4}
        onPress={() => setShowPopup(true)}
      >
        <IconBold name="camera" size={20} color="secondary" />
      </TouchableBox>
      <ChangeImagePopup
        onCamera={() => {
          requestCameraPermission();
          setShowPopup(false);
        }}
        onLibrary={() => {
          requestGalleryPermission();
          setShowPopup(false);
        }}
        visible={showPopup}
        close={() => setShowPopup(false)}
      />
    </Box>
  );
};
