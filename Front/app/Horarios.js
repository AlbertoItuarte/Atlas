import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import axios from "axios";
import Screen from "../components/Screen";
import AgregarHorario from "../components/AgregarHorario"; // Importar el componente AgregarHorario
import ModificarHorario from "../components/ModificarHorario"; // Importar el componente ModificarHorario
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const Horarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [dia, setDia] = useState(""); // Inicialmente vacío para mostrar todos los horarios
  const [isAddOpen, setIsAddOpen] = useState(false); // Estado para controlar la visibilidad de AgregarHorario
  const [isEditOpen, setIsEditOpen] = useState(false); // Estado para controlar la visibilidad de ModificarHorario
  const [selectedHorario, setSelectedHorario] = useState(null); // Estado para el horario seleccionado
  const [idCoach, setIdCoach] = useState(null);

  useEffect(() => {
    obtenerCoachId();
  }, []);

  useEffect(() => {
    if (idCoach) {
      obtenerHorarios();
    }
  }, [idCoach]);

  const obtenerHorarios = async () => {
    try {
      console.log("ID Coach:", idCoach);

      const response = await axios.get("http://192.168.1.75:5000/horarios", {
        params: {
          idCoach,
        },
      });
      if (response.data.length > 0) {
        setHorarios(response.data);
        setMensaje(""); // Limpiar el mensaje si se encuentran horarios
        console.log("Horarios response: ", response.data);
      } else {
        setHorarios([]); // Limpiar los horarios si no se encuentran
        setMensaje("No se encontraron horarios");
      }
    } catch (error) {
      console.error("Error fetching horarios:", error);
      setHorarios([]); // Limpiar los horarios en caso de error
      setMensaje("Error al obtener los horarios");
    }
  };

  const obtenerCoachId = async () => {
    try {
      const value = await AsyncStorage.getItem("@login_data");
      if (value !== null) {
        setIdCoach(JSON.parse(value).id);
        console.log("ID Coach:", idCoach);
        obtenerHorarios();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const manejarCierre = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    obtenerHorarios();
  };

  const modificarHorario = (horario) => {
    setSelectedHorario(horario);
    setIsEditOpen(true);
    obtenerHorarios();
  };

  const horariosFiltrados = dia
    ? horarios.filter((horario) => horario.DiaSemana === dia)
    : horarios;

  const ensureDirExists = async (dir) => {
    const dirInfo = await FileSystem.getInfoAsync(dir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    }
  };

  const generarPDF = async () => {
    try {
      console.log("Generando PDF...");
      let htmlContent = `
        <h1>Lista de Horarios</h1>
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Día</th>
              <th>Cliente</th>
              <th>Hora Inicio</th>
              <th>Hora Fin</th>
            </tr>
          </thead>
          <tbody>
            ${horariosFiltrados
              .map(
                (horario) => `
              <tr>
                <td>${horario.DiaSemana}</td>
                <td>${horario.NombreCliente}</td>
                <td>${horario.HoraInicio}</td>
                <td>${horario.HoraFin}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      // console.log("PDF generado en:", uri);

      // Define la ruta personalizada
      const newUri = `${FileSystem.documentDirectory}horarios/lista_horarios.pdf`;

      // Asegúrate de que el directorio exista
      await ensureDirExists(`${FileSystem.documentDirectory}horarios`);

      // Mueve el archivo a la nueva ubicación
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      // console.log("PDF movido a:", newUri);
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
    <Screen pagina="Horarios">
      <ScrollView
        className={`h-screen ${isAddOpen || isEditOpen ? null : "hidden"}`}
      >
        {isAddOpen && (
          <AgregarHorario isOpen={isAddOpen} onClose={manejarCierre} />
        )}
        {isEditOpen && (
          <ModificarHorario
            isOpen={isEditOpen}
            onClose={manejarCierre}
            horario={selectedHorario}
          />
        )}
      </ScrollView>
      <ScrollView
        className={`h-screen ${isAddOpen || isEditOpen ? "hidden" : null}`}
        contentContainerStyle={{ alignItems: "center", width: "100%" }}
      >
        <Text className="text-[#41E4F0] text-2xl">Horarios</Text>
        <View className="flex flex-col mt-4 rounded justify-center items-center w-screen">
          <View className="flex flex-row justify-around rounded-3xl items-center w-screen bg-gray-700">
            <TouchableHighlight
              className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
              onPress={() => setDia("Lunes")}
            >
              <Text className="text-white text-xl">L</Text>
            </TouchableHighlight>
            <TouchableHighlight
              className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
              onPress={() => setDia("Martes")}
            >
              <Text className="text-white text-xl">M</Text>
            </TouchableHighlight>
            <TouchableHighlight
              className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
              onPress={() => setDia("Miércoles")}
            >
              <Text className="text-white text-xl">M</Text>
            </TouchableHighlight>
            <TouchableHighlight
              className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
              onPress={() => setDia("Jueves")}
            >
              <Text className="text-white text-xl">J</Text>
            </TouchableHighlight>
            <TouchableHighlight
              className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
              onPress={() => setDia("Viernes")}
            >
              <Text className="text-white text-xl">V</Text>
            </TouchableHighlight>
            <TouchableHighlight
              className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
              onPress={() => setDia("Sábado")}
            >
              <Text className="text-white text-xl">S</Text>
            </TouchableHighlight>
          </View>
          <Button title="Agregar Horario" onPress={() => setIsAddOpen(true)} />
          <Button title="Generar PDF" onPress={generarPDF} />
        </View>
        {mensaje ? (
          <View className="flex flex-row h-screen justify-center items-center px-4">
            <Text className="text-white mb-96 text-center">{mensaje}</Text>
          </View>
        ) : (
          <View className="flex flex-col h-screen pt-6 ">
            <View className="flex flex-Row h-full w-screen">
              <View className="flex flex-row py-4 bg-cyan-400 justify-between w-screen items-center">
                <Text className="w-3/12 pl-10 text-white">Día</Text>
                <Text className="w-3/12 pl-4 text-white">Cliente</Text>
                <Text className="w-3/12 pl-3 text-white">Hora Inicio</Text>
                <Text className="w-3/12 pl-3 text-white">Hora Fin</Text>
              </View>
              {horariosFiltrados.map((horario, index) => (
                <TouchableHighlight
                  key={index}
                  onLongPress={() => modificarHorario(horario)}
                  className="bg-gray-700 text-white font-bold py-2 px-4"
                >
                  <View className="w-full pt-1">
                    <View className="flex flex-row justify w-screen items-center">
                      <Text className="w-3/12 text-white">
                        {horario.DiaSemana}
                      </Text>
                      <Text className="w-3/12 pl-4 text-white">
                        {horario.NombreCliente}
                      </Text>
                      <Text className="w-3/12 pl-2 text-white">
                        {horario.HoraInicio}
                      </Text>
                      <Text className="w-3/12 pl-2 text-white">
                        {horario.HoraFin}
                      </Text>
                    </View>
                  </View>
                </TouchableHighlight>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </Screen>
  );
};

export default Horarios;
