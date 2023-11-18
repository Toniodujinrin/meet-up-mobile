import { SafeAreaView, Text, View, StatusBar } from "react-native";
import Login from "./pages/login";

export default function App() {
  return (
    <SafeAreaView className="bg-black flex-1 flex-col justify-center items-center">
      <StatusBar />
      <Login />
      {/* <View className="bg-black ">
        <Text className="text-white">Hello world</Text>
      </View> */}
    </SafeAreaView>
  );
}
