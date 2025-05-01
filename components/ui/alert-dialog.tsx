import * as React from "react";
import { View, Text, Pressable } from "react-native";
import { cn } from "~/lib/utils";

interface AlertDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
}

export function AlertDialog({
  title,
  description,
  onConfirm,
  onCancel,
  isOpen,
}: AlertDialogProps) {
  if (!isOpen) return null;

  return (
    <View className="absolute inset-0 bg-black/50 flex-1 justify-center items-center">
      <View className="bg-card rounded-lg p-6 w-[90%] max-w-sm">
        <Text className="text-lg font-semibold text-foreground mb-2">
          {title}
        </Text>
        <Text className="text-muted-foreground mb-6">{description}</Text>
        <View className="flex-row justify-end gap-3">
          <Pressable
            onPress={onCancel}
            className="px-4 py-2 rounded-md bg-muted"
          >
            <Text className="text-foreground">Cancel</Text>
          </Pressable>
          <Pressable
            onPress={onConfirm}
            className="px-4 py-2 rounded-md bg-destructive"
          >
            <Text className="text-destructive-foreground">Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
