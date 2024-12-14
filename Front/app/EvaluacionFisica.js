import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import Screen from "../components/Screen";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// TODO - Implementar la funcionalidad de agregar una evaluación física
const EvaluacionFisica = () => {
  const [coachId, setCoachId] = useState(null);
  const [evaluaciones, setEvaluaciones] = useState([]);
  const [nombreCliente, setNombreCliente] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [abrir, setAbrir] = useState(false);
  const [peso, setPeso] = useState(0);
  const [porcentajeGrasa, setPorcentajeGrasa] = useState(0);
  const [notas, setNotas] = useState("");
  const [fecha, setFecha] = useState("");

  const hoy = new Date();
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fechaFormateada = formatDate(hoy);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const fetchAsyncStorageData = async () => {
      const storedId = await AsyncStorage.getItem("IdCliente");
      const storedNombre = await AsyncStorage.getItem("NombreCliente");
      console.log("ID del cliente en async storage:", storedId);
      console.log("Nombre del cliente en async storage:", storedNombre);
    };

    fetchAsyncStorageData();
  }, [idCliente, nombreCliente]);

  const getData = async () => {
    const value = await AsyncStorage.getItem("@login_data");
    const clientId = await AsyncStorage.getItem("IdCliente");
    const clientName = await AsyncStorage.getItem("NombreCliente");
    setNombreCliente(clientName);
    setIdCliente(clientId);
    if (value !== null) {
      const { id } = JSON.parse(value);
      setCoachId(id);
    }
    try {
      const response = await axios.get(
        "http://192.168.1.75:5000/clientes/evaluaciones",
        {
          params: {
            id: clientId,
          },
        }
      );
      setEvaluaciones(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching evaluaciones:", error);
    }
    console.log("ID del cliente:", idCliente);
    console.log("Nombre del cliente:", nombreCliente);
  };

  const agregarEvaluacion = async () => {
    if (peso === 0 || porcentajeGrasa === 0) {
      console.log("Peso y % de grasa son obligatorios");
      alert("Peso y % de grasa son obligatorios");
      return;
    }
    setFecha(fechaFormateada);
    try {
      const response = await axios.post(
        "http://192.168.1.75:5000/clientes/agregarevaluacion",
        {
          IdCliente: idCliente,
          FechaEval: fecha,
          Peso: peso,
          PorcentGrasa: porcentajeGrasa,
          Notas: notas,
          IdCoach: coachId,
        }
      );
      console.log(response.data);
      getData();
      setAbrir(false);
    } catch (error) {
      console.error("Error al agregar evaluación:", error);
    }
  };

  const manejarCierre = () => {
    setAbrir(false);
    setPeso(0);
    setPorcentajeGrasa(0);
    setNotas("");
  };

  return (
    <Screen pagina="Evaluación Física">
      {abrir ? (
        <View className="flex flex-col pt-10 items-center justify-center w-screen">
          <Text className="text-white text-2xl">Agregar Evaluación Física</Text>
          <View className="flex flex-col items-center justify-center w-screen mt-6">
            <Text className="text-white text-lg">Peso</Text>
            <TextInput
              className="bg-white w-6/12 rounded-lg"
              placeholder="Peso"
              value={peso}
              onChangeText={setPeso}
              keyboardType="numeric"
            />
            <Text className="text-white text-center text-lg mt-4">
              Porcentaje de Grasa
            </Text>
            <TextInput
              className="bg-white w-6/12 rounded-lg"
              placeholder="% Grasa"
              value={porcentajeGrasa}
              onChangeText={setPorcentajeGrasa}
              keyboardType="numeric"
            />
            <Text className="text-white text-center text-lg mt-4">Notas</Text>
            <TextInput
              className="bg-white w-6/12 h-auto rounded-lg"
              placeholder="Notas"
              value={notas}
              onChangeText={setNotas}
            />
          </View>
          <View className="flex  flex-row mt-16 w-screen justify-between">
            <TouchableHighlight
              onPress={() => manejarCierre()}
              className="bg-cyan-500 px-8 py-4 rounded-lg"
            >
              <Text className="text-white">Cancelar</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={agregarEvaluacion}
              className="bg-cyan-500 px-8 py-4 rounded-lg"
            >
              <Text className="text-white">Guardar</Text>
            </TouchableHighlight>
          </View>
        </View>
      ) : (
        <View className="flex flex-col items-center w-screen justify-center">
          <Text className="text-white text-2xl">
            Evaluación Física de {nombreCliente}
          </Text>
          <View className="flex flex-row mt-6 justify-end items-center w-screen">
            <TouchableHighlight
              onPress={() => setAbrir(true)}
              className="bg-cyan-500 px-8 py-4 rounded-lg"
            >
              <Text className="text-white">Añadir</Text>
            </TouchableHighlight>
          </View>
          <View className="flex flex-col mt-6 w-screen">
            <View className="flex flex-row justify-between w-full px-6 bg-cyan-500 py-2 mt-4 ">
              <Text className="text-white text-lg w">Fecha</Text>
              <Text className="text-white text-lg ">Peso</Text>
              <Text className="text-white text-lg ">% Grasa</Text>
            </View>

            {evaluaciones.length === 0 && (
              <Text className="text-white bg-cyan-500 w-3/12 text-lg text-center mt-4 py-4">
                Notas
              </Text>
            )}
            {evaluaciones.map((evaluacion) => (
              <View
                key={evaluacion.IdCliente}
                className="flex flex-col mt-4 w-full"
              >
                <View className="flex flex-row w-full">
                  <Text className="text-white w-4/12 text-lg">
                    {new Date(evaluacion.FechaEval).toLocaleDateString(
                      "es-ES",
                      {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }
                    )}
                  </Text>
                  <Text className="text-white  w-4/12 text-lg ml-6">
                    {evaluacion.Peso} kg
                  </Text>
                  <Text className="text-white w-4/12 text-lg ml-6">
                    {evaluacion.PorcentGrasa}%
                  </Text>
                </View>
                <View className="flex flex-row items-center w-full mt-2">
                  <Text className="text-white h-auto bg-cyan-500 w-3/12 text-lg text-center py-2">
                    Notas
                  </Text>
                  <Text className="text-white h-auto w-8/12 text-lg ml-6">
                    {evaluacion.Notas}
                  </Text>
                </View>
                <View className="flex flex-row border border-gray-200  w-full "></View>
              </View>
            ))}
          </View>
        </View>
      )}
    </Screen>
  );
};

export default EvaluacionFisica;
