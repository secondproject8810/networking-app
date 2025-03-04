"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EducationQualification = ({ navigation }) => {
  const [university, setUniversity] = useState("")
  const [degree, setDegree] = useState("")
  const [fieldOfStudy, setFieldOfStudy] = useState("")
  const [startYear, setStartYear] = useState("")
  const [endYear, setEndYear] = useState("")
  const [grade, setGrade] = useState("")

  const handleContinue = () => {
    navigation.navigate("Experience")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Education & Qualification</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Add your education details</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>University/College</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter university/college name"
            value={university}
            onChangeText={setUniversity}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Degree</Text>
          <TextInput style={styles.input} placeholder="Enter your degree" value={degree} onChangeText={setDegree} />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Field of Study</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your field of study"
            value={fieldOfStudy}
            onChangeText={setFieldOfStudy}
          />
        </View>

        <View style={styles.rowInputs}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Start Year</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY"
              value={startYear}
              onChangeText={setStartYear}
              keyboardType="numeric"
            />
          </View>

          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>End Year</Text>
            <TextInput
              style={styles.input}
              placeholder="YYYY"
              value={endYear}
              onChangeText={setEndYear}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Grade/GPA</Text>
          <TextInput style={styles.input} placeholder="Enter your grade/GPA" value={grade} onChangeText={setGrade} />
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
  rowInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
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

export default EducationQualification

