import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const UserProfileDetails = ({ route, navigation }) => {
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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Info</Text>
          <View style={styles.infoItem}>
            <Ionicons name="location-outline" size={20} color="#adafbb" />
            <Text style={styles.infoText}>{user.location}</Text>
          </View>
          <View style={styles.infoItem}>
            <Ionicons name="calendar-outline" size={20} color="#adafbb" />
            <Text style={styles.infoText}>{user.age} years old</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {user.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.educationDegree}>{edu.degree}</Text>
              <Text style={styles.educationSchool}>{edu.school}</Text>
              <Text style={styles.educationYear}>{edu.year}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {user.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.experiencePosition}>{exp.position}</Text>
              <Text style={styles.experienceCompany}>{exp.company}</Text>
              <Text style={styles.experienceDate}>{exp.date}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            {user.interests.map((interest, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{interest}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Events</Text>
          {user.events.map((event, index) => (
            <View key={index} style={styles.eventItem}>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventDate}>{event.date}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  placeholder: {
    width: 34,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
    marginTop: 10,
  },
  bio: {
    fontSize: 16,
    color: "#323755",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  infoText: {
    fontSize: 16,
    color: "#323755",
    marginLeft: 10,
  },
  educationItem: {
    marginBottom: 10,
  },
  educationDegree: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  educationSchool: {
    fontSize: 14,
    color: "#323755",
  },
  educationYear: {
    fontSize: 14,
    color: "#adafbb",
  },
  experienceItem: {
    marginBottom: 10,
  },
  experiencePosition: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  experienceCompany: {
    fontSize: 14,
    color: "#323755",
  },
  experienceDate: {
    fontSize: 14,
    color: "#adafbb",
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestTag: {
    backgroundColor: "#f3f3f3",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    fontSize: 14,
    color: "#323755",
  },
  eventItem: {
    marginBottom: 10,
  },
  eventName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  eventDate: {
    fontSize: 14,
    color: "#adafbb",
  },
})

export default UserProfileDetails

