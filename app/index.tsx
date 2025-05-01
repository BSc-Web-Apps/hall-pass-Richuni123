import React, { useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { Checkbox } from "~/components/ui/checkbox";
import HallPassCheckmark from "~/components/svg/HallPassCheckmark";
import { TaskEditModal } from "~/components/ui/task-edit-modal";
import { Task } from "~/components/ui/task";
import type { TaskType } from "./_layout";

interface HomeScreenProps {
  tasks: TaskType[];
  setTasks: (tasks: TaskType[]) => void;
  categories: string[];
}

export default function HomeScreen({
  tasks,
  setTasks,
  categories,
}: HomeScreenProps) {
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);

  const handleTaskPress = (task: TaskType) => {
    setEditingTask(task);
  };

  const handleTaskUpdate = (updatedTask: TaskType) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleCheckboxChange = (taskId: number, checked: boolean) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, isChecked: checked } : task
      )
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 p-4">
        {tasks.map((task) => (
          <TouchableOpacity key={task.id} onPress={() => handleTaskPress(task)}>
            <Task
              task={task}
              onDelete={handleDeleteTask}
              onCheckChange={handleCheckboxChange}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TaskEditModal
        task={editingTask!}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSave={handleTaskUpdate}
        categories={categories}
      />
    </View>
  );
}
