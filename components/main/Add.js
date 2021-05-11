// make a post
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import BottomCamera from "./bottomCamera";

export default function Add({ navigation }) {
  // hooks
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      // check permisions of the application
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      // check permisions
      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(cameraStatus.status === "granted");
    })();
  }, []);

  // take image
  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      // console.log(data.uri)
      setImage(data.uri);
      navigation.navigate("Save", { image: data.uri });
    }
  };

  // pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);
    navigation.navigate("Save", { image: result.uri });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // if null return a view
  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }

  // no access sceen
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.camera}>
        <Camera
          ref={(ref) => setCamera(ref)}
          style={styles.fixedRatio}
          type={type}
        />
      </View>
      <BottomCamera
        cameraType={type}
        setType={setType}
        pickImage={pickImage}
        takePicture={takePicture}
      />
      {/* <Button
                title="Flip Camera"
                onPress={() => {
                    setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    );
                }}>
            </Button>
            <Button title="Take Photo" onPress={() => takePicture()} />
            <Button title="Get Image From Gallery" onPress={() => pickImage()} />
            <Button title="Save" onPress={() => navigation.navigate("Save", {image})} />
            {image && <Image source={{uri: image}} style={{ flex: 1 }} />} */}
    </View>
  );
}
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
