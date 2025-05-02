import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import HallPassCheckmark from "~/components/svg/HallPassCheckmark";
import { Checkbox } from "~/components/ui/checkbox";
import type { TaskType } from "./_layout";
import { AlertDialog } from "~/components/ui/alert-dialog";

// The shape of a task in your tasks array
interface TaskData {
  title: string;
  category: string;
  isChecked: boolean;
  id: number;
  notes?: string;
  startDate?: Date | null;
  endDate?: Date | null;
}

// The props for the Task component
interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
  id: number;
  notes?: string;
  startDate?: Date | null;
  endDate?: Date | null;
  onDelete: (id: number) => void;
}

function Task({
  title,
  category,
  isChecked,
  id,
  notes = "",
  startDate = null,
  endDate = null,
  onDelete,
}: TaskProps) {
  const [checked, setChecked] = useState(isChecked);

  return (
    <View className="pr-10 py-4 bg-grey-200 rounded-lg mb-2">
      <View className="flex-row w-full border-opacity-50 items-center">
        {/* Checkbox */}
        <Checkbox
          className={`ml-4 mr-4 h-7 w-7 border-2 mt-2${
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
          {(startDate || endDate) && (
            <View className="flex-row mt-1">
              {startDate && (
                <Text className="text-xs text-white opacity-60 mr-2">
                  Start:{" "}
                  {startDate instanceof Date
                    ? startDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : new Date(startDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </Text>
              )}
              {endDate && (
                <Text className="text-xs text-white opacity-60">
                  End:{" "}
                  {endDate instanceof Date
                    ? endDate.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : new Date(endDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                </Text>
              )}
            </View>
          )}
        </View>

        {/* Delete Button */}
        <TouchableOpacity
          onPress={() => onDelete(id)}
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

interface CategoryScreenProps {
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  tasks: TaskType[];
  setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

export default function CategoryScreen({
  categories,
  setCategories,
  tasks,
  setTasks,
}: CategoryScreenProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);

  // Group tasks by category
  const grouped = categories.reduce(
    (acc: Record<string, TaskType[]>, category) => {
      acc[category] = tasks.filter((task) => task.category === category);
      return acc;
    },
    {}
  );

  // Delete handler
  const handleDelete = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories((prev) => [...prev, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category: string) => {
    // Remove the category
    const updatedCategories = categories.filter((c) => c !== category);
    setCategories(updatedCategories);

    // Update tasks that were using this category
    const updatedTasks = tasks.map((task) =>
      task.category === category ? { ...task, category: "Other" } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="w-full pt-20 pb-6 flex-row items-center justify-center gap-4">
        <Text className="text-4xl font-bold text-white mr-2">HallPass</Text>
        <HallPassCheckmark />
      </View>

      {/* Category List */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {[...categories]
          .sort((a, b) => a.localeCompare(b))
          .map((category) => (
            <Pressable
              key={category}
              onLongPress={() => setCategoryToDelete(category)}
              delayLongPress={500}
            >
              <View
                className="mb-6 bg-black rounded-lg p-4"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <Text className="text-xl font-bold text-white mb-2">
                  {category}
                </Text>
                {grouped[category] && grouped[category].length > 0 ? (
                  grouped[category].map((task) => (
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
                  ))
                ) : (
                  <Text className="text-white opacity-60 italic">
                    No tasks in this category.
                  </Text>
                )}
              </View>
            </Pressable>
          ))}
      </ScrollView>

      {/* Centered, darker orange Add Category Button */}
      <View className="absolute bottom-10 left-0 right-0 items-center">
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className="bg-orange-800 rounded-full px-8 py-4 shadow-lg"
          style={{
            elevation: 5,
          }}
        >
          <Text className="text-white font-bold text-lg">+ Add Category</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for adding a new category */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#000",
              borderRadius: 16,
              padding: 24,
              minWidth: 250,
              alignItems: "center",
              shadowColor: "#333",
              shadowOpacity: 1,
              shadowRadius: 8,
              elevation: 5,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 12,
              }}
            >
              New Category
            </Text>
            <TextInput
              value={newCategory}
              onChangeText={setNewCategory}
              placeholder="Category name"
              style={{
                borderWidth: 1,
                borderColor: "#fff",
                borderRadius: 8,
                padding: 8,
                width: 180,
                marginBottom: 16,
              }}
              placeholderTextColor="#fff"
            />
            <TouchableOpacity
              onPress={handleAddCategory}
              style={{
                backgroundColor: "#FF5733",
                borderRadius: 8,
                paddingVertical: 8,
                paddingHorizontal: 24,
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold" }}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 4 }}
            >
              <Text style={{ color: "#fff" }}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <AlertDialog
        isOpen={!!categoryToDelete}
        title="Delete Category"
        description={`Are you sure you want to delete "${categoryToDelete}"? Tasks in this category will be moved to "Other".`}
        onConfirm={() => {
          if (categoryToDelete) {
            handleDeleteCategory(categoryToDelete);
            setCategoryToDelete(null);
          }
        }}
        onCancel={() => setCategoryToDelete(null)}
      />
    </View>
  );
}
