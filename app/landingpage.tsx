import React from "react";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import {
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import HallPassCheckmark from "~/components/svg/HallPassCheckmark";
import GetStarted from "~/components/svg/GetStarted";

export default function LandingPage({ onStart }: { onStart: () => void }) {
  const handleGetStarted = () => {
    console.log("Button pressed");
    onStart();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-4 py-8">
        {/* Top Section: HallPass Title and Checkmark */}
        <View className="flex flex-row items-center mb-20 gap-4">
          <Text className="text-4xl font-bold text-white mb-2">HallPass</Text>
          <HallPassCheckmark />
        </View>

        {/* Middle Section: Image */}
        <Image
          source={require("../assets/images/Landing-image.png")}
          className="w-[300px] h-[250px]"
          resizeMode="contain"
        />

        {/* Bottom Section: Uni Sorted Text and Button */}
        <View className="items-center mt-20">
          <Text className="text-white text-2xl font-bold">Uni Sorted</Text>
          <View className="items-center mt-20">
            <TouchableOpacity onPress={handleGetStarted} activeOpacity={0.7}>
              <GetStarted />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
