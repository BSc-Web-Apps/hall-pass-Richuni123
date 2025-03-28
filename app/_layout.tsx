import "~/global.css";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Platform } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { Home as HomeIcon } from "~/lib/icons/Home";
import { Info } from "~/lib/icons/Info";
import { useColorScheme } from "~/lib/useColorScheme";
import HomeScreen from "./index";
import SettingsScreen from "./settings";
import ToDoScreen from "./ToDo";
import Svg, { Path } from "react-native-svg";

const Tab = createBottomTabNavigator();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

function TaskIcon({ color, size }: { color: string; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 22 22">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.00006 10C7.76149 10 10.0001 7.76142 10.0001 5C10.0001 2.23858 7.76149 0 5.00006 0C2.23864 0 6.10352e-05 2.23858 6.10352e-05 5C6.10352e-05 7.76142 2.23864 10 5.00006 10ZM7.14679 2.51937C7.57835 2.76598 7.72829 3.31575 7.48168 3.74731L5.48168 7.24731C5.32904 7.51443 5.05053 7.68508 4.74323 7.69976C4.43592 7.71445 4.14241 7.57115 3.96499 7.3198L2.46499 5.1948C2.17835 4.78872 2.27517 4.22716 2.68125 3.94052C3.08732 3.65387 3.64889 3.75069 3.93553 4.15677L4.62025 5.12679L5.91884 2.85426C6.16545 2.4227 6.71522 2.27276 7.14679 2.51937Z"
        fill={color}
      />
      <Path
        d="M12.9454 4C12.3931 4 11.9454 4.44772 11.9454 5C11.9454 5.55228 12.3931 6 12.9454 6H20.9469C21.4992 6 21.9469 5.55228 21.9469 5C21.9469 4.44772 21.4992 4 20.9469 4H12.9454Z"
        fill={color}
      />
      <Path
        d="M11.9454 17C11.9454 16.4477 12.3931 16 12.9454 16H20.9469C21.4992 16 21.9469 16.4477 21.9469 17C21.9469 17.5523 21.4992 18 20.9469 18H12.9454C12.3931 18 11.9454 17.5523 11.9454 17Z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.0001 17C10.0001 19.7614 7.76149 22 5.00006 22C2.23864 22 6.10352e-05 19.7614 6.10352e-05 17C6.10352e-05 14.2386 2.23864 12 5.00006 12C7.76149 12 10.0001 14.2386 10.0001 17ZM7.48168 15.7473C7.72829 15.3157 7.57835 14.766 7.14679 14.5194C6.71522 14.2728 6.16545 14.4227 5.91884 14.8543L4.62025 17.1268L3.93553 16.1568C3.64889 15.7507 3.08732 15.6539 2.68125 15.9405C2.27517 16.2272 2.17835 16.7887 2.46499 17.1948L3.96499 19.3198C4.14241 19.5711 4.43592 19.7145 4.74323 19.6998C5.05053 19.6851 5.32904 19.5144 5.48168 19.2473L7.48168 15.7473Z"
        fill={color}
      />
    </Svg>
  );
}

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "hsl(11, 72%, 3%)",
          borderTopColor: "transparent",
          height: 60,
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "hsl(11, 100%, 60%)",
        tabBarInactiveTintColor: "hsla(11, 20%, 64%, 0.5)",
        tabBarLabelPosition: "below-icon",
        tabBarIconStyle: {
          marginBottom: 2,
        },
      })}
    >
      <Tab.Screen
        name="todo"
        component={ToDoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TaskIcon color={color} size={size} />
          ),
          tabBarLabel: "Tasks",
          tabBarLabelStyle: {
            color: "hsl(11, 100%, 60%)",
            fontSize: 12,
            paddingTop: 2,
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Info size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
