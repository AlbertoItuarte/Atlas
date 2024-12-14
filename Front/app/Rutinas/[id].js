import React, { useEffect, useState } from "react"; // Importa React, useState y useEffect desde react
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Screen from "../../components/Screen";
import {
  Text,
  ScrollView,
  View,
  TouchableHighlight,
  Image,
  Button,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Link } from "expo-router";
import axios from "axios";
import ModificarRutinaUsuario from "../../components/ModificarRutinaUsuario";
import AgregarEjercicioCliente from "../../components/AgregarEjercicioCliente";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default function Rutinas() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [rutinas, setRutinas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [dia, setDia] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRutina, setSelectedRutina] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@selected_id");
      if (value !== null) {
        setId(value);
        console.log("ID del cliente en rutinas:", value);
        obtenerRutinas(value);
      } else {
        console.error("No se encontró el id seleccionado");
      }
    } catch (e) {
      console.error("Error retrieving id:", e);
    }
    setIsEditOpen(false);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchAsyncStorageData = async () => {
      const storedId = await AsyncStorage.getItem("IdCliente");
      const storedNombre = await AsyncStorage.getItem("NombreCliente");
      console.log("ID del cliente en async storage:", storedId);
      console.log("Nombre del cliente en async storage:", storedNombre);
    };

    fetchAsyncStorageData();
  }, [id, nombreCliente]);

  const handleDia = (dia) => {
    setDia(dia);
  };

  const agregarEjercicio = () => {
    console.log("Agregar ejercicio");
    setIsAddOpen(true);
  };

  const modificarRutina = (rutina) => {
    console.log("Rutina seleccionada [id]:", rutina);
    setSelectedRutina(rutina);
    setIsEditOpen(true);
  };

  const manejarCierre = () => {
    setIsEditOpen(false);
    setIsAddOpen(false);
    getData();
  };

  const rutinasFiltradas = dia
    ? rutinas.filter((rutina) => rutina.Dia === dia)
    : rutinas;

  const obtenerRutinas = async (id) => {
    try {
      const response = await axios.get(
        "http://192.168.1.75:5000/rutinasclientes",
        {
          params: { id: id },
        }
      );
      if (response.data.length > 0) {
        setId(id);
        console.log("ID del cliente en rutinas:", id);
        setRutinas(response.data);
        setNombreCliente(response.data[0].Nombre);
        await AsyncStorage.setItem("NombreCliente", response.data[0].Nombre);
        await AsyncStorage.setItem("IdCliente", id);
        console.log("Rutinas response: ", response.data);
      } else {
        setMensaje("No se encontraron rutinas para este usuario");
      }
    } catch (error) {
      console.error("Error fetching rutinas:", error);
      setMensaje("Error al obtener las rutinas");
    }
  };

  const ensureDirExists = async (dir) => {
    const dirInfo = await FileSystem.getInfoAsync(dir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    }
  };

  const generarPDF = async (rutinasFiltradas) => {
    try {
      console.log("Generando PDF...");
      let htmlContent = `
        <h1>Rutinas de ${nombreCliente}</h1>
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Ejercicio</th>
              <th>Series</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            ${rutinasFiltradas
              .map(
                (rutina) => `
              <tr>
                <td>${rutina.Ejercicio}</td>
                <td>${rutina.Series}</td>
                <td>${rutina.Repeticiones}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      const newUri = `${FileSystem.documentDirectory}rutinas/${nombreCliente}_rutinas.pdf`;

      await ensureDirExists(`${FileSystem.documentDirectory}rutinas`);

      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

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
    <Screen pagina={"Rutinas"}>
      <ScrollView className="">
        <View className="flex flex-col  justify-center items-center px-4">
          <Image source={require("../../assets/Rutinas.png")} />
          <View
            className={`bg-black h-full mt-40 w-scren  ${isEditOpen || isAddOpen ? "block" : "hidden"}`}
          >
            <ModificarRutinaUsuario
              isOpen={isEditOpen}
              onClose={() => {
                manejarCierre();
                getData();
              }}
              rutina={selectedRutina}
            />
            <AgregarEjercicioCliente
              isOpen={isAddOpen}
              onClose={() => {
                manejarCierre();
                getData();
              }}
              id={id}
            />
          </View>
          {id ? (
            <View className="flex flex-col mt-4 rounded justify-center items-center w-screen">
              <View className="flex flex-row  justify-around rounded-3xl items-center w-screen bg-gray-700  ">
                <TouchableHighlight
                  className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
                  onPress={() => handleDia("Lunes")}
                >
                  <Text className="text-white text-xl">L</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
                  onPress={() => handleDia("Martes")}
                >
                  <Text className="text-white text-xl">M</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
                  onPress={() => handleDia("Miércoles")}
                >
                  <Text className="text-white text-xl">M</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
                  onPress={() => handleDia("Jueves")}
                >
                  <Text className="text-white text-xl">J</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
                  onPress={() => handleDia("Viernes")}
                >
                  <Text className="text-white text-xl">V</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  className="bg-black h-10 w-10 rounded-full flex  justify-center items-center"
                  onPress={() => handleDia("Sábado")}
                >
                  <Text className="text-white text-xl">S</Text>
                </TouchableHighlight>
              </View>
              <View className="flex flex-row justify-around items-center w-screen  ">
                <Text className="text-white pt-4 text-2xl">
                  {" "}
                  Rutinas de {nombreCliente}
                </Text>
              </View>
              <View className="flex flex-row-reverse justify-between w-screen items-center ">
                <TouchableHighlight
                  className="bg-cyan-500 mt-4 rounded-2xl "
                  onPress={agregarEjercicio}
                >
                  <View className="flex flex-row justify-center items-center h-10 px-2">
                    <Image source={require("../../assets/Añadir.png")} />
                    <Text className="text-white">Ejercicio</Text>
                  </View>
                </TouchableHighlight>
                <Link
                  href="EvaluacionFisica"
                  onPress={eval}
                  className="w-6/12 text-center bg-cyan-500 mt-4 px-2 py-2 rounded-2xl"
                >
                  <Text className="text-white">Evaluación física</Text>
                </Link>
              </View>
            </View>
          ) : (
            <Text className="text-white">Cargando...</Text>
          )}
        </View>
        {mensaje ? (
          <View className="flex flex-row h-screen justify-center items-center px-4">
            <Text className="text-white mb-96 text-center">
              {mensaje}. No hay rutina
            </Text>
          </View>
        ) : (
          <View className="flex flex-col h-screen pt-6 ">
            <View className="flex flex-Row h-full w-full">
              <View className="flex flex-row py-4 bg-cyan-400 justify-between w-screen items-center">
                <Text className="w-6/12 pl-10 text-white">Ejercicio</Text>
                <Text className="w-3/12 pl-4 text-white">Series</Text>
                <Text className="w-3/12 pl-3 text-white">Reps</Text>
              </View>
              {rutinasFiltradas.map((rutina, index) => (
                <TouchableHighlight
                  key={index}
                  onLongPress={() => modificarRutina(rutina)}
                  className="bg-gray-700  text-white font-bold py-2 px-4 "
                >
                  <View className="w-full pt-1 ">
                    <View className="flex flex-row justify w-screen items-center">
                      <Text className="w-6/12 text-white">
                        {rutina.Ejercicio}
                      </Text>
                      <Text className="w-3/12 pl-4 text-white">
                        {rutina.Series}
                      </Text>
                      <Text className="w-3/12 pl-2 text-white">
                        {rutina.Repeticiones}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              ))}
              <Button
                title="Generar PDF"
                onPress={() => generarPDF(rutinasFiltradas)}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
