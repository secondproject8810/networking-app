"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Switch } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import Slider from "@react-native-community/slider"

const FilterPreferences = ({ navigation }) => {
  const [distance, setDistance] = useState(15)
  const [ageRange, setAgeRange] = useState([18, 35])
  const [showOnlyOnline, setShowOnlyOnline] = useState(false)
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(true)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            setDistance(15)
            setAgeRange([18, 35])
            setShowOnlyOnline(false)
            setShowVerifiedOnly(true)
          }}
        >
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Distance</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={1}
              maximumValue={100}
              value={distance}
              onValueChange={setDistance}
              minimumTrackTintColor="#e94057"
              maximumTrackTintColor="#e8e6ea"
              thumbTintColor="#e94057"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderValue}>{Math.round(distance)} km</Text>
              <Text style={styles.sliderRange}>1 km - 100 km</Text>
            </View>
          </View>
        </View>

        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Age Range</Text>
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={18}
              maximumValue={60}
              value={ageRange[0]}
              onValueChange={(value) => setAgeRange([value, ageRange[1]])}
              minimumTrackTintColor="#e8e6ea"
              maximumTrackTintColor="#e8e6ea"
              thumbTintColor="#e94057"
            />
            <Slider
              style={[styles.slider, styles.secondSlider]}
              minimumValue={18}
              maximumValue={60}
              value={ageRange[1]}
              onValueChange={(value) => setAgeRange([ageRange[0], value])}
              minimumTrackTintColor="#e94057"
              maximumTrackTintColor="#e8e6ea"
              thumbTintColor="#e94057"
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderValue}>
                {Math.round(ageRange[0])} - {Math.round(ageRange[1])}
              </Text>
              <Text style={styles.sliderRange}>18 - 60+</Text>
            </View>
          </View>
        </View>

        <View style={styles.switchSection}>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Show only online</Text>
            <Switch
              value={showOnlyOnline}
              onValueChange={setShowOnlyOnline}
              trackColor={{ false: "#e8e6ea", true: "#e94057" }}
              thumbColor={"#ffffff"}
            />
          </View>

          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Verified profiles only</Text>
            <Switch
              value={showVerifiedOnly}
              onValueChange={setShowVerifiedOnly}
              trackColor={{ false: "#e8e6ea", true: "#e94057" }}
              thumbColor={"#ffffff"}
            />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={() => navigation.goBack()}>
          <Text style={styles.applyButtonText}>Apply</Text>
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
  resetButton: {
    padding: 5,
  },
  resetButtonText: {
    color: "#e94057",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  filterSection: {
    marginBottom: 30,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 15,
  },
  sliderContainer: {
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  secondSlider: {
    marginTop: -20,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sliderValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#323755",
  },
  sliderRange: {
    fontSize: 14,
    color: "#adafbb",
  },
  switchSection: {
    marginBottom: 30,
  },
  switchItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  applyButton: {
    backgroundColor: "#e94057",
    borderRadius: 30,
    padding: 15,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default FilterPreferences

