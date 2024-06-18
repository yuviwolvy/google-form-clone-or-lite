import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import Preview from './preview';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Preview Component', () => {
  beforeEach(() => {
    useParams.mockReturnValue({ formId: '1' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing', async () => {
    const mockFormData = {
      title: 'Sample Form',
      description: 'This is a sample form description',
      questions: [],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockFormData,
    });

    await act(async () => {
      render(
        <Router>
          <Preview />
        </Router>
      );
    });

    expect(screen.getByText('Sample Form')).toBeInTheDocument();
    expect(screen.getByText('This is a sample form description')).toBeInTheDocument();
  });

  test('fetches data and displays form details', async () => {
    const mockFormData = {
      title: 'Sample Form',
      description: 'This is a sample form description',
      questions: [],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockFormData,
    });

    await act(async () => {
      render(
        <Router>
          <Preview />
        </Router>
      );
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/forms/1');
  });

  test('renders questions based on fetched formData', async () => {
    const mockFormData = {
      title: 'Sample Form',
      description: 'This is a sample form description',
      questions: [
        { questionType: 'text', questionText: 'Text Question?', isRequiredStatus: true },
        { questionType: 'textarea', questionText: 'Textarea Question?', isRequiredStatus: false },
        { questionType: 'checkbox', questionText: 'Checkbox Question?', isRequiredStatus: true, answerOptions: [{ id: 1, value: 'Option 1' }] },
        { questionType: 'radiobutton', questionText: 'RadioButton Question?', isRequiredStatus: false, answerOptions: [{ id: 1, value: 'Option 1' }] },
        { questionType: 'dropdown', questionText: 'Dropdown Question?', isRequiredStatus: true, answerOptions: [{ id: 1, value: 'Option 1' }] },
      ],
    };

    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockFormData,
    });

    await act(async () => {
      render(
        <Router>
          <Preview />
        </Router>
      );
    });

    expect(screen.getByText('Que: 1 Text Question?')).toBeInTheDocument();
    expect(screen.getByText('Que: 2 Textarea Question?')).toBeInTheDocument();
    expect(screen.getByText('Que: 3 Checkbox Question?')).toBeInTheDocument();
    expect(screen.getByText('Que: 4 RadioButton Question?')).toBeInTheDocument();
    expect(screen.getByText('Que: 5 Dropdown Question?')).toBeInTheDocument();
  });
});
