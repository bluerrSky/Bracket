const problems = [
  {
    problem_id: 21,
    category: 'Recursion',
    title: 'Factorial',
    description: `
Calculate the factorial of an integer n recursively.

### Input
One integer n.

### Output
Print n!.

### Constraints
0 <= n <= 20

### Example
**Input:**
\`\`\`
5
\`\`\`
**Output:**
\`\`\`
120
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 22,
    category: 'Recursion',
    title: 'Fibonacci Numbers',
    description: `
Calculate the n-th Fibonacci number using recursion.

### Input
One integer n.

### Output
Print the n-th Fibonacci number.

### Constraints
0 <= n <= 40

### Example
**Input:**
\`\`\`
10
\`\`\`
**Output:**
\`\`\`
55
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 23,
    category: 'Recursion',
    title: 'Permutations',
    description: `
Generate all permutations of the numbers 1...n using recursion.

### Input
One integer n.

### Output
Print each permutation in a separate line.

### Constraints
1 <= n <= 8

### Example
**Input:**
\`\`\`
3
\`\`\`
**Output:**
\`\`\`
1 2 3
1 3 2
2 1 3
2 3 1
3 1 2
3 2 1
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 24,
    category: 'Recursion',
    title: 'Sum of Digits',
    description: `
Find the sum of digits of a number recursively.

### Input
One integer n.

### Output
Print the sum of its digits.

### Constraints
0 <= n <= 10^9

### Example
**Input:**
\`\`\`
1234
\`\`\`
**Output:**
\`\`\`
10
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 25,
    category: 'Recursion',
    title: 'Tower of Hanoi',
    description: `
Solve the classic Tower of Hanoi puzzle with n disks using recursion.
Print the moves in the format "Move disk from X to Y".

### Input
One integer n.

### Output
Print the steps to move all disks from rod 1 to rod 3 using rod 2 as auxiliary.

### Constraints
1 <= n <= 15

### Example
**Input:**
\`\`\`
2
\`\`\`
**Output:**
\`\`\`
Move disk from 1 to 2
Move disk from 1 to 3
Move disk from 2 to 3
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 26,
    category: 'Recursion',
    title: 'Sum of Array Elements',
    description: `
Compute the sum of an array of integers recursively.

### Input
The first line contains an integer n.
The next line contains n integers.

### Output
Print the sum of the array elements.

### Constraints
1 <= n <= 10^5
-10^9 <= element <= 10^9

### Example
**Input:**
\`\`\`
5
1 2 3 4 5
\`\`\`
**Output:**
\`\`\`
15
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 27,
    category: 'Recursion',
    title: 'Count Paths in Grid',
    description: `
Given a grid of size n×m, count the number of ways to get from the top-left corner to the bottom-right corner moving only down or right using recursion.
You can try memoization in case of TLE.
### Input
Two integers n and m.

### Output
Print the number of such paths.

### Constraints
1 <= n, m <= 20

### Example
**Input:**
\`\`\`
2 2
\`\`\`
**Output:**
\`\`\`
2
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 2,
    memory_limit: 524288
  },

  {
    problem_id: 28,
    category: 'Recursion',
    title: 'Palindrome Check',
    description: `
Check recursively whether a given string is a palindrome.

### Input
A string s.

### Output
Print "YES" if the string is a palindrome, otherwise "NO".

### Constraints
1 <= |s| <= 10^5

### Example
**Input:**
\`\`\`
racecar
\`\`\`
**Output:**
\`\`\`
YES
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 29,
    category: 'Recursion',
    title: 'Expression Evaluation',
    description: `
Evaluate a nested expression with integers and operators (+, -, *), using recursion.
Expressions are given as strings with balanced parentheses.

### Input
A string representing the expression.

### Output
Print the evaluated integer result.

### Constraints
Expression length <= 10^5

### Example
**Input:**
\`\`\`
(1+(2*3)) 
\`\`\`
**Output:**
\`\`\`
7
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 2,
    memory_limit: 524288
  }
];

module.exports = { problems };
