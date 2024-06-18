import { render, fireEvent, screen, act } from "@testing-library/react";
import HomePage from "./homepage";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(),
  }));

describe("HomePage component", () => {
  test("renders create new form button", () => {
    const navigateMock = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(navigateMock);

    render(<HomePage />);

    const createNewFormButton = screen.getByText("Create a new Form");

    expect(createNewFormButton).toBeInTheDocument();
  });

  test("calls redirect function when create new form button is clicked", () => {
    const navigateMock = jest.fn();
    require("react-router-dom").useNavigate.mockReturnValue(navigateMock);

    render(<HomePage />);

    const createNewFormButton = screen.getByText("Create a new Form");
    fireEvent.click(createNewFormButton);

    expect(navigateMock).toHaveBeenCalled();
  });

  test("calls fetchData function on component mount", async () => {
    const fetchDataMock = jest.fn().mockResolvedValueOnce([
      {
        id: "1",
        title: "Published Form",
        description: "This is a published form",
        status: "published",
      },
    ]);

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFormData,
    });

    await act(async () => {
      render(<HomePage />);
    });

    jest.spyOn(global, "fetch").mockResolvedValueOnce({ ok: true });

    expect(global.fetch).toHaveBeenCalledWith("http://localhost:8000/forms");
  });

  test("renders published forms", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: "1",
          title: "Published Form",
          description: "This is a published form",
          status: "published",
        },
      ],
    });

    await act(async () => {
      render(<HomePage />);
    });

    const publishedFormTitle = screen.getByText("Published Form");
    expect(publishedFormTitle).toBeInTheDocument();
  });

  test("renders drafted forms", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => [
        {
          id: "2",
          title: "Drafted Form",
          description: "This is a drafted form",
          status: "draft",
        },
      ],
    });

    await act(async () => {
      render(<HomePage />);
    });

    const draftedFormTitle = screen.getByText("Drafted Form");
    expect(draftedFormTitle).toBeInTheDocument();
  });

  test("calls handleDelete function when delete button is clicked", async () => {
    const mockFormData = [
      {
        id: "1",
        title: "Published Form",
        description: "This is a published form",
        status: "published",
      },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockFormData,
    });

    await act(async () => {
      render(<HomePage />);
    });

    jest.spyOn(global, "fetch").mockResolvedValueOnce({ ok: true });

    const deleteButton = document.querySelector(".deletebt");
    fireEvent.click(deleteButton);

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8000/forms/1",
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });
});
