import { useState, useEffect } from "react"
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import MapView, { Marker } from "react-native-maps"
import { useNavigation } from "@react-navigation/native"
import { getEvents, joinEvent } from "../services/api"

const Events = () => {
  const navigation = useNavigation()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      const data = await getEvents()
      setEvents(data)
      setError(null)
    } catch (err) {
      setError('Failed to load events')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinEvent = async (eventId) => {
    try {
      await joinEvent(eventId)
      // Refresh events list after joining
      loadEvents()
    } catch (err) {
      console.error('Failed to join event:', err)
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.eventCard} onPress={() => navigation.navigate("EventDetails", { event: item })}>
      <Image source={{ uri: item.image }} style={styles.eventImage} />
      <View style={styles.eventContent}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <View style={styles.eventInfo}>
          <Ionicons name="calendar-outline" size={16} color="#adafbb" />
          <Text style={styles.eventInfoText}>{item.date}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Ionicons name="time-outline" size={16} color="#adafbb" />
          <Text style={styles.eventInfoText}>{item.time}</Text>
        </View>
        <View style={styles.eventInfo}>
          <Ionicons name="location-outline" size={16} color="#adafbb" />
          <Text style={styles.eventInfoText}>{item.location}</Text>
        </View>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: item.coordinate.latitude,
            longitude: item.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={item.coordinate} />
        </MapView>
        <View style={styles.eventFooter}>
          <View style={styles.attendeesInfo}>
            <Text style={styles.attendeesCount}>{item.attendees} going</Text>
          </View>
          <TouchableOpacity
            style={[styles.goingButton, item.going ? styles.goingButtonActive : {}]}
            onPress={() => handleJoinEvent(item.id)}
          >
            <Text style={[styles.goingButtonText, item.going ? styles.goingButtonTextActive : {}]}>
              {item.going ? "Going" : "Join"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e94057" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={loadEvents}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.eventsList}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate("CreateEvent")}>
        <Ionicons name="add" size={24} color="#ffffff" />
      </TouchableOpacity>
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
  filterButton: {
    position: "absolute",
    right: 15,
  },
  eventsList: {
    padding: 15,
  },
  eventCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
  },
  eventImage: {
    width: "100%",
    height: 150,
  },
  eventContent: {
    padding: 15,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  eventInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  eventInfoText: {
    fontSize: 14,
    color: "#323755",
    marginLeft: 8,
  },
  map: {
    height: 150,
    marginVertical: 10,
    borderRadius: 10,
  },
  eventFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#f3f3f3",
  },
  attendeesInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  attendeesCount: {
    fontSize: 14,
    color: "#323755",
    fontWeight: "500",
  },
  goingButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e94057",
  },
  goingButtonActive: {
    backgroundColor: "#e94057",
  },
  goingButtonText: {
    fontSize: 14,
    color: "#e94057",
    fontWeight: "600",
  },
  goingButtonTextActive: {
    color: "#ffffff",
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#e94057",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#e94057',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#e94057',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default Events

