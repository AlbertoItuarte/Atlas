import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ModificarEjercicioCoach = ({ isOpen, onClose, ejercicio }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [musculoSeleccionado, setMusculoSeleccionado] = useState("all");
  const [nombreEjercicio, setNombreEjercicio] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [musculosFiltrados, setMusculosFiltrados] = useState([]);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (ejercicio) {
      setCategoriaSeleccionada(ejercicio.IdCategoriaEjercicio);
      setMusculoSeleccionado(ejercicio.IdMusculoObjetivo);
      setNombreEjercicio(ejercicio.Ejercicio);
    }
  }, [ejercicio]);

  useEffect(() => {
    if (ejercicio) {
      const categoriasUnicas = Array.from(
        new Set([ejercicio].map((ej) => ej.Categoria))
      ).map((categoria) => {
        return {
          Id: [ejercicio].find((ej) => ej.Categoria === categoria)
            .IdCategoriaEjercicio,
          Categoria: categoria,
        };
      });
      setCategorias(categoriasUnicas);
    }
  }, [ejercicio]);

  useEffect(() => {
    if (ejercicio) {
      console.log("Categoría seleccionada:", categoriaSeleccionada);
      if (categoriaSeleccionada !== "all") {
        const musculosFiltrados = [ejercicio]
          .filter(
            (ej) => ej.IdCategoriaEjercicio === parseInt(categoriaSeleccionada)
          )
          .map((ej) => ({
            Id: ej.IdMusculoObjetivo,
            MusculoObjetivo: ej.MusculoObjetivo,
          }));
        setMusculosFiltrados(
          [...new Set(musculosFiltrados.map((m) => m.Id))].map((id) =>
            musculosFiltrados.find((m) => m.Id === id)
          )
        );
        setMusculoSeleccionado("all"); // Resetear el músculo seleccionado
      } else {
        setMusculoSeleccionado("all"); // Resetear el músculo seleccionado
        setMusculosFiltrados([]);
      }
    }
  }, [categoriaSeleccionada, ejercicio]);

  const handleDelete = async () => {
    try {
      console.log("Eliminando ejercicio:", ejercicio.Id);
      const response = await axios.delete(
        `http://192.168.1.75:5000/ejercicios/eliminar/`,
        {
          params: {
            id: ejercicio.Id,
          },
        }
      );
      if (response.status === 200) {
        console.log("Ejercicio eliminado:", response.data);
        manejarCierre();
      } else {
        console.error("Error al eliminar el ejercicio");
      }
    } catch (error) {
      console.error("Error al eliminar el ejercicio:", error);
    }
  };

  const modificarEjercicio = async () => {
    try {
      console.log("Modificando ejercicio:", nombreEjercicio);
      // console.log("Categoría seleccionada:", categoriaSeleccionada);
      // console.log("Músculo seleccionado:", musculoSeleccionado);
      console.log("Ejercicio ID:", ejercicio.Id);

      if (!nombreEjercicio) {
        console.error("Faltan datos");
        alert("Faltan datos");
        return;
      }

      const response = await axios.put(
        `http://192.168.1.75:5000/ejercicios/modificar/`,
        {
          Id: ejercicio.Id,
          Ejercicio: nombreEjercicio,
          // IdMusculoObjetivo: parseInt(musculoSeleccionado),
          // IdCategoriaEjercicio: parseInt(categoriaSeleccionada),
        }
      );
      if (response.status === 200) {
        console.log("Ejercicio modificado:", response.data);
        manejarCierre();
      } else {
        console.error("Error al modificar el ejercicio");
      }
    } catch (error) {
      console.error("Error al modificar el ejercicio:", error);
    }
  };

  const manejarCierre = () => {
    setNombreEjercicio("");
    setCategoriaSeleccionada("all");
    setMusculoSeleccionado("all");
    onClose();
  };

  const warning = () => {
    Alert.alert(
      "Confirmación",
      "Esta acción también eliminará el ejercicio de tus clientes. ¿Deseas continuar?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Eliminar",
          onPress: handleDelete,
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View
      style={{ paddingTop: insets.top + 20 }}
      className={`flex justify-center space-y-6 items-center bg-black ${isOpen ? " -top-36  h-screen   w-full z-50" : "hidden"}`}
    >
      <View className="flex flex-row w-full justify-between items-center">
        <Text className="text-cyan-300 text-2xl">
          Modificar Ejercicio Coach
        </Text>
        <Pressable onPress={manejarCierre} className="">
          <Image source={require("../assets/Salir.png")} alt="Salir" />
        </Pressable>
      </View>
      <View className="flex space-y-4 w-full items-center pt-6">
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Ejercicio: </Text>
          <TextInput
            className="w-6/12 border-2 border-white bg-white rounded-md"
            value={nombreEjercicio}
            onChangeText={setNombreEjercicio}
          />
        </View>
      </View>
      <Pressable
        onPress={modificarEjercicio}
        className="bg-cyan-400 rounded-md px-6 py-4"
      >
        <Text className="text-white font-bold">Modificar Ejercicio</Text>
      </Pressable>
      <Pressable
        onPress={warning}
        className="bg-red-400 rounded-md px-6 py-4 mt-4"
      >
        <Text className="text-white font-bold">Eliminar</Text>
      </Pressable>
    </View>
  );
};

export default ModificarEjercicioCoach;
