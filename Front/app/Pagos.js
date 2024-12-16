import { ScrollView, Text, View, Pressable, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Screen from "../components/Screen";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { format } from "date-fns";

export default function Pagos() {
  const [pagos, setPagos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [IdCliente, setIdCliente] = useState("");
  const [IdPlan, setIdPlan] = useState("");
  const [FechaInicio, setFechaInicio] = useState(
    format(new Date(), "yyyy-MM-dd")
  );
  const [FechaFin, setFechaFin] = useState("");
  const [Monto, setMonto] = useState("");
  const [IdCoach, setIdCoach] = useState("");
  const [Duracion, setDuracion] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = await AsyncStorage.getItem("@login_data");
        const parsedId = JSON.parse(id).id;
        setIdCoach(parsedId);
        console.log("IdCoach:", parsedId);
        obtenerClientes(parsedId);
        obtenerPlanes(parsedId);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, []);

  const obtenerClientes = async (idCoach) => {
    try {
      console.log("Petición GET a /clientes " + idCoach + " 2"); // Agregar log para depuración
      const response = await axios.get("http://192.168.1.75:5000/clientes", {
        params: { id: idCoach },
      });
      if (response.data.length > 0) {
        setClientes(response.data);
        console.log("Clientes:", response.data);
      } else {
        console.error("No se encontraron clientes perro ++");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("No se encontraron clientes");
      } else {
        console.error("Error fetching clientes:", error);
      }
    }
  };

  const obtenerPlanes = async (idCoach) => {
    try {
      const response = await axios.get(
        "http://192.168.1.75:5000/transacciones/planes",
        {
          params: { id: idCoach },
        }
      );
      setPlanes(response.data);
      console.log("Planes:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePlanChange = (planId) => {
    console.log("planId:", planId);
    const selectedPlan = planes.find((plan) => plan.id === planId);
    console.log("selectedPlan:", selectedPlan);
    if (selectedPlan) {
      setIdPlan(planId);
      setMonto(selectedPlan.Costo);
      setDuracion(selectedPlan.Duracion);
      console.log("selectedPlan.Duracion:", selectedPlan.Duracion);
      const fechaFin = new Date(FechaInicio);
      console.log("FechaInicio:", fechaFin);
      fechaFin.setMonth(fechaFin.getMonth() + parseInt(selectedPlan.Duracion));
      console.log("FechaFin:", fechaFin);
      setFechaFin(format(fechaFin, "yyyy-MM-dd"));
    }
  };

  const agregarContratos = async () => {
    if (!IdCliente || !IdPlan || !FechaInicio || !FechaFin || !Monto) {
      console.error("Faltan datos");
      alert("Faltan datos");
      return;
    }
    try {
      const response = await axios.post(
        "http://192.168.1.75:5000/contratos/agregar",
        {
          IdCoach,
          IdCliente,
          IdPlan,
          FechaInicio,
          FechaFin,
          Monto,
        }
      );
      console.log("Response id contrato:", response.data);
      const IdContrato = response.data.id;
      console.log("IdContrato:", IdContrato);
      agregarPago(IdContrato);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const agregarPago = async (IdContrato) => {
    console.log("IdContrato:", IdContrato);
    try {
      const response = await axios.post(
        "http://192.168.1.75:5000/transacciones/pagos",
        {
          IdContrato,
          IdPlan,
          Monto,
          FechaPago: FechaInicio,
          IdCoach,
        }
      );
      console.log("Response:", response.data);
      alert("Pago agregado correctamente");
      setIdCliente("");
      setMonto("");
      setDuracion("");
      setFechaInicio(format(new Date(), "yyyy-MM-dd"));
      setFechaFin("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Screen pagina={"Pagos"}>
      <ScrollView className="bg-black">
        <View className="flex justify-center -top-20 space-y-6 h-screen items-center">
          <View className="flex flex-row w-full items-center">
            <Text className="text-cyan-300 text-2xl">Agregar Pago</Text>
          </View>
          <View className="flex space-y-4 w-full items-center pt-6">
            <View className="flex flex-row items-center w-full">
              <Text className="text-cyan-300 text-xl w-4/12">Cliente: </Text>
              <Picker
                selectedValue={IdCliente}
                onValueChange={(itemValue) => {
                  setIdCliente(itemValue);
                  console.log("itemValue:", itemValue);
                }}
                style={{
                  height: 55,
                  width: 200,
                  backgroundColor: "white",
                  borderColor: "black",
                }}
              >
                {clientes.map((cliente) => (
                  <Picker.Item
                    key={cliente.Id}
                    label={`${cliente.Nombre} ${cliente.ApellidoP} ${cliente.ApellidoM}`}
                    value={cliente.Id}
                  />
                ))}
              </Picker>
            </View>
            <View className="flex flex-row items-center w-full">
              <Text className="text-cyan-300 text-xl w-4/12">Plan: </Text>
              <Picker
                selectedValue={IdPlan}
                onValueChange={(itemValue) => {
                  handlePlanChange(itemValue);
                  console.log("itemValue:", itemValue);
                }}
                style={{
                  height: 55,
                  width: 200,
                  backgroundColor: "white",
                  borderColor: "black",
                }}
              >
                {planes.map((plan) => (
                  <Picker.Item
                    key={plan.id}
                    label={plan.Plan}
                    value={plan.id}
                  />
                ))}
              </Picker>
            </View>
            <View className="flex flex-row items-center w-full">
              <Text className="text-cyan-300 text-xl w-4/12">Monto: </Text>
              <Text className="text-white text-xl w-8/12">{Monto}</Text>
            </View>
            <View className="flex flex-row items-center w-full">
              <Text className="text-cyan-300 text-xl w-4/12">Duración: </Text>
              <Text className="text-white text-xl w-8/12">
                {Duracion} meses
              </Text>
            </View>
            <View className="flex flex-row items-center w-full">
              <Text className="text-cyan-300 text-xl w-4/12">
                Fecha Inicio:{" "}
              </Text>
              <Text className="text-white text-xl w-8/12">{FechaInicio}</Text>
            </View>
            <View className="flex flex-row items-center w-full">
              <Text className="text-cyan-300 text-xl w-4/12">Fecha Fin: </Text>
              <Text className="text-white text-xl w-8/12">{FechaFin}</Text>
            </View>
          </View>
          <Pressable
            onPress={agregarContratos}
            className="bg-cyan-400 rounded-md px-6 py-4"
          >
            <Text className="text-white font-bold">Agregar Pago</Text>
          </Pressable>
        </View>
      </ScrollView>
    </Screen>
  );
}
