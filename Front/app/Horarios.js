import { View, Text } from "react-native";
import Screen from "../components/Screen";

const Horarios = () => {
  return (
    <Screen pagina="Horarios">
      <View className="block justify-center w-full h-screen">
        <Text className="text-[#41E4F0] text-2xl">Horarios</Text>
      </View>
    </Screen>
  );
};

export default Horarios;
