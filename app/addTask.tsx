import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker"; // Use expo's DateTimePicker
import { Picker } from "@react-native-picker/picker"; // Separate import for Picker
import Icon from "react-native-vector-icons/FontAwesome"; // Icon import (use your preferred icon library)

export default function AddTaskScreen() {
  const [taskText, setTaskText] = useState(""); // State for task input
  const [isTaskClicked, setIsTaskClicked] = useState(false); // Track if task section is clicked
  const [isCategoryVisible, setIsCategoryVisible] = useState(false); // Track if category dropdown is visible
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [notes, setNotes] = useState(""); // State for Notes
  const [startDate, setStartDate] = useState(new Date()); // State for Start Date
  const [endDate, setEndDate] = useState(new Date()); // State for End Date
  const [showStartDatePicker, setShowStartDatePicker] = useState(false); // Show date picker for start date
  const [showEndDatePicker, setShowEndDatePicker] = useState(false); // Show date picker for end date

  const categories = ["Work", "Personal", "Urgent", "Shopping", "Other"]; // Sample categories

  // Function to handle start date change
  const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setShowStartDatePicker(false); // Hide the modal after selecting the date
  };

  // Function to handle end date change
  const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setShowEndDatePicker(false); // Hide the modal after selecting the date
  };

  return (
    <View className="flex-1 justify-center items-center bg-background p-4">
      {/* Task Section with Icon */}
      <TouchableOpacity
        onPress={() => setIsTaskClicked(true)}
        className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
      >
        <View className="relative flex-row items-center">
          {/* Task Icon */}
          <Icon
            name="clock"
            size={20}
            color="#000"
            style={{ marginRight: 10 }}
          />

          {!isTaskClicked && (
            <Text className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400">
              Task
            </Text>
          )}
          {isTaskClicked && (
            <TextInput
              value={taskText}
              onChangeText={setTaskText}
              placeholder="Enter your task"
              className="text-foreground"
              style={{ paddingLeft: 10, paddingVertical: 5, flex: 1 }}
            />
          )}
        </View>
      </TouchableOpacity>

      {/* Category Section */}
      <TouchableOpacity
        onPress={() => setIsCategoryVisible(!isCategoryVisible)} // Toggle dropdown visibility
        className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
      >
        <View className="relative">
          <Text className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400">
            {selectedCategory ? selectedCategory : "Category"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Dropdown Menu for Categories */}
      {isCategoryVisible && (
        <View className="w-full p-4 border border-gray-300 rounded-lg">
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedCategory(category);
                setIsCategoryVisible(false); // Hide dropdown after selection
              }}
              className="p-2"
            >
              <Text className="text-foreground">{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Notes Section */}
      <View className="w-full mb-4 p-4 border border-gray-300 rounded-lg">
        <Text className="text-gray-400">Notes</Text>
        <TextInput
          value={notes}
          onChangeText={setNotes}
          placeholder="Enter notes"
          multiline
          numberOfLines={4}
          className="text-foreground"
          style={{ paddingLeft: 10, paddingVertical: 5, height: 100 }}
        />
      </View>

      {/* Start Date and End Date Section (Side by side) */}
      <View className="flex-row w-full mb-4">
        {/* Start Date */}
        <View className="flex-1 mr-2">
          <Text className="text-gray-400">Start Date</Text>
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            className="p-4 border border-gray-300 rounded-lg"
          >
            <Text>{startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {/* Start Date Picker Modal */}
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}
        </View>

        {/* End Date */}
        <View className="flex-1 ml-2">
          <Text className="text-gray-400">End Date</Text>
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            className="p-4 border border-gray-300 rounded-lg"
          >
            <Text>{endDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {/* End Date Picker Modal */}
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={onEndDateChange}
            />
          )}
        </View>
      </View>

      {/* Show Selected Category */}
      {selectedCategory && (
        <Text className="text-foreground mt-2">
          Selected Category: {selectedCategory}
        </Text>
      )}
    </View>
  );
}
