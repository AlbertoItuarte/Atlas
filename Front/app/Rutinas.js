import { Text, Pressable, ScrollView, View } from "react-native";
import { Link } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../components/Screen";

export default function Rutinas() {
  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("@login_data");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Screen pagina={"Rutinas"}>
      <ScrollView className="">
        <View className="flex flex-row justify-between items-center h-14 px-4">
          <Text className="text-white">Rutinas</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
