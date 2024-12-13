import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, TextInput, Alert, Pressable, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AgregarHorario = ({ isOpen, onClose }) => {
  const [clientes, setClientes] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");
  const [diaSemana, setDiaSemana] = useState("Lunes");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFin, setHoraFin] = useState("");
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (isOpen) {
      obtenerIdCoach();
    }
  }, [isOpen]);

  const obtenerIdCoach = async () => {
    try {
      const loginData = await AsyncStorage.getItem("@login_data");
      if (loginData !== null) {
        console.log("Login Data:", loginData);
        const { id } = JSON.parse(loginData);
        console.log("Coach id:", id);
        obtenerClientes();
      }
    } catch (error) {
      console.error("Error fetching coach id:", error);
    }
  };

  const obtenerClientes = async () => {
    try {
      const loginData = await AsyncStorage.getItem("@login_data");
      if (loginData !== null) {
        console.log("Login Data:", loginData);
        const { id } = JSON.parse(loginData);
        console.log("Coach id:", id);
        const response = await axios.get("http://192.168.1.75:5000/clientes", {
          params: { id: id },
        });
        setClientes(response.data);
      }
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  };

  const handleAdd = async () => {
    try {
      if (
        nombreCliente.trim() === "" ||
        diaSemana.trim() === "" ||
        horaInicio.trim() === "" ||
        horaFin.trim() === ""
      ) {
        console.log("Faltan datos");
        Alert.alert("Faltan datos");
        return;
      }

      const clienteSeleccionado = clientes.find(
        (cliente) => cliente.Nombre === nombreCliente
      );

      if (!clienteSeleccionado) {
        console.log("Cliente no encontrado");
        Alert.alert("Cliente no encontrado");
        return;
      }

      const loginData = await AsyncStorage.getItem("@login_data");
      if (loginData !== null) {
        console.log("Login Data:", loginData);
        const { id } = JSON.parse(loginData);
        console.log("Coach id agregar horario:", id);
        const response = await axios.post(
          `http://192.168.1.75:5000/horarios/agregar`,
          {
            IdCliente: clienteSeleccionado.Id,
            DiaSemana: diaSemana,
            HoraInicio: horaInicio,
            HoraFin: horaFin,
            IdCoach: id,
          }
        );
        console.log("Horario agregado correctamente", response.data);
        manejarCierre();
      }
    } catch (error) {
      console.error("Error al agregar horario", error);
    }
  };

  const manejarCierre = () => {
    setNombreCliente("");
    setDiaSemana("Lunes");
    setHoraInicio("");
    setHoraFin("");
    onClose();
  };

  return (
    <View
      style={{ paddingTop: insets.top + 20 }}
      className={`flex justify-center space-y-6 h-screen items-center bg-black ${isOpen ? "-top-32  bottom-0 left-0 w-screen z-50" : "hidden"}`}
    >
      <View className="flex flex-row w-full justify-between items-center">
        <Text className="text-cyan-300 text-2xl">Agregar Horario</Text>
        <Pressable onPress={manejarCierre} className="">
          <Image source={require("../assets/Salir.png")} alt="Salir" />
        </Pressable>
      </View>
      <View className="flex space-y-4 w-full items-center pt-6">
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Nombre Cliente: </Text>
          <Picker
            selectedValue={nombreCliente}
            onValueChange={(itemValue) => setNombreCliente(itemValue)}
            style={{
              height: 55,
              width: 200,
              backgroundColor: "white",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Picker.Item label="Seleccione un cliente" value="" />
            {clientes.map((cliente) => (
              <Picker.Item
                key={cliente.Id}
                label={cliente.Nombre}
                value={cliente.Nombre}
              />
            ))}
          </Picker>
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">
            Día de la Semana:{" "}
          </Text>
          <Picker
            selectedValue={diaSemana}
            onValueChange={(itemValue) => setDiaSemana(itemValue)}
            style={{
              height: 55,
              width: 200,
              backgroundColor: "white",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Picker.Item label="Lunes" value="Lunes" />
            <Picker.Item label="Martes" value="Martes" />
            <Picker.Item label="Miércoles" value="Miércoles" />
            <Picker.Item label="Jueves" value="Jueves" />
            <Picker.Item label="Viernes" value="Viernes" />
            <Picker.Item label="Sábado" value="Sábado" />
          </Picker>
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Hora de Inicio: </Text>
          <TextInput
            placeholder="Hora de Inicio"
            value={horaInicio}
            onChangeText={setHoraInicio}
            className="bg-white"
            style={{
              height: 55,
              width: 200,
              backgroundColor: "white",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5,
            }}
          />
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Hora de Fin: </Text>
          <TextInput
            placeholder="Hora de Fin"
            value={horaFin}
            onChangeText={setHoraFin}
            className="bg-white"
            style={{
              height: 55,
              width: 200,
              backgroundColor: "white",
              borderColor: "black",
              borderWidth: 1,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
      <Pressable
        onPress={handleAdd}
        className="bg-cyan-400 rounded-md px-6 py-4"
      >
        <Text className="text-white font-bold">Agregar Horario</Text>
      </Pressable>
    </View>
  );
};

export default AgregarHorario;
