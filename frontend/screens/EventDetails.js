import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import MapView, { Marker } from "react-native-maps"

const attendees = [
  {
    id: "1",
    name: "Jessica Lee",
    image: require("../assets/profile2.png"),
  },
  {
    id: "2",
    name: "Michael Chen",
    image: require("../assets/profile3.png"),
  },
  {
    id: "3",
    name: "Sarah Johnson",
    image: require("../assets/profile4.png"),
  },
]

const EventDetails = ({ route, navigation }) => {
  const { event } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Event Details</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <Image source={event.image} style={styles.eventImage} />

        <View style={styles.eventContent}>
          <Text style={styles.eventTitle}>{event.title}</Text>

          <View style={styles.eventInfoSection}>
            <View style={styles.eventInfo}>
              <Ionicons name="calendar-outline" size={20} color="#adafbb" />
              <Text style={styles.eventInfoText}>{event.date}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Ionicons name="time-outline" size={20} color="#adafbb" />
              <Text style={styles.eventInfoText}>{event.time}</Text>
            </View>
            <View style={styles.eventInfo}>
              <Ionicons name="location-outline" size={20} color="#adafbb" />
              <Text style={styles.eventInfoText}>{event.location}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Event</Text>
            <Text style={styles.aboutText}>
              Join us for an unforgettable night at Diablo Club! Experience amazing music, great atmosphere, and meet
              new people. This is one of the most popular events in the city, so make sure to RSVP early.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
                title={event.title}
                description={event.location}
              />
            </MapView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Attendees</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.attendeesContainer}>
              {attendees.map((attendee) => (
                <View key={attendee.id} style={styles.attendeeItem}>
                  <Image source={attendee.image} style={styles.attendeeImage} />
                  <Text style={styles.attendeeName}>{attendee.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.attendeesInfo}>
          <Text style={styles.attendeesCount}>{event.attendees} going</Text>
        </View>
        <TouchableOpacity style={[styles.goingButton, event.going ? styles.goingButtonActive : {}]}>
          <Text style={[styles.goingButtonText, event.going ? styles.goingButtonTextActive : {}]}>
            {event.going ? "Going" : "Join"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  backButton: {
    position: 'absolute',
    left: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  shareButton: {
    position: 'absolute',
    right: 15,
  },
  eventImage: {
    width: '100%',
    height: 200,
  },
  eventContent: {
    padding: 20,
  },
  eventTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 20,
  },
  eventInfoSection: {
    backgroundColor: '#f7f7f7',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  eventInfoText: {
    fontSize: 16,
    color: '#323755',
    marginLeft: 10,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  aboutText: {
    fontSize: 16,
    color: '#323755',
    lineHeight: 24,
  },
  map: {
    height: 200,
    borderRadius: 15,
    marginTop: 10,
  },
  seeAllText: {
    fontSize: 14,
    color: '#e94057',
    fontWeight: '600',
  },
  attendeesContainer: {
    flexDirection: 'row',
  },
  attendeeItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  attendeeImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  attendeeName: {
    fontSize: 14,
    color: '#323755',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f3f3',
  },
  goingButton: {
    backgroundColor: '#e94057',
    borderRadius: 30,
    padding: 15,
  },
})

export default EventDetails
