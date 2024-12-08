import { Text, ScrollView, View } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../../components/Screen";

// TODO mostrar u obtener el id del usuairo...

export default function Rutinas() {
  const router = useRouter();
  const { id } = router.query || {}; // Asegúrate de que router.query esté definido

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
          {id && <Text className="text-white">ID de Usuario: {id}</Text>}
        </View>
      </ScrollView>
    </Screen>
  );
}
