import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableHighlight,
  Image,
  Button,
} from "react-native";
import Screen from "../components/Screen";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Contratos() {
  const [contratos, setContratos] = useState([]);
  const [idCoach, setIdCoach] = useState("");

  const obtenerContratos = async (idCoach) => {
    try {
      if (!idCoach) {
        console.error("idCoach no está definido");
        return;
      }
      const response = await axios.get("http://192.168.1.75:5000/contratos", {
        params: { idCoach },
      });
      setContratos(response.data);
    } catch (error) {
      console.error("Error en el servidor:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedIdCoachString = await AsyncStorage.getItem("@login_data");
        console.log("idCoach almacenado:", storedIdCoachString);
        if (storedIdCoachString) {
          const storedIdCoach = JSON.parse(storedIdCoachString);
          setIdCoach(storedIdCoach.id);
          obtenerContratos(storedIdCoach.id);
        } else {
          console.error("idCoach no encontrado en AsyncStorage");
        }
      } catch (error) {
        console.error("Error al obtener idCoach:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Screen>
      <View className="flex flex-col items-center">
        <Text className="text-3xl text-white">Contratos</Text>
        <ScrollView className="w-screen h-screen">
          <View className="flex flex-col w-screen items-center">
            <View className="flex flex-row pl-4 items-center bg-cyan-500 h-10 mt-4">
              <Text className="text-white w-2/12 text-center">Nombre</Text>
              <Text className="text-white w-3/12 text-center">Inicio</Text>
              <Text className="text-white w-3/12 text-center">Final</Text>
              <Text className="text-white w-1/5 text-center">Plan</Text>
              <Text className="text-white w-1/5 text-center">Costo</Text>
            </View>
            <View className="pb-40 bg-gray-800">
              {Array.isArray(contratos) &&
                contratos.map((contrato, index) => (
                  <TouchableHighlight
                    key={index.toString()}
                    onLongPress={() => console.log("Editar", contrato)}
                    onPress={() => console.log("Seleccionar", contrato.Id)}
                    className=""
                  >
                    <View className="flex flex-row w-screen justify-between items-center">
                      <Text className="text-white w-2/12 text-center">
                        {contrato.NombreCliente} {contrato.ApellidoPCliente}
                      </Text>
                      <Text className="text-white  h-12 w-3/12 text-center">
                        {
                          new Date(contrato.FechaInicio)
                            .toISOString()
                            .split("T")[0]
                        }
                      </Text>
                      <Text className="text-white h-12 w-3/12 text-center">
                        {
                          new Date(contrato.FechaFin)
                            .toISOString()
                            .split("T")[0]
                        }
                      </Text>
                      <Text className="text-white h-12w-1/5 text-center">
                        {contrato.NombrePlan.slice(0, 3)}
                      </Text>
                      <Text className="text-white h-12 w-1/5 text-center">
                        {parseInt(contrato.Monto, 10)}
                      </Text>
                    </View>
                  </TouchableHighlight>
                ))}
              <Button
                title="Generar PDF"
                onPress={() => console.log("Generar PDF")}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
