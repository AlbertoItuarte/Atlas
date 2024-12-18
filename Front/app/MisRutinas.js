import {
  View,
  Text,
  TouchableHighlight,
  Image,
  Button,
  ScrollView,
} from "react-native";
import { Link } from "expo-router";
import Screen from "../components/Screen";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import AgregarMisRutinas from "../components/AgregarMisRutinas"; // Importar el componente
import ModificarMisRutinas from "../components/ModificarMisRutinas"; // Importar el componente para modificar

export default MisRutinas = () => {
  const [idCoach, setIdCoach] = useState("");
  const [rutinas, setRutinas] = useState([]);
  const [rutinasFiltradas, setRutinasFiltradas] = useState([]);
  const [isAgregarMisRutinasOpen, setIsAgregarMisRutinasOpen] = useState(false); // Estado para controlar la visibilidad
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedRutina, setSelectedRutina] = useState(null);
  const [coach, setCoach] = useState("");

  const obtenerRutinas = async () => {
    if (!idCoach) return; // Asegurarse de que idCoach esté definido
    try {
      console.log("ID del coach en obtener rutinas:", idCoach);
      const response = await axios.get("http://192.168.1.75:5000/misrutinas", {
        params: {
          id: idCoach,
        },
      });
      setRutinas(response.data);
      setRutinasFiltradas(response.data); // Inicialmente mostrar todas las rutinas
      console.log("Rutinas del coach:", response.data);
    } catch (error) {
      console.error("Error al obtener rutinas", error);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@login_data");
      if (value !== null) {
        const data = JSON.parse(value);
        setIdCoach(data.id);
        setCoach(data.usuario);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDia = (dia) => {
    console.log("Día seleccionado:", dia);
    const rutinasFiltradas = rutinas.filter((rutina) => rutina.Dia === dia);
    setRutinasFiltradas(rutinasFiltradas);
    console.log("Rutinas filtradas:", rutinasFiltradas);
  };

  const modificarRutina = (rutina) => {
    console.log("Modificar rutina:", rutina);
    setSelectedRutina(rutina);
    setIsEditOpen(true);
  };

  const agregarEjercicio = () => {
    setIsAgregarMisRutinasOpen(true); // Mostrar el componente AgregarMisRutinas
  };

  const manejarCierre = () => {
    setIsAgregarMisRutinasOpen(false);
    setIsEditOpen(false);
    obtenerRutinas();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (idCoach) {
      obtenerRutinas();
    }
  }, [idCoach]);

  return (
    <Screen pagina={"Mis Rutinas"}>
      <ScrollView className="">
        <View className="flex flex-col justify-center items-center px-4">
          <Image source={require("../assets/Rutinas.png")} />
          <View
            className={`bg-black h-screen -mt-56  w-screen ${isEditOpen || isAgregarMisRutinasOpen ? "block" : "hidden"}`}
          >
            <ModificarMisRutinas
              isOpen={isEditOpen}
              onClose={manejarCierre}
              rutina={selectedRutina}
            />
            <AgregarMisRutinas
              isOpen={isAgregarMisRutinasOpen}
              onClose={manejarCierre}
              coachId={idCoach}
            />
          </View>
          {idCoach ? (
            <View className="flex flex-col mt-4 rounded justify-center items-center w-screen">
              <View className="flex flex-row justify-around rounded-3xl items-center w-screen bg-gray-700">
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
                  className="bg-black h-10 w-10 rounded-full flex justify-center items-center"
                  onPress={() => handleDia("Sábado")}
                >
                  <Text className="text-white text-xl">S</Text>
                </TouchableHighlight>
              </View>
              <View className="flex flex-row justify-around items-center w-screen">
                <Text className="text-white pt-4 text-2xl">
                  Rutinas de {coach}
                </Text>
              </View>
              <View className="flex flex-row-reverse justify-between w-screen items-center">
                <TouchableHighlight
                  className="bg-cyan-500 mt-4 rounded-2xl"
                  onPress={agregarEjercicio}
                >
                  <View className="flex flex-row justify-center items-center h-10 px-2">
                    <Image source={require("../assets/Añadir.png")} />
                    <Text className="text-white">Ejercicio</Text>
                  </View>
                </TouchableHighlight>
              </View>
              <View className="flex flex-col w-screen h-screen pt-6">
                <View className="flex flex-row py-4 bg-cyan-400 justify-between w-screen items-center">
                  <Text className="w-6/12 pl-10 text-white">Ejercicio</Text>
                  <Text className="w-3/12 pl-4 text-white">Series</Text>
                  <Text className="w-3/12 pl-3 text-white">Reps</Text>
                </View>
                {rutinasFiltradas.map((rutina, index) => (
                  <TouchableHighlight
                    key={index}
                    onLongPress={() => modificarRutina(rutina)}
                    className="bg-gray-700 text-white font-bold py-2 px-4"
                  >
                    <View className="w-full pt-1">
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
          ) : (
            <Text className="text-white">Cargando...</Text>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};
