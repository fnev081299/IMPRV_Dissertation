// bottom element of Camera
import React from "react";
import { Camera } from "expo-camera";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

export default ({
    setType,
  cameraType = CameraTypes.back,
  flashMode = CameraFlashModes.off,
  pickImage,
  setCameraType,
  takePicture,
}) => (
  <View style={styles.bottomToolbar}>
    <View style={{ flexDirection: "row" }}>
      <View style={{ ...styles.alignCenter }}>
        <TouchableOpacity onPress={pickImage}>
          <MaterialCommunityIcons name={"folder-multiple-image"} color="white" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.alignCenter}>
        <TouchableWithoutFeedback onPress={takePicture}>
          <View style={[styles.captureBtn, styles.captureBtnActive]}>
            {<View style={styles.captureBtnInternal} />}
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.alignCenter}>
        <TouchableOpacity
          onPress={() =>
            setType(
              cameraType === CameraTypes.back
                ? CameraTypes.front
                : CameraTypes.back
            )
          }
        >
          <MaterialCommunityIcons
            name="camera-party-mode"
            color="white"
            size={30}
          />
        </TouchableOpacity>
      </View>
    </View>
  </View>
);
const { width: winWidth, height: winHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    flexDirection: "row",
  },
  fixedRatio: {
    height: winHeight,
    width: winWidth,
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  alignCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomToolbar: {
    width: winWidth,
    position: "absolute",
    height: 100,
    bottom: 0,
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: "#FFFFFF",
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: "red",
    borderColor: "transparent",
  },
});
