import React, { useRef, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import Svg, { Path } from "react-native-svg";

export default function AddTaskScreen() {
  const [taskText, setTaskText] = useState("");
  const [isTaskClicked, setIsTaskClicked] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const taskInputRef = useRef<TextInput | null>(null);

  const [isNotesClicked, setIsNotesClicked] = useState(false); // State to track focus
  const notesInputRef = useRef<TextInput | null>(null); // Reference for the input

  const categories = ["Work", "Personal", "Urgent", "Shopping", "Other"];

  const onStartDateChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "dismissed") {
      setShowStartDatePicker(false); // Close the picker without changing the date
      return;
    }

    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setShowStartDatePicker(false);
  };

  const onEndDateChange = (event: any, selectedDate: Date | undefined) => {
    if (event.type === "dismissed") {
      setShowEndDatePicker(false); // Close the picker without changing the date
      return;
    }

    const currentDate = selectedDate || endDate;
    setEndDate(currentDate);
    setShowEndDatePicker(false);
  };
  const handleSave = () => {
    // Handle the save action here
    console.log("Save task button clicked");
  };

  const PencilIcon = () => {
    return (
      <Svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <Path
          d="M17.2151 0.78492C16.7087 0.278462 16.0355 0 15.3191 0C14.6027 0 13.9296 0.278462 13.4232 0.78492L1.93378 12.2749C1.88692 12.3217 1.85178 12.3776 1.82925 12.4398L0.0269904 17.3962C-0.0324841 17.5611 0.00806671 17.745 0.131521 17.8684C0.217129 17.954 0.332473 18 0.450521 18C0.501885 18 0.554151 17.991 0.604614 17.973L5.56082 16.1706C5.623 16.1481 5.67887 16.112 5.72573 16.0661L17.2151 4.57615C17.7215 4.06969 18 3.39652 18 2.68008C18 1.96365 17.7215 1.29048 17.2151 0.784019V0.78492ZM5.15892 15.3587L1.20386 16.7969L2.64207 12.8417L12.6158 2.86753L15.1326 5.3845L5.15892 15.3587ZM16.5771 3.93902L15.7697 4.74647L13.2529 2.2295L14.0603 1.42205C14.3964 1.08591 14.8433 0.901172 15.3182 0.901172C15.7931 0.901172 16.2401 1.08591 16.5762 1.42205C16.9123 1.75819 17.0971 2.20517 17.0971 2.68008C17.0971 3.155 16.9123 3.60198 16.5762 3.93812L16.5771 3.93902Z"
          fill="#EBD5D1"
        />
      </Svg>
    );
  };

  const SaveTaskIcon = () => {
    return (
      <Svg width="353" height="50" viewBox="0 0 353 50" fill="none">
        <Path
          d="M0 25C0 11.1929 11.1929 0 25 0H328C341.807 0 353 11.1929 353 25C353 38.8071 341.807 50 328 50H25C11.1929 50 0 38.8071 0 25Z"
          fill="#FF5733"
        />
        <Path
          d="M142.554 31.67C141.953 31.67 141.375 31.5963 140.82 31.449C140.27 31.3017 139.769 31.0835 139.315 30.7945C138.868 30.4998 138.497 30.1343 138.202 29.698C137.913 29.2617 137.732 28.7517 137.658 28.168H139.553C139.65 28.61 139.84 28.9812 140.123 29.2815C140.412 29.5818 140.772 29.8085 141.202 29.9615C141.639 30.1145 142.12 30.191 142.647 30.191C143.135 30.191 143.585 30.1145 143.999 29.9615C144.413 29.8085 144.747 29.5875 145.002 29.2985C145.257 29.0095 145.384 28.6553 145.384 28.236C145.384 27.7657 145.226 27.3945 144.908 27.1225C144.597 26.8448 144.126 26.6238 143.497 26.4595L141.032 25.8475C140.437 25.7058 139.913 25.5047 139.46 25.244C139.007 24.9777 138.655 24.6292 138.406 24.1985C138.157 23.7622 138.032 23.2238 138.032 22.5835C138.032 21.8695 138.227 21.249 138.618 20.722C139.015 20.1893 139.551 19.7785 140.225 19.4895C140.905 19.2005 141.673 19.056 142.528 19.056C143.509 19.056 144.333 19.2232 145.002 19.5575C145.676 19.8918 146.186 20.3338 146.532 20.8835C146.883 21.4275 147.062 22.0197 147.067 22.66H145.214C145.163 22.1387 145.008 21.725 144.747 21.419C144.492 21.1073 144.166 20.8835 143.769 20.7475C143.378 20.6115 142.945 20.5435 142.469 20.5435C141.63 20.5435 140.998 20.7305 140.573 21.1045C140.154 21.4728 139.944 21.912 139.944 22.422C139.944 22.8923 140.097 23.2635 140.403 23.5355C140.715 23.8075 141.174 24.0172 141.78 24.1645L144.16 24.751C144.908 24.9153 145.506 25.1618 145.954 25.4905C146.407 25.8135 146.733 26.196 146.931 26.638C147.13 27.0743 147.229 27.5532 147.229 28.0745C147.229 28.7715 147.033 29.392 146.642 29.936C146.251 30.4743 145.705 30.8993 145.002 31.211C144.305 31.517 143.489 31.67 142.554 31.67ZM151.876 31.67C151.31 31.67 150.805 31.568 150.363 31.364C149.927 31.16 149.584 30.8653 149.335 30.48C149.085 30.0947 148.961 29.63 148.961 29.086C148.961 28.1113 149.304 27.3832 149.989 26.9015C150.681 26.4198 151.786 26.1648 153.304 26.1365L154.749 26.094V25.4565C154.749 24.9522 154.599 24.5555 154.299 24.2665C153.998 23.9775 153.534 23.8358 152.905 23.8415C152.44 23.8415 152.024 23.9492 151.655 24.1645C151.287 24.3798 151.046 24.734 150.933 25.227H149.36C149.394 24.6433 149.561 24.1532 149.862 23.7565C150.168 23.3542 150.587 23.051 151.12 22.847C151.652 22.643 152.276 22.541 152.99 22.541C153.794 22.541 154.455 22.6515 154.97 22.8725C155.486 23.0878 155.868 23.4052 156.118 23.8245C156.373 24.2438 156.5 24.7538 156.5 25.3545V31.5H154.953L154.817 29.885C154.489 30.5593 154.072 31.0268 153.568 31.2875C153.063 31.5425 152.5 31.67 151.876 31.67ZM152.446 30.4035C152.723 30.4035 152.998 30.3553 153.27 30.259C153.542 30.157 153.789 30.021 154.01 29.851C154.231 29.6753 154.406 29.4798 154.537 29.2645C154.673 29.0492 154.744 28.8282 154.749 28.6015V27.148L153.559 27.1735C152.953 27.1792 152.437 27.2415 152.012 27.3605C151.593 27.4795 151.27 27.6637 151.043 27.913C150.822 28.1623 150.712 28.4938 150.712 28.9075C150.712 29.3778 150.873 29.7462 151.196 30.0125C151.525 30.2732 151.941 30.4035 152.446 30.4035ZM160.887 31.5L157.674 22.711H159.357L161.584 29.1965H161.703L163.93 22.711H165.613L162.417 31.5H160.887ZM170.808 31.67C169.975 31.67 169.241 31.4915 168.606 31.1345C167.971 30.7718 167.476 30.2562 167.119 29.5875C166.767 28.9188 166.592 28.1227 166.592 27.199C166.592 26.2867 166.753 25.482 167.076 24.785C167.399 24.0823 167.867 23.5327 168.479 23.136C169.091 22.7393 169.827 22.541 170.689 22.541C171.533 22.541 172.247 22.7223 172.831 23.085C173.414 23.4477 173.856 23.9577 174.157 24.615C174.457 25.2667 174.607 26.0373 174.607 26.927V27.5305H168.419C168.413 28.0575 168.498 28.5307 168.674 28.95C168.85 29.3637 169.11 29.6923 169.456 29.936C169.807 30.174 170.244 30.293 170.765 30.293C171.292 30.293 171.745 30.174 172.125 29.936C172.51 29.698 172.763 29.3438 172.882 28.8735H174.565C174.463 29.4742 174.222 29.9842 173.842 30.4035C173.462 30.8228 173.006 31.1402 172.474 31.3555C171.941 31.5652 171.386 31.67 170.808 31.67ZM168.419 26.349H172.873C172.873 25.89 172.794 25.4735 172.635 25.0995C172.476 24.7198 172.233 24.4223 171.904 24.207C171.581 23.986 171.173 23.8755 170.68 23.8755C170.176 23.8755 169.756 23.9973 169.422 24.241C169.088 24.4847 168.836 24.7963 168.666 25.176C168.501 25.5557 168.419 25.9467 168.419 26.349ZM183.664 31.5V20.8665H179.771V19.209H189.214V20.8665H185.5V31.5H183.664ZM192.318 31.67C191.751 31.67 191.247 31.568 190.805 31.364C190.368 31.16 190.025 30.8653 189.776 30.48C189.527 30.0947 189.402 29.63 189.402 29.086C189.402 28.1113 189.745 27.3832 190.431 26.9015C191.122 26.4198 192.227 26.1648 193.746 26.1365L195.191 26.094V25.4565C195.191 24.9522 195.04 24.5555 194.74 24.2665C194.44 23.9775 193.975 23.8358 193.346 23.8415C192.881 23.8415 192.465 23.9492 192.097 24.1645C191.728 24.3798 191.487 24.734 191.374 25.227H189.802C189.836 24.6433 190.003 24.1532 190.303 23.7565C190.609 23.3542 191.028 23.051 191.561 22.847C192.094 22.643 192.717 22.541 193.431 22.541C194.236 22.541 194.896 22.6515 195.412 22.8725C195.927 23.0878 196.31 23.4052 196.559 23.8245C196.814 24.2438 196.942 24.7538 196.942 25.3545V31.5H195.395L195.259 29.885C194.93 30.5593 194.513 31.0268 194.009 31.2875C193.505 31.5425 192.941 31.67 192.318 31.67ZM192.887 30.4035C193.165 30.4035 193.44 30.3553 193.712 30.259C193.984 30.157 194.23 30.021 194.451 29.851C194.672 29.6753 194.848 29.4798 194.978 29.2645C195.114 29.0492 195.185 28.8282 195.191 28.6015V27.148L194.001 27.1735C193.394 27.1792 192.879 27.2415 192.454 27.3605C192.034 27.4795 191.711 27.6637 191.485 27.913C191.264 28.1623 191.153 28.4938 191.153 28.9075C191.153 29.3778 191.315 29.7462 191.638 30.0125C191.966 30.2732 192.383 30.4035 192.887 30.4035ZM202.463 31.67C201.851 31.67 201.275 31.5737 200.737 31.381C200.204 31.1883 199.757 30.8852 199.394 30.4715C199.037 30.0578 198.813 29.528 198.723 28.882H200.346C200.42 29.2163 200.559 29.494 200.763 29.715C200.972 29.9303 201.222 30.0918 201.511 30.1995C201.805 30.3015 202.12 30.3525 202.454 30.3525C203.009 30.3525 203.46 30.2533 203.806 30.055C204.151 29.851 204.324 29.5393 204.324 29.12C204.324 28.8197 204.231 28.5788 204.044 28.3975C203.857 28.2162 203.565 28.083 203.168 27.998L201.417 27.5815C200.692 27.4115 200.111 27.1423 199.675 26.774C199.238 26.4 199.017 25.8787 199.012 25.21C199.012 24.6943 199.139 24.2353 199.394 23.833C199.655 23.4307 200.04 23.1162 200.55 22.8895C201.066 22.6572 201.7 22.541 202.454 22.541C203.446 22.541 204.242 22.762 204.843 23.204C205.449 23.646 205.761 24.2863 205.778 25.125H204.205C204.148 24.7227 203.964 24.4082 203.653 24.1815C203.347 23.9492 202.941 23.833 202.437 23.833C201.916 23.833 201.488 23.9378 201.154 24.1475C200.819 24.3515 200.652 24.666 200.652 25.091C200.652 25.38 200.774 25.6095 201.018 25.7795C201.267 25.9438 201.632 26.0798 202.114 26.1875L203.78 26.604C204.211 26.7173 204.565 26.8675 204.843 27.0545C205.12 27.2358 205.338 27.437 205.497 27.658C205.656 27.879 205.766 28.1085 205.829 28.3465C205.897 28.5845 205.931 28.8083 205.931 29.018C205.931 29.5733 205.789 30.0493 205.506 30.446C205.228 30.837 204.831 31.1402 204.316 31.3555C203.8 31.5652 203.182 31.67 202.463 31.67ZM207.889 31.5V18.869H209.708V26.9015L213.593 22.711H215.633L212.454 26.1025L215.82 31.5H213.933L211.289 27.2585L209.708 28.899V31.5H207.889Z"
          fill="black"
        />
      </Svg>
    );
  };

  const timeIcon = (
    <Svg width="16" height="17" viewBox="0 0 16 17" fill="none">
      <Path
        d="M9.5 9C9.5 9.82843 8.82843 10.5 8 10.5C7.17157 10.5 6.5 9.82843 6.5 9C6.5 8.44479 6.80165 7.96003 7.25 7.70067V4.875C7.25 4.46079 7.58579 4.125 8 4.125C8.41421 4.125 8.75 4.46079 8.75 4.875V7.70067C9.19835 7.96003 9.5 8.44479 9.5 9Z"
        fill="#EBD5D1"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C8.41421 0 8.75 0.335786 8.75 0.75V1.5C8.75 1.51239 8.7497 1.5247 8.74911 1.53694C10.2579 1.68656 11.6351 2.2833 12.7465 3.19279L13.0947 2.84467C13.3876 2.55178 13.8624 2.55178 14.1553 2.84467C14.4482 3.13756 14.4482 3.61244 14.1553 3.90533L13.8072 4.25345C14.8652 5.54635 15.5 7.19905 15.5 9C15.5 13.1421 12.1421 16.5 8 16.5C3.85786 16.5 0.5 13.1421 0.5 9C0.5 5.11068 3.46047 1.91282 7.25089 1.53694C7.2503 1.5247 7.25 1.51239 7.25 1.5V0.75C7.25 0.335786 7.58579 0 8 0ZM8 3C4.68629 3 2 5.68629 2 9C2 12.3137 4.68629 15 8 15C11.3137 15 14 12.3137 14 9C14 5.68629 11.3137 3 8 3Z"
        fill="#EBD5D1"
      />
    </Svg>
  );
  const categoryIcon = (
    <Svg width="16" height="20" viewBox="0 0 16 20" fill="none">
      <Path
        d="M0.5 1.45654H6.45652V8.10872H0.5V1.45654ZM9.54348 1.45654H15.5V8.10872H9.54348V1.45654ZM0.5 11.8913H6.45652V18.5435H0.5V11.8913ZM9.54348 11.8913H15.5V18.5435H9.54348V11.8913Z"
        stroke="#EBD5D1"
      />
    </Svg>
  );

  return (
    <View className="flex-1 justify-center items-center bg-background p-4">
      {/* Task Section */}
      <TouchableOpacity
        onPress={() => {
          setIsTaskClicked(true);
          taskInputRef.current?.focus(); // Automatically focus input
        }}
        className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
      >
        <View className="relative flex-row items-center">
          {timeIcon}

          {/* Conditionally render the "Task" text based on the input focus */}
          {!isTaskClicked && <Text className="ml-2 text-gray-400">Task</Text>}

          <TextInput
            ref={taskInputRef}
            value={taskText}
            onChangeText={setTaskText}
            placeholder="Enter your task"
            className="text-foreground"
            style={{ paddingLeft: 10, paddingVertical: 5 }}
            onFocus={() => setIsTaskClicked(true)} // Focus handler to hide the text
            onBlur={() => setIsTaskClicked(false)} // Blur handler to show the text when input loses focus
          />
        </View>
      </TouchableOpacity>

      {/* Category Section */}
      <TouchableOpacity
        onPress={() => setIsCategoryVisible(!isCategoryVisible)}
        className="w-full mb-4 p-4 border border-gray-300 rounded-lg"
      >
        <View className="flex-row items-center">
          {categoryIcon}
          <Text className="ml-2 text-orange-400">
            {selectedCategory ? selectedCategory : "Category"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Dropdown Menu for Categories */}
      {isCategoryVisible && (
        <View className="w-full p-4 border border-gray-300 rounded-lg">
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedCategory(category);
                setIsCategoryVisible(false);
              }}
              className="p-2"
            >
              <Text className="text-foreground">{category}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Notes Section */}
      <View className="w-full mb-4 p-4 border border-gray-300 rounded-lg">
        <TouchableOpacity
          onPress={() => {
            setIsNotesClicked(true);
            notesInputRef.current?.focus(); // Automatically focus input
          }}
          className="w-full"
        >
          <View className="relative flex-row items-center">
            <PencilIcon />

            {/* Conditionally render the "Notes" text based on the input focus */}
            {!isNotesClicked && (
              <Text className="ml-2 text-gray-400">Notes</Text>
            )}

            <TextInput
              ref={notesInputRef}
              value={notes}
              onChangeText={setNotes}
              placeholder="Enter notes"
              multiline
              numberOfLines={4}
              className="text-foreground"
              style={{ paddingLeft: 10, paddingVertical: 5, height: 50 }}
              onFocus={() => setIsNotesClicked(true)} // Focus handler to hide the text
              onBlur={() => setIsNotesClicked(false)} // Blur handler to show the text when input loses focus
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Start Date and End Date Section */}
      <View className="flex-row w-full ">
        {/* Start Date */}
        <View className="flex-1 mr-2">
          <TouchableOpacity
            onPress={() => setShowStartDatePicker(true)}
            className="p-4 border border-gray-300 rounded-lg bg-orange-300"
          >
            <View className="relative flex-row items-center">
              {!startDate && (
                <Text className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
                  Start Date
                </Text>
              )}
              {startDate && (
                <Text className="text-black">
                  {startDate instanceof Date && !isNaN(startDate.getTime())
                    ? startDate.toLocaleDateString()
                    : "Invalid Date"}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate ?? new Date()}
              mode="date"
              display="default"
              onChange={onStartDateChange}
            />
          )}
        </View>

        {/* End Date */}
        <View className="flex-1 ml-2">
          <TouchableOpacity
            onPress={() => setShowEndDatePicker(true)}
            className="p-4 border border-gray-300 rounded-lg bg-orange-300"
          >
            <View className="relative flex-row items-center">
              {!endDate && (
                <Text className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400">
                  End Date
                </Text>
              )}
              {endDate && (
                <Text className="text-black">
                  {endDate instanceof Date && !isNaN(endDate.getTime())
                    ? endDate.toLocaleDateString()
                    : "Invalid Date"}
                </Text>
              )}
            </View>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate || new Date()}
              mode="date"
              display="default"
              onChange={onEndDateChange}
            />
          )}
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <TouchableOpacity onPress={handleSave}>
          <SaveTaskIcon />
        </TouchableOpacity>
        <Text>Click the icon to save your task</Text>
      </View>
    </View>
  );
}
