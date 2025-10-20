import { useState } from "react";

export const useCodeEditorDatabase = () => {
  const [query, setQuery] = useState<string | undefined>();
  const [queryRecievedCode, setQueryRecievedCode] = useState<any>({
    query: "",
    result: "",
  });

  const tableStyle = `
  body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    min-height: 100vh;

    margin: 0;
  }

  table {
    border-collapse: collapse;
  }

  th,
  td {
    border: 1px solid black;
    padding: 5px;
    text-align: center;
  }
`;

  return {
    query,
    setQuery,
    queryRecievedCode,
    setQueryRecievedCode,
    tableStyle,
  };
};
