import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { StatusBar } from "react-native"
import { Ionicons } from "@expo/vector-icons"

// Import all screens
import Onboarding from "./screens/Onboarding"
import Login from "./screens/Login"
import SignUp from "./screens/SignUp"
import PhoneNumber from "./screens/PhoneNumber"
import OTPVerification from "./screens/OTPVerification"
import GenderSelection from "./screens/GenderSelection"
import ProfilePictureUpload from "./screens/ProfilePictureUpload"
import BirthdaySelection from "./screens/BirthdaySelection"
import EducationQualification from "./screens/EducationQualification"
import Experience from "./screens/Experience"
import Interests from "./screens/Interests"
import Discover from "./screens/Discover"
import Messages from "./screens/Messages"
import Chat from "./screens/Chat"
import Profile from "./screens/Profile"
import EditProfile from "./screens/EditProfile"
import Connections from "./screens/Connections"
import ProfileDetails from "./screens/ProfileDetails"
import Events from "./screens/Events"
import EventDetails from "./screens/EventDetails"
import MatchScreen from "./screens/MatchScreen"
import FilterPreferences from "./screens/FilterPreferences"
import UserProfileDetails from "./screens/UserProfileDetails"
import CreateEvent from "./screens/CreateEvent"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Discover") {
            iconName = focused ? "flame" : "flame-outline"
          } else if (route.name === "Messages") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          } else if (route.name === "Events") {
            iconName = focused ? "calendar" : "calendar-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#e94057",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Discover" component={Discover} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Events" component={Events} />
    </Tab.Navigator>
  )
}

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Onboarding" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
          <Stack.Screen name="OTPVerification" component={OTPVerification} />
          <Stack.Screen name="GenderSelection" component={GenderSelection} />
          <Stack.Screen name="ProfilePictureUpload" component={ProfilePictureUpload} />
          <Stack.Screen name="BirthdaySelection" component={BirthdaySelection} />
          <Stack.Screen name="EducationQualification" component={EducationQualification} />
          <Stack.Screen name="Experience" component={Experience} />
          <Stack.Screen name="Interests" component={Interests} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Connections" component={Connections} />
          <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
          <Stack.Screen name="EventDetails" component={EventDetails} />
          <Stack.Screen name="MatchScreen" component={MatchScreen} />
          <Stack.Screen name="FilterPreferences" component={FilterPreferences} />
          <Stack.Screen name="UserProfileDetails" component={UserProfileDetails} />
          <Stack.Screen name="CreateEvent" component={CreateEvent} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App

