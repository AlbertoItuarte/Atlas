import { ScrollView, Text, View } from "react-native";
import Screen from "../components/Screen";

export default function Pagos() {
  return (
    <Screen pagina={"Pagos"}>
      <ScrollView className="">
        <View className="flex flex-row justify-between items-center h-14 px-4">
          <Text className="text-white">Pagos</Text>
        </View>
      </ScrollView>
    </Screen>
  );
}
