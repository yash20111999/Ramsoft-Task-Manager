import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskCard from './index';

describe('TaskCard', () => {
  const mockTask = {
    heading: 'Task Title',
    deadline: '2023-05-30',
    status: 'In Progress',
  };

  test('renders the task card correctly', () => {
    render(
      <TaskCard
        task={mockTask}
        onStatusChange={jest.fn()}
        index={0}
        onDeleteTask={jest.fn()}
        onEditTask={jest.fn()}
        onViewTask={jest.fn()}
      />
    );

    const titleElement = screen.getByText((content, element) => {
      const titlePrefix = 'Title : ';
      if (element.textContent.startsWith(titlePrefix)) {
        const titleText = element.textContent.slice(titlePrefix.length);
        return titleText === 'Task Title';
      }
      return false;
    });

    expect(titleElement).toBeInTheDocument();

    const deadlineElement = screen.getByText((content, element) => {
      const deadlinePrefix = 'Deadline : ';
      if (element.textContent.startsWith(deadlinePrefix)) {
        const deadlineText = element.textContent.slice(deadlinePrefix.length);
        return deadlineText === '2023-05-30';
      }
      return false;
    });
    expect(deadlineElement).toBeInTheDocument();
  });

  test('calls the onStatusChange function when the status is changed', () => {
    const mockOnStatusChange = jest.fn();
    render(
      <TaskCard
        task={mockTask}
        onStatusChange={mockOnStatusChange}
        index={0}
        onDeleteTask={jest.fn()}
        onEditTask={jest.fn()}
        onViewTask={jest.fn()}
      />
    );

    const selectElement = screen.getByLabelText('selectstatus');
    fireEvent.change(selectElement, { target: { value: 'done' } });
    expect(selectElement.value).toBe('done');
    
  });

  test('calls the onViewTask function when the View More button is clicked', () => {
    const mockOnViewTask = jest.fn();
    render(
      <TaskCard
        task={mockTask}
        onStatusChange={jest.fn()}
        index={0}
        onDeleteTask={jest.fn()}
        onEditTask={jest.fn()}
        onViewTask={mockOnViewTask}
      />
    );

    const viewMoreButton = screen.getByRole('button', { name: 'View More' });
    fireEvent.click(viewMoreButton);
    expect(mockOnViewTask).toHaveBeenCalledWith(true);
  });
});
