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
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const ensureDirExists = async (dir) => {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
};

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

  // Obtener la fecha actual
  const fechaActual = new Date();

  // Filtrar los contratos cuya fecha de finalización no ha pasado
  const contratosVigentes = contratos.filter(
    (contrato) => new Date(contrato.FechaFin) >= fechaActual
  );

  const generarPDF = async () => {
    try {
      console.log("Generando PDF...");
      let htmlContent = `
        <h1>Lista de Contratos</h1>
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Inicio</th>
              <th>Final</th>
              <th>Plan</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>
            ${contratosVigentes
              .map(
                (contrato) => `
              <tr>
                <td>${contrato.NombreCliente} ${contrato.ApellidoPCliente}</td>
                <td>${new Date(contrato.FechaInicio).toISOString().split("T")[0]}</td>
                <td>${new Date(contrato.FechaFin).toISOString().split("T")[0]}</td>
                <td>${contrato.NombrePlan}</td>
                <td>${parseInt(contrato.Monto, 10)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log("PDF generado en:", uri);

      // Define la ruta personalizada
      const newUri = `${FileSystem.documentDirectory}contratos/lista_contratos.pdf`;

      // Asegúrate de que el directorio exista
      await ensureDirExists(`${FileSystem.documentDirectory}contratos`);

      // Mueve el archivo a la nueva ubicación
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      console.log("PDF movido a:", newUri);
      // alert(`PDF generado en: ${newUri}`);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newUri);
      } else {
        alert("La función de compartir no está disponible en este dispositivo");
      }
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Error al generar el PDF");
    }
  };

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
              {Array.isArray(contratosVigentes) &&
                contratosVigentes.map((contrato, index) => (
                  <TouchableHighlight
                    key={index.toString()}
                    onLongPress={() => console.log("Editar", contrato)}
                    onPress={() => console.log("Seleccionar", contrato.Id)}
                    className="flex w-screen justify-center items-center"
                  >
                    <View>
                      <View className="flex flex-row w-screen items-center">
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
                        <Text className="text-white h-12 w-2/12 text-center">
                          {contrato.NombrePlan.slice(0, 3)}
                        </Text>
                        <Text className="text-white h-12 w-2/12 text-center">
                          {parseInt(contrato.Monto, 10)}
                        </Text>
                      </View>
                      <View className="w-screen bg-gray-300 h-0.5"></View>
                    </View>
                  </TouchableHighlight>
                ))}
              <Button title="Generar PDF" onPress={generarPDF} />
            </View>
          </View>
        </ScrollView>
      </View>
    </Screen>
  );
}
