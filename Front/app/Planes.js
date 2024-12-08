import { ScrollView, Text, View } from "react-native";
import Screen from "../components/Screen";

export default function Planes() {
  return (
    <Screen pagina={"Planes"}>
      <ScrollView className="">
        <View className="flex flex-row justify-between items-center h-14 px-4">
          <Text className="text-white">Planes</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
