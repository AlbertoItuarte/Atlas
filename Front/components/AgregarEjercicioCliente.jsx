import React, { useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AgregarEjercicioCliente = ({ isOpen, onClose, coachId }) => {
  const [nombreEjercicio, setNombreEjercicio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [duracion, setDuracion] = useState("");
  const insets = useSafeAreaInsets();

  const handleAdd = async () => {
    try {
      if (
        nombreEjercicio.trim() === "" ||
        descripcion.trim() === "" ||
        duracion.trim() === ""
      ) {
        console.log("Faltan datos");
        alert("Faltan datos");
        return;
      }
      const response = await axios.post(
        `http://192.168.1.75:5000/ejercicios/agregar`,
        {
          IdCoach: coachId,
          NombreEjercicio: nombreEjercicio,
          Descripcion: descripcion,
          Duracion: duracion,
        }
      );
      console.log("Ejercicio agregado correctamente", response.data);
      manejarCierre();
    } catch (error) {
      console.error("Error al agregar ejercicio", error);
    }
  };

  const manejarCierre = () => {
    setNombreEjercicio("");
    setDescripcion("");
    setDuracion("");
    onClose();
  };

  return (
    <View
      style={{ paddingTop: insets.top + 20 }}
      className={`flex justify-center space-y-6 h-screen items-center bg-black ${isOpen ? "absolute -top-32 h-full bottom-0 left-0 w-screen z-50" : "hidden"}`}
    >
      <View className="flex flex-row w-full justify-between space-x-32 items-center">
        <Text className="text-cyan-300 text-2xl">Agregar Ejercicio</Text>
        <Pressable onPress={manejarCierre} className="">
          <Image source={require("../assets/Salir.png")} className="" />
        </Pressable>
      </View>
      <View className="flex space-y-4 w-full items-center pt-6">
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Nombre: </Text>
          <TextInput
            onChangeText={setNombreEjercicio}
            className="text-black rounded-md pl-2 bg-gray-300 w-8/12"
            defaultValue={nombreEjercicio}
          />
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Descripción: </Text>
          <TextInput
            onChangeText={setDescripcion}
            className="text-black rounded-md pl-2 bg-gray-300 w-8/12"
            defaultValue={descripcion}
          />
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Duración: </Text>
          <TextInput
            onChangeText={setDuracion}
            className="text-black rounded-md pl-2 bg-gray-300 w-8/12"
            defaultValue={duracion}
          />
        </View>
      </View>
      <Pressable
        onPress={handleAdd}
        className="bg-cyan-400 rounded-md px-6 py-4"
      >
        <Text className="text-white font-bold">Agregar Ejercicio</Text>
      </Pressable>
    </View>
  );
};

export default AgregarEjercicioCliente;