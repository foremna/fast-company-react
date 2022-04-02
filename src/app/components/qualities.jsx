import React from "react";

const Qualities = ({ qualities }) => {
  function badgeColor(el) {
    return `badge mx-2 bg-${el}`;
  }

  return (
    <>
      {qualities.map((quality) => (
        <span key={quality._id} className={badgeColor(quality.color)}>
          {quality.name}
        </span>
      ))}
    </>
  );
};

export default Qualities;
