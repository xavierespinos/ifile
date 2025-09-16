import React from "react";
import { ActivityIndicator } from "react-native";

interface Props {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<Props> = ({ size = 24, color = "#fff" }) => {
  return <ActivityIndicator size={size} color={color} />;
};
export default LoadingSpinner;
