import React from "react";
import {
  View,
  Image,
  Text,
  Platform,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Svg, { G, Path, Defs, ClipPath, Rect } from "react-native-svg";
import { router } from "expo-router";

export default function HomeScreen() {
  // Only import StatusBar if not on web
  const StatusBar = Platform.select({
    native: require("react-native").StatusBar,
    default: null,
  });

  const handleGetStarted = () => {
    console.log("Button pressed"); // For debugging
    router.push("/todo"); // Matches your file name exactly
  };

  return (
    <SafeAreaView className="flex flex-1 bg-background">
      {/* Status Bar - only render on mobile */}
      {Platform.OS !== "web" && StatusBar && (
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
      )}

      <View className="flex flex-1 items-center justify-center">
        {/* HallPass Title with Checkmark */}
        <View className="absolute top-20 flex-row items-center">
          <Text className="text-4xl font-bold text-white mr-2">HallPass</Text>
          <Svg width="51" height="50" viewBox="0 0 51 50">
            <G clipPath="url(#clip0_2_125)">
              <Path
                d="M25.5 50C18.8211 50 12.5447 47.4 7.82105 42.6789C3.09737 37.9579 0.5 31.6789 0.5 25.0026C0.5 18.3237 3.1 12.0474 7.82105 7.32368C12.5421 2.6 18.8211 0 25.5 0C32.1789 0 38.4553 2.6 43.1789 7.32368C47.9026 12.0474 50.5 18.3237 50.5 25.0026C50.5 31.6816 47.9 37.9579 43.1789 42.6789C38.4579 47.4 32.1789 50 25.5 50ZM25.5 2.63158C13.1658 2.63158 3.13158 12.6658 3.13158 25C3.13158 37.3342 13.1658 47.3684 25.5 47.3684C37.8342 47.3684 47.8684 37.3342 47.8684 25C47.8684 12.6658 37.8342 2.63158 25.5 2.63158Z"
                fill="#B69891"
                fillOpacity="0.5"
              />
              <Path
                d="M21.0254 34.5926C20.7319 34.5926 20.4384 34.4802 20.2137 34.2578L13.3353 27.3794C12.8882 26.9323 12.8882 26.2055 13.3353 25.7584C13.7824 25.3113 14.5092 25.3113 14.9563 25.7584L21.0231 31.8252L36.2611 16.5872C36.7082 16.1401 37.435 16.1401 37.8821 16.5872C38.3292 17.0343 38.3292 17.7611 37.8821 18.2082L21.8325 34.2578C21.6078 34.4825 21.3143 34.5926 21.0208 34.5926H21.0254Z"
                fill="#B69891"
                fillOpacity="0.5"
              />
            </G>
            <Defs>
              <ClipPath id="clip0_2_125">
                <Rect
                  width="50"
                  height="50"
                  fill="white"
                  transform="translate(0.5)"
                />
              </ClipPath>
            </Defs>
          </Svg>
        </View>

        {/* Background Image */}
        <Image
          source={require("../assets/images/Landing-image.png")}
          className="w-full h-full absolute"
          resizeMode="cover"
        />

        {/* Get Started Button */}
        <TouchableOpacity
          className="absolute bottom-20"
          onPress={handleGetStarted}
          activeOpacity={0.7}
        >
          <Image
            source={require("../assets/images/webp/Get-started.svg")}
            className="w-[265px] h-[50px]"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
