import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Modal } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import type { TaskType } from "~/app/_layout";

interface TaskEditModalProps {
  task: TaskType;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: TaskType) => void;
  categories: string[];
}

export function TaskEditModal({
  task,
  isOpen,
  onClose,
  onSave,
  categories,
}: TaskEditModalProps) {
  const [editedTask, setEditedTask] = useState<TaskType>({ ...task });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleSave = () => {
    onSave(editedTask);
    onClose();
  };

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-card rounded-lg p-6 w-[90%] max-w-sm">
          <Text className="text-xl font-semibold text-foreground mb-4">
            Edit Task
          </Text>

          <TextInput
            className="bg-input text-foreground p-3 rounded-lg mb-3"
            placeholder="Task title"
            value={editedTask.title}
            onChangeText={(text) =>
              setEditedTask({ ...editedTask, title: text })
            }
          />

          <View className="mb-3">
            <Text className="text-foreground mb-1">Category</Text>
            <View className="flex-row flex-wrap gap-2">
              {categories.map((category) => (
                <Pressable
                  key={category}
                  onPress={() => setEditedTask({ ...editedTask, category })}
                  className={`px-3 py-2 rounded-lg ${
                    editedTask.category === category ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <Text
                    className={
                      editedTask.category === category
                        ? "text-primary-foreground"
                        : "text-foreground"
                    }
                  >
                    {category}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          <TextInput
            className="bg-input text-foreground p-3 rounded-lg mb-3"
            placeholder="Notes"
            value={editedTask.notes}
            onChangeText={(text) =>
              setEditedTask({ ...editedTask, notes: text })
            }
            multiline
          />

          <View className="flex-row justify-between mb-3">
            <Pressable
              onPress={() => setShowStartDatePicker(true)}
              className="bg-input p-3 rounded-lg flex-1 mr-2"
            >
              <Text className="text-foreground">
                {editedTask.startDate
                  ? new Date(editedTask.startDate).toLocaleDateString()
                  : "Set Start Date"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setShowEndDatePicker(true)}
              className="bg-input p-3 rounded-lg flex-1 ml-2"
            >
              <Text className="text-foreground">
                {editedTask.endDate
                  ? new Date(editedTask.endDate).toLocaleDateString()
                  : "Set End Date"}
              </Text>
            </Pressable>
          </View>

          {(showStartDatePicker || showEndDatePicker) && (
            <DateTimePicker
              value={
                showStartDatePicker
                  ? editedTask.startDate
                    ? new Date(editedTask.startDate)
                    : new Date()
                  : editedTask.endDate
                  ? new Date(editedTask.endDate)
                  : new Date()
              }
              mode="date"
              onChange={(event, date) => {
                if (date) {
                  if (showStartDatePicker) {
                    setEditedTask({ ...editedTask, startDate: date });
                    setShowStartDatePicker(false);
                  } else {
                    setEditedTask({ ...editedTask, endDate: date });
                    setShowEndDatePicker(false);
                  }
                }
              }}
            />
          )}

          <View className="flex-row justify-end gap-3 mt-4">
            <Pressable
              onPress={onClose}
              className="px-4 py-2 rounded-md bg-muted"
            >
              <Text className="text-foreground">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              className="px-4 py-2 rounded-md bg-primary"
            >
              <Text className="text-primary-foreground">Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
