function generatePermutationsString(n) {
  const nums = Array.from({ length: n }, (_, i) => i + 1);
  const result = [];

  function backtrack(start) {
    if (start === n) {
      result.push(nums.join(" "));
      return;
    }
    for (let i = start; i < n; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]];
      backtrack(start + 1);
      [nums[start], nums[i]] = [nums[i], nums[start]];
    }
  }

  backtrack(0);

  // Create final string with literal \n separators
  const outputString = result.join("\\n"); 

  // Wrap it with the input for display or DB
  return `"${outputString}"`;
}

// Example:
console.log(generatePermutationsString(7));
