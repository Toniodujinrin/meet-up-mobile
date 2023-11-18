import { SafeAreaView, Text, View, StatusBar } from "react-native";
import Login from "./pages/login";
import Signup from "./pages/signup";

export default function App() {
  return (
    <SafeAreaView className="bg-black flex-1 flex-col justify-center items-center">
      <StatusBar />
      <Signup />
      {/* <View className="bg-black ">
        <Text className="text-white">Hello world</Text>
      </View> */}
    </SafeAreaView>
  );
}
