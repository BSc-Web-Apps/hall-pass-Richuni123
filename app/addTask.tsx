import React, { useRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Svg, { Path } from "react-native-svg";

export default function AddTaskScreen() {
  const [taskText, setTaskText] = useState("");
  const [isTaskClicked, setIsTaskClicked] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const taskInputRef = useRef<TextInput | null>(null);

  const [isNotesClicked, setIsNotesClicked] = useState(false); // State to track focus
  const notesInputRef = useRef<TextInput | null>(null); // Reference for the input

  const categories = ["Work", "Personal", "Urgent", "Shopping", "Other"];

  const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setShowStartDatePicker(false);
  };

  const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setShowEndDatePicker(false);
  };

  const pencilIcon = (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M17.2151 0.78492C16.7087 0.278462 16.0355 0 15.3191 0C14.6027 0 13.9296 0.278462 13.4232 0.78492L1.93378 12.2749C1.88692 12.3217 1.85178 12.3776 1.82925 12.4398L0.0269904 17.3962C-0.0324841 17.5611 0.00806671 17.745 0.131521 17.8684C0.217129 17.954 0.332473 18 0.450521 18C0.501885 18 0.554151 17.991 0.604614 17.973L5.56082 16.1706C5.623 16.1481 5.67887 16.112 5.72573 16.0661L17.2151 4.57615C17.7215 4.06969 18 3.39652 18 2.68008C18 1.96365 17.7215 1.29048 17.2151 0.784019V0.78492ZM5.15892 15.3587L1.20386 16.7969L2.64207 12.8417L12.6158 2.86753L15.1326 5.3845L5.15892 15.3587ZM16.5771 3.93902L15.7697 4.74647L13.2529 2.2295L14.0603 1.42205C14.3964 1.08591 14.8433 0.901172 15.3182 0.901172C15.7931 0.901172 16.2401 1.08591 16.5762 1.42205C16.9123 1.75819 17.0971 2.20517 17.0971 2.68008C17.0971 3.155 16.9123 3.60198 16.5762 3.93812L16.5771 3.93902Z"
        fill="#EBD5D1"
      />
    </Svg>
  );

  const timeIcon = (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
      <Path
        d="M9.5 9C9.5 9.82843 8.82843 10.5 8 10.5C7.17157 10.5 6.5 9.82843 6.5 9C6.5 8.44479 6.80165 7.96003 7.25 7.70067V4.875C7.25 4.46079 7.58579 4.125 8 4.125C8.41421 4.125 8.75 4.46079 8.75 4.875V7.70067C9.19835 7.96003 9.5 8.44479 9.5 9Z"
        fill="#EBD5D1"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C8.41421 0 8.75 0.335786 8.75 0.75V1.5C8.75 1.51239 8.7497 1.5247 8.74911 1.53694C10.2579 1.68656 11.6351 2.2833 12.7465 3.19279L13.0947 2.84467C13.3876 2.55178 13.8624 2.55178 14.1553 2.84467C14.4482 3.13756 14.4482 3.61244 14.1553 3.90533L13.8072 4.25345C14.8652 5.54635 15.5 7.19905 15.5 9C15.5 13.1421 12.1421 16.5 8 16.5C3.85786 16.5 0.5 13.1421 0.5 9C0.5 5.11068 3.46047 1.91282 7.25089 1.53694C7.2503 1.5247 7.25 1.51239 7.25 1.5V0.75C7.25 0.335786 7.58579 0 8 0ZM8 3C4.68629 3 2 5.68629 2 9C2 12.3137 4.68629 15 8 15C11.3137 15 14 12.3137 14 9C14 5.68629 11.3137 3 8 3Z"
        fill="#EBD5D1"
      />
    </Svg>
  );
  const categoryIcon = (
    <Svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <Path
        d="M0.5 1.45654H6.45652V8.10872H0.5V1.45654ZM9.54348 1.45654H15.5V8.10872H9.54348V1.45654ZM0.5 11.8913H6.45652V18.5435H0.5V11.8913ZM9.54348 11.8913H15.5V18.5435H9.54348V11.8913Z"
        stroke="#EBD5D1"
      />
    </Svg>
  );

  return (
    <View className="flex-1 justify-center items-center bg-background p-4">
      {/* Task Section */}
      <TouchableOpacity
        onPress={() => {
          setIsTaskClicked(true);
          taskInputRef.current?.focus(); // Automatically focus input
        }}
        className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
      >
        <View className="relative flex-row items-center">
          {timeIcon}

          {/* Conditionally render the "Task" text based on the input focus */}
          {!isTaskClicked && <Text className="ml-2 text-gray-400">Task</Text>}

          <TextInput
            ref={taskInputRef}
            value={taskText}
            onChangeText={setTaskText}
            placeholder="Enter your task"
            className="text-foreground"
            style={{ paddingLeft: 10, paddingVertical: 5 }}
            onFocus={() => setIsTaskClicked(true)} // Focus handler to hide the text
            onBlur={() => setIsTaskClicked(false)} // Blur handler to show the text when input loses focus
          />
        </View>
      </TouchableOpacity>

      {/* Category Section */}
      <TouchableOpacity
        onPress={() => setIsCategoryVisible(!isCategoryVisible)}
        className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
      >
        <View className="flex-row items-center">
          {categoryIcon}
          <Text className="ml-2 text-orange-400">
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
                setIsCategoryVisible(false);
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
        <TouchableOpacity
          onPress={() => {
            setIsNotesClicked(true);
            notesInputRef.current?.focus(); // Automatically focus input
          }}
          className="w-full"
        >
          <View className="relative flex-row items-center">
            {pencilIcon}

            {/* Conditionally render the "Notes" text based on the input focus */}
            {!isNotesClicked && (
              <Text className="ml-2 text-gray-400">Notes</Text>
            )}

            <TextInput
              ref={notesInputRef}
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter notes"
              multiline
              numberOfLines={4}
              className="text-foreground"
              style={{ paddingLeft: 10, paddingVertical: 5, height: 50 }}
              onFocus={() => setIsNotesClicked(true)} // Focus handler to hide the text
              onBlur={() => setIsNotesClicked(false)} // Blur handler to show the text when input loses focus
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Start Date and End Date Section */}
      <View className="flex-row w-full mb-4">
        {/* Start Date */}
        <View className="flex-1 mr-2">
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            className="p-4 border border-gray-300 rounded-lg bg-orange-300"
          >
            <View className="relative flex-row items-center">
              {!startDate && (
                <Text className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
                  Start Date
                </Text>
              )}
              {startDate && (
                <Text className="text-black">
                  {startDate instanceof Date && !isNaN(startDate.getTime())
                    ? startDate.toLocaleDateString()
                    : "Invalid Date"}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate ?? new Date()}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}
        </View>

        {/* End Date */}
        <View className="flex-1 ml-2">
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            className="p-4 border border-gray-300 rounded-lg bg-orange-300"
          >
            <View className="relative flex-row items-center">
              {!endDate && (
                <Text className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
                  End Date
                </Text>
              )}
              {endDate && (
                <Text className="text-black">
                  {endDate instanceof Date && !isNaN(endDate.getTime())
                    ? endDate.toLocaleDateString()
                    : "Invalid Date"}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={onEndDateChange}
            />
          )}
        </View>
      </View>
    </View>
  );
}
