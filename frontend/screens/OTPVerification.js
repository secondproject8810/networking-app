"use client"

import { useState, useRef } from "react"
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

const OTPVerification = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""])
  const inputRefs = useRef([])

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value !== "" && index < 3) {
      inputRefs.current[index + 1].focus()
    }
  }

  const isOtpComplete = otp.every((digit) => digit !== "")

  const handleVerification = () => {
    navigation.navigate("GenderSelection")
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
          <Text style={styles.title}>00:42</Text>
          <Text style={styles.subtitle}>Type the verification code we've sent you</Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                keyboardType="number-pad"
                maxLength={1}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[styles.continueButton, !isOtpComplete && styles.disabledButton]}
            onPress={handleVerification}
            disabled={!isOtpComplete}
          >
            <Text style={styles.continueButtonText}>Verify</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resendButton}>
            <Text style={styles.resendButtonText}>Send again</Text>
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
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#e94057",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#adafbb",
    marginBottom: 30,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#e8e6ea",
    borderRadius: 15,
    fontSize: 24,
    textAlign: "center",
    marginHorizontal: 5,
  },
  continueButton: {
    backgroundColor: "#e94057",
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 100,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#f3f3f3",
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  resendButton: {
    padding: 10,
  },
  resendButtonText: {
    color: "#e94057",
    fontSize: 14,
    fontWeight: "600",
  },
})

export default OTPVerification

