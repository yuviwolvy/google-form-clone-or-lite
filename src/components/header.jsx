const Header = ({ onAddQuestion, onClickSaveOrDraft, onClickPublish, goToHome , onClickPreview}) => {
  return (
    <div className=" flex gap-5 w-full h-full p-5 bg-slate-500 sticky top-0">
      <button
          className=" p-2 min-w-32 border-2 bg-green-700 border-green-800"
          onClick={onClickPublish}
        >
          {" "}
          Publish
        </button>
      <button
        className="border-2 border-yellow-600 bg-yellow-500 p-2 min-w-32"
        onClick={() => onClickSaveOrDraft()}
      >
        Draft
      </button>
      <button className="border-2 border-blue-700 bg-blue-600 p-2 min-w-32"
       onClick={() => onClickPreview()}
      >
        Preview
      </button>
      <div className="ms-auto flex gap-2">
        <button
          className=" p-2 min-w-32 border-2 bg-white border-black"
          onClick={() => goToHome()}
        >
          {" "}
          Home
        </button>
        <button
          className=" p-2 min-w-32 border-2 bg-white border-black"
          onClick={onAddQuestion}
        >
          {" "}
          Add Question
        </button>
      </div>
    </div>
  );
};

export default Header;
