import React from "react";
import spinner from "../../img/loading2.gif";

export default () => {
  return (
    <div>
      <img
        src={spinner}
        alt="Loading..."
        style={{ width: "60px", margin: "auto", display: "block" }}
      />
    </div>
  );
};
