"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const EditProfile = ({ navigation }) => {
  const [fullName, setFullName] = useState("Jessica Parker")
  const [bio, setBio] = useState("Photographer & Designer")
  const [dateOfBirth, setDateOfBirth] = useState("15/08/1995")
  const [gender, setGender] = useState("Female")
  const [location, setLocation] = useState("New York, USA")

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileImageContainer}>
          <Image source={require("../assets/profile-main.png")} style={styles.profileImage} />
          <TouchableOpacity style={styles.changePhotoButton}>
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio</Text>
            <TextInput style={[styles.input, styles.bioInput]} value={bio} onChangeText={setBio} multiline />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput style={styles.input} value={dateOfBirth} onChangeText={setDateOfBirth} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            <TextInput style={styles.input} value={gender} onChangeText={setGender} />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Location</Text>
            <TextInput style={styles.input} value={location} onChangeText={setLocation} />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
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
  saveButton: {
    padding: 5,
  },
  saveButtonText: {
    color: "#e94057",
    fontSize: 16,
    fontWeight: "600",
  },
  profileImageContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  changePhotoButton: {
    backgroundColor: "#f3f3f3",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  changePhotoText: {
    color: "#e94057",
    fontSize: 14,
    fontWeight: "600",
  },
  form: {
    padding: 20,
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
  bioInput: {
    height: 100,
    textAlignVertical: "top",
  },
  logoutButton: {
    margin: 20,
    backgroundColor: "#f3f3f3",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#e94057",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default EditProfile

