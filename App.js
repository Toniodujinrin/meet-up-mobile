import { SafeAreaView, Text, View, StatusBar } from "react-native";
import Login from "./pages/login";
import Signup from "./pages/signup/signup";
import Main from "./pages/main/main";
import Contacts from "./pages/main/contacts";
import Create from "./pages/main/create";
import CreateComp from "./components/create";
import Settings from "./pages/main/settings";
import SettingsComp from "./components/settings";
import VerifyAccount from "./pages/signup/verifyAccount";
import VerifyEmail from "./pages/signup/verifyEmail";
import { test, get } from "./api";
export default function App() {
  // const storeData = async (value) => {
  //   try {
  //     const value =
  //       "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiJ0b25pbG9iYW9kdWppbnJpbkBnbWFpbC5jb20iLCJlbWFpbFZlcmlmaWVkIjp0cnVlLCJhY2NvdW50VmVyaWZpZWQiOnRydWUsImlzVmVyaWZpZWQiOnRydWUsImtleVBhaXIiOnsicHVibGljS2V5IjoiLS0tLS1CRUdJTiBSU0EgUFVCTElDIEtFWS0tLS0tXG5NRWdDUVFDdWhVanVPRHJXMkI3UVBBa0ZMQVRwVDE4Qm1TTlN6bkJYRi9BZ2VnR0MwZ0ZGZ0JlYmp5L00yc0xyXG5Kd3dQQ0x6RnprOFBZMnRpUkVtbkt4U0tyZTNMQWdNQkFBRT1cbi0tLS0tRU5EIFJTQSBQVUJMSUMgS0VZLS0tLS0iLCJwcml2YXRlS2V5IjoiLS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLVxuTUlJQlBBSUJBQUpCQUs2RlNPNDRPdGJZSHRBOENRVXNCT2xQWHdHWkkxTE9jRmNYOENCNkFZTFNBVVdBRjV1UFxuTDh6YXd1c25EQThJdk1YT1R3OWphMkpFU2FjckZJcXQ3Y3NDQXdFQUFRSkJBS2RhSG9aNW0wcThja2ZpMmcrQVxubDdFWE1KYTZ2OW0vSnBFTjNuRjJMWTdBdEg3NE9ZRjQyNTVwazdVWldwS3dvdHBGZ0hpVWt4RXVOSi8vOEN4SlxudmhrQ0lRRHZUeEZwbklXek1BbkFTckMvQklkTElaU2JabURzTUQ0KytQNFJsRnpiN3dJaEFMcXhaMWwzelpUUFxuN1JCbWtyb3Ryd1FrU1g3d3dKYTl4dEE4b042b2VOL2xBaUVBamk2eUw4ZDVnSDg0Sy9HMGxhbUJJTmh3ek92RlxuQmsrYmpCcXdDWTNXcGkwQ0lRQ3JtL3NXUUl2VzZMSlBTeHBBelZGOWl5V0w3QjM3OG9KWVZBTEQ2VFVEQ1FJZ1xuTTZYNzBkWVhwRytoMndIdGYwUFROZ1JGUFpDRGlHQ25zNEQvSkk0TGhuZz1cbi0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tIn0sImlhdCI6MTY5OTc1MzM1MH0.wINFBWtY2HgMFCVG4X2Smw9841NitapGP9To5IBJmzg";
  //     await AsyncStorage.setItem("token", value);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  // storeData();

  get("users/todujinrin@gmail.com", {}, false);

  // test();

  return (
    <SafeAreaView className="bg-black flex-1 flex-col justify-center items-center">
      <StatusBar />
      {/* <Signup /> */}
      {/* <Login /> */}
      {/* <View className="bg-black ">
        <Text className="text-white">Hello world</Text>
      </View> */}
      {/* <Main /> */}
      {/* <Settings /> */}
      {/* <VerifyAccount /> */}
      {/* <VerifyEmail /> */}
      {/* <Create /> */}
      {/* <Contacts /> */}
    </SafeAreaView>
  );
}
