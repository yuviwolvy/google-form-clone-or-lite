import { useState, useEffect } from "react";
import Header from "./header";
import QuestionBox from "./questionbox";
import Title from "./title";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormPage = () => {
  const { formId } = useParams();
  const [questions, setQuestions] = useState([
    {
      id: uuidv4(),
      questionText: "Untitled question",
      questionType: "text",
      isRequiredStatus: false,
    },
  ]);

  const [formData, setFormData] = useState({
    id: formId || uuidv4(),
    title: "Untitled Form",
    description: "",
    questions: questions,
    status: "draft",
  });

  const navigate = useNavigate();

  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const debouncedSave = setTimeout(() => {
      if (hasChanged) {
        saveFormDetails(false, false, false, false);
        setHasChanged(false);
      }
    }, 1000);

    return () => clearTimeout(debouncedSave);
  }, [formData]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/forms/${encodeURIComponent(formId)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuestions(data.questions);
      setFormData(data);
      if (data.status === "published") {
        toast.warn("This form is already published!");
        navigate("/");
      }
    } catch (error) {
      console.log("Error occurred while fetching forms: ", error);
    }
  };
  const addQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      questionText: "Untitled question",
      questionType: "text",
      answerOptions: [],
      isRequiredStatus: false,
    };
    setQuestions([...questions, newQuestion]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: [...prevFormData.questions, newQuestion],
    }));
    setHasChanged(true);
  };

  const handleTitle = (value) => {
    setFormData((prevFormData) => ({ ...prevFormData, title: value }));
    setHasChanged(true);
  };

  const handleDescription = (value) => {
    setFormData((prevFormData) => ({ ...prevFormData, description: value }));
    setHasChanged(true);
  };

  const handleQuestionText = (id, value) => {
    questions.forEach((question) => {
      if (question.id === id) {
        question.questionText = value;
      }
    });
    setHasChanged(true);
  };

  const handleQusetionType = (id, value) => {
    questions.forEach((question) => {
      if (question.id === id) {
        question.questionType = value;
      }
    });
    setHasChanged(true);
  };

  const handleRequiredStatus = (id, value) => {
    questions.forEach((question) => {
      if (question.id === id) {
        question.isRequiredStatus = value;
      }
    });
    setHasChanged(true);
  };

  const handleAnswerOptions = (id, value) => {
    questions.forEach((question) => {
      if (question.id === id) {
        question.answerOptions = value;
      }
    });
    setHasChanged(true);
  };

  const deleteQuestion = (id) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      questions: questions.filter((question) => question.id !== id),
    }));
    setQuestions(questions.filter((question) => question.id !== id));
    setHasChanged(true);
  };
  const saveFormDetails = (
    published,
    goToPreview,
    navigateToHome,
    showToast
  ) => {
    const formDetails = { ...formData };
    formDetails.status = published ? "published" : "draft";

    const apiUrl = `http://localhost:8000/forms/${encodeURIComponent(formId)}`;

    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return fetch(apiUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDetails),
          });
        } else {
          return fetch("http://localhost:8000/forms", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formDetails),
          });
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save form data");
        }
        return response.json();
      })
      .then((data) => {
        if (goToPreview) {
          navigate(`/preview/${data.id}`);
        }
        if (navigateToHome) {
          navigate(`/`);
        }
        if (showToast) {
          if (published) {
            toast.success("Form successfully published!");
          } else {
            toast.success("Form successfully added to draft!");
          }
        }
      })
      .catch((error) => {
        console.error("Error saving form data:", error);
        toast.error("Failed to save form data");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <Header
        onAddQuestion={addQuestion}
        onClickSaveOrDraft={() => saveFormDetails(false, false, true, true)}
        onClickPublish={() => saveFormDetails(true, false, true, true)}
        goToHome={() => {
          navigate("/");
        }}
        onClickPreview={async () => {
          saveFormDetails(false, true, false);
        }}
      />
      <Title
        title={formData.title}
        description={formData.description}
        onTitleChange={(value) => {
          handleTitle(value);
        }}
        onDescriptionChange={(value) => {
          handleDescription(value);
        }}
      />
      {questions.map((question, index) => (
        <QuestionBox
          key={question.id}
          questionData={question}
          onDelete={() => deleteQuestion(question.id)}
          onQuestionTextChange={(value) =>
            handleQuestionText(question.id, value)
          }
          onQuestionTypeChange={(value) =>
            handleQusetionType(question.id, value)
          }
          onRequiredStatusChange={(value) =>
            handleRequiredStatus(question.id, value)
          }
          onAnswerOptionsChange={(value) =>
            handleAnswerOptions(question.id, value)
          }
        />
      ))}
    </div>
  );
};

export default FormPage;
