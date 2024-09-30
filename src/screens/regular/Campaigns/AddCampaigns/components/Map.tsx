import { Box } from "@utils/Theme";
import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Platform, StyleSheet } from "react-native";
import { CustomMapStyle1 } from "@utils/mapStyle";

interface mapProps {
  coordinates?: string;
}

export default ({ coordinates }: mapProps) => {
  const latitude = parseFloat(coordinates?.split("/")[0] ?? "0");
  const longitude = parseFloat(coordinates?.split("/")[1] ?? "0");
  return (
    <Box>
      <MapView
        style={[styles.map]}
        customMapStyle={CustomMapStyle1}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        initialRegion={{
          latitude: 8.5686,
          longitude: 76.8731,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={{
          latitude: latitude ?? 8.559582632339081,
          longitude: longitude ?? 76.8824455926187,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude ?? 8.559582632339081,
            longitude: longitude ?? 76.8824455926187,
          }}
          style={{ height: 30, width: 30 }}
        />
      </MapView>
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    alignItems: "center",
    height: "100%",
  },
});
