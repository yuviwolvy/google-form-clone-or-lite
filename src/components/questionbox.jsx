import { useEffect, useState } from "react";
import Text from "./text";
import TextArea from "./textarea";
import CheckBox from "./checkbox";
import RadioButton from "./radiobutton";
import { v4 as uuidv4 } from "uuid";

const QuestionBox = ({
  onDelete,
  onQuestionTextChange,
  onQuestionTypeChange,
  onRequiredStatusChange,
  onAnswerOptionsChange,
  questionData,
}) => {
  const [question, setQuestion] = useState(questionData.questionText);
  const [type, setType] = useState(questionData.questionType);
  const [options, setOptions] = useState(questionData?.answerOptions ?? []);

  const addOptions = () => {
    let newOption = {value: "Option " + (options.length + 1), id: uuidv4()};
    setOptions((prevOptions) => [...prevOptions, newOption]);
  };

  const optionEdits = (ind, value) => {
    const updatedOptions = options.map((option) => {
      if (option.id === ind) {
        return {...option, value: value.trim()};
      } else {
        return option;
      }
    });
    setOptions(updatedOptions);
  };

  const deleteOption = (index) => {
    const updatedOptions = options.filter((option) => option.id !== index);
    setOptions(updatedOptions);
  };

  useEffect(() => {
    if(options.length > 0){
      onAnswerOptionsChange(options);
    }
  }, [options]);

  return (
    <div className=" flex flex-col bg-slate-300 w-1/2 h-1/2 p-5 mt-3 rounded-md">
      <div className="w-full flex gap-2">
        <input
          placeholder="Your question comes here"
          className="w-4/6 bg-transparent outline-none border-b-2"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value);
            onQuestionTextChange(e.target.value);
          }}
          required
        ></input>
        <select
          name="question_type"
          value={type ?? "text"}
          className="w-2/6 bg-transparent border-2 border-black rounded outline-none optionsdd"
          onChange={(e) => {
            setType(e.target.value);
            if(e.target.value !== "text" || e.target.value !== "textarea"){
              setOptions([{ value: "Option 1", id: uuidv4() }]);
              questionData.answerOptions = options;
            } else {
              delete questionData.answerOptions;
            }
            onQuestionTypeChange(e.target.value);
          }}
        >
          <option value="text">Text Box</option>
          <option value="textarea">Text Area</option>
          <option value="checkbox">Check Box</option>
          <option value="radiobutton">Radio Button</option>
          <option value="dropdown">Drop Down</option>
        </select>
      </div>
      <div className="mt-5">
        {type === "text" ? (
          <Text placeholder="Short answer text" forCheckBox={false} />
        ) : type === "textarea" ? (
          <TextArea />
        ) : type === "checkbox" ? (
          options.map((option) => (
            <CheckBox
              key={option.id}
              defaultValue={option.value}
              handleEdit={(value) => optionEdits(option.id, value)}
              onDelete={() => deleteOption(option.id)}
            />
          ))
        ) : type === "radiobutton" ? (
          options.map((option) => (
            <RadioButton
              key={option.id}
              defaultValue={option.value}
              handleEdit={(value) => optionEdits(option.id, value)}
              onDelete={() => deleteOption(option.id)}
            />
          ))
        ) : type === "dropdown" ? (
          options.map((option) => (
            <Text
              placeholder="Option"
              key={option.id}
              handleEdit={(value) => optionEdits(option.id, value)}
              forCheckBox={true}
              defaultValue={option.value}
              onDelete={() => deleteOption(option.id)}
            />
          ))
        ) : null}
        {(type === "checkbox" ||
          type === "radiobutton" ||
          type === "dropdown") && (
          <div className="mt-5">
            <button
              className="text-black border-2 p-1 min-w-24 border-black"
              onClick={addOptions}
            >
              Add Other
            </button>
          </div>
        )}
      </div>
      <div className="flex ms-auto mt-5 gap-5">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            id="isRequired"
            onChange={(e) => {
              onRequiredStatusChange(e.target.checked);
            }}
          ></input>
          <label for="isRequired">Required</label>
        </div>
        <div className="mt-1">
          <button className="deletebt" onClick={onDelete}>
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
      </div>
    </div>
  );
};

export default QuestionBox;
