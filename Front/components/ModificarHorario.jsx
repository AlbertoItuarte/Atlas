import React, { useState } from "react";
import axios from "axios";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  Pressable,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

const ModificarHorario = ({ isOpen, onClose, horario }) => {
  const [idCliente, setIdCliente] = useState(horario.IdCliente);
  const [diaSemana, setDiaSemana] = useState(horario.DiaSemana);
  const [horaInicio, setHoraInicio] = useState(horario.HoraInicio);
  const [horaFin, setHoraFin] = useState(horario.HoraFin);

  const handleEdit = async () => {
    try {
      const response = await axios.put(
        `http://192.168.1.75:5000/horarios/editar`,
        {
          Id: horario.Id,
          IdCliente: idCliente,
          DiaSemana: diaSemana,
          HoraInicio: horaInicio,
          HoraFin: horaFin,
        }
      );
      console.log("Horario editado correctamente", response.data);
      manejarCierre();
    } catch (error) {
      console.error("Error al editar horario", error);
    }
  };

  const manejarCierre = () => {
    setIdCliente("");
    setDiaSemana("Lunes");
    setHoraInicio("");
    setHoraFin("");
    onClose();
  };

  return (
    <View
      style={{ paddingTop: 20 }}
      className={`flex justify-center space-y-6 h-screen items-center bg-black ${isOpen ? "-top-32  bottom-0 left-0 w-screen z-50" : "hidden"}`}
    >
      <View className="flex flex-row w-full justify-between items-center">
        <Text className="text-cyan-300 text-2xl">Modificar Horario</Text>
        <Pressable onPress={manejarCierre} className="">
          <Image source={require("../assets/Salir.png")} alt="Salir" />
        </Pressable>
      </View>
      <View className="flex space-y-4 w-full items-center pt-6">
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">ID Cliente: </Text>
          <TextInput
            placeholder="ID Cliente"
            value={idCliente}
            onChangeText={setIdCliente}
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
        onPress={handleEdit}
        className="bg-cyan-400 rounded-md px-6 py-4"
      >
        <Text className="text-white font-bold">Guardar</Text>
      </Pressable>
    </View>
  );
};

export default ModificarHorario;
