"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const interestsList = [
  { id: "1", name: "Photography", icon: "camera-outline" },
  { id: "2", name: "Shopping", icon: "cart-outline" },
  { id: "3", name: "Karaoke", icon: "mic-outline" },
  { id: "4", name: "Yoga", icon: "fitness-outline" },
  { id: "5", name: "Cooking", icon: "restaurant-outline" },
  { id: "6", name: "Tennis", icon: "tennisball-outline" },
  { id: "7", name: "Run", icon: "walk-outline" },
  { id: "8", name: "Swimming", icon: "water-outline" },
  { id: "9", name: "Art", icon: "color-palette-outline" },
  { id: "10", name: "Traveling", icon: "airplane-outline" },
  { id: "11", name: "Music", icon: "musical-notes-outline" },
  { id: "12", name: "Drink", icon: "wine-outline" },
  { id: "13", name: "Video games", icon: "game-controller-outline" },
]

const Interests = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([])

  const toggleInterest = (id) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id))
    } else {
      setSelectedInterests([...selectedInterests, id])
    }
  }

  const handleContinue = () => {
    navigation.navigate("MainTabs")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Interests</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Select your interests</Text>
        <Text style={styles.sectionSubtitle}>Select a minimum of 3 interests</Text>

        <View style={styles.interestsGrid}>
          {interestsList.map((interest) => (
            <TouchableOpacity
              key={interest.id}
              style={[styles.interestItem, selectedInterests.includes(interest.id) && styles.selectedInterestItem]}
              onPress={() => toggleInterest(interest.id)}
            >
              <Ionicons
                name={interest.icon}
                size={24}
                color={selectedInterests.includes(interest.id) ? "#ffffff" : "#323755"}
              />
              <Text
                style={[styles.interestText, selectedInterests.includes(interest.id) && styles.selectedInterestText]}
              >
                {interest.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.continueButton, selectedInterests.length < 3 && styles.disabledButton]}
          onPress={handleContinue}
          disabled={selectedInterests.length < 3}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#adafbb",
    marginBottom: 20,
  },
  interestsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  interestItem: {
    width: "30%",
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  selectedInterestItem: {
    backgroundColor: "#e94057",
  },
  interestText: {
    fontSize: 14,
    color: "#323755",
    marginTop: 5,
    textAlign: "center",
  },
  selectedInterestText: {
    color: "#ffffff",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f3f3f3",
  },
  continueButton: {
    backgroundColor: "#e94057",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#e8e6ea",
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default Interests

