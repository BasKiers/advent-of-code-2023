import run from "aocrunner";

const parseInput = (rawInput: string): string[] => rawInput.split("\n");

const parseIntVal = (char: string): number => parseInt(char, 10);

const getNumbers = (
  input: string[],
  parseFn: (char: string, index: number, arr: string[]) => number,
): number[][] =>
  input.map((line) =>
    line
      .split("")
      .map(parseFn)
      .filter((num) => !isNaN(num)),
  );

const getSum = (numbers: number[][]): number =>
  numbers
    .flatMap((numLine) => numLine.at(0)! * 10 + numLine.at(-1)!)
    .reduce((a, b) => a + b);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return getSum(getNumbers(input, parseIntVal));
};

const numWords = [
  "zero",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const parseNumVal = (char: string, index: number, arr: string[]): number => {
  const num = parseIntVal(char);

  if (!isNaN(num)) {
    return num;
  }

  const wordAtIndex = arr.slice(index, index + 5).join("");
  const numWordIndex = numWords.findIndex((word) =>
    wordAtIndex.startsWith(word),
  );

  return numWordIndex >= 0 ? numWordIndex : NaN;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return getSum(getNumbers(input, parseNumVal));
};

run({
  part1: {
    tests: [
      {
        input: `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
