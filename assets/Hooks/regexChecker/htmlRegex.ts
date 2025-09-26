export const htmlRegex = (htmlCode: any) => {
  const tagRegex = /<([a-zA-Z0-9]+)(\s|>)|<!--[\s\S]*?-->/g;
  const tags = [];
  let match;

  while ((match = tagRegex.exec(htmlCode)) !== null) {
    if (match[0].startsWith("<!--")) {
      tags.push("<!--");
    } else {
      tags.push(`<${match[1].toLowerCase()}>`);
    }
  }

  return [...new Set(tags)];
};
