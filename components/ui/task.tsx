import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";
import type { TaskType } from "~/app/_layout";

interface TaskProps {
  task: TaskType;
  onDelete: (id: number) => void;
  onCheckChange?: (id: number, checked: boolean) => void;
}

export function Task({ task, onDelete, onCheckChange }: TaskProps) {
  const [checked, setChecked] = useState(task.isChecked);

  const handleCheckChange = (newChecked: boolean) => {
    setChecked(newChecked);
    if (onCheckChange) {
      onCheckChange(task.id, newChecked);
    }
  };

  return (
    <View className="pr-10 py-4 bg-black rounded-lg mb-2">
      <View className="flex-row w-full border-opacity-50 items-center">
        <Checkbox
          className={` ml-8 h-7 w-7 border-2 mt-2 ${
            checked ? "border-white bg-white" : "border-white bg-white"
          }`}
          checked={checked}
          onCheckedChange={handleCheckChange}
        />
        <View className="flex-1 ml-12 mt-2">
          <Text
            className={`text-white font-bold ${checked ? "line-through" : ""}`}
          >
            {task.title}
          </Text>
          <Text className="text-white opacity-80">{task.category}</Text>
          {task.notes && (
            <Text className="text-white opacity-70 mt-1 italic">
              {task.notes}
            </Text>
          )}
          {(task.startDate || task.endDate) && (
            <View className="flex-row mt-1">
              {task.startDate && (
                <Text className="text-xs text-white opacity-60 mr-2">
                  Start:{" "}
                  {task.startDate instanceof Date
                    ? task.startDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : new Date(task.startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </Text>
              )}
              {task.endDate && (
                <Text className="text-xs text-white opacity-60">
                  End:{" "}
                  {task.endDate instanceof Date
                    ? task.endDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : new Date(task.endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </Text>
              )}
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => onDelete(task.id)}
          className="ml-2 w-6 h-6 bg-white rounded items-center justify-center"
        >
          <Text style={{ color: "#black", fontWeight: "bold", fontSize: 16 }}>
            ×
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
