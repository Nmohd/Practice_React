import React from "react";

const Options = ({ question }) => {
  return (
    <div className="options">
      {question.options.map((Option) => (
        <button className="btn btn-option " key={Option}>
          {Option}
        </button>
      ))}
    </div>
  );
};

export default Options;
