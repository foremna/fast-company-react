import React, { useState } from "react";

import Qualities from "./qualities";
import Bookmark from "./bookmark";

const User = (props) => {
  const [isActive, setActive] = useState("false");

  const handleBookmark = () => {
    setActive(!isActive);
  };

  return (
    <>
      <tr>
        <th scope="row">{props.name}</th>
        <td>
          <>
            <Qualities qualities={props.qualities} />
          </>
        </td>
        <td>
          <span key={props.profession._id}>{props.profession.name}</span>
        </td>
        <td>{props.completedMeetings}</td>
        <td>{props.rate}</td>
        <td>
          <button className="btn" onClick={handleBookmark}>
            <Bookmark isActive={isActive} />
          </button>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => props.onDelete(props._id)}
          >
            delete
          </button>
        </td>
      </tr>
    </>
  );
};
export default User;
