import React from "react";
import { ImageBackground, View, StyleSheet, ScrollView } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Cabecera from "./Cabecera";
import PropTypes from "prop-types";

const Screen = ({ children, pagina }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="">
        <View className="flex pb-20">
          <Cabecera pagina={pagina} />
        </View>
        <ScrollView className="h-screen">{children}</ScrollView>
      </View>
    </View>
  );
};

Screen.prototype = {
  children: PropTypes.node,
  pagina: PropTypes.string,
};

export default Screen;
