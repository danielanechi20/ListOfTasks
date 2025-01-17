export default function avatarFallbackGenarator(inputString) {
  // Split the input string by space
  const words = inputString.split(" ");

  // Extract the first letter of each word and concatenate them
  const result = words.map((word) => word.charAt(0)).join("");

  return result.toUpperCase();
}
