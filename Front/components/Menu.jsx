// Menu.js
import React from "react";
import { View, Text, Pressable, Image } from "react-native";

const Menu = ({ isOpen, onClose, children }) => {
  return (
    <View
      className={`flex justify-between items-center bg-black h-screen space-y-8 bg-opacity-30  ${isOpen ? "absolute top-0 bottom-0 rounded-lg  left-0 w-40  z-50 p-5" : "hidden"}`}
    >
      <Pressable onPress={onClose} className="self-end">
        <Image source={require("../assets/Menu.png")} className="w-12 h-12" />
      </Pressable>
      {children}
    </View>
  );
};

export default Menu;
