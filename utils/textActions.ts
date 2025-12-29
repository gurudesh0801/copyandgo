export const removeExtraSpaces = (text: string) =>
  text.replace(/\s+/g, " ").trim();

export const removeLineBreaks = (text: string) => text.replace(/\n+/g, " ");

export const toUpperCase = (text: string) => text.toUpperCase();

export const toLowerCase = (text: string) => text.toLowerCase();

export const toSentenceCase = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

export const removeEmojis = (text: string) =>
  text.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "");
