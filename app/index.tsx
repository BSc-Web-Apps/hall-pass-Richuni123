import React from "react";
import { View, Text } from "react-native";
import { Checkbox } from "~/components/ui/checkbox";

export default function HomeScreen() {
  const [checked, setChecked] = React.useState(false);

  return (
    <View className="flex flex-1 py-32 bg-background">
      <View className="h-20 flex-row w-full border-2 border-cyan-400">
        <View className="flex w-24 h-full border-2 border-pink-400"></View>
        <Checkbox
          className="h-5 w-5 border-2 bg-white/50 data-[state=checked]:bg-white data-[state=checked]:text-black"
          checked={checked}
          onCheckedChange={setChecked}
        />
        <View className="flex flex-1 h-full border-2 border-green-400">
          <Text className="text-foreground">Feed the cat</Text>
        </View>
      </View>
    </View>
  );
}
