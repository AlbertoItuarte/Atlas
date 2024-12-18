import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ImageBackground,
  Image,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "expo-router";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SignUp() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const handleSignUp = async () => {
    if (usuario.trim() === "" || password.trim() === "") {
      console.log("Faltan datos");
      alert("Faltan datos");
      return;
    }
    try {
      const response = await axios.post("http://192.168.1.75:5000/signup", {
        Usuario: usuario,
        Password: password,
      });
      setMensaje(response.data.mensaje);
      if (response.status === 200) {
        router.push("/LogIn");
        console.log("Usuario registrado correctamente");
      } else if (response.status === 401) {
        alert("Usuario ya registradoss");
      }

      alert("Usuario registrado correctamente");
    } catch (error) {
      alert("Usuario ya registrado");
      console.error("Error al registrar  usuario", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/gymBG.jpg")}
      style={{
        width: "100vh",
        height: "100vh",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View className="flex flex-col justify-center w-screen items-center h-screen bg">
        <Text className="text-3xl text-white pb-10">Registro</Text>

        <View className="flex flex-col ">
          <Text className="text-white text-xl">Usuario:</Text>
          <TextInput
            className="h-10 border border-gray-400 rounded w-72 p-2 mt-2 text-white"
            placeholder="Ingresa tu usuario"
            placeholderTextColor="#aaa"
            onChangeText={setUsuario}
          />
          <Text className="text-white text-xl pt-4">Contraseña:</Text>
          <TextInput
            className="h-10 border border-gray-400 rounded w-72 p-2 mt-2 text-white"
            placeholder="Ingresa tu contraseña"
            placeholderTextColor="#aaa"
            secureTextEntry
            onChangeText={setPassword}
          />
        </View>
        <View className="flex flex-row pt-10 justify-center items-center space-x-7">
          <TouchableHighlight
            onPress={() => router.push("/LogIn")}
            className="p-2 mt-2 rounded w-36 bg-red-500"
          >
            <Text className="text-white text-center">Cancelar</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={handleSignUp}
            className="p-2 mt-2 rounded w-36 bg-blue-400"
          >
            <Text className="text-white text-center">Registrarse</Text>
          </TouchableHighlight>
        </View>
      </View>
    </ImageBackground>
  );
}
