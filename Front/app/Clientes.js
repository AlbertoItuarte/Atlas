import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Button,
} from "react-native";
import Screen from "../components/Screen";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import EditarUsuario from "../components/EditarUsuario";
import AgregarCliente from "../components/AgregarCliente";
import { Link, useRouter } from "expo-router";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [coachId, setCoachId] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [cliente, setCliente] = useState(null);
  const [buscarNombre, setBuscarNombre] = useState("");
  const [clienteBuscado, setClienteBuscado] = useState([]);
  const [agregarOpen, setAgregarOpen] = useState(false);
  const router = useRouter();

  const fetchClientes = async (coachId) => {
    console.log("Petición GET a /clientes " + coachId + " 1"); // Agregar log para depuración
    try {
      console.log("Petición GET a /clientes " + coachId + " 2"); // Agregar log para depuración
      const response = await axios.get("http://192.168.1.75:5000/clientes", {
        params: { id: coachId },
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

  const storeData = async (id) => {
    try {
      await AsyncStorage.setItem("@selected_id", id.toString());
      router.push(`/Rutinas/${id}`);
    } catch (e) {
      console.error("Error storing id:", e);
    }
  };

  const rutina = (item) => {
    console.log("Rutina de cliente..." + item); // Agregar log para depuración
    // Agregar navegación a la pantalla de rutinas
    Link.push("/Rutinas", { clienteId: item });
  };

  const buscar = (item) => {
    console.log("Buscando cliente..." + item); // Busca por id (Item solo recibe Id)
    console.log("Nombre a buscar:", buscarNombre);
    axios
      .get("http://192.168.1.75:5000/clientes/buscar", {
        params: { nombre: buscarNombre },
      })
      .then((response) => {
        if (response.data.length > 0) {
          setClienteBuscado(response.data);
          console.log("Cliente encontrado:", response.data);
        } else {
          console.error("No se encontró el cliente");
        }
      });
    console.log("Cliente buscado: ", clienteBuscado);
  };

  const editar = (item) => {
    console.log("Editando cliente..." + item); // Agregar log para depuración
    setCliente(item);
    console.log("Cliente a editar:", item);
    setIsOpened(true);
  };

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        console.log("Data iniciio:", data.id);
        setCoachId(data.id);
      }
    });
    if (coachId) {
      fetchClientes(coachId);
    } else {
      console.error("No se pudo obtener el id del coach");
    }
  }, [coachId]);

  const actualizar = () => {
    fetchClientes(coachId);
    setIsOpened(false);
    setAgregarOpen(false);
  };

  const ensureDirExists = async (dir) => {
    const dirInfo = await FileSystem.getInfoAsync(dir);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
    }
  };

  const generarPDF = async () => {
    try {
      console.log("Generando PDF...");
      let htmlContent = `
        <h1>Lista de Clientes</h1>
        <table border="1" style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Telefono</th>
              <th>Correo</th>
              <th>Edad</th>
            </tr>
          </thead>
          <tbody>
            ${clientes
              .map(
                (cliente) => `
              <tr>
                <td>${cliente.Nombre}</td>
                <td>${cliente.ApellidoP}</td>
                <td>${cliente.Celular}</td>
                <td>${cliente.Correo}</td>
                <td>${new Date().getFullYear() - new Date(cliente.FechaNac).getFullYear()}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      console.log("PDF generado en:", uri);

      // Define la ruta personalizada
      const newUri = `${FileSystem.documentDirectory}clientes/lista_clientes.pdf`;

      // Asegúrate de que el directorio exista
      await ensureDirExists(`${FileSystem.documentDirectory}clientes`);

      // Mueve el archivo a la nueva ubicación
      await FileSystem.moveAsync({
        from: uri,
        to: newUri,
      });

      console.log("PDF movido a:", newUri);
      alert(`PDF generado en: ${newUri}`);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newUri);
      } else {
        alert("La función de compartir no está disponible en este dispositivo");
      }
    } catch (error) {
      console.error("Error al generar el PDF:", error);
      alert("Error al generar el PDF");
    }
  };

  return (
    <Screen pagina={"Clientes"}>
      <View className="">
        <Image
          className="h-20 w-full"
          source={require("../assets/Clientes.png")}
        />
      </View>

      <View className="flex flex-row  pt-4 px-1 space-x-2 justify-around items-center ">
        <TextInput
          className="h-10 w-4/12 border-2 bg-white border-gray-300 rounded-md"
          placeholder="Buscar cliente"
          onChangeText={setBuscarNombre}
        />
        <TouchableHighlight
          onPress={buscar}
          className="h-10 w-3/12  justify-center bg-blue-500 rounded-md"
        >
          <Text className="text-white text-center">Buscar</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={setAgregarOpen} className="h-10 ">
          <Image source={require("../assets/New.png")} />
        </TouchableHighlight>
      </View>

      <View className="flex flex-row justify-between items-center bg-cyan-500 h-10 mt-4">
        <Text className="text-white w-1/5 text-center">Nombre</Text>
        <Text className="text-white w-1/5 text-center">Apellido</Text>
        <Text className="text-white w-1/5 text-center">Telefono</Text>
        <Text className="text-white w-1/5 text-center">Correo</Text>
        <Text className="text-white w-1/5 text-center">Edad</Text>
      </View>
      <View
        className={`bg-black h-full ${isOpened || agregarOpen ? "block" : "hidden"}`}
      >
        <EditarUsuario
          isOpen={isOpened}
          cliente={cliente}
          onClose={actualizar}
        />
        <AgregarCliente
          isOpen={agregarOpen}
          coachId={coachId}
          onClose={actualizar}
        />
      </View>
      <View className="pb-40 bg-gray-800">
        {!buscarNombre ? (
          <View>
            {clientes.map((item, index) => (
              <TouchableHighlight
                key={index.toString()}
                onLongPress={() => {
                  editar(item);
                }}
                onPress={() => {
                  storeData(item.Id);
                }}
                className=""
              >
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-white w-1/5 text-center">
                    {item.Nombre}
                  </Text>
                  <Text className="text-white w-1/5 text-center">
                    {item.ApellidoP}
                  </Text>
                  <Text className="text-white w-1/5 text-center">
                    {item.Celular}
                  </Text>
                  <Text className="text-white w-1/5 text-center">
                    {item.Correo}
                  </Text>
                  <Text className="text-white w-1/5 text-center">
                    {new Date().getFullYear() -
                      new Date(item.FechaNac).getFullYear()}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
            <Button title="Generar PDF" onPress={generarPDF} />
          </View>
        ) : (
          <View>
            {clienteBuscado.map((item, index) => (
              <TouchableHighlight
                key={index.toString()}
                onLongPress={() => {
                  editar(item);
                }}
                onPress={() => {
                  rutina(item.Id);
                }}
                className=""
              >
                <View className="flex flex-row justify-between items-center">
                  <Text className="text-white w-1/5 text-center">
                    {item.Nombre}
                  </Text>
                  <Text className="text-white w-1/5 text-center">
                    {item.ApellidoP}
                  </Text>
                  <Text className="text-white w-1/5 text-center">
                    {item.Celular}
                  </Text>
                  <Text className="text-white w-1/5 text-center">
                    {item.Correo}
                  </Text>
                  <Text className="text-white w-1/5 text-center">
                    {new Date().getFullYear() -
                      new Date(item.FechaNac).getFullYear()}
                  </Text>
                </View>
              </TouchableHighlight>
            ))}
          </View>
        )}
      </View>
    </Screen>
  );
}
