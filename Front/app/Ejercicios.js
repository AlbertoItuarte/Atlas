import { ScrollView, Text, View, TouchableHighlight } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Screen from "../components/Screen";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AgregarEjercicioCoach from "../components/AgregarEjercicioCoach";

export default function Ejercicios() {
  const [ejercicios, setEjercicios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [musculos, setMusculos] = useState([]);
  const [coachId, setCoachId] = useState(null);
  const [nombreCoach, setNombreCoach] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [musculoSeleccionado, setMusculoSeleccionado] = useState("all");
  const [isOpen, setIsOpen] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@login_data");
      if (value !== null) {
        console.log("Datos del coach:", JSON.parse(value));
        setCoachId(JSON.parse(value).id);
        setNombreCoach(JSON.parse(value).usuario);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (coachId) {
      fetchEjercicios(coachId);
    }
  }, [coachId]);

  const fetchEjercicios = async (coachId) => {
    console.log("Obteniendo ejercicios para el coach con id:", coachId);
    try {
      const response = await axios.get("http://192.168.1.75:5000/ejercicios", {
        params: {
          id: coachId,
        },
      });
      if (response.data && response.data.length > 0) {
        setEjercicios(response.data);
        setCategorias([
          ...new Set(response.data.map((ejercicio) => ejercicio.Categoria)),
        ]);
        console.log("Ejercicios:", response.data);
      } else {
        console.error("No se encontraron ejercicios");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("No se encontraron ejercicios");
      } else {
        console.error("Error fetching ejercicios:", error);
      }
    }
  };

  useEffect(() => {
    console.log("Categoría seleccionada:", categoriaSeleccionada);
    if (categoriaSeleccionada !== "all") {
      const musculosFiltrados = ejercicios
        .filter((ejercicio) => ejercicio.Categoria === categoriaSeleccionada)
        .map((ejercicio) => ejercicio.MusculoObjetivo);
      setMusculos([...new Set(musculosFiltrados)]);
      setMusculoSeleccionado("all"); // Resetear el músculo seleccionado
    } else {
      setMusculoSeleccionado("all"); // Resetear el músculo seleccionado
      setMusculos([
        ...new Set(ejercicios.map((ejercicio) => ejercicio.MusculoObjetivo)),
      ]);
    }
  }, [categoriaSeleccionada, ejercicios]);

  const filtrarEjercicios = () => {
    return ejercicios.filter(
      (ejercicio) =>
        (categoriaSeleccionada !== "all"
          ? ejercicio.Categoria === categoriaSeleccionada
          : true) &&
        (musculoSeleccionado !== "all"
          ? ejercicio.MusculoObjetivo === musculoSeleccionado
          : true)
    );
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <Screen pagina={"Ejercicios"}>
      <AgregarEjercicioCoach
        isOpen={isOpen}
        onClose={onClose}
        ejercicios={ejercicios}
        setEjercicios={setEjercicios}
        categorias={categorias}
        musculos={musculos}
        coachId={coachId}
      />
      <View
        className={`${!isOpen ? "flex justify-center items-center bg-cyan-500 h-10 mt-4" : "hidden"}`}
      >
        <Text className="text-white">Ejercicios de {nombreCoach}</Text>
      </View>
      <View
        className={`${!isOpen ? "flex flex-row justify-between items-center bg-cyan-500 h-10 mt-4" : "hidden"}`}
      >
        <Picker
          selectedValue={categoriaSeleccionada}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => {
            console.log("Nueva categoría seleccionada:", itemValue);
            setCategoriaSeleccionada(itemValue);
          }}
        >
          <Picker.Item label="Todas las Categorías" value="all" />
          {categorias.map((categoria, index) => (
            <Picker.Item key={index} label={categoria} value={categoria} />
          ))}
        </Picker>
        <Picker
          selectedValue={musculoSeleccionado}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue) => {
            console.log("Nuevo músculo seleccionado:", itemValue);
            setMusculoSeleccionado(itemValue);
          }}
        >
          <Picker.Item label="Todos los Músculos" value="all" />
          {musculos.map((musculo, index) => (
            <Picker.Item key={index} label={musculo} value={musculo} />
          ))}
        </Picker>
      </View>
      <View
        className={`${!isOpen ? "flex justify-center items-center bg-cyan-500 h-10 mt-4" : "hidden"}`}
      >
        <TouchableHighlight onPress={() => setIsOpen(true)}>
          <Text className="text-white">Agregar Ejercicio</Text>
        </TouchableHighlight>
      </View>
      <ScrollView className={`${!isOpen ? "pb-20" : "hidden"}`}>
        <View className="flex flex-row justify-between items-center bg-cyan-500 h-10 mt-4">
          <Text className="text-white w-5/12 text-center">Ejercicio</Text>
          <Text className="text-white w-3/12 text-center">Categoría</Text>
          <Text className="text-white w-3/12 text-center">
            Músculo Objetivo
          </Text>
        </View>
        <View className={`${!isOpen ? "pb-40 bg-gray-800" : "hidden"}`}>
          {filtrarEjercicios().length > 0 ? (
            filtrarEjercicios().map((ejercicio, index) => (
              <TouchableHighlight
                key={index.toString()}
                onLongPress={() => {
                  // Aquí puedes agregar la función para editar el ejercicio
                }}
                onPress={() => {
                  // Aquí puedes agregar la función para almacenar datos del ejercicio
                }}
                className=""
              >
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-white h-12 w-5/12 text-center">
                    {ejercicio.Ejercicio}
                  </Text>
                  <Text className="text-white w-3/12 text-center">
                    {ejercicio.Categoria}
                  </Text>
                  <Text className="text-white w-3/12 text-center">
                    {ejercicio.MusculoObjetivo}
                  </Text>
                </View>
              </TouchableHighlight>
            ))
          ) : (
            <View
              className={`${!isOpen ? "flex justify-center items-center" : "hidden"}`}
            >
              <Text className="text-white">Obteniendo ejercicios...</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}
