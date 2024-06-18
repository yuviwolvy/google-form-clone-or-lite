import { useEffect, useState } from "react";

const Title = (props) => {
  const [title, setTitle] = useState(
    props?.title ? props.title : "Untitled Form"
  );
  const [description, setDescription] = useState(
    props?.description ? props.description : ""
  );

  useEffect(() => {
    setTitle(props?.title ? props.title : "Untitled Form");
    setDescription(props?.description ? props.description : "");
  }, [props?.title, props?.description]);
  return (
    <div className=" bg-slate-300 w-1/2 h-1/2 flex flex-col p-5 mt-3 justify-center items-center gap-3 rounded-md">
      <input
        value={title}
        className=" w-5/6 bg-transparent border-b-2 outline-none text-4xl"
        onChange={(e) => {
          setTitle(e.target.value);
          props.onTitleChange(e.target.value);
        }}
      ></input>
      <input
        value={description}
        placeholder="Your description comes here"
        className="w-5/6 bg-transparent border-b-2 outline-none"
        onChange={(e) => {
          setDescription(e.target.value);
          props.onDescriptionChange(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default Title;
