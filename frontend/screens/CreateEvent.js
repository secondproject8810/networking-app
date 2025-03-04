"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"
import * as ImagePicker from "expo-image-picker"

const CreateEvent = ({ navigation }) => {
  const [title, setTitle] = useState("")
  const [date, setDate] = useState(new Date())
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [startTime, setStartTime] = useState(new Date())
  const [showStartTimePicker, setShowStartTimePicker] = useState(false)
  const [endTime, setEndTime] = useState(new Date())
  const [showEndTimePicker, setShowEndTimePicker] = useState(false)
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShowDatePicker(false)
    setDate(currentDate)
  }

  const onStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startTime
    setShowStartTimePicker(false)
    setStartTime(currentTime)
  }

  const onEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endTime
    setShowEndTimePicker(false)
    setEndTime(currentTime)
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const handleCreateEvent = () => {
    // Here you would typically send the event data to your backend
    // For now, we'll just navigate back to the Events screen
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Event</Text>
          <TouchableOpacity onPress={handleCreateEvent}>
            <Text style={styles.createButton}>Create</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.eventImage} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={40} color="#adafbb" />
              <Text style={styles.imagePlaceholderText}>Add Event Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.form}>
          <TextInput style={styles.input} placeholder="Event Title" value={title} onChangeText={setTitle} />

          <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.inputText}>{date.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && <DateTimePicker value={date} mode="date" display="default" onChange={onDateChange} />}

          <View style={styles.timeContainer}>
            <TouchableOpacity style={[styles.input, styles.timeInput]} onPress={() => setShowStartTimePicker(true)}>
              <Text style={styles.inputText}>
                {startTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </TouchableOpacity>
            {showStartTimePicker && (
              <DateTimePicker value={startTime} mode="time" display="default" onChange={onStartTimeChange} />
            )}

            <Text style={styles.timeSeparator}>to</Text>

            <TouchableOpacity style={[styles.input, styles.timeInput]} onPress={() => setShowEndTimePicker(true)}>
              <Text style={styles.inputText}>
                {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </TouchableOpacity>
            {showEndTimePicker && (
              <DateTimePicker value={endTime} mode="time" display="default" onChange={onEndTimeChange} />
            )}
          </View>

          <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Event Description"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />
        </View>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  createButton: {
    color: "#e94057",
    fontSize: 16,
    fontWeight: "600",
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#f3f3f3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  eventImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    alignItems: "center",
  },
  imagePlaceholderText: {
    marginTop: 10,
    color: "#adafbb",
    fontSize: 16,
  },
  form: {
    padding: 20,
  },
  input: {
    backgroundColor: "#f7f7f7",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  inputText: {
    fontSize: 16,
    color: "#000000",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  timeInput: {
    flex: 1,
  },
  timeSeparator: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#adafbb",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
})

export default CreateEvent

