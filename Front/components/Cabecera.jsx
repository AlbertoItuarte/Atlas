import React, { useState } from "react";
import { View, Pressable, Text, Image } from "react-native";
import { Link } from "expo-router"; // Asegúrate de usar expo-router
import Menu from "./Menu"; // Ajusta la ruta según tu estructura de carpetas
import { ArrowLeft } from "../components/Icons"; // Ajusta la ruta según tu estructura de carpetas
import AsyncStorage from "@react-native-async-storage/async-storage";
import proptype from "prop-types";

const Cabecera = ({ pagina }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogOut = async () => {
    try {
      await AsyncStorage.removeItem("@login_data");
    } catch (e) {
      console.error(e);
    }
    console.log("Data: ", await AsyncStorage.getItem("@login_data"));
  };

  return (
    <View className="flex absolute w-screen">
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
        <Link className="self-center" href="/Clientes">
          <Text className="text-[#41E4F0] text-2xl">Clientes</Text>
        </Link>
        <Link className="self-center" href="/Horarios">
          <Text className="text-[#41E4F0] text-2xl">Horario</Text>
        </Link>
        <Link className="self-center" href="/MisRutinas">
          <Text className="text-[#41E4F0] text-2xl">Rutinas</Text>
        </Link>
        <Link className="self-center" href="/Ejercicios">
          <Text className="text-[#41E4F0] text-2xl">Ejercicios</Text>
        </Link>
        <Link className="self-center" href="/Planes">
          <Text className="text-[#41E4F0] text-2xl">Planes</Text>
        </Link>
        <Link className="self-center" href="/Pagos">
          <Text className="text-[#41E4F0] text-2xl">Pagos</Text>
        </Link>
        <Link className="self-center" href="/Contratos">
          <Text className="text-[#41E4F0] text-2xl">Contratos</Text>
        </Link>
        <Link asChild href="/" className="self-end">
          <Pressable className="self-end" onPress={handleLogOut}>
            <Image
              source={require("../assets/Logout.png")}
              className="w-12 h-12"
            />
          </Pressable>
        </Link>
      </Menu>

      <View className="flex flex-row justify-between items-center bg-black h-14 px-4">
        <Pressable onPress={() => setIsMenuOpen(true)}>
          <Image source={require("../assets/Menu.png")} className="w-12 h-12" />
        </Pressable>
        <Text className="text-[#41E4F0] text-2xl">{pagina}</Text>
        <Link href="/HomeScreen">
          <Image source={require("../assets/Logo.png")} className="w-12 h-12" />
        </Link>
      </View>
    </View>
  );
};

Cabecera.propTypes = {
  pagina: proptype.string,
};

export default Cabecera;
