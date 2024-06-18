import { useState } from "react";

const Text = (props) => {
  const [value, setValue] = useState(props.defaultValue);
  return props.forCheckBox ? (
    <div className="flex">
      <input
        placeholder={props.placeholder}
        className="bg-transparent border-b-2 outline-none mt-2"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          props.handleEdit(e.target.value);
        }}
        required
      ></input>
      <button className="ms-auto deletebt" onClick={props.onDelete}>
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
  ) : (
    <input
      placeholder={props.placeholder}
      className="w-full bg-transparent border-b-2 outline-none mt-2"
    ></input>
  );
};

export default Text;
