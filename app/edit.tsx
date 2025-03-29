import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { Checkbox } from "~/components/ui/checkbox";
import { router } from "expo-router";

interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
}

function Task({ title, category, isChecked }: TaskProps) {
  const [checked, setChecked] = React.useState(isChecked);

  return (
    <View className="pl-20 pr-10 py-4">
      <View className="h-20 flex-row w-full border-opacity-50">
        {/* Checkbox */}
        <Checkbox
          className={`h-5 w-5 border-2 mt-3  ${
            checked ? "border-white bg-white" : "border-white bg-white "
          }`}
          checked={checked}
          onCheckedChange={setChecked}
        />

        {/* Task details */}
        <View className="flex-1 ml-4 mt-2">
          <Text className={`text-white ${checked ? "line-through" : ""}`}>
            {title}
          </Text>
          <Text className="text-white opacity-50">{category}</Text>
          <View className="border-b-2 border-white opacity-50 mt-2 w-full" />
        </View>
      </View>
    </View>
  );
}

export default function ToDo() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");

  const tasks = [
    { id: 1, title: "Task 1", category: "Category 1", isChecked: false },
    { id: 2, title: "Task 2", category: "Category 2", isChecked: true },
    { id: 3, title: "Task 3", category: "Category 3", isChecked: false },
    { id: 4, title: "Task 4", category: "Category 4", isChecked: true },
    { id: 5, title: "Task 5", category: "Category 5", isChecked: false },
    { id: 6, title: "Task 6", category: "Category 6", isChecked: true },
    { id: 7, title: "Task 7", category: "Category 7", isChecked: false },
    { id: 8, title: "Task 8", category: "Category 8", isChecked: true },
    { id: 9, title: "Task 9", category: "Category 9", isChecked: false },
    { id: 10, title: "Task 10", category: "Category 10", isChecked: true },
  ];

  return (
    <ScrollView className="flex flex-1 py-8 bg-background">
      {/* Header with Arrow and HallPass text */}
      <TouchableOpacity
        className="flex-row items-center mb-6"
        onPress={() => router.push("/")}
      >
        <Image
          source={require("../assets/images/webp/arrow-1.svg")} // Adjust the path as needed
          className="h-5 w-5 mr-2"
          resizeMode="contain"
        />
        <Text className="text-white text-lg">HallPass</Text>
      </TouchableOpacity>

      {/* Task List */}
      {tasks.map((task) => (
        <Task
          key={task.id}
          title={task.title}
          category={task.category}
          isChecked={task.isChecked}
        />
      ))}

      {/* Input Fields */}
      <View className="mt-8 space-y-4 px-4">
        {/* Input 1 */}
        <TextInput
          value={input1}
          onChangeText={setInput1}
          placeholder="Input 1"
          placeholderTextColor="#B0B0B0" // Light grey placeholder
          className="bg-[#D3D3D3] p-4 rounded-lg text-black" // Light grey background, rounded edges
        />

        {/* Input 2 */}
        <TextInput
          value={input2}
          onChangeText={setInput2}
          placeholder="Input 2"
          placeholderTextColor="#B0B0B0"
          className="bg-[#D3D3D3] p-4 rounded-lg text-black"
        />

        {/* Input 3 */}
        <TextInput
          value={input3}
          onChangeText={setInput3}
          placeholder="Input 3"
          placeholderTextColor="#B0B0B0"
          className="bg-[#D3D3D3] p-4 rounded-lg text-black"
        />

        {/* Input 4 */}
        <TextInput
          value={input4}
          onChangeText={setInput4}
          placeholder="Input 4"
          placeholderTextColor="#B0B0B0"
          className="bg-[#D3D3D3] p-4 rounded-lg text-black"
        />
      </View>
    </ScrollView>
  );
}
