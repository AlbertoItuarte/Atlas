// EditarEjercicio.js
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, TextInput, Image } from "react-native";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const EditarEjercicio = ({ isOpen, onClose, rutina }) => {
  const [ejercicio, setEjercicio] = useState("");
  const [series, setSeries] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [idEjercicio, setIdEjercicio] = useState("");
  const [dia, setDia] = useState("");
  const [idCliente, setIdCliente] = useState("");

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (rutina) {
      setEjercicio(rutina.Ejercicio);
      setSeries(rutina.Series);
      setRepeticiones(rutina.Repeticiones);
      setIdEjercicio(rutina.Id);
      setDia(rutina.Dia);
      setIdCliente(rutina.IdCliente);
    }
  }, [rutina]);

  const deleteEjercicio = async () => {
    try {
      console.log("ID del ejercicio a eliminar jsx:", idEjercicio);
      await axios.delete(`http://192.168.1.75:5000/rutinasclientes/eliminar`, {
        params: {
          IdEjercicio: idEjercicio,
        },
      });
      onClose();
    } catch (error) {
      console.error("Error al eliminar ejercicio:", error.message);
    }
  };

  const handleSave = async () => {
    console.log("ID del ejercicio jsx:", idEjercicio);
    console.log("ID del cliente jsx:", idCliente);
    console.log("Series jsx:", series);
    console.log("Repeticiones jsx:", repeticiones);
    console.log("Día jsx:", dia);

    try {
      const response = await axios.put(
        `http://192.168.1.75:5000/rutinasclientes/modificar`,
        {
          IdEjercicio: idEjercicio || "",
          IdCliente: idCliente || "",
          Series: parseInt(series) || 0,
          Repeticiones: parseInt(repeticiones) || 0,
          Dia: dia || "",
        }
      );

      onClose();
    } catch (error) {
      console.error("Error al guardar cambios:", error.message);
    }
  };

  return (
    <View
      style={{ paddingTop: insets.top + 20 }}
      className={`flex justify-center space-y-6 h-screen items-center bg-black ${isOpen ? "absolute -top-52 bottom-0 -left-44 h-screen w-screen z-50" : "hidden"}`}
    >
      <View className="flex flex-row space-x-32">
        <Text className="text-white text-2xl">Editar Ejercicio </Text>
        <Pressable onPress={onClose} className="">
          <Image source={require("../assets/Salir.png")} />
        </Pressable>
      </View>
      <Text className="text-white text-xl">{ejercicio}:</Text>
      <View className="flex flex-row items-center">
        <Text className="text-white w-3/12">Series: </Text>
        <TextInput
          onChangeText={setSeries}
          className="text-white rounded-md pl-2 bg-gray-500 w-8/12"
          value={series}
        />
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-white w-3/12">Repeticiones: </Text>
        <TextInput
          onChangeText={setRepeticiones}
          className="text-white rounded-md pl-2 bg-gray-500 w-8/12"
          value={repeticiones}
        />
      </View>
      <View className="flex flex-row items-center space-x-8">
        <Pressable
          onPress={deleteEjercicio}
          className="bg-red-500 rounded-md px-6 py-4"
        >
          <Text className="text-white">Guardar Cambios</Text>
        </Pressable>
        <Pressable
          onPress={handleSave}
          className="bg-blue-500 rounded-md px-6 py-4"
        >
          <Text className="text-white">Guardar Cambios</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default EditarEjercicio;
