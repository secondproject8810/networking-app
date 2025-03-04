"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const GenderSelection = ({ navigation }) => {
  const [selectedGender, setSelectedGender] = useState(null)

  const genders = [
    { id: "woman", label: "Woman" },
    { id: "man", label: "Man" },
    { id: "other", label: "Other" },
  ]

  const handleContinue = () => {
    navigation.navigate("ProfilePictureUpload")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>I am a</Text>

        {genders.map((gender) => (
          <TouchableOpacity
            key={gender.id}
            style={[styles.genderButton, selectedGender === gender.id && styles.selectedGenderButton]}
            onPress={() => setSelectedGender(gender.id)}
          >
            <Text style={[styles.genderButtonText, selectedGender === gender.id && styles.selectedGenderButtonText]}>
              {gender.label}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.continueButton, !selectedGender && styles.disabledButton]}
          onPress={handleContinue}
          disabled={!selectedGender}
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
    padding: 15,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 30,
  },
  genderButton: {
    backgroundColor: "#f3f3f3",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  selectedGenderButton: {
    backgroundColor: "#e94057",
  },
  genderButtonText: {
    fontSize: 16,
    color: "#000000",
  },
  selectedGenderButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  continueButton: {
    backgroundColor: "#e94057",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 15,
  },
  disabledButton: {
    backgroundColor: "#f3f3f3",
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default GenderSelection

