import React from "react";
import InputContainer from "./InputContainer";
type CodingInterfacesPayload = StateDispatchPayload & {
  category: string;
};
const CodingInterfaces = ({
  state,
  dispatch,
  category,
}: CodingInterfacesPayload) => {
  const codingInterfaceRender: Record<string, string[]> = {
    Html: ["html"],
    Css: ["html", "css"],
    JavaScript: ["html", "css", "js"],
    Database: ["database"],
  };
  return (
    <>
      {codingInterfaceRender[category!].map((lang, index) => (
        <InputContainer
          key={index}
          title={`Coding Interface ${lang.toUpperCase()}`}
          value={state.codingInterface[lang]}
          setValue={(text) => {
            dispatch({
              type: "UPDATE_CODING_INTERFACE",
              field: lang,
              value: text,
            });
          }}
          numeric={false}
        />
      ))}
    </>
  );
};

export default CodingInterfaces;
