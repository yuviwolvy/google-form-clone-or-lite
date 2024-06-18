import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import QuestionBox from './questionbox';
import "@testing-library/jest-dom";

describe('QuestionBox Component', () => {
  const mockQuestionData = {
    questionText: 'Sample Question',
    questionType: 'text',
    answerOptions: [{ id: '1', value: 'Option 1' }],
  };

  test('renders without crashing', () => {
    render(
      <QuestionBox
        questionData={mockQuestionData}
        onDelete={() => {}}
        onQuestionTextChange={() => {}}
        onQuestionTypeChange={() => {}}
        onRequiredStatusChange={() => {}}
        onAnswerOptionsChange={() => {}}
      />
    );
  });

  test('calls onQuestionTextChange callback when question text changes', () => {
    const mockOnQuestionTextChange = jest.fn();
    const { getByPlaceholderText } = render(
      <QuestionBox
        questionData={mockQuestionData}
        onDelete={() => {}}
        onQuestionTextChange={mockOnQuestionTextChange}
        onQuestionTypeChange={() => {}}
        onRequiredStatusChange={() => {}}
        onAnswerOptionsChange={() => {}}
      />
    );

    fireEvent.change(getByPlaceholderText('Your question comes here'), { target: { value: 'New Question' } });

    expect(mockOnQuestionTextChange).toHaveBeenCalledWith('New Question');
  });

  test('calls onQuestionTypeChange callback when question type changes', () => {
    const mockOnQuestionTypeChange = jest.fn();
    const { getByLabelText } = render(
      <QuestionBox
        questionData={mockQuestionData}
        onDelete={() => {}}
        onQuestionTextChange={() => {}}
        onQuestionTypeChange={mockOnQuestionTypeChange}
        onRequiredStatusChange={() => {}}
        onAnswerOptionsChange={() => {}}
      />
    );
    const selectElement = document.querySelector(".optionsdd");
    fireEvent.change(selectElement, { target: { value: 'textarea' } });
    

    expect(mockOnQuestionTypeChange).toHaveBeenCalledWith('textarea');
  });

  test('calls onRequiredStatusChange callback when required status changes', () => {
    const mockOnRequiredStatusChange = jest.fn();
    const { getByLabelText } = render(
      <QuestionBox
        questionData={mockQuestionData}
        onDelete={() => {}}
        onQuestionTextChange={() => {}}
        onQuestionTypeChange={() => {}}
        onRequiredStatusChange={mockOnRequiredStatusChange}
        onAnswerOptionsChange={() => {}}
      />
    );

    fireEvent.click(getByLabelText('Required'));

    expect(mockOnRequiredStatusChange).toHaveBeenCalledWith(true);
  });

  test('calls onAnswerOptionsChange callback when answer options change', () => {
    const mockOnAnswerOptionsChange = jest.fn();
    const { getByText, queryByText } = render(
      <QuestionBox
        questionData={{ ...mockQuestionData, questionType: 'dropdown' }} // Set question type to dropdown
        onDelete={() => {}}
        onQuestionTextChange={() => {}}
        onQuestionTypeChange={() => {}}
        onRequiredStatusChange={() => {}}
        onAnswerOptionsChange={mockOnAnswerOptionsChange}
      />
    );

    const addOtherButton = queryByText('Add Other');
    expect(addOtherButton).toBeInTheDocument();
  
    fireEvent.click(addOtherButton);
  
    expect(mockOnAnswerOptionsChange).toHaveBeenCalled();
  });
  
});
