"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const DatePicker = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(15)
  const [selectedMonth, setSelectedMonth] = useState("MAY")
  const [selectedYear, setSelectedYear] = useState(2023)

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

  const renderCalendarHeader = () => (
    <View style={styles.calendarHeader}>
      <TouchableOpacity>
        <Ionicons name="chevron-back" size={24} color="#000000" />
      </TouchableOpacity>
      <Text style={styles.monthYearText}>
        {selectedMonth} {selectedYear}
      </Text>
      <TouchableOpacity>
        <Ionicons name="chevron-forward" size={24} color="#000000" />
      </TouchableOpacity>
    </View>
  )

  const renderDaysOfWeek = () => (
    <View style={styles.daysOfWeek}>
      <Text style={styles.dayOfWeekText}>S</Text>
      <Text style={styles.dayOfWeekText}>M</Text>
      <Text style={styles.dayOfWeekText}>T</Text>
      <Text style={styles.dayOfWeekText}>W</Text>
      <Text style={styles.dayOfWeekText}>T</Text>
      <Text style={styles.dayOfWeekText}>F</Text>
      <Text style={styles.dayOfWeekText}>S</Text>
    </View>
  )

  const renderCalendarDays = () => {
    // This is a simplified calendar grid
    // In a real app, you would calculate the actual days based on the month and year
    const calendarDays = []
    let dayCounter = 1

    for (let i = 0; i < 5; i++) {
      const week = []
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < 3) || (i === 4 && j > 2)) {
          // Empty cells for days not in current month
          week.push(<View key={`empty-${i}-${j}`} style={styles.dayCell} />)
        } else if (dayCounter <= 31) {
          const isSelected = dayCounter === selectedDate
          week.push(
            <TouchableOpacity
              key={dayCounter}
              style={[styles.dayCell, isSelected && styles.selectedDayCell]}
              onPress={() => setSelectedDate(dayCounter)}
            >
              <Text style={[styles.dayText, isSelected && styles.selectedDayText]}>{dayCounter}</Text>
            </TouchableOpacity>,
          )
          dayCounter++
        }
      }
      calendarDays.push(
        <View key={`week-${i}`} style={styles.weekRow}>
          {week}
        </View>,
      )
    }

    return <View style={styles.calendarGrid}>{calendarDays}</View>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Date</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.calendarContainer}>
        {renderCalendarHeader()}
        {renderDaysOfWeek()}
        {renderCalendarDays()}
      </View>

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => {
          // Pass the selected date back to the previous screen
          if (route.params?.onSelectDate) {
            route.params.onSelectDate(`${selectedDate} ${selectedMonth} ${selectedYear}`)
          }
          navigation.goBack()
        }}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
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
    width: 34, // Same width as the back button for balance
  },
  calendarContainer: {
    flex: 1,
    padding: 20,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
  },
  daysOfWeek: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  dayOfWeekText: {
    fontSize: 14,
    color: "#adafbb",
    width: 30,
    textAlign: "center",
  },
  calendarGrid: {
    flex: 1,
  },
  weekRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  dayCell: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  selectedDayCell: {
    backgroundColor: "#e94057",
  },
  dayText: {
    fontSize: 14,
    color: "#000000",
  },
  selectedDayText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  confirmButton: {
    backgroundColor: "#e94057",
    margin: 20,
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default DatePicker

