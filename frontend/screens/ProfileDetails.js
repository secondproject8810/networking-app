import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const ProfileDetails = ({ route, navigation }) => {
  const { user } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.moreButton}>
            <Ionicons name="ellipsis-horizontal" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileCard}>
          <Image source={user.image} style={styles.profileImage} />
          <Text style={styles.profileName}>{user.name}</Text>
          <Text style={styles.profileBio}>Photographer & Designer</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>254</Text>
              <Text style={styles.statLabel}>Photos</Text>
            </View>
            <View style={[styles.statItem, styles.statDivider]}>
              <Text style={styles.statValue}>145K</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={[styles.statItem, styles.statDivider]}>
              <Text style={styles.statValue}>328</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.aboutText}>
            Passionate about capturing life's beautiful moments through my lens. Always seeking new adventures and
            creative inspiration. Let's connect and share our stories!
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.interestsContainer}>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Photography</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Travel</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Art</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Music</Text>
            </View>
            <View style={styles.interestTag}>
              <Text style={styles.interestText}>Cooking</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Photos</Text>
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
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.messageButton}>
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
      </View>
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
  moreButton: {
    padding: 5,
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
    marginBottom: 5,
  },
  profileBio: {
    fontSize: 16,
    color: "#adafbb",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#f7f7f7",
    borderRadius: 15,
    padding: 15,
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
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f3f3f3",
  },
  messageButton: {
    backgroundColor: "#e94057",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
  },
  messageButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default ProfileDetails

