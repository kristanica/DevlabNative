export const sqlRegex = (sqlCode: any) => {
  const keywordRegex = /\b(SELECT|AND|NOT|UPDATE|LIKE|BETWEEN|DELETE)\b/gi;
  const keywords = [];
  let match;

  while ((match = keywordRegex.exec(sqlCode)) !== null) {
    keywords.push(match[1].toUpperCase());
  }
  return [...new Set(keywords)]; // remove duplicates
};
