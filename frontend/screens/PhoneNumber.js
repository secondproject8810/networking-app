"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"

const PhoneNumber = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("")

  const handleContinue = () => {
    navigation.navigate("OTPVerification")
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color="#000000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>My mobile</Text>
          <Text style={styles.subtitle}>
            Please enter your valid phone number. We will send you a 4-digit code to verify your account.
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.countryCode}>
              <Text style={styles.countryCodeText}>+1</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <TouchableOpacity
            style={[styles.continueButton, !phoneNumber && styles.disabledButton]}
            onPress={handleContinue}
            disabled={!phoneNumber}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#adafbb",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  countryCode: {
    backgroundColor: "#f3f3f3",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  countryCodeText: {
    fontSize: 16,
    color: "#000000",
  },
  input: {
    flex: 1,
    backgroundColor: "#f3f3f3",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: "#e94057",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
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

export default PhoneNumber

