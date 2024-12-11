import { View, Text, Image, TouchableHighlight, Pressable } from "react-native";
import Screen from "./Screen";

const Confirmacion = ({ isOpen, onClose, eliminar }) => {
  return (
    <View
      className={`flex justify-center items-center h-96 bg-cyan-600  space-y-2 bg-opacity-30  ${isOpen ? "absolute  top-60 bottom-0 rounded-xl w-60  z-50 p-5" : "hidden"}`}
    >
      <View className="flex flex-row-reverse items-center justify-center -top-6 w-56">
        <Text className="text-white text-xl ">¡ADVERTENCIA!</Text>
      </View>
      <Text className="text-white">Esta acción eliminará:</Text>
      <Text className="text-white ">-Rutinas</Text>
      <Text className="text-white ">-Pagos</Text>
      <Text className="text-white ">-Planes</Text>
      <Text className="text-white ">-Contratos</Text>
      <Text className="text-white pb-4">Relacionados al cliente</Text>
      <View className="flex flex-row space-x-2 items-center w-50">
        <TouchableHighlight
          onPress={onClose}
          className="bg-gray-600 p-2 rounded-lg "
        >
          <Text className="text-white px-4 py-2">Regresar</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={eliminar}
          className="bg-red-500 p-2 rounded-lg "
        >
          <Text className="text-white px-4 py-2">Eliminar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Confirmacion;
