import { useState } from "react";

export const useCodeEditorDatabase = () => {
  const [query, setQuery] = useState<string | undefined>();
  const [queryRecievedCode, setQueryRecievedCode] = useState<any>({
    query: "",
    result: "",
  });

  const tableStyle = `
  * {
    font-family: Arial, sans-serif;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 10px;
    background-color: #f5f5f5;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    border: 1px solid #ccc;
    border-radius: 10px;
    overflow: hidden;
  }

 th {
  background-color: #ff6fb4; /* Soft pink */
  color: white;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid #e0589c;
}

  td {
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #ececec;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background-color: #f0f0f0;
  }

  h2 {
    margin: 15px 0 5px;
    font-size: 18px;
    color: #333;
  }

  .overflow-auto {
    overflow-x: auto;
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
