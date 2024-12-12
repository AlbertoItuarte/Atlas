import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const AgregarEjercicio = ({ isOpen, onClose, coachId, id }) => {
  const [nombreEjercicio, setNombreEjercicio] = useState("");
  const [IdMusculoObjetivo, setIdMusculoObjetivo] = useState("");
  const [IdCategoriaEjercicio, setIdCategoriaEjercicio] = useState("");
  const [musculos, setMusculos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);

  const insets = useSafeAreaInsets();

  const handleAdd = async () => {
    console.log("IdUsuario:", id);
    console.log("Agregar ejercicio; nombreEjercicio:", nombreEjercicio);
    console.log("Agregar ejercicio; IdMusculoObjetivo:", IdMusculoObjetivo);
    console.log(
      "Agregar ejercicio; IdCategoriaEjercicio:",
      IdCategoriaEjercicio
    );
    try {
      if (
        nombreEjercicio === "" ||
        IdMusculoObjetivo === "" ||
        IdCategoriaEjercicio === "" ||
        coachId === ""
      ) {
        console.log("Faltan datos \n");
        alert("Rellena todos los datos");
        return;
      }
      const response = await axios.post(
        `http://192.168.1.75:5000/clientes/agregarejercicio`,
        {
          IdCliente: nombreEjercicio,
          IdMusculoObjetivo,
          IdCategoriaEjercicio,
        }
      );
      console.log("Ejercicio agregado correctamente", response.data);
      manejarCierre();
    } catch (error) {
      console.error("Error al agregar ejercicio", error);
    }
    getData();
  };

  const obtenerMusculos = async (id) => {
    console.log("IdCategoriaEjercicio para musculos jsx: ", id);
    try {
      const response = await axios.get(
        `http://192.168.1.75:5000/ejercicios/musculos`,
        {
          params: {
            IdCategoriaEjercicio: id,
          },
        }
      );
      setMusculos(response.data);
      setIdCategoriaEjercicio(id);
      console.log("Musculos jsx: ", response.data);
      //   console.log("Musculos response: ", musculos);
    } catch (error) {
      console.error("Error fetching ejercicios:", error);
    }
  };

  const obtenerEjercicios = async (idMusculo) => {
    console.log("IdCategoriaEjercicio jsx: ", IdCategoriaEjercicio);
    console.log("IdMusculoObjetivo jsx: ", idMusculo);
    try {
      const response = await axios.get(
        `http://192.168.1.75:5000/ejercicios/filtrados`,
        {
          params: {
            IdCategoriaEjercicio,
            IdMusculoObjetivo: idMusculo,
          },
        }
      );
      console.log("Ejercicios response jsx: ", response.data);
      setEjercicios(response.data);
    } catch (error) {
      console.error("Error fetching ejercicios:", error);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://192.168.1.75:5000/ejercicios/categorias`
      );
      //   console.log("Categorias response jsx: ", response.data);
      setCategorias(response.data);
    } catch (error) {
      console.error("Error fetching categorias:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        await getData();
      };
      fetchData();
    }
  }, [isOpen]);

  const manejarCierre = () => {
    setNombreEjercicio("");
    setIdMusculoObjetivo("");
    setIdCategoriaEjercicio("");
    onClose();
  };

  return (
    <View
      style={{ paddingTop: insets.top + 20 }}
      className={`flex justify-center space-y-6 h-screen items-center bg-black ${isOpen ? "absolute -top-32 h-full bottom-0 left-0 w-screen z-50" : "hidden"}`}
    >
      <View className="flex flex-row w-full justify-between items-center">
        <Text className="text-cyan-300 text-2xl">
          Agregar Ejercicio cliente
        </Text>
        <Pressable onPress={manejarCierre} className="">
          <Image source={require("../assets/Salir.png")} alt="Salir" />
        </Pressable>
      </View>
      <View className="flex space-y-4 w-full items-center pt-6">
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">
            Categoría Ejercicio:{" "}
          </Text>
          <Picker
            selectedValue={IdCategoriaEjercicio}
            style={{
              height: 55,
              width: 200,
              backgroundColor: "white",
              borderColor: "black",
            }}
            onValueChange={(itemValue) => {
              setIdCategoriaEjercicio(itemValue);
              obtenerMusculos(itemValue);
            }}
          >
            <Picker.Item label="Seleccione una categoría" value="" />
            {categorias && categorias.length > 0 ? (
              categorias.map((categoria) => (
                <Picker.Item
                  key={categoria.Id}
                  label={`${categoria.Categoria}`}
                  value={categoria.Id}
                />
              ))
            ) : (
              <Picker.Item label="no jala" value="7" />
            )}
          </Picker>
        </View>

        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">
            Músculo Objetivo:{" "}
          </Text>
          <Picker
            selectedValue={IdMusculoObjetivo}
            style={{
              height: 55,
              width: 200,
              backgroundColor: "white",
              borderColor: "black",
            }}
            onValueChange={(itemValue) => {
              setIdMusculoObjetivo(itemValue);
              obtenerEjercicios(itemValue);
            }}
          >
            <Picker.Item label="Seleccione un músculo" value="" />
            {musculos ? (
              musculos.map((musculo) => (
                <Picker.Item
                  key={musculo.Id}
                  label={`${musculo.MusculoObjetivo}`}
                  value={musculo.Id}
                />
              ))
            ) : (
              <Picker.Item label="no jala" value="7" />
            )}
          </Picker>
        </View>
      </View>
      <View className="flex flex-row items-center w-full">
        <Text className="text-cyan-300 text-xl w-4/12">Nombre Ejercicio: </Text>
        <Picker
          selectedValue={nombreEjercicio}
          style={{
            height: 55,
            width: 200,
            backgroundColor: "white",
            borderColor: "black",
          }}
          onValueChange={(itemValue) => {
            setNombreEjercicio(itemValue);
          }}
        >
          <Picker.Item label="Seleccione un ejercicio" value="" />
          {ejercicios && ejercicios.length > 0 ? (
            ejercicios.map((ejercicio) => (
              <Picker.Item
                key={ejercicio.Id}
                label={`${ejercicio.Ejercicio}`}
                value={ejercicio.Id}
              />
            ))
          ) : (
            <Picker.Item label="no jala" value="7" />
          )}
        </Picker>
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

export default AgregarEjercicio;
