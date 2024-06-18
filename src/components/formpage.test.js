import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormPage from "./formpage";

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));
jest.mock("uuid", () => ({
  v4: jest.fn(() => "unique-id"),
}));
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
  useParams: () => ({ formId: "test-form-id" }),
}));

const MockFormPage = () => (
  <Router>
    <Routes>
      <Route path="/" element={<FormPage />} />
    </Routes>
  </Router>
);

describe("FormPage", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("renders the FormPage component", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "test-form-id",
        title: "Test Form",
        description: "This is a test form",
        questions: [],
        status: "draft",
      })
    );

    render(<MockFormPage />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Form")).toBeInTheDocument();
    });
    expect(screen.getByDisplayValue("This is a test form")).toBeInTheDocument();
  });

  test("adds a new question", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "test-form-id",
        title: "Test Form",
        description: "This is a test form",
        questions: [],
        status: "draft",
      })
    );

    render(<MockFormPage />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Form")).toBeInTheDocument();
    });

    const addButton = screen.getByText("Add Question");
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Untitled question"));
    });
  });

  test("deletes a question", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "test-form-id",
        title: "Test Form",
        description: "This is a test form",
        questions: [
          {
            id: "unique-id",
            questionText: "Untitled question",
            questionType: "text",
            isRequiredStatus: false,
          },
        ],
        status: "draft",
      })
    );

    render(<MockFormPage />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Form")).toBeInTheDocument();
    });

    const deleteButton = document.querySelector(".deletebt");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(
        screen.queryByDisplayValue("Untitled question")
      ).not.toBeInTheDocument();
    });
  });

  test("handles title change", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "test-form-id",
        title: "Test Form",
        description: "This is a test form",
        questions: [],
        status: "draft",
      })
    );

    render(<MockFormPage />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Form")).toBeInTheDocument();
    });

    const titleInput = screen.getByDisplayValue("Test Form");
    fireEvent.change(titleInput, { target: { value: "New Form Title" } });

    expect(screen.getByDisplayValue("New Form Title")).toBeInTheDocument();
  });

  test("handles description change", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "test-form-id",
        title: "Test Form",
        description: "This is a test form",
        questions: [],
        status: "draft",
      })
    );

    render(<MockFormPage />);

    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Form")).toBeInTheDocument();
    });

    const descriptionInput = screen.getByPlaceholderText(
      "Your description comes here"
    );
    fireEvent.change(descriptionInput, {
      target: { value: "New Form Description" },
    });

    expect(
      screen.getByDisplayValue("New Form Description")
    ).toBeInTheDocument();
  });

  test("handles question text change", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "test-form-id",
        title: "Test Form",
        description: "This is a test form",
        questions: [
          {
            id: "unique-id",
            questionText: "Untitled question",
            questionType: "text",
            isRequiredStatus: false,
          },
        ],
        status: "draft",
      })
    );
  
    render(<MockFormPage />);
  
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Form")).toBeInTheDocument();
    });
  
    const questionTextInput = screen.getByDisplayValue("Untitled question");
    fireEvent.change(questionTextInput, {
      target: { value: "New question text" },
    });
  
    expect(screen.getByDisplayValue("New question text")).toBeInTheDocument();
  });
  
  test("handles question type change", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "test-form-id",
        title: "Test Form",
        description: "This is a test form",
        questions: [
          {
            id: "unique-id",
            questionText: "Untitled question",
            questionType: "text",
            isRequiredStatus: false,
          },
        ],
        status: "draft",
      })
    );
  
    render(<MockFormPage />);
  
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Form")).toBeInTheDocument();
    });
  
    const questionTypeSelect = document.querySelector(".optionsdd");
    fireEvent.change(questionTypeSelect, { target: { value: "textarea" } });
  
    expect(screen.getByPlaceholderText("Long answer text")).toBeInTheDocument();
  });
  
  test("handles required status change", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "test-form-id",
        title: "Test Form",
        description: "This is a test form",
        questions: [
          {
            id: "unique-id",
            questionText: "Untitled question",
            questionType: "text",
            isRequiredStatus: false,
          },
        ],
        status: "draft",
      })
    );
  
    render(<MockFormPage />);
  
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Form")).toBeInTheDocument();
    });
  
    const requiredStatusCheckbox = screen.getByRole("checkbox");
    fireEvent.click(requiredStatusCheckbox);
  
    expect(requiredStatusCheckbox).toBeChecked();
  });
  
  test("handles answer options change", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "test-form-id",
        title: "Test Form",
        description: "This is a test form",
        questions: [
          {
            id: "unique-id",
            questionText: "Untitled question",
            questionType: "text",
            isRequiredStatus: false,
          },
        ],
        status: "draft",
      })
    );
  
    render(<MockFormPage />);
  
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Form")).toBeInTheDocument();
    });

    const questionTypeSelect = document.querySelector(".optionsdd");
    fireEvent.change(questionTypeSelect, { target: { value: "checkbox" } });
  
    const answerOptionsInput = screen.getByDisplayValue("Option 1");
    fireEvent.change(answerOptionsInput, {
      target: { value: "Option 2" },
    });
  
    expect(answerOptionsInput.value).toBe("Option 2");
  });
  
  test("saves form details", async () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: "test-form-id",
        title: "Test Form",
        description: "This is a test form",
        questions: [
          {
            id: "unique-id",
            questionText: "Untitled question",
            questionType: "text",
            isRequiredStatus: false,
          },
        ],
        status: "draft",
      })
    );
  
    render(<MockFormPage />);
  
    await waitFor(() => {
      expect(screen.getByDisplayValue("Test Form")).toBeInTheDocument();
    });
  
    const saveButton = screen.getByText("Draft");
    fireEvent.click(saveButton);
  });
});
