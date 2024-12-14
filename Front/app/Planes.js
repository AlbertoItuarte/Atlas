import { ScrollView, Text, View } from "react-native";
import Screen from "../components/Screen";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//este es el apartado principal de los pagos
//TODO hacer la vista de los planes donde el coach pueda ver los planes que tiene disponibles y modificarlos/eliminarlos
//TODO Contratos el la siguiente tabla donde se asocia el pago del cliente al coach (Insertar IdCoach en la tabla)
//TODO Pagos la siguiente tabla donde se asocia el pago del cliente al coach (Insertar IdCoach en la tabla)
//TODO Cómo ya existen pagos, estos se deben borrar para que no haya problemas con la integridad de los datos
//TODO Cómo ya existen contratos, estos se deben borrar para que no haya problemas con la integridad de los datos
//TODO Cómo ya existen planes, estos se deben borrar para que no haya problemas con la integridad de los datos
export default function Planes() {
  const [planes, setPlanes] = useState([]);
  const [IdCoach, setIdCoach] = useState("");

  useEffect(() => {
    const obtenerIdCoach = async () => {
      try {
        const loginData = await AsyncStorage.getItem("@login_data");
        if (loginData !== null) {
          console.log("Login Data:", loginData);
          const { id } = JSON.parse(loginData);
          console.log("Coach id:", id);
          setIdCoach(id);
        }
      } catch (error) {
        console.error("Error fetching coach id:", error);
      }
      obtenerPlanes();
    };
    obtenerIdCoach();
  }, []);

  const obtenerPlanes = async () => {
    console.log("IdCoach:", IdCoach);
    try {
      console.log("Fetching planes...");
      if (!IdCoach) {
        return;
      }
      const response = await axios.get(
        "http://192.168.1.75:5000/transacciones/planes",
        {
          IdCoach,
        }
      );
      const data = await response.json();
      setPlanes(data);
      console.log(data);
    } catch (error) {
      console.error("Error en el servidor:", error);
      return error;
    }
  };

  return (
    <Screen pagina={"Planes"}>
      <ScrollView className="">
        <View className="flex flex-row justify-between items-center h-14 px-4">
          <Text className="text-white">Planes</Text>
          <View className="flex flex-row justify-between items-center">
            <Text className="text-white">Agregar</Text>
          </View>
        </View>
        <View className="flex flex-row justify-between items-center h-14 px-4">
          <Text className="text-white">Plan</Text>
          <Text className="text-white">Duración</Text>
          <Text className="text-white">Precio</Text>
        </View>
        <View className="flex flex-row justify-between items-center h-14 px-4">
          {/* //TODO hacer la vista de los planes donde el coach pueda ver los  */}
          {/* planes que tiene disponibles y modificarlos/eliminarlos */}
        </View>
      </ScrollView>
    </Screen>
  );
}
