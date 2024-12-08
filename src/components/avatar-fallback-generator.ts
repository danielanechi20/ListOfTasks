export default function avatarFallbackGenarator(inputString: string): string {
  // Split the input string by space
  const words: string[] = inputString.split(" ");

  // Extract the first letter of each word and concatenate them
  const result: string = words.map((word) => word.charAt(0)).join("");

  return result.toUpperCase();
}
