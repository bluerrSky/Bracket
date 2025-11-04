function generateParentheses(n) {
  const result = [];

  function backtrack(curr, open, close) {
    if (curr.length === n * 2) {
      result.push(curr);
      return;
    }

    if (open < n) backtrack(curr + "(", open + 1, close);
    if (close < open) backtrack(curr + ")", open, close + 1);
  }

  backtrack("", 0, 0);
  return result.join("\\n"); // <-- join with literal "\n"
}

// Example usage:
const input = 8;
const output = generateParentheses(input);
console.log(output);
