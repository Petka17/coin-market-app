import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
  show: boolean;
  message: string | null;
  close: () => void;
}

const ErrorPopup: React.FC<Props> = (props: Props) => {
  const { show, message, close } = props;

  return show ? (
    <View style={styles.error}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity onPress={close}>
        <Text style={styles.errorClose}>X</Text>
      </TouchableOpacity>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  error: {
    position: "absolute",
    left: 0,
    bottom: 0,
    height: 50,
    width: "100%",
    backgroundColor: "yellow",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10
  },
  errorText: {
    color: "black"
  },
  errorClose: {
    color: "black"
  }
});

export default ErrorPopup;
