import {
  ScrollView,
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Modal,
  Button,
  Image,
} from "react-native";
import Screen from "../components/Screen";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

//este es el apartado principal de los pagos
//TODO hacer la vista de los planes donde el coach pueda ver los planes que tiene disponibles y modificarlos/eliminarlos
//TODO Contratos el la siguiente tabla donde se asocia el pago del cliente al coach (Insertar IdCoach en la tabla)
//TODO Pagos la siguiente tabla donde se asocia el pago del cliente al coach (Insertar IdCoach en la tabla)
//TODO Cómo ya existen pagos, estos se deben borrar para que no haya problemas con la integridad de los datos
//TODO Cómo ya existen contratos, estos se deben borrar para que no haya problemas con la integridad de los datos
//TODO Cómo ya existen planes, estos se deben borrar para que no haya problemas con la integridad de los datos
export default function Planes() {
  const [planes, setPlanes] = useState([]);
  const [IdCoach, setIdCoach] = useState("");
  const [IdPlan, setIdPlan] = useState("");
  const [Plan, setPlan] = useState("");
  const [Duracion, setDuracion] = useState("");
  const [Costo, setCosto] = useState("");
  const [Actualizar, setActualizar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const [addOpen, setAddOpen] = useState(false);

  useEffect(() => {
    const obtenerIdCoach = async () => {
      try {
        const loginData = await AsyncStorage.getItem("@login_data");
        if (loginData !== null) {
          console.log("Login Data:", loginData);
          const { id } = JSON.parse(loginData);
          console.log("Coach id:", id);
          setIdCoach(id);
          obtenerPlanes(id); // Llamar a obtenerPlanes con el id del coach
        }
      } catch (error) {
        console.error("Error fetching coach id:", error);
      }
    };
    obtenerIdCoach();
  }, []);

  const actualizarPlanes = async () => {
    try {
      if (Duracion === "" || Costo === "" || Plan === "") {
        console.log("Faltan datos");
        alert("Faltan datos");
        return;
      }
      console.log("Fetching actualizar...");
      const response = await axios.put(
        `http://192.168.1.75:5000/transacciones/actualizar`,
        { IdPlan, id: IdCoach, Plan, Duracion, Costo }
      );
      const data = response.data;
      obtenerPlanes(IdCoach);
      console.log(data);
    } catch (error) {
      console.error("Error en el servidor:", error);
      return error;
    }
    setPlan("");
    setDuracion("");
    setCosto("");
    setActualizar(false);
  };

  const warning = (idPlan) => {
    setPlanToDelete(idPlan);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    try {
      console.log("Fetching eliminar...");
      const response = await axios.delete(
        `http://192.168.1.75:5000/transacciones/eliminar`,
        { params: { id: planToDelete } }
      );
      const data = response.data;
      obtenerPlanes(IdCoach);
      console.log(data);
    } catch (error) {
      console.error("Error en el servidor:", error);
      return error;
    }
    setModalVisible(false);
    setPlanToDelete(null);
    setActualizar(false);
    setPlan("");
    setDuracion("");
    setCosto("");
  };

  const agregarPlan = async () => {
    try {
      if (Duracion === "" || Costo === "" || Plan === "") {
        console.log("Faltan datos");
        alert("Faltan datos");
        return;
      }
      console.log("Fetching agregar...");
      const response = await axios.post(
        "http://192.168.1.75:5000/transacciones/agregar",
        {
          IdCoach,
          Plan,
          Duracion,
          Costo,
        }
      );
      const data = response.data;
      obtenerPlanes(IdCoach);
      console.log(data);
    } catch (error) {
      console.error("Error en el servidor:", error);
      return error;
    }
    setPlan("");
    setDuracion("");
    setCosto("");
    setAddOpen(false);
  };

  const obtenerPlanes = async (idCoach) => {
    console.log("IdCoach:", idCoach);
    try {
      console.log("Fetching planes...");
      if (!idCoach) {
        return;
      }
      const response = await axios.get(
        `http://192.168.1.75:5000/transacciones/planes`,
        { params: { id: idCoach } }
      );
      const data = response.data;
      setPlanes(data);
      console.log(data);
    } catch (error) {
      console.error("Error en el servidor:", error);
      return error;
    }
  };

  const handleClose = () => {
    setActualizar(false);
    setAddOpen(false);
    setPlan("");
    setDuracion("");
    setCosto("");
  };

  return (
    <Screen pagina={"Planes"}>
      <ScrollView className="">
        {addOpen ? (
          <View>
            <Text className=" text-2xl text-white pb-6">Agregar Plan:</Text>
            <View className="flex flex-row items-center pt-6 space-x-4">
              <Text className="text-white text-xl w-3/12">Nombre: </Text>
              <TextInput
                placeholder="Nombre del plan"
                className="bg-white pl-2  h-10 rounded-lg w-8/12"
                value={Plan}
                onChangeText={setPlan}
              />
            </View>
            <View className="flex flex-row items-center pt-6 space-x-4">
              <Text className="text-white text-xl w-3/12">Duración: </Text>
              <TextInput
                placeholder="Duración en meses"
                className="bg-white pl-2  h-10 rounded-lg w-8/12"
                value={Duracion}
                onChangeText={setDuracion}
                keyboardType="numeric"
              />
            </View>
            <View className="flex flex-row items-center pt-6 space-x-4">
              <Text className="text-white text-xl w-3/12">Costo: </Text>
              <TextInput
                placeholder="Costo del plan"
                className="bg-white pl-2  h-10 rounded-lg w-8/12"
                value={Costo}
                onChangeText={setCosto}
                keyboardType="numeric"
              />
            </View>
            <View className="flex flex-row space-x-20  justify-center items-center pt-10">
              <TouchableHighlight
                onPress={handleClose}
                className="bg-red-500 w-4/12 px-6 py-4  rounded-lg"
              >
                <Text className="text-white text-center ">Cancelar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={agregarPlan}
                className="bg-cyan-500 w-4/12 px-6 py-4 rounded-lg"
              >
                <Text className="text-white text-center ">Agregar</Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : null}
        {Actualizar ? (
          <View>
            <TouchableHighlight
              onPress={handleClose}
              className="flex flex-row justify-end  rounded-lg "
            >
              <Image
                className="text-right"
                source={require("../assets/Salir.png")}
              />
            </TouchableHighlight>
            <Text className=" text-2xl text-white pb-6">
              Modificando {Plan}:
            </Text>
            <View className="flex flex-row items-center pt-6 space-x-4">
              <Text className="text-white text-xl w-3/12">Nombre: </Text>
              <TextInput
                placeholder="Nombre del plan"
                className="bg-white pl-2  h-10 rounded-lg w-8/12"
                value={Plan}
                onChangeText={setPlan}
              />
            </View>
            <View className="flex flex-row items-center pt-6 space-x-4">
              <Text className="text-white text-xl w-3/12">Duración: </Text>
              <TextInput
                placeholder="Duración en meses"
                className="bg-white pl-2  h-10 rounded-lg w-8/12"
                value={Duracion}
                onChangeText={setDuracion}
                keyboardType="numeric"
              />
            </View>
            <View className="flex flex-row items-center pt-6 space-x-4">
              <Text className="text-white text-xl w-3/12">Costo: </Text>
              <TextInput
                placeholder="Costo del plan"
                className="bg-white pl-2  h-10 rounded-lg w-8/12"
                value={Costo}
                onChangeText={setCosto}
                keyboardType="numeric"
              />
            </View>
            <View className="flex flex-row space-x-20 justify-center items-center pt-10">
              <TouchableHighlight
                onPress={() => warning(IdPlan)}
                className="bg-red-500  px-6 py-4  rounded-lg"
              >
                <Text className="text-white ">Eliminar</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={async () => {
                  await actualizarPlanes();
                }}
                className="bg-cyan-500  px-6 py-4 rounded-lg"
              >
                <Text className="text-white ">Actualizar</Text>
              </TouchableHighlight>
            </View>
          </View>
        ) : (
          <View className={`${addOpen ? "hidden" : ""}`}>
            <View className="flex flex-row justify-between items-center h-14 ">
              <Text className="text text-white">Planes</Text>
              <View className="flex flex-row justify-between items-center">
                <TouchableHighlight onPress={() => setAddOpen(true)}>
                  <Text className="text-white">Agregar</Text>
                </TouchableHighlight>
              </View>
            </View>
            <View className="flex flex-row bg-cyan-500 items-center h-10">
              <Text
                onChangeText={setPlan}
                className="text-white w-4/12 text-center"
                value={Plan}
              >
                Plan
              </Text>
              <Text
                onChangeText={setDuracion}
                className="text-white w-4/12 text-center"
              >
                Duración
              </Text>
              <Text
                onChangeText={setCosto}
                className="text-white w-4/12 text-center"
              >
                Costo
              </Text>
            </View>
            <View className=" bg-gray-800">
              {planes.map((item, index) => (
                <TouchableHighlight
                  key={index.toString()}
                  onLongPress={() => {
                    setIdPlan(item.id);
                    setActualizar(true);
                    setPlan(item.Plan);
                    setDuracion(item.Duracion);
                    setCosto(item.Costo);
                    console.log("Plan:", item.id);
                    // TODO Implementar la función de actualizar planes
                  }}
                  className=""
                >
                  <View className="flex flex-row pt-2  items-center">
                    <Text className="text-white pt-3 h-10 w-4/12 text-center">
                      {item.Plan}
                    </Text>
                    <Text className="text-white pt-3 h-10 w-4/12 text-center">
                      {item.Duracion} meses
                    </Text>
                    <Text className="text-white pt-3 h-10 w-4/12 text-center">
                      ${item.Costo}
                    </Text>
                    <TouchableHighlight
                      onPress={() => warning(item.id)}
                      className="bg-red-500 px-4 py-2 rounded-lg"
                    >
                      <Text className="text-white">Eliminar</Text>
                    </TouchableHighlight>
                  </View>
                </TouchableHighlight>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg">
            <Text className="text-lg mb-4">
              ¿Estás seguro de eliminar este plan?
            </Text>
            <View className="flex flex-row justify-around">
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Eliminar" onPress={handleDelete} color="red" />
            </View>
          </View>
        </View>
      </Modal>
    </Screen>
  );
}
