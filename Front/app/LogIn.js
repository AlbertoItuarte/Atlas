import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogIn() {
  const insets = useSafeAreaInsets();
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@login_data", JSON.stringify(value));
    } catch (e) {
      console.error(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@login_data");
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogIn = async () => {
    try {
      const response = await axios.post("http://192.168.1.75:5000/login", {
        usuario,
        password,
      });
      setMensaje(response.data.mensaje);

      if (response.status === 200) {
        const userData = {
          id: response.data.id,
          usuario: response.data.usuario,
          password: password,
        };
        storeData(userData);
        console.log("ID de usuario handleLoing: ", response.data.id);
        router.replace("/HomeScreen");
      } else if (response.status === 401) {
        alert("Contraseña incorrecta");
      }
    } catch (error) {
      console.error("Error completo:", error);
      setMensaje(error.response?.data?.mensaje || "Error desconocido");
      alert(error.response?.data?.mensaje || "Error desconocido");
    }
  };

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setUsuario(data.usuario);
        setPassword(data.password);
        setUserId(data.id);
        console.log("ID de usuario: ", data.id);
        router.replace("/HomeScreen");
      }
    });
  }, []);

  return (
    <ImageBackground
      source={require("../assets/gymBG.jpg")}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <View
        className="flex-1 justify-center items-center w-full"
        style={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundImage: "url('../assets/gymBG.jpg')",
        }}
      >
        <Text className="text-white text-2xl pb-6">Bienvenido a Atlas</Text>
        <TextInput
          className="h-10 border border-gray-400 rounded w-72 p-2 mt-2 text-white"
          placeholder="usuario"
          placeholderTextColor="#aaa"
          onChangeText={setUsuario}
        />
        <TextInput
          className="h-10 border border-gray-400 rounded w-72 p-2 mt-2 text-white"
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableHighlight
          onPress={handleLogIn}
          className="p-2 mt-2 rounded w-36 bg-blue-400"
        >
          <Text className="text-white text-center">Inicia sesión</Text>
        </TouchableHighlight>
        <TouchableHighlight
          className="p-2 mt-2 rounded w-36 bg-purple-600"
          onPress={() => alert("Registro")}
        >
          <Text className="text-white text-center">Regístrate</Text>
        </TouchableHighlight>
      </View>
    </ImageBackground>
  );
}
