import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();

  const [formDataList, setFormDataList] = useState([]);
  const [draftList, setDraftList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/forms");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const publishedFormData = data.filter(
        (formData) => formData.status === "published"
      );
      const draftData = data.filter((formData) => formData.status === "draft");
      setDraftList(draftData);
      setFormDataList(publishedFormData);
    } catch (error) {
      console.log("Error occurred while fetching forms: ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [navigate]);

  const redirect = () => {
    const newFormId = uuidv4();
    navigate(`/form-page/${newFormId}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/forms/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete form");
      }
      toast.success("Form successfully deleted!");
      fetchData();
    } catch (error) {
      console.log("Error occurred while deleting form: ", error);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center w-full h-full">
      <div>
        <button
          className=" border-2 border-black p-2 mt-5"
          onClick={() => redirect()}
        >
          Create a new Form
        </button>
      </div>
      <div className="mt-5">Published</div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {formDataList.map((formData) => (
          <div
          key={formData.id}
          className="border border-gray-300 rounded p-4 my-2 cursor-pointer relative"
          onClick={() => navigate(`/preview/${formData.id}`)}
        >
          <h2 className="text-lg font-bold">{formData.title}</h2>
          <p>{formData.description}</p>
          <button
            className=" mt-2 px-2 py-1 deletebt"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(formData.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.616 20q-.691 0-1.153-.462T6 18.384V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zm2.192-3h1V8h-1zm3.384 0h1V8h-1z"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
    <div className="mt-5">Drafted</div>
    <div className="grid grid-cols-3 gap-4 mt-5">
      {draftList.map((formData) => (
        <div
          key={formData.id}
          className="border border-gray-300 rounded p-4 my-2 cursor-pointer relative"
          onClick={() => navigate(`/form-page/${formData.id}`)}
        >
          <h2 className="text-lg font-bold">{formData.title}</h2>
          <p>{formData.description}</p>
          <button
            className="mt-2 px-2 py-1 deletebt"
            onClick={(e) => {
              e.stopPropagation(); 
              handleDelete(formData.id);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M7.616 20q-.691 0-1.153-.462T6 18.384V6H5V5h4v-.77h6V5h4v1h-1v12.385q0 .69-.462 1.153T16.384 20zm2.192-3h1V8h-1zm3.384 0h1V8h-1z"
              />
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
);
};

export default HomePage;
