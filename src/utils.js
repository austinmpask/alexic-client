import { alphabet } from "./config";

export function toWord(combo) {
  console.log(combo);
  let word = "";
  combo.forEach((num) => {
    word += alphabet[num];
  });

  return word.toUpperCase();
}

export function toCombo(word) {
  const c = [];
  word.split("").forEach((char) => {
    c.push(alphabet.indexOf(char.toUpperCase()));
  });

  return c;
}

export function isValidWord(word, wordList) {
  return wordList.has(word.toUpperCase());
}

export function dateFormat(date) {
  // Get month (adding 1 since getMonth() returns 0-11)
  const month = String(date.getMonth() + 1).padStart(2, "0");
  // Get day
  const day = String(date.getDate()).padStart(2, "0");
  // Get full year
  const year = date.getFullYear();

  // Combine in MMDDYYYY format
  return month + day + year;
}
