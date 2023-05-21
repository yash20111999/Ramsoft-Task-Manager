import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

const localStorageMock = {
  getItem: jest.fn().mockReturnValue(JSON.stringify([
    {
      id: 'todo',
      name: 'Todo',
      cards: [],
      addButton: true,
    },
    {
      id: 'progress',
      name: 'In Progress',
      cards: [],
    },
    {
      id: 'done',
      name: 'Done',
      cards: [],
    },
  ])),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Replace the global localStorage object with the mock
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('App', () => {
  test('localStorage data is correctly retrieved', () => {
    render(<App />);
    expect(localStorageMock.getItem).toHaveBeenCalledWith('data');
    // Additional assertions based on the expected state after retrieving from localStorage
  });
  it('renders the task manager header', () => {
    render(<App />);
    const headerElement = screen.getByTestId('header');
    expect(headerElement).toBeInTheDocument();
    expect(headerElement.textContent).toBe('Task Manager');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the task manager sections', () => {
    render(<App />);
    const todoElement = screen.getByTestId('todo');
    const progressElement = screen.getByTestId('progress');
    const doneElement = screen.getByTestId('done');
    expect(todoElement).toBeInTheDocument();
    expect(todoElement.textContent).toBe('Todo');
    expect(progressElement).toBeInTheDocument();
    expect(progressElement.textContent).toBe('In Progress');
    expect(doneElement).toBeInTheDocument();
    expect(doneElement.textContent).toBe('Done');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders the "Add Card" button', () => {
    render(<App />);
    const addButtonElement = screen.getByRole('button', { name: 'Add Card' });
    expect(addButtonElement).toBeInTheDocument();
  });

  it('opens the new task form when the "Add Card" button is clicked', () => {
    render(<App />);
    const addButtonElement = screen.getByRole('button', { name: 'Add Card' });
    fireEvent.click(addButtonElement);
    const formElement = screen.getByText('Add New Task');
    expect(formElement).toBeInTheDocument();
  });

  it('adds a new task when the form is submitted', async () => {
    render(<App />);
    const addButtonElement = screen.getByRole('button', { name: 'Add Card' });
    fireEvent.click(addButtonElement);
  
    const headingInputElement = screen.getByLabelText('heading');
    fireEvent.change(headingInputElement, { target: { value: 'New Task' } });

    const deadlineInputElement = screen.getByLabelText('deadline');
    fireEvent.change(deadlineInputElement, { target: { value: 'Task Deadline' } });

    const descInputElement = screen.getByLabelText('desc');
    fireEvent.change(descInputElement, { target: { value: 'Task description' } });

    const submitButtonElement = screen.getByText('Submit');
    fireEvent.click(submitButtonElement);

    const taskCardElement = await screen.findByText('New Task');
    expect(taskCardElement).toBeInTheDocument();
  });

});
