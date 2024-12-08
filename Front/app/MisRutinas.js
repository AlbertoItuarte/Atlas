import { View, Text } from "react-native";
import { Link } from "expo-router";
import Screen from "../components/Screen";

export default MisRutinas = () => {
  return (
    <Screen pagina={"Mis Rutinas"}>
      <View className="">
        <View className="flex flex-row justify-between items-center h-14 px-4">
          <Text className="text-white">Mis Rutinas</Text>
        </View>
      </View>
    </Screen>
  );
};
