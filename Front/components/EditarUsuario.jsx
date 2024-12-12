// EditarUsuario.js
import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Image, TextInput } from "react-native";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Confirmacion from "./Confirmacion";

const EditarUsuario = ({ isOpen, onClose, cliente }) => {
  const [newCliente, setNewCliente] = useState({});
  const [id, setId] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoP, setApellidoP] = useState("");
  const [apellidoM, setApellidoM] = useState("");
  const [correo, setCorreo] = useState("");
  const [celular, setCelular] = useState("");
  const insets = useSafeAreaInsets();
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (cliente) {
      setNewCliente(cliente);
      setId(cliente.Id);
      setNombre(cliente.Nombre);
      setApellidoP(cliente.ApellidoP);
      setApellidoM(cliente.ApellidoM);
      setCorreo(cliente.Correo);
      setCelular(cliente.Celular);
      setFechaNac(cliente.FechaNac);
    }
  }, [cliente]);

  const manejarCierre = () => {
    onClose();
  };

  const abrirConfirmacion = () => {
    console.log("Abriendo confirmación...");
    setIsOpened(true);
  };

  const handleSave = async () => {
    // console.log(`Guardando cambios para usuario ${id} ${nombre}...`);
    try {
      console.log(
        "Enviando los datos al server: ",
        id,
        nombre,
        apellidoP,
        apellidoM,
        correo,
        celular,
        fechaNac
      );

      const response = await axios.put(
        `http://192.168.1.75:5000/clientes/editar`,
        {
          Id: id || "",
          Nombre: nombre || "",
          ApellidoP: apellidoP || "",
          ApellidoM: apellidoM || "",
          Correo: correo || "",
          Celular: celular || "",
          FechaNac: fechaNac || "",
        }
      );

      // console.log("Cambios guardados correctamente:", response.data);
      // Opcional: Recargar lista de clientes después de guardar
      onClose(); // Cierra el modal
    } catch (error) {
      console.error("Error al guardar cambios:", error.message);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://192.168.1.75:5000/clientes/eliminar",
        {
          params: { id },
        }
      );

      onClose(); // Cierra el modal o realiza alguna acción después de eliminar
    } catch (error) {
      console.error("Error al eliminar cliente:", error.message);
    }
  };

  return (
    <View
      style={{ paddingTop: insets.top + 20 }}
      className={`flex justify-center space-y-6 h-screen items-center bg-black ${isOpen ? "absolute -top-44 bottom-0 bg-black left-0 h-screen w-screen z-50" : "hidden"}`}
    >
      <Confirmacion
        isOpen={isOpened}
        onClose={() => setIsOpened(false)}
        eliminar={handleDelete}
      />
      <View className="flex flex-row  space-x-32">
        <Text className="text-white text-2xl">Editar Cliente</Text>
        <Pressable onPress={manejarCierre} className="">
          <Image source={require("../assets/Salir.png")} className="" />
        </Pressable>
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-white w-3/12">Nombre: </Text>
        <TextInput
          onChangeText={setNombre}
          className="text-white rounded-md pl-2 bg-gray-500 w-8/12"
          value={nombre}
        />
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-white w-3/12">Apellido Paterno: </Text>
        <TextInput
          onChangeText={setApellidoP}
          className="text-white rounded-md pl-2 bg-gray-500 w-8/12"
          value={apellidoP || ""}
        />
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-white w-3/12">Apellido Materno: </Text>
        <TextInput
          onChangeText={setApellidoM}
          className="text-white rounded-md pl-2 bg-gray-500 w-8/12"
          value={apellidoM || ""}
        />
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-white w-3/12">Correo: </Text>
        <TextInput
          onChangeText={setCorreo}
          className="text-white rounded-md pl-2 bg-gray-500 w-8/12"
          value={correo || ""}
        />
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-white w-3/12">Celular: </Text>
        <TextInput
          onChangeText={setCelular}
          className="text-white rounded-md pl-2 bg-gray-500 w-8/12"
          value={celular || ""}
        />
      </View>
      <View className="flex flex-row items-center">
        <Text className="text-white w-3/12">FechaNac: YYYY/MM/DD </Text>
        <TextInput
          onChangeText={setFechaNac}
          className="text-white rounded-md pl-2 bg-gray-500 w-8/12"
          value={
            fechaNac ? fechaNac.split("T")[0] : "Error al obtener la fecha"
          }
        />
      </View>
      <View className="flex flex-row items-center space-x-8">
        <Pressable
          onPress={abrirConfirmacion}
          className="bg-red-500 rounded-md px-6 py-4"
        >
          <Text className="text-white">Eliminar Cliente</Text>
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

export default EditarUsuario;
