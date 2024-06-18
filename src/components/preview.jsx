import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import React from "react";
import RadioButton from "./radiobutton";
import CheckBox from "./checkbox";

const Preview = () => {
  const { formId } = useParams();

  const [formData, setFormData] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/forms/${formId}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFormData(data);
    } catch (error) {
      console.log("Error occurred while fetching forms: ", error);
    }
  };

  const renderTextInput = () => {
    return (
      <input
        placeholder="Your question comes here"
        className="w-4/6 bg-transparent outline-none border-b-2"
        required
      ></input>
    );
  };
  const renderTextArea = () => {
    return (
      <textarea
        placeholder="Your question comes here"
        className="w-4/6 bg-transparent outline-none border-b-2"
        required
      ></textarea>
    );
  };
  const rendercheckBox = (options) => {
    return (
      <div>
        {options.map((option, index) => (
          <CheckBox
            key={option.id}
            defaultValue={option.value}
            handleEdit={(value) => {}}
            onDelete={() => {}}
            isDeleteButtonDisable={true}
          />
        ))}
      </div>
    );
  };
  const renderredioButton = (options) => {
    return (
      <div>
        {options.map((option, index) => (
          <RadioButton
            key={option.id}
            defaultValue={option.value}
            handleEdit={(value) => {}}
            onDelete={() => {}}
            isDeleteButtonDisable={true}
          />
        ))}
      </div>
    );
  };
  const renderDropDown = (options) => {
    return (
      <div>
        <select
          name="question_type"
          className="w-2/6 bg-transparent border-2 border-black rounded outline-none"
          onChange={(e) => {}}
        >
          {options.map((item, index) => (
            <option value={item.id}>{item.value}</option>
          ))}
        </select>
      </div>
    );
  };
  const renderQuestionInputField = (question) => {
    if (question.questionType === "text") {
      return renderTextInput();
    } else if (question.questionType === "textarea") {
      return renderTextArea();
    } else if (question.questionType === "checkbox") {
      return rendercheckBox(question.answerOptions);
    } else if (question.questionType === "radiobutton") {
      return renderredioButton(question.answerOptions);
    } else if (question.questionType === "dropdown") {
      return renderDropDown(question.answerOptions);
    } else {
      return <div />;
    }
  };
  return (
    <div>
      {formData ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <div className=" bg-slate-300 w-1/2 h-1/2 flex flex-col p-5 mt-3 justify-center items-center gap-3 rounded-md">
            <h1>{formData.title}</h1>
            <h2>{formData.description}</h2>
          </div>
          <div className=" bg-slate-300 w-1/2 h-1/2 flex flex-col p-5 mt-3 justify-center items-center gap-3 rounded-md">
            <div className="w-full ">
              {formData.questions?.map((question, index) => (
                <div>
                  <h3>
                    {`Que: ${index + 1} ${question.questionText}`}{" "}
                    <span style={{ color: "red" }}>
                      {question.isRequiredStatus ? "*" : ""}
                    </span>
                  </h3>
                  {renderQuestionInputField(question)}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Preview;
