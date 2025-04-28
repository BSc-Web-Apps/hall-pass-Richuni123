import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { Checkbox } from "~/components/ui/checkbox";
import HallPassCheckmark from "~/components/svg/HallPassCheckmark";
import type { TaskType } from "./_layout";

interface TaskProps {
  id: number;
  title: string;
  category: string;
  isChecked: boolean;
  notes?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onDelete: (id: number) => void;
}

function Task({
  id,
  title,
  category,
  isChecked,
  notes = "",
  startDate = null,
  endDate = null,
  onDelete,
}: TaskProps) {
  const [checked, setChecked] = useState(isChecked);

  return (
    <View className="pl-20 pr-10 py-4 bg-blue-700 rounded-lg mb-2">
      <View className="flex-row w-full border-opacity-50 items-center">
        {/* Checkbox */}
        <Checkbox
          className={`h-5 w-5 border-2 mt-3 ${
            checked ? "border-white bg-white" : "border-white bg-white "
          }`}
          checked={checked}
          onCheckedChange={setChecked}
        />

        {/* Task details */}
        <View className="flex-1 ml-4 mt-2">
          <Text
            className={`text-white font-bold ${checked ? "line-through" : ""}`}
          >
            {title}
          </Text>
          <Text className="text-white opacity-80">{category}</Text>
          {notes ? (
            <Text className="text-white opacity-70 mt-1 italic">{notes}</Text>
          ) : null}
          <View className="flex-row mt-1">
            {startDate && (
              <Text className="text-xs text-white opacity-60 mr-2">
                Start:{" "}
                {startDate instanceof Date
                  ? startDate.toLocaleDateString()
                  : startDate}
              </Text>
            )}
            {endDate && (
              <Text className="text-xs text-white opacity-60">
                End:{" "}
                {endDate instanceof Date
                  ? endDate.toLocaleDateString()
                  : endDate}
              </Text>
            )}
          </View>
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={() => onDelete(id)}
          className="ml-2 w-7 h-7 bg-white rounded items-center justify-center"
          style={{ borderWidth: 1, borderColor: "#FF5733" }}
        >
          <Text style={{ color: "#FF5733", fontWeight: "bold", fontSize: 16 }}>
            ×
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

interface HomeScreenProps {
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

export default function HomeScreen({ tasks, setTasks }: HomeScreenProps) {
  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <ScrollView className="flex flex-1 bg-background">
      {/* HallPass Title with Checkmark */}
      <View className="w-full pt-20 pb-6 flex-row items-center justify-center gap-4">
        <Text className="text-4xl font-bold text-white mr-2">HallPass</Text>
        <HallPassCheckmark />
      </View>

      {/* Scrollable task list */}
      <ScrollView
        className="flex-1 w-full px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            category={task.category}
            isChecked={task.isChecked}
            notes={task.notes ?? ""}
            startDate={task.startDate ?? null}
            endDate={task.endDate ?? null}
            onDelete={handleDelete}
          />
        ))}
      </ScrollView>
    </ScrollView>
  );
}
