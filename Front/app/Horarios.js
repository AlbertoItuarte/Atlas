import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  ScrollView,
  Button,
} from "react-native";
import axios from "axios";
import Screen from "../components/Screen";
import AgregarHorario from "../components/AgregarHorario"; // Importar el componente AgregarHorario
import ModificarHorario from "../components/ModificarHorario"; // Importar el componente ModificarHorario

const Horarios = () => {
  const [horarios, setHorarios] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [dia, setDia] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false); // Estado para controlar la visibilidad de AgregarHorario
  const [isEditOpen, setIsEditOpen] = useState(false); // Estado para controlar la visibilidad de ModificarHorario
  const [selectedHorario, setSelectedHorario] = useState(null); // Estado para el horario seleccionado

  const handleDia = (dia) => {
    setDia(dia);
    obtenerHorarios(dia);
  };

  const obtenerHorarios = async (dia) => {
    try {
      const response = await axios.get("http://192.168.1.75:5000/horarios", {
        params: { dia: dia },
      });
      if (response.data.length > 0) {
        setHorarios(response.data);
        setMensaje(""); // Limpiar el mensaje si se encuentran horarios
        console.log("Horarios response: ", response.data);
      } else {
        setHorarios([]); // Limpiar los horarios si no se encuentran
        setMensaje("No se encontraron horarios para este día");
      }
    } catch (error) {
      console.error("Error fetching horarios:", error);
      setHorarios([]); // Limpiar los horarios en caso de error
      setMensaje("Error al obtener los horarios");
    }
  };

  useEffect(() => {
    obtenerHorarios("Lunes"); // Obtener horarios para el lunes por defecto
  }, []);

  const manejarCierre = () => {
    setIsAddOpen(false);
    setIsEditOpen(false);
    obtenerHorarios(dia); // Refrescar los horarios después de cerrar el modal
  };

  const modificarHorario = (horario) => {
    setSelectedHorario(horario);
    setIsEditOpen(true);
  };

  const horariosFiltrados = dia
    ? horarios.filter((horario) => horario.DiaSemana === dia)
    : horarios;

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
          <Button title="Agregar Horario" onPress={() => setIsAddOpen(true)} />
        </View>
        {mensaje ? (
          <View className="flex flex-row h-screen justify-center items-center px-4">
            <Text className="text-white mb-96 text-center">{mensaje}</Text>
          </View>
        ) : (
          <View className="flex flex-col h-screen pt-6 ">
            <View className="flex flex-Row h-full w-screen">
              <View className="flex flex-row py-4 bg-cyan-400 justify-between w-full items-center">
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
                        {horario.IdCliente}
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
