import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import { Task } from "../components/ui/task";

describe("Task", () => {
  test("renders a task", () => {
    const task = {
      id: 1,
      title: "Test Task",
      category: "Test Category",
      isChecked: false,
    };

    render(<Task task={task} />);

    // Just check if the title and category are displayed
    const titleElement = screen.getByText("Test Task");
    console.log({ titleElement });
    const categoryElement = screen.getByText("Test Category");
    expect(titleElement).toBeTruthy();
    expect(categoryElement).toBeTruthy();
  });
});
