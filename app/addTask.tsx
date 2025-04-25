import React, { useRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import PencilIcon from "~/components/svg/PencilIcon";
import SaveTaskIcon from "~/components/svg/SaveTaskIcon";
import TimeIcon from "~/components/svg/TimeIcon";
import CategoryIcon from "~/components/svg/CategoryIcon";
import HallPassCheckmark from "~/components/svg/HallPassCheckmark";
import { Checkbox } from "~/components/ui/checkbox";

// Task Component
interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
  id: number;
}
function Task({ title, category, isChecked, id }: TaskProps) {
  const [checked, setChecked] = useState(isChecked);

  return (
    <View className="w-full mb-4 pl-4 pr-4 py-4 bg-blue-700 rounded-lg">
      <View className="flex-row items-center w-full">
        <Checkbox
          className={`h-5 w-5 border-2 mt-1 ${
            checked ? "border-white bg-white" : "border-white"
          }`}
          checked={checked}
          onCheckedChange={setChecked}
        />
        <View className="flex-1 ml-4">
          <Text className={`text-white ${checked ? "line-through" : ""}`}>
            {title}
          </Text>
          <Text className="text-white opacity-50">{category}</Text>
        </View>
      </View>
    </View>
  );
}

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
  const [isNotesClicked, setIsNotesClicked] = useState(false);

  const taskInputRef = useRef<TextInput | null>(null);
  const notesInputRef = useRef<TextInput | null>(null);

  const categories = ["Work", "Personal", "Urgent", "Shopping", "Other"];

  const tasks = [
    { id: 1, title: "Task 1", category: "Category 1", isChecked: false },
    { id: 2, title: "Task 2", category: "Category 2", isChecked: true },
    { id: 3, title: "Task 3", category: "Category 3", isChecked: false },
    { id: 4, title: "Task 4", category: "Category 4", isChecked: true },
  ];

  const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "dismissed") {
      setShowStartDatePicker(false);
      return;
    }
    setStartDate(selectedDate || startDate);
    setShowStartDatePicker(false);
  };

  const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "dismissed") {
      setShowEndDatePicker(false);
      return;
    }
    setEndDate(selectedDate || endDate);
    setShowEndDatePicker(false);
  };

  const handleSave = () => {
    console.log("Save task button clicked");
  };

  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ padding: 16 }}
      showsVerticalScrollIndicator={false}
    >
      {/* HallPass Header */}
      <View className="w-full pt-20 pb-6 flex-row items-center justify-center gap-4">
        <Text className="text-4xl font-bold text-white mr-2">HallPass</Text>
        <HallPassCheckmark />
      </View>

      {/* Task List (inserted here) */}
      <View className="mb-6">
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            category={task.category}
            isChecked={task.isChecked}
          />
        ))}
      </View>

      {/* Task Input Section */}
      <TouchableOpacity
        onPress={() => {
          setIsTaskClicked(true);
          taskInputRef.current?.focus();
        }}
        className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
      >
        <View className="relative flex-row items-center">
          <TimeIcon />
          {!isTaskClicked && <Text className="ml-2 text-gray-400">Task</Text>}
          <TextInput
            ref={taskInputRef}
            value={taskText}
            onChangeText={setTaskText}
            placeholder="Enter your task"
            className="text-foreground"
            style={{ paddingLeft: 10, paddingVertical: 5 }}
            onFocus={() => setIsTaskClicked(true)}
            onBlur={() => setIsTaskClicked(false)}
          />
        </View>
      </TouchableOpacity>

      {/* Category Picker */}
      <TouchableOpacity
        onPress={() => setIsCategoryVisible(!isCategoryVisible)}
        className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
      >
        <View className="flex-row items-center">
          <CategoryIcon />
          <Text className="ml-2 text-orange-400">
            {selectedCategory || "Category"}
          </Text>
        </View>
      </TouchableOpacity>

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

      {/* Notes Input */}
      <View className="w-full mb-4 p-4 border border-gray-300 rounded-lg">
        <TouchableOpacity
          onPress={() => {
            setIsNotesClicked(true);
            notesInputRef.current?.focus();
          }}
          className="w-full"
        >
          <View className="relative flex-row items-center">
            <PencilIcon />
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
              onFocus={() => setIsNotesClicked(true)}
              onBlur={() => setIsNotesClicked(false)}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Date Pickers */}
      <View className="flex-row w-full mb-4">
        <View className="flex-1 mr-2">
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            className="p-4 border border-gray-300 rounded-lg bg-orange-300"
          >
            <View className="relative flex-row items-center">
              {!startDate && <Text className="text-gray-400">Start Date</Text>}
              {startDate && (
                <Text className="text-black">
                  {startDate.toLocaleDateString()}
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

        <View className="flex-1 ml-2">
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            className="p-4 border border-gray-300 rounded-lg bg-orange-300"
          >
            <View className="relative flex-row items-center">
              {!endDate && <Text className="text-gray-400">End Date</Text>}
              {endDate && (
                <Text className="text-black">
                  {endDate.toLocaleDateString()}
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

      {/* Save Button */}
      <View className="items-center mb-10">
        <TouchableOpacity onPress={handleSave}>
          <SaveTaskIcon />
        </TouchableOpacity>
        <Text className="text-white mt-2">
          Click the icon to save your task
        </Text>
      </View>
    </ScrollView>
  );
}
