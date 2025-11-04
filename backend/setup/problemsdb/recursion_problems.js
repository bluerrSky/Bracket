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
  },



  {
  problem_id: 83,
  category: 'Recursion',
  title: 'Print Numbers from 1 to N',
  description: `
Given an integer n, print all numbers from 1 to n using recursion.

### Input
The input contains a single integer n.

### Output
Print numbers from 1 to n in increasing order, separated by spaces.

### Constraints
1 <= n <= 1000

### Example
**Input:**
\`\`\`
5
\`\`\`

**Output:**
\`\`\`
1 2 3 4 5
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 84,
  category: 'Recursion',
  title: 'Reverse a String',
  description: `
Given a string s, print its reverse using recursion.

### Input
The input contains a single string s.

### Output
Print the reversed string.

### Constraints
1 <= |s| <= 1000

### Example
**Input:**
\`\`\`
hello
\`\`\`

**Output:**
\`\`\`
olleh
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 85,
  category: 'Recursion',
  title: 'Sum of First N Natural Numbers',
  description: `
Given an integer n, find the sum of the first n natural numbers using recursion.

### Input
The input contains a single integer n.

### Output
Print the sum of the first n natural numbers.

### Constraints
1 <= n <= 10^5

### Example
**Input:**
\`\`\`
5
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
  problem_id: 86,
  category: 'Recursion',
  title: 'Count Digits in a Number',
  description: `
Given an integer n, count the number of digits in it using recursion.

### Input
The input contains a single integer n.

### Output
Print the number of digits in n.

### Constraints
0 <= n <= 10^9

### Example
**Input:**
\`\`\`
12345
\`\`\`

**Output:**
\`\`\`
5
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 87,
  category: 'Recursion',
  title: 'Power of a Number',
  description: `
Given two integers a and b, find a^b (a raised to the power b) using recursion.

### Input
The input contains two integers a and b.

### Output
Print a^b.

### Constraints
0 <= a <= 10
0 <= b <= 10

### Example
**Input:**
\`\`\`
2 5
\`\`\`

**Output:**
\`\`\`
32
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 524288
},





{
  problem_id: 88,
  category: 'Recursion',
  title: 'Generate All Subsequences of a String',
  description: `
Given a string s, print all its subsequences using recursion.
The subsequences can be printed in any order.

### Input
A single string s.

### Output
Print all subsequences of s, each on a new line.

### Constraints
1 <= |s| <= 10

### Example
**Input:**
\`\`\`
abc
\`\`\`

**Output:**
\`\`\`
a
b
c
ab
ac
bc
abc
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 89,
  category: 'Recursion',
  title: 'Binary Strings Without Consecutive 1s',
  description: `
Given an integer n, print all binary strings of length n such that there are no consecutive 1s.

### Input
A single integer n.

### Output
Print all valid binary strings, one per line.

### Constraints
1 <= n <= 10

### Example
**Input:**
\`\`\`
3
\`\`\`

**Output:**
\`\`\`
000
001
010
100
101
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 90,
  category: 'Recursion',
  title: 'Subset Sum',
  description: `
Given an array of integers and a target sum, print "YES" if there exists a subset whose sum equals the target, otherwise print "NO".
Use recursion to explore all subsets.

### Input
The first line contains two integers n and target.
The next line contains n integers.

### Output
Print "YES" or "NO".

### Constraints
1 <= n <= 20
-10^3 <= arr[i] <= 10^3

### Example
**Input:**
\`\`\`
4 5
1 2 3 4
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
  problem_id: 91,
  category: 'Recursion',
  title: 'N-Queens Count',
  description: `
You are given an integer n. Find the number of possible ways to place n queens on an n×n chessboard so that no two queens attack each other.

### Input
A single integer n.

### Output
Print the number of valid arrangements.

### Constraints
1 <= n <= 10

### Example
**Input:**
\`\`\`
4
\`\`\`

**Output:**
\`\`\`
2
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},


{
  problem_id: 92,
  category: 'Recursion',
  title: 'Generate Balanced Parentheses',
  description: `
Given an integer n, generate all combinations of well-formed parentheses using recursion.

### Input
A single integer n.

### Output
Print all valid combinations, one per line.

### Constraints
1 <= n <= 8

### Example
**Input:**
\`\`\`
3
\`\`\`

**Output:**
\`\`\`
((()))
(()())
(())()
()(())
()()()
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},

];

module.exports = { problems };
