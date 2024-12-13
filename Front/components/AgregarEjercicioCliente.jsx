import React, { useEffect, useState } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AgregarEjercicioCliente = ({ isOpen, onClose, coachId, id }) => {
  const [nombreEjercicio, setNombreEjercicio] = useState("");
  const [IdMusculoObjetivo, setIdMusculoObjetivo] = useState("");
  const [IdCategoriaEjercicio, setIdCategoriaEjercicio] = useState("");
  const [musculos, setMusculos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [series, setSeries] = useState("");
  const [repeticiones, setRepeticiones] = useState("");
  const [dia, setDia] = useState("");

  const insets = useSafeAreaInsets();

  const handleAdd = async () => {
    console.log("IdUsuario:", id);
    console.log("IdEjercicio:", nombreEjercicio);
    console.log("Series:", series);
    console.log("Repeticiones:", repeticiones);
    console.log("Dia:", dia);
    try {
      if (nombreEjercicio === "" || series === "" || repeticiones === "") {
        console.log("Faltan datos \n");
        alert("Rellena todos los datos");
        return;
      }
      const response = await axios.post(
        `http://192.168.1.75:5000/clientes/agregarejercicio`,
        {
          IdCliente: id,
          IdEjercicio: nombreEjercicio,
          Series: series,
          Repeticiones: repeticiones,
          Dia: dia,
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
      const loginData = await AsyncStorage.getItem("@login_data");
      if (loginData !== null) {
        console.log("Login Data:", loginData);
        const { id } = JSON.parse(loginData);
        console.log("Coach id agregar horario:", id);

        const response = await axios.get(
          `http://192.168.1.75:5000/ejercicios/filtrados`,
          {
            params: {
              IdCategoriaEjercicio,
              IdMusculoObjetivo: idMusculo,
              IdCoach: id,
            },
          }
        );
        console.log("Ejercicios response jsx: ", response.data);
        setEjercicios(response.data);
      }
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
    setSeries("");
    setRepeticiones("");
    setDia("");
    onClose();
  };

  return (
    <View
      style={{ paddingTop: insets.top + 20 }}
      className={`flex justify-center space-y-6 items-center bg-black ${isOpen ? "absolute -top-80 h-full bottom-0 -left-40 w-full z-50" : "hidden"}`}
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
          <Text className="text-cyan-300 text-xl w-4/12">Series: </Text>
          <TextInput
            value={series}
            onChangeText={setSeries}
            className="text-black rounded-md pl-2 bg-gray-300 w-8/12"
          />
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Reps: </Text>
          <TextInput
            value={repeticiones}
            onChangeText={setRepeticiones}
            className="text-black rounded-md pl-2 bg-gray-300 w-8/12"
          />
        </View>
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
              <Picker.Item label="" value="7" />
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
            <Picker.Item label="Aún no has agregado ejercicios" value="7" />
          )}
        </Picker>
      </View>
      <View className="flex flex-row items-center w-full">
        <Text className="text-cyan-300 text-xl w-4/12">Día: </Text>
        <Picker
          selectedValue={dia}
          style={{
            height: 55,
            width: 200,
            backgroundColor: "white",
            borderColor: "black",
          }}
          onValueChange={(itemValue) => {
            setDia(itemValue);
          }}
        >
          <Picker.Item label="Seleccione un día" value="" />
          <Picker.Item label="Lunes" value="Lunes" />
          <Picker.Item label="Martes" value="Martes" />
          <Picker.Item label="Miércoles" value="Miércoles" />
          <Picker.Item label="Jueves" value="Jueves" />
          <Picker.Item label="Viernes" value="Viernes" />
          <Picker.Item label="Sábado" value="Sábado" />
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

export default AgregarEjercicioCliente;
