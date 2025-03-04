"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Switch } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const Experience = ({ navigation }) => {
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [description, setDescription] = useState("")
  const [isCurrentlyWorking, setIsCurrentlyWorking] = useState(false)

  const handleContinue = () => {
    navigation.navigate("Interests")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Experience</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Add your work experience</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Company</Text>
          <TextInput style={styles.input} placeholder="Enter company name" value={company} onChangeText={setCompany} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Position</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your position"
            value={position}
            onChangeText={setPosition}
          />
        </View>

        <View style={styles.rowInputs}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Start Date</Text>
            <TextInput style={styles.input} placeholder="MM/YYYY" value={startDate} onChangeText={setStartDate} />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>End Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YYYY"
              value={endDate}
              onChangeText={setEndDate}
              editable={!isCurrentlyWorking}
            />
          </View>
        </View>

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>I am currently working here</Text>
          <Switch
            value={isCurrentlyWorking}
            onValueChange={setIsCurrentlyWorking}
            trackColor={{ false: "#e8e6ea", true: "#e94057" }}
            thumbColor={"#ffffff"}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your responsibilities and achievements"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
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
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#adafbb",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  textArea: {
    height: 120,
  },
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: "#323755",
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
  continueButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default Experience

