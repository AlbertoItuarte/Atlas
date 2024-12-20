import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AgregarEjercicioCoach = ({ isOpen, onClose, ejercicios, coachId }) => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [musculoSeleccionado, setMusculoSeleccionado] = useState("all");
  const [nombreEjercicio, setNombreEjercicio] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [musculosFiltrados, setMusculosFiltrados] = useState([]);
  const [ejerciciosFiltrados, setEjerciciosFiltrados] = useState([]);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    const categoriasUnicas = Array.from(
      new Set(ejercicios.map((ejercicio) => ejercicio.Categoria))
    ).map((categoria) => {
      return {
        Id: ejercicios.find((ejercicio) => ejercicio.Categoria === categoria)
          .IdCategoriaEjercicio,
        Categoria: categoria,
      };
    });
    setCategorias(categoriasUnicas);
  }, [ejercicios]);

  useEffect(() => {
    console.log("Categoría seleccionada:", categoriaSeleccionada);
    if (categoriaSeleccionada !== "all") {
      const musculosFiltrados = ejercicios
        .filter(
          (ejercicio) =>
            ejercicio.IdCategoriaEjercicio === parseInt(categoriaSeleccionada)
        )
        .map((ejercicio) => ({
          Id: ejercicio.IdMusculoObjetivo,
          MusculoObjetivo: ejercicio.MusculoObjetivo,
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
  }, [categoriaSeleccionada, ejercicios]);

  useEffect(() => {
    if (musculoSeleccionado !== "all") {
      const filtrados = ejercicios.filter(
        (ejercicio) =>
          ejercicio.IdMusculoObjetivo === parseInt(musculoSeleccionado)
      );
      setEjerciciosFiltrados(filtrados);
    } else {
      setEjerciciosFiltrados([]);
    }
  }, [musculoSeleccionado, ejercicios]);

  const agregarEjercicio = async () => {
    try {
      console.log("Agregando ejercicio:", nombreEjercicio);
      console.log("Categoría seleccionada:", categoriaSeleccionada);
      console.log("Músculo seleccionado:", musculoSeleccionado);
      console.log("Coach ID:", coachId);

      if (
        !nombreEjercicio ||
        categoriaSeleccionada === "all" ||
        musculoSeleccionado === "all"
      ) {
        console.error("Faltan datos");
        alert("Faltan datos");
        return;
      }

      const response = await axios.post(
        "http://192.168.1.75:5000/ejercicios/agregar",
        {
          Ejercicio: nombreEjercicio,
          IdCategoriaEjercicio: parseInt(categoriaSeleccionada),
          IdMusculoObjetivo: parseInt(musculoSeleccionado),
          IdCoach: coachId,
        }
      );
      if (response.status === 201) {
        console.log("Ejercicio agregado:", response.data);
        onClose();
      } else {
        console.error("Error al agregar el ejercicio");
      }
    } catch (error) {
      console.error("Error al agregar el ejercicio:", error);
    }
  };

  const manejarCierre = () => {
    setNombreEjercicio("");
    setCategoriaSeleccionada("all");
    setMusculoSeleccionado("all");
    onClose();
  };

  return (
    <View
      style={{ paddingTop: insets.top + 20 }}
      className={`flex justify-center space-y-6 items-center bg-black ${isOpen ? " -top-36 h-screen   w-full z-50" : "hidden"}`}
    >
      <View className="flex flex-row w-full justify-between items-center">
        <Text className="text-cyan-300 text-2xl">Agregar Ejercicio Coach</Text>
        <Pressable onPress={manejarCierre} className="">
          <Image source={require("../assets/Salir.png")} alt="Salir" />
        </Pressable>
      </View>
      <View className="flex space-y-4 w-full items-center pt-6">
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Categoría: </Text>
          <Picker
            selectedValue={categoriaSeleccionada}
            style={{
              height: 55,
              width: 200,
              backgroundColor: "white",
              borderColor: "black",
            }}
            onValueChange={(itemValue) => {
              console.log("Categoría seleccionada:", itemValue);
              setCategoriaSeleccionada(itemValue);
            }}
          >
            <Picker.Item label="Todas las Categorías" value="all" />
            {categorias.map((categoria, index) => (
              <Picker.Item
                key={index}
                label={categoria.Categoria}
                value={categoria.Id}
              />
            ))}
          </Picker>
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Músculo: </Text>
          <Picker
            selectedValue={musculoSeleccionado}
            style={{
              height: 55,
              width: 200,
              backgroundColor: "white",
              borderColor: "black",
            }}
            onValueChange={(itemValue) => {
              console.log("Músculo seleccionado:", itemValue);
              setMusculoSeleccionado(itemValue);
            }}
          >
            <Picker.Item label="Todos los Músculos" value="all" />
            {musculosFiltrados.map((musculo, index) => (
              <Picker.Item
                key={index}
                label={musculo.MusculoObjetivo}
                value={musculo.Id}
              />
            ))}
          </Picker>
        </View>
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
        onPress={agregarEjercicio}
        className="bg-cyan-400 rounded-md px-6 py-4"
      >
        <Text className="text-white font-bold">Agregar Ejercicio</Text>
      </Pressable>
      <Pressable
        onPress={manejarCierre}
        className="bg-red-400 rounded-md px-6 py-4 mt-4"
      >
        <Text className="text-white font-bold">Cerrar</Text>
      </Pressable>
    </View>
  );
};

export default AgregarEjercicioCoach;
