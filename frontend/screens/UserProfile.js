import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const UserProfile = ({ route, navigation }) => {
  const { user } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile Details</Text>
          <View style={styles.placeholder} />
        </View>

        <Image source={user.image} style={styles.profileImage} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.bio}>{user.bio}</Text>

        {/* Rest of the component code... */}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  // Styles definition...
})

export default UserProfile

