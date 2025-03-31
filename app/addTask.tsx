import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
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

  const categories = ["Work", "Personal", "Urgent", "Shopping", "Other"];

  const pencilIcon = (
    <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <Path
        d="M17.2151 0.78492C16.7087 0.278462 16.0355 0 15.3191 0C14.6027 0 13.9296 0.278462 13.4232 0.78492L1.93378 12.2749C1.88692 12.3217 1.85178 12.3776 1.82925 12.4398L0.0269904 17.3962C-0.0324841 17.5611 0.00806671 17.745 0.131521 17.8684C0.217129 17.954 0.332473 18 0.450521 18C0.501885 18 0.554151 17.991 0.604614 17.973L5.56082 16.1706C5.623 16.1481 5.67887 16.112 5.72573 16.0661L17.2151 4.57615C17.7215 4.06969 18 3.39652 18 2.68008C18 1.96365 17.7215 1.29048 17.2151 0.784019V0.78492ZM5.15892 15.3587L1.20386 16.7969L2.64207 12.8417L12.6158 2.86753L15.1326 5.3845L5.15892 15.3587ZM16.5771 3.93902L15.7697 4.74647L13.2529 2.2295L14.0603 1.42205C14.3964 1.08591 14.8433 0.901172 15.3182 0.901172C15.7931 0.901172 16.2401 1.08591 16.5762 1.42205C16.9123 1.75819 17.0971 2.20517 17.0971 2.68008C17.0971 3.155 16.9123 3.60198 16.5762 3.93812L16.5771 3.93902Z"
        fill="#EBD5D1"
      />
    </Svg>
  );

  const categoriesIcon = (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M12.75 0.5C13.1642 0.5 13.5 0.83579 13.5 1.25V14.75C13.5 15.1642 13.1642 15.5 12.75 15.5H3.25C2.83579 15.5 2.5 15.1642 2.5 14.75V1.25C2.5 0.83579 2.83579 0.5 3.25 0.5H12.75ZM12.25 1H3.75C3.33579 1 3 1.33579 3 1.75V14.25C3 14.6642 3.33579 15 3.75 15H12.25C12.6642 15 13 14.6642 13 14.25V1.75C13 1.33579 12.6642 1 12.25 1Z"
        fill="#EBD5D1"
      />
    </Svg>
  );

  // Start Date and End Date Picker Handlers
  const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "dismissed") {
      setShowStartDatePicker(false);
      return;
    }
    if (selectedDate) setStartDate(selectedDate);
    setShowStartDatePicker(false);
  };

  const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "dismissed") {
      setShowEndDatePicker(false);
      return;
    }
    if (selectedDate) setEndDate(selectedDate);
    setShowEndDatePicker(false);
  };

  return (
    <View className="flex-1 justify-center items-center bg-background p-4">
      {/* Task Section */}
      <View className="w-full mb-4 p-4 border border-gray-300 rounded-lg">
        <TextInput
          value={taskText}
          onChangeText={setTaskText}
          placeholder="Enter Task"
          className="text-black"
        />
      </View>

      {/* Category Section */}
      <View className="w-full mb-4 p-4 border border-gray-300 rounded-lg">
        <TouchableOpacity
          onPress={() => setIsCategoryVisible(!isCategoryVisible)}
          className="w-full"
        >
          <View className="relative flex-row items-center">
            <Text className="text-gray-400">
              {selectedCategory || "Select Category"}
            </Text>
            <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <Path
                d="M10 15C9.44772 15 9 14.5523 9 14V6C9 5.44772 9.44772 5 10 5C10.5523 5 11 5.44772 11 6V14C11 14.5523 10.5523 15 10 15Z"
                fill="#EBD5D1"
              />
              <Path
                d="M5 10C5 9.44772 5.44772 9 6 9H14C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10Z"
                fill="#EBD5D1"
              />
            </Svg>
          </View>
        </TouchableOpacity>
        {isCategoryVisible && (
          <Picker
            selectedValue={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            {categories.map((category, index) => (
              <Picker.Item key={index} label={category} value={category} />
            ))}
          </Picker>
        )}
      </View>

      {/* Notes Section */}
      <View className="w-full mb-4 p-4 border border-gray-300 rounded-lg">
        <TouchableOpacity
          onPress={() => setIsTaskClicked(true)} // If you want to allow interaction with Notes
          className="w-full"
        >
          <View className="relative">
            {/* Display pencil icon and placeholder text when no notes are entered */}
            {!notes && (
              <View className="absolute top-1/2 left-4 transform -translate-y-1/2 flex-row items-center">
                {pencilIcon}
                <Text className="ml-2 text-gray-400">Notes</Text>
              </View>
            )}
            {/* If notes are entered, show the actual TextInput */}
            {notes && (
              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Enter your notes here"
                className="text-foreground"
                multiline
                numberOfLines={4}
                style={{ paddingLeft: 35, paddingVertical: 5 }}
              />
            )}
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
            <View>
              <DateTimePicker
                value={startDate || new Date()}
                mode="date"
                display="default"
                onChange={onStartDateChange}
              />
            </View>
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
            <View>
              <DateTimePicker
                value={endDate || new Date()}
                mode="date"
                display="default"
                onChange={onEndDateChange}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
