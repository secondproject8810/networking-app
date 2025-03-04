"use client"

import { useEffect } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Animated } from "react-native"

const MatchScreen = ({ navigation, route }) => {
  const { matchedUser } = route.params || {
    matchedUser: {
      name: "Jessica Lee",
      image: require("../assets/profile2.png"),
    },
  }

  const scaleAnim = new Animated.Value(0.5)
  const opacityAnim = new Animated.Value(0)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [opacityAnim, scaleAnim])

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: opacityAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.imagesContainer}>
          <Image source={require("../assets/profile-main.png")} style={[styles.profileImage, styles.leftImage]} />
          <Image source={matchedUser.image} style={[styles.profileImage, styles.rightImage]} />
        </View>

        <Text style={styles.matchTitle}>It's a match!</Text>
        <Text style={styles.matchSubtitle}>You and {matchedUser.name} have liked each other</Text>

        <TouchableOpacity
          style={styles.messageButton}
          onPress={() => {
            navigation.navigate("Chat", { user: matchedUser })
          }}
        >
          <Text style={styles.messageButtonText}>Send Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.keepSwipingButton}
          onPress={() => {
            navigation.navigate("Discover")
          }}
        >
          <Text style={styles.keepSwipingButtonText}>Keep Swiping</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "80%",
    alignItems: "center",
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  leftImage: {
    marginRight: -15,
  },
  rightImage: {
    marginLeft: -15,
  },
  matchTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  matchSubtitle: {
    fontSize: 16,
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.8,
  },
  messageButton: {
    backgroundColor: "#e94057",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 15,
    width: "100%",
    alignItems: "center",
  },
  messageButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  keepSwipingButton: {
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: "100%",
    alignItems: "center",
  },
  keepSwipingButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default MatchScreen

