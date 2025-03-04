"use client"

import { useState, useRef } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, SafeAreaView } from "react-native"

const { width } = Dimensions.get("window")

const onboardingData = [
  {
    id: "1",
    title: "Algorithm",
    description: "Users going through a vetting process to ensure you never match with bots.",
    image: require("../assets/onboarding1.png"),
  },
  {
    id: "2",
    title: "Matches",
    description: "We match you with people that have a similar taste in music and lifestyle.",
    image: require("../assets/onboarding2.png"),
  },
  {
    id: "3",
    title: "Premium",
    description: "Sign up today and enjoy the first month of premium benefits on us.",
    image: require("../assets/onboarding3.png"),
  },
]

const Onboarding = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef(null)

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (index === onboardingData.length - 1) {
              navigation.navigate("SignUp")
            } else {
              flatListRef.current.scrollToIndex({ index: index + 1 })
            }
          }}
        >
          <Text style={styles.buttonText}>{index === onboardingData.length - 1 ? "Create an account" : "Next"}</Text>
        </TouchableOpacity>

        {index === onboardingData.length - 1 ? (
          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.signInLink}>
            <Text style={styles.signInText}>
              Already have an account? <Text style={styles.signInTextBold}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        ) : null}

        <View style={styles.pagination}>
          {onboardingData.map((_, i) => (
            <View key={i} style={[styles.paginationDot, { backgroundColor: i === index ? "#e94057" : "#e8e6ea" }]} />
          ))}
        </View>
      </View>
    )
  }

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index)
    }
  }).current

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  slide: {
    width,
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginVertical: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#adafbb",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#e94057",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  pagination: {
    flexDirection: "row",
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  signInLink: {
    marginTop: 10,
  },
  signInText: {
    color: "#adafbb",
    fontSize: 14,
  },
  signInTextBold: {
    fontWeight: "bold",
    color: "#000000",
  },
})

export default Onboarding

