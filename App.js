import { SafeAreaView, Text, View, StatusBar } from "react-native";
import Login from "./pages/login";
import Signup from "./pages/signup/signup";
import Main from "./pages/main/main";
import Contacts from "./pages/main/contacts";
import Create from "./pages/main/create";
import Settings from "./pages/main/settings";
import VerifyAccount from "./pages/signup/verifyAccount";
import VerifyEmail from "./pages/signup/verifyEmail";
import Toast from "react-native-toast-message";
import UserContextProvider from "./contexts/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "react-query";
import ConversationContextProvider from "./contexts/ConversationContext";
import Conversation from "./pages/main/conversation";
import TokenContextProvider from "./contexts/TokenContext";
import SignUpContextProvider from "./contexts/SignUpContext";

const Title = () => {
  return (
    <SafeAreaView className="bg-black">
      <StatusBar />
      <Toast />
    </SafeAreaView>
  );
};

export default function App() {
  const Stack = createNativeStackNavigator();
  const queryClient = new QueryClient();
  return (
    <NavigationContainer>
      <TokenContextProvider>
        <QueryClientProvider client={queryClient}>
          <SignUpContextProvider>
            <UserContextProvider>
              <ConversationContextProvider>
                <Stack.Navigator>
                  <Stack.Screen
                    options={{ header: () => <Title /> }}
                    name="Login"
                    component={Login}
                  />
                  <Stack.Screen
                    options={{ header: () => <Title /> }}
                    name="Main"
                    component={Main}
                  />

                  <Stack.Screen
                    options={{ header: () => <Title /> }}
                    name="Signup"
                    component={Signup}
                  />

                  <Stack.Screen
                    options={{ header: () => <Title /> }}
                    name="Settings"
                    component={Settings}
                  />
                  <Stack.Screen
                    options={{ header: () => <Title /> }}
                    name="VerifyAccount"
                    component={VerifyAccount}
                  />
                  <Stack.Screen
                    options={{ header: () => <Title /> }}
                    name="VerifyEmail"
                    component={VerifyEmail}
                  />
                  <Stack.Screen
                    options={{ header: () => <Title /> }}
                    name="Contacts"
                    component={Contacts}
                  />
                  <Stack.Screen
                    options={{ header: () => <Title /> }}
                    name="Create"
                    component={Create}
                  />
                  <Stack.Screen
                    options={{ header: () => <Title /> }}
                    name="Conversation"
                    component={Conversation}
                  />
                </Stack.Navigator>
              </ConversationContextProvider>
            </UserContextProvider>
          </SignUpContextProvider>
        </QueryClientProvider>
      </TokenContextProvider>
    </NavigationContainer>
  );
}
