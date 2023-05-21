import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskForm from "./index";

describe("The form's elements", () => {
  const mockViewTask = {
    heading: 'Task Title',
    desc: 'Task Description',
    deadline: '2023-05-30',
    status: 'In Progress',
    imageUrl: 'test.jpg',
  };
  
  it("Form heading renders as expected when open is true", () => {
    render(
      <TaskForm
        open={true}
        addNewTask={jest.fn()}
        handleCancel={jest.fn()}
        newTask={mockViewTask}
        setNewTask={jest.fn()}
      />
    );
    const headingElement = screen.getByText("Add New Task");
    expect(headingElement).toBeTruthy();
  });

  describe("Check for form field renders", () => {
    it("The Input fields are rendered as expected - heading", async () => {
      render(<TaskForm
        open={true}
        addNewTask={jest.fn()}
        handleCancel={jest.fn()}
        newTask={mockViewTask}
        setNewTask={jest.fn()}
      />);
      const titleBox = screen.getByRole("textbox", {
        name: "heading",
      });
      expect(titleBox).toBeInTheDocument();
    });

    it("The Input fields are rendered as expected - description", async () => {
      render(<TaskForm
        open={true}
        addNewTask={jest.fn()}
        handleCancel={jest.fn()}
        newTask={mockViewTask}
        setNewTask={jest.fn()}
      />);
      const descBox = screen.getByRole("textbox", {
        name: "desc",
      });
      expect(descBox).toBeInTheDocument();
    });

    it("The Input fields are rendered as expected - deadline", async () => {
      render(<TaskForm
        open={true}
        addNewTask={jest.fn()}
        handleCancel={jest.fn()}
        newTask={mockViewTask}
        setNewTask={jest.fn()}
      />);
      const deadlineBox = screen.getByRole("textbox", {
        name: "deadline",
      });
      expect(deadlineBox).toBeInTheDocument();
    });
  });
  it('submits the form successfully', () => {
    const addNewTaskMock = jest.fn();
    const handleCancelMock = jest.fn();

    render(
      <TaskForm
        open={true}
        newTask={mockViewTask}
        setNewTask={jest.fn()}
        addNewTask={addNewTaskMock}
        handleCancel={handleCancelMock}
      />
    );

    // Simulate form submission
    const form = screen.getByTestId('task-form');
    fireEvent.submit(form);

    // Verify that the form was submitted
    expect(addNewTaskMock).toHaveBeenCalledTimes(1);
    expect(addNewTaskMock).toHaveBeenCalledWith(expect.any(Object));

    // Verify that the form was canceled (optional)
    expect(handleCancelMock).toHaveBeenCalledTimes(0);
  });
});
