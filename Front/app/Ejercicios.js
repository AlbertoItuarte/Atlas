import { ScrollView, Text, View } from "react-native";
import Screen from "../components/Screen";

export default function Ejercicios() {
  return (
    <Screen pagina={"Ejercicios"}>
      <ScrollView className="">
        <View className="flex flex-row justify-between items-center h-14 px-4">
          <Text className="text-white">Ejercicios</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
