const problems = [
  {
    problem_id: 39,
    category: 'Dynamic Programming',
    title: 'Longest Increasing Subsequence',
    description: `
Given an array of integers, find the length of the longest strictly increasing subsequence.  
A subsequence is a sequence that can be derived from the array by deleting some or no elements without changing the order of the remaining elements.

### Input  
\`\`\`  
The first line contains an integer n, the number of elements in the array.  
The second line contains n integers, the elements of the array.  
\`\`\`

### Output  
\`\`\`  
Print the length of the longest increasing subsequence.  
\`\`\`

### Constraints  
\`\`\`  
1 <= n <= 10^5  
-10^9 <= array elements <= 10^9  
\`\`\`

### Example  
**Input:**  
\`\`\`  
6  
10 9 2 5 3 7  
\`\`\`  

**Output:**  
\`\`\`  
4  
\`\`\`
    `,
    difficulty: 'Hard',
    time_limit: 2,
    memory_limit: 262144
  },

  {
    problem_id: 40,
    category: 'Dynamic Programming',
    title: 'Knapsack Problem',
    description: `
Given n items with weights and values, determine the maximum total value that can be achieved in a knapsack of capacity W.  
Each item can be taken or left, but only once.

### Input  
\`\`\`  
First line: integers n and W.  
Second line: n integers representing weights of items.  
Third line: n integers representing values of items.  
\`\`\`

### Output  
\`\`\`  
Maximum total value achievable without exceeding W.  
\`\`\`

### Constraints  
\`\`\`  
1 <= n <= 1000  
0 <= weights, values <= 10^6  
\`\`\`

### Example  
**Input:**  
\`\`\`  
4 5  
1 2 3 2  
8 4 0 5  
\`\`\`  

**Output:**  
\`\`\`  
8  
\`\`\`
    `,
    difficulty: 'Medium',
    time_limit: 2,
    memory_limit: 262144
  },

  {
    problem_id: 41,
    category: 'Dynamic Programming',
    title: 'Edit Distance',
    description: `
Given two strings, compute the minimum number of single-character edits (insertions, deletions, substitutions) required to change one string into the other.

### Input  
\`\`\`  
Two lines:  
Line 1: string A  
Line 2: string B  
\`\`\`

### Output  
\`\`\`  
An integer representing the minimum edit distance.  
\`\`\`

### Constraints  
\`\`\`  
1 <= length of strings <= 10^3  
\`\`\`

### Example  
**Input:**  
\`\`\`  
horse  
ros  
\`\`\`  

**Output:**  
\`\`\`  
3  
\`\`\`
    `,
    difficulty: 'Medium',
    time_limit: 2,
    memory_limit: 262144
  },

  {
    problem_id: 42,
    category: 'Dynamic Programming',
    title: 'Partition Equal Subset Sum',
    description: `
Determine if an array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

### Input  
\`\`\`  
The first line has an integer n.  
The second line has n integers representing array elements.  
\`\`\`

### Output  
\`\`\`  
Print "YES" if two such subsets exist, otherwise "NO".  
\`\`\`

### Constraints  
\`\`\`  
1 <= n <= 100  
-10^6 <= array elements <= 10^6  
\`\`\`

### Example  
**Input:**  
\`\`\`  
4  
1 5 11 5  
\`\`\`  

**Output:**  
\`\`\`  
YES  
\`\`\`
    `,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 65536
  },

  {
    problem_id: 43,
    category: 'Dynamic Programming',
    title: 'Unique Paths in Grid',
    description: `
Given an m x n grid, find the number of unique paths from top-left corner to bottom-right corner moving only down or right.

### Input  
\`\`\`  
First line: two integers m and n.  
\`\`\`

### Output  
\`\`\`  
Number of unique paths modulo 10^9+7.  
\`\`\`

### Constraints  
\`\`\`  
1 <= m,n <= 1000  
\`\`\`

### Example  
**Input:**  
\`\`\`  
3 3  
\`\`\`  

**Output:**  
\`\`\`  
6  
\`\`\`
    `,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 65536
  }
];

module.exports = { problems };
