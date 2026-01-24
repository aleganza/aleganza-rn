import React from "react";
import { View } from "react-native";

const StaticSpacer = ({ size = 16 }) => {
  return <View style={{ height: size }} />;
};

export default StaticSpacer;
