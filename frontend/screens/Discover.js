"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Animated,
  PanResponder,
  ActivityIndicator,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { getProfiles } from "../services/api"

const { width, height } = Dimensions.get("window")
const CARD_WIDTH = width * 0.9
const CARD_HEIGHT = height * 0.7

const Discover = () => {
  const navigation = useNavigation()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const position = new Animated.ValueXY()

  useEffect(() => {
    loadProfiles()
  }, [])

  const loadProfiles = async () => {
    try {
      const data = await getProfiles()
      setProfiles(data)
      setError(null)
    } catch (err) {
      setError('Failed to load profiles')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const rotate = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  })

  const likeOpacity = position.x.interpolate({
    inputRange: [0, width / 4],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  const dislikeOpacity = position.x.interpolate({
    inputRange: [-width / 4, 0],
    outputRange: [1, 0],
    extrapolate: "clamp",
  })

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0.5, 1],
    extrapolate: "clamp",
  })

  const nextCardScale = position.x.interpolate({
    inputRange: [-width / 2, 0, width / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: "clamp",
  })

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      position.setValue({ x: gesture.dx, y: gesture.dy })
    },
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 120) {
        Animated.spring(position, {
          toValue: { x: width + 100, y: gesture.dy },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(currentIndex + 1)
          position.setValue({ x: 0, y: 0 })
        })
      } else if (gesture.dx < -120) {
        Animated.spring(position, {
          toValue: { x: -width - 100, y: gesture.dy },
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(currentIndex + 1)
          position.setValue({ x: 0, y: 0 })
        })
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 4,
          useNativeDriver: false,
        }).start()
      }
    },
  })

  const handleProfileTap = (user) => {
    navigation.navigate("UserProfileDetails", { user })
  }

  const renderCards = () => {
    if (currentIndex >= profiles.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.noMoreCardsText}>No more profiles to show</Text>
          <TouchableOpacity style={styles.button} onPress={() => setCurrentIndex(0)}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>
        </View>
      )
    }

    return profiles
      .map((item, i) => {
        if (i < currentIndex) {
          return null
        } else if (i === currentIndex) {
          return (
            <Animated.View
              key={item.id}
              style={[
                styles.card,
                {
                  transform: [{ rotate }, ...position.getTranslateTransform()],
                },
              ]}
              {...panResponder.panHandlers}
            >
              <TouchableOpacity onPress={() => handleProfileTap(item)} activeOpacity={0.9}>
                <Image source={item.image} style={styles.cardImage} />
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{item.name}</Text>
                  <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={16} color="#adafbb" />
                    <Text style={styles.cardLocation}>{item.location}</Text>
                  </View>
                  <Text style={styles.cardDistance}>{item.distance}</Text>
                  <Text style={styles.cardBio}>{item.bio}</Text>
                  <View style={styles.interestsContainer}>
                    {item.interests.map((interest, index) => (
                      <View key={index} style={styles.interestTag}>
                        <Text style={styles.interestText}>{interest}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </TouchableOpacity>

              <Animated.View style={[styles.likeContainer, { opacity: likeOpacity }]}>
                <Text style={styles.likeText}>LIKE</Text>
              </Animated.View>

              <Animated.View style={[styles.dislikeContainer, { opacity: dislikeOpacity }]}>
                <Text style={styles.dislikeText}>NOPE</Text>
              </Animated.View>
            </Animated.View>
          )
        } else {
          return (
            <Animated.View
              key={item.id}
              style={[
                styles.card,
                {
                  opacity: nextCardOpacity,
                  transform: [{ scale: nextCardScale }],
                  zIndex: -i,
                },
              ]}
            >
              <Image source={item.image} style={styles.cardImage} />
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                <View style={styles.locationContainer}>
                  <Ionicons name="location-outline" size={16} color="#adafbb" />
                  <Text style={styles.cardLocation}>{item.location}</Text>
                </View>
                <Text style={styles.cardDistance}>{item.distance}</Text>
              </View>
            </Animated.View>
          )
        }
      })
      .reverse()
  }

  const handleLike = () => {
    // Simulate a match (you would typically check this on the backend)
    const isMatch = Math.random() > 0.5

    if (isMatch) {
      navigation.navigate("MatchScreen", { matchedUser: profiles[currentIndex] })
    } else {
      // Move to the next profile
      setCurrentIndex(currentIndex + 1)
    }
  }

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
        <TouchableOpacity style={styles.retryButton} onPress={loadProfiles}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate("FilterPreferences")}>
          <Ionicons name="options-outline" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={styles.cardContainer}>{renderCards()}</View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.circleButton, styles.dislikeButton]}
          onPress={() => setCurrentIndex(currentIndex + 1)}
        >
          <Ionicons name="close" size={30} color="#e94057" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.circleButton, styles.superlikeButton]}
          onPress={() => setCurrentIndex(currentIndex + 1)}
        >
          <Ionicons name="star" size={30} color="#2934d0" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.circleButton, styles.likeButton]} onPress={handleLike}>
          <Ionicons name="heart" size={30} color="#e94057" />
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
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
  filterButton: {
    padding: 5,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  cardInfo: {
    padding: 15,
  },
  cardName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000000",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  cardLocation: {
    fontSize: 16,
    color: "#adafbb",
    marginLeft: 5,
  },
  cardDistance: {
    fontSize: 14,
    color: "#adafbb",
    marginTop: 5,
  },
  cardBio: {
    fontSize: 14,
    color: "#323755",
    marginTop: 10,
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
  likeContainer: {
    position: "absolute",
    top: 50,
    left: 40,
    transform: [{ rotate: "-30deg" }],
    borderWidth: 4,
    borderRadius: 10,
    borderColor: "#27ae60",
    padding: 10,
  },
  likeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#27ae60",
  },
  dislikeContainer: {
    position: "absolute",
    top: 50,
    right: 40,
    transform: [{ rotate: "30deg" }],
    borderWidth: 4,
    borderRadius: 10,
    borderColor: "#e94057",
    padding: 10,
  },
  dislikeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#e94057",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 15,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  circleButton: {
    backgroundColor: "#ffffff",
  },
  dislikeButton: {
    borderWidth: 1,
    borderColor: "#e94057",
  },
  superlikeButton: {
    borderWidth: 1,
    borderColor: "#2934d0",
  },
  likeButton: {
    borderWidth: 1,
    borderColor: "#e94057",
  },
  noMoreCards: {
    alignItems: "center",
    justifyContent: "center",
  },
  noMoreCardsText: {
    fontSize: 18,
    color: "#323755",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
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

export default Discover

