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
import { Task } from "~/components/ui/task";
import type { TaskType } from "./_layout";

interface AddTaskScreenProps {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

export default function AddTaskScreen({
  categories,
  setCategories,
  tasks,
  setTasks,
}: AddTaskScreenProps) {
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
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const taskInputRef = useRef<TextInput | null>(null);
  const notesInputRef = useRef<TextInput | null>(null);

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
    if (!taskText.trim() || !selectedCategory || !startDate || !endDate) {
      setAlertMessage(
        "Please enter a task title, choose a category, and select a start and end date."
      );
      setShowAlert(true);
      return;
    }

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: taskText,
        category: selectedCategory,
        isChecked: false,
        notes,
        startDate,
        endDate,
      },
    ]);

    setTaskText("");
    setSelectedCategory("");
    setNotes("");
    setStartDate(null);
    setEndDate(null);
    setIsCategoryVisible(false);
    setIsTaskClicked(false);
    setIsNotesClicked(false);
  };

  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleCheckChange = (taskId: number, checked: boolean) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isChecked: checked } : task
      )
    );
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
            task={task}
            onDelete={handleDelete}
            onCheckChange={handleCheckChange}
          />
        ))}
      </View>

      {/* Task Input Section */}
      <TouchableOpacity
        onPress={() => {
          setIsTaskClicked(true);
          taskInputRef.current?.focus();
        }}
        className="w-full mb-4 p-4 border border-gray-300 rounded-lg "
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
          <Text className="ml-2 text-gray-400">
            {selectedCategory || "Category"}
          </Text>
        </View>
      </TouchableOpacity>

      {isCategoryVisible && (
        <View className="w-full p-4 border border-gray-300 rounded-lg">
          {categories.map((category: string, index: number) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedCategory(category);
                setIsCategoryVisible(false);
              }}
              className="p-2"
            >
              <Text className="text-gray-400">{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Notes Input */}
      <View className="w-full mb-4 mt-4 p-4 border border-gray-300 rounded-lg">
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
            className="p-4 border border-gray-300 rounded-lg bg-grey-300"
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
            className="p-4 border border-gray-300 rounded-lg bg-grey-300"
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

      {showAlert && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 24,
              minWidth: 250,
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "#FF5733",
                fontWeight: "bold",
                fontSize: 16,
                marginBottom: 12,
              }}
            >
              Oops!
            </Text>
            <Text
              style={{ color: "#333", textAlign: "center", marginBottom: 20 }}
            >
              {alertMessage}
            </Text>
            <TouchableOpacity
              onPress={() => setShowAlert(false)}
              style={{
                backgroundColor: "#FF5733",
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 24,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
