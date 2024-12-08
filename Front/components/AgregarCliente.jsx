// EditarUsuario.js
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import axios from "axios";

const EditarUsuario = ({ isOpen, onClose, coachId }) => {
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const [fechaNac, setFechaNac] = useState("");

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        `http://192.168.1.75:5000/clientes/agregar`,
        {
          IdCoach: coachId,
          Nombre: nombre,
          ApellidoP: apellidoP,
          ApellidoM: apellidoM,
          Correo: correo,
          Celular: celular,
          FechaNac: fechaNac,
        }
      );
      console.log("Cliente agregado correctamente", response.data);
      manejarCierre();
    } catch (error) {
      console.error("Error al agregar cliente", error);
    }
  };

  const manejarCierre = () => {
    setApellidoM("");
    setApellidoP("");
    setCelular("");
    setCorreo("");
    setFechaNac("");
    setNombre("");
    onClose();
  };

  return (
    <View
      className={`flex justify-center space-y-6 items-center bg-black ${isOpen ? "absolute -top-36 bottom-0 left-0 w-screen z-50" : "hidden"}`}
    >
      <View className="flex flex-row w-full justify-between space-x-32 items-center">
        <Text className="text-cyan-300 text-2xl">Agregar Cliente</Text>
        <Pressable onPress={manejarCierre} className="">
          <Image source={require("../assets/Salir.png")} className="" />
        </Pressable>
      </View>
      <View className="flex space-y-4 w-full items-center pt-6">
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Nombre: </Text>
          <TextInput
            onChangeText={setNombre}
            className=" text-black rounded-md pl-2 bg-gray-300 w-8/12"
            defaultValue={nombre}
          />
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">ApellidoP: </Text>
          <TextInput
            onChangeText={setApellidoP}
            className=" text-black rounded-md pl-2 bg-gray-300 w-8/12"
            defaultValue={apellidoP}
          />
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">ApellidoM: </Text>
          <TextInput
            onChangeText={setApellidoM}
            className=" text-black rounded-md pl-2 bg-gray-300 w-8/12"
            defaultValue={apellidoM}
          />
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Correo: </Text>
          <TextInput
            onChangeText={setCorreo}
            className=" text-black rounded-md pl-2 bg-gray-300 w-8/12"
            defaultValue={correo}
          />
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">Celular: </Text>
          <TextInput
            onChangeText={setCelular}
            className=" text-black rounded-md pl-2 bg-gray-300 w-8/12"
            defaultValue={celular}
          />
        </View>
        <View className="flex flex-row items-center w-full">
          <Text className="text-cyan-300 text-xl w-4/12">
            FechaNac: YY/MM/DD
          </Text>
          <TextInput
            onChangeText={setFechaNac}
            className=" text-black rounded-md pl-2 bg-gray-300 w-8/12"
            defaultValue={fechaNac}
          />
        </View>
      </View>
      <Pressable
        onPress={handleAdd}
        className="bg-cyan-400   rounded-md px-6 py-4"
      >
        <Text className="text-white 3+ font-bold">Agregar Cliente</Text>
      </Pressable>
    </View>
  );
};

export default EditarUsuario;
