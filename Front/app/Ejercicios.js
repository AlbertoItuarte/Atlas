import { ScrollView, Text, View } from "react-native";
import Screen from "../components/Screen";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Ejercicios() {
  const [ejercicios, setEjercicios] = useState([]);
  const [coachId, setCoachId] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@login_data");
      if (value !== null) {
        setCoachId(JSON.parse(value).id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (coachId) {
      fetchEjercicios(coachId);
    }
  }, [coachId]);

  const fetchEjercicios = async (coachId) => {
    console.log("Obteniendo ejercicios para el coach con id:", coachId);
    try {
      const response = await axios.get("http://192.168.1.75:5000/ejercicios", {
        params: {
          id: coachId,
        },
      });
      if (response.data && response.data.length > 0) {
        setEjercicios(response.data);
        console.log("Ejercicios:", response.data);
      } else {
        console.error("No se encontraron ejercicios");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("No se encontraron clientes");
      } else {
        console.error("Error fetching clientes:", error);
      }
    }
  };
  return (
    <Screen pagina={"Ejercicios"}>
      <ScrollView className="pb-20">
        <View className="flex flex-row justify-between  items-center h-14 px-4">
          <Text className="text-white">Ejercicios: </Text>
        </View>

        {ejercicios.length > 0 ? (
          ejercicios.map((ejercicio, index) => (
            <View
              key={ejercicio.id || index}
              className="flex flex-row justify-between items-center h-14 px-4"
            >
              <Text className="text-white">{ejercicio.Ejercicio}</Text>
            </View>
          ))
        ) : (
          <View className="flex justify-center items-center">
            <Text className="text-white">Obteniendo ejercicios...</Text>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
