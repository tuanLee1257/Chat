import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { AuthenticatedUserContext } from "./src/config/context";
import { auth, database } from "./src/firebase/firebaseConfig";
import Chat from "./src/screens/Chat";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Search from "./src/screens/Search";
import Signup from "./src/screens/Signup";
import Colors from "./src/values/Colors";
const Stack = createStackNavigator();

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
function ChatStack() {
  return (
    <Stack.Navigator
      defaultScreenOptions={Home}
      screenOptions={{
        title: false,
        headerStyle: { backgroundColor: Colors.header },
        headerSearchBarOptions: {
          // search bar options
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);

  const setUserInfomation = (uid) => {
    const collectionRef = collection(database, "users");
    const q = query(collectionRef, where("uid", "==", uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setUser(
        querySnapshot.docs.map((doc) => ({
          uid: doc.data().uid,
          profile_picture: doc.data().profile_picture,
          username: doc.data().username,
        }))[0]
      );
    });
    return unsubscribe;
  };
  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(
      async (authenticatedUser) => {
        authenticatedUser
          ? setUserInfomation(authenticatedUser.uid)
          : setUser(null);
        setIsLoading(false);
      }
    );
    return unsubscribeAuth;
  }, []);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

function Navigation(props) {
  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
}
export default Navigation;
