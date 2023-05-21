import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskDetail from './index';

describe('TaskDetail', () => {
  const mockViewTask = {
    heading: 'Task Title',
    desc: 'Task Description',
    deadline: '2023-05-30',
    status: 'In Progress',
    imageUrl: 'test.jpg',
  };

  it('renders the task details correctly', () => {
    render(<TaskDetail open={true} viewTask={mockViewTask} onViewTask={jest.fn()} />);
    
    const titleElement = screen.getByText((content, element) => {
      const titlePrefix = 'Title : ';
      if (element.textContent.startsWith(titlePrefix)) {
        const titleText = element.textContent.slice(titlePrefix.length);
        return titleText === 'Task Title';
      }
      return false;
    });
    // const titleElement = screen.getByText('Title : Task Title');
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
  
    const descriptionElement = screen.getByText((content, element) => {
      const descriptionPrefix = 'Description : ';
      if (element.textContent.startsWith(descriptionPrefix)) {
        const descriptionText = element.textContent.slice(descriptionPrefix.length);
        return descriptionText === 'Task Description';
      }
      return false;
    });
    expect(descriptionElement).toBeInTheDocument();
  
    const statusElement = screen.getByText((content, element) => {
      const statusPrefix = 'Status : ';
      if (element.textContent.startsWith(statusPrefix)) {
        const statusText = element.textContent.slice(statusPrefix.length);
        return statusText === 'In Progress';
      }
      return false;
    });
    expect(statusElement).toBeInTheDocument();
    
    const imageElement = screen.getByAltText('Preview');
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute('src')).toBe('test.jpg');
  });

  it('calls the onViewTask function when the Close button is clicked', () => {
    const mockOnViewTask = jest.fn();
    render(<TaskDetail open={true} viewTask={mockViewTask} onViewTask={mockOnViewTask} />);

    const closeButtonElement = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButtonElement);
    expect(mockOnViewTask).toHaveBeenCalledWith(false);
  });
});
