import React from "react";
import { View } from "react-native";
import WebView from "react-native-webview";

export default function PDFViewer(props) {
  const { file } = props.route.params;
  console.log(file);
  return <WebView source={{ uri: file }} />;
}