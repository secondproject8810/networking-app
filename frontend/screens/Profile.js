import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("EditProfile")}>
            <Ionicons name="settings-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <Image source={require("../assets/profile-main.png")} style={styles.profileImage} />
          <Text style={styles.profileName}>Jessica Parker, 25</Text>
          <Text style={styles.profileBio}>Photographer & Designer</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>1,055</Text>
              <Text style={styles.statLabel}>Matches</Text>
            </View>
            <View style={[styles.statItem, styles.statDivider]}>
              <Text style={styles.statValue}>725</Text>
              <Text style={styles.statLabel}>Messages</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>
            Passionate about photography and design. Love to travel and explore new places. Looking for someone who
            shares similar interests and enjoys adventures.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Photography</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Design</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Travel</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Coffee</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Art</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Photos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.photosGrid}>
            <Image source={require("../assets/photo1.png")} style={styles.photoItem} />
            <Image source={require("../assets/photo2.png")} style={styles.photoItem} />
            <Image source={require("../assets/photo3.png")} style={styles.photoItem} />
          </View>
        </View>

        <TouchableOpacity style={styles.connectionsButton} onPress={() => navigation.navigate("Connections")}>
          <Text style={styles.connectionsButtonText}>View Connections</Text>
        </TouchableOpacity>
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
    justifyContent: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
  settingsButton: {
    position: "absolute",
    right: 15,
  },
  profileCard: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  profileBio: {
    fontSize: 16,
    color: "#adafbb",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    width: "80%",
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    borderLeftWidth: 1,
    borderLeftColor: "#e8e6ea",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
  },
  statLabel: {
    fontSize: 14,
    color: "#adafbb",
    marginTop: 5,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f3f3",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: "#323755",
    lineHeight: 24,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
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
    fontSize: 12,
    color: "#323755",
  },
  photosGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  photoItem: {
    width: "32%",
    aspectRatio: 1,
    borderRadius: 10,
  },
  seeAllText: {
    fontSize: 14,
    color: "#e94057",
    fontWeight: "600",
  },
  connectionsButton: {
    backgroundColor: "#e94057",
    borderRadius: 30,
    padding: 15,
    margin: 20,
    alignItems: "center",
  },
  connectionsButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default Profile

