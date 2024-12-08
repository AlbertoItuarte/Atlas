import React from "react";
import { Text, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import { Image } from "react-native";

const HomeScreen = () => {
  const [coachName, setCoachName] = useState("");

  useEffect(() => {
    const fetchCoachName = async () => {
      try {
        const loginData = await AsyncStorage.getItem("@login_data");
        console.log("loginData", loginData);
        if (loginData) {
          const parsedData = JSON.parse(loginData);
          console.log("parsedData", parsedData);
          if (parsedData && parsedData.usuario) {
            setCoachName(parsedData.usuario);
          }
        }
      } catch (e) {
        console.error("Error fetching coach name:", e);
        setCoachName("");
      }
    };
    fetchCoachName();
  }, []);

  return (
    <Screen pagina={"Atlas"}>
      <View className="block justify-between items-center h-screen px-4 bg-black">
        <View className="block justify-between items-center  px-4">
          <Image source={require("../assets/Mamado.png")} className="w-80 " />

          <Image
            source={require("../assets/Frase.png")}
            className="w-80 h-20 mt-24"
          />
          <Image
            source={require("../assets/Footer.png")}
            className="w-screen h-28 mt-32"
          />
        </View>
      </View>
    </Screen>
  );
};

export default HomeScreen;
