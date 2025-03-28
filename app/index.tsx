import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";

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

export default function HomeScreen() {
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
      {tasks.map((task) => (
        <Task
          key={task.id}
          title={task.title}
          category={task.category}
          isChecked={task.isChecked}
        />
      ))}
    </ScrollView>
  );
}
