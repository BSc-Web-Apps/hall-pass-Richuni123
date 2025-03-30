import React from "react";
import { ScrollView, Text, View } from "react-native";
import Svg, { ClipPath, Defs, G, Path, Rect } from "react-native-svg";
import { Checkbox } from "~/components/ui/checkbox";

interface TaskProps {
  title: string;
  category: string;
  isChecked: boolean;
  id: number;
}
function Task({ title, category, isChecked, id }: TaskProps) {
  const [checked, setChecked] = React.useState(isChecked);

  return (
    <View className="w-full mb-4 pl-20 pr-10 py-4 bg-blue-700 rounded-lg">
      <View className="h-20 flex-row w-full border-opacity-50">
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
    <View className="flex flex-1 bg-background">
      {/* HallPass Title with Checkmark */}
      <View className="w-full pt-20 pb-6 flex-row items-center justify-center">
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
          />
        ))}
      </ScrollView>
    </View>
  );
}
