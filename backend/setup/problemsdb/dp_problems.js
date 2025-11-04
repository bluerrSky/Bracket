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
  },




  {
  problem_id: 93,
  category: 'Dynamic Programming',
  title: 'Climbing Stairs',
  description: `
You are climbing a staircase with n steps. Each time you can climb either 1 or 2 steps.
Your task is to count how many distinct ways you can reach the top.

### Input
\`\`\`
A single integer n.
\`\`\`

### Output
\`\`\`
Print the number of distinct ways to climb the stairs.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 45
\`\`\`

### Example
**Input:**
\`\`\`
5
\`\`\`

**Output:**
\`\`\`
8
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 65536
},
{
  problem_id: 94,
  category: 'Dynamic Programming',
  title: 'Coin Change',
  description: `
You are given coins of different denominations and a total amount.  
Find the fewest number of coins needed to make up that amount.  
If that amount cannot be made up, print -1.

### Input
\`\`\`
First line: integer n (number of coin types)
Second line: n integers representing coin denominations
Third line: integer amount
\`\`\`

### Output
\`\`\`
Print the minimum number of coins needed, or -1 if not possible.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 100
1 <= coins[i], amount <= 10^4
\`\`\`

### Example
**Input:**
\`\`\`
3
1 2 5
11
\`\`\`

**Output:**
\`\`\`
3
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 131072
},
{
  problem_id: 95,
  category: 'Dynamic Programming',
  title: 'Maximum Subarray Sum',
  description: `
Find the contiguous subarray within a one-dimensional array of numbers which has the largest sum.

### Input
\`\`\`
The first line has an integer n.
The second line has n integers.
\`\`\`

### Output
\`\`\`
Print the maximum subarray sum.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 10^5
-10^9 <= arr[i] <= 10^9
\`\`\`

### Example
**Input:**
\`\`\`
5
-2 1 -3 4 -1
\`\`\`

**Output:**
\`\`\`
4
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 65536
},
{
  problem_id: 96,
  category: 'Dynamic Programming',
  title: 'Minimum Path Sum in Grid',
  description: `
Given a m x n grid filled with non-negative numbers, find a path from top-left to bottom-right 
which minimizes the sum of all numbers along its path. You can only move right or down.

### Input
\`\`\`
First line: two integers m and n.
Next m lines: each contains n integers representing the grid.
\`\`\`

### Output
\`\`\`
Print the minimum path sum.
\`\`\`

### Constraints
\`\`\`
1 <= m,n <= 1000
0 <= grid[i][j] <= 10^5
\`\`\`

### Example
**Input:**
\`\`\`
3 3
1 3 1
1 5 1
4 2 1
\`\`\`

**Output:**
\`\`\`
7
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 2,
  memory_limit: 262144
},
{
  problem_id: 97,
  category: 'Dynamic Programming',
  title: 'House Robber',
  description: `
You are a professional robber planning to rob houses along a street.  
Each house has a certain amount of money. Adjacent houses cannot be robbed on the same night.

### Input
\`\`\`
The first line has integer n.
The second line has n integers representing money in each house.
\`\`\`

### Output
\`\`\`
Print the maximum amount you can rob tonight.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 10^5
0 <= money[i] <= 10^4
\`\`\`

### Example
**Input:**
\`\`\`
5
2 7 9 3 1
\`\`\`

**Output:**
\`\`\`
12
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 131072
},
{
  problem_id: 98,
  category: 'Dynamic Programming',
  title: 'Longest Common Subsequence',
  description: `
Given two strings, find the length of their longest common subsequence (LCS).  
A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous.

### Input
\`\`\`
Two lines:
Line 1: string A
Line 2: string B
\`\`\`

### Output
\`\`\`
Print the length of the longest common subsequence.
\`\`\`

### Constraints
\`\`\`
1 <= length of A, B <= 1000
\`\`\`

### Example
**Input:**
\`\`\`
abcde
ace
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
  problem_id: 99,
  category: 'Dynamic Programming',
  title: 'Frog Jump (1 Step or 2 Step)',
  description: `
A frog is trying to reach the top of n stones. The frog can jump either 1 or 2 stones at a time.  
The cost of jumping from one stone to another is the absolute difference of their heights.  
Find the minimum total cost for the frog to reach the last stone.

### Input
First line contains an integer n — number of stones.  
Second line contains n integers — heights of the stones.

### Output
Print the minimum total cost to reach stone n.

### Constraints
1 <= n <= 10^5  
1 <= height_i <= 10^4

### Example
**Input:**
\`\`\`
4
10 30 40 20
\`\`\`

**Output:**
\`\`\`
30
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 262144
},


{
  problem_id: 100,
  category: 'Dynamic Programming',
  title: 'Count Binary Strings Without Consecutive 1s',
  description: `
Given an integer n, find the number of binary strings of length n such that there are no consecutive 1s.

### Input
A single integer n.

### Output
Print one integer — the number of valid binary strings modulo 10^9+7.

### Constraints
1 <= n <= 10^5

### Example
**Input:**
\`\`\`
3
\`\`\`

**Output:**
\`\`\`
5
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 262144
},


{
  problem_id: 101,
  category: 'Dynamic Programming',
  title: 'Tribonacci Numbers',
  description: `
The Tribonacci sequence Tn is defined as:  
T0 = 0, T1 = 1, T2 = 1, and Tn = Tn-1 + Tn-2 + Tn-3 for n >= 3.  
Given n, find Tn.

### Input
A single integer n.

### Output
Print Tn.

### Constraints
0 <= n <= 37

### Example
**Input:**
\`\`\`
4
\`\`\`

**Output:**
\`\`\`
4
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 65536
},


{
  problem_id: 102,
  category: 'Dynamic Programming',
  title: 'Minimum Path Sum in Triangle',
  description: `
Given a triangle array, find the minimum path sum from top to bottom.  
At each step, you may move to adjacent numbers on the row below.

### Input
First line: integer n — number of rows.  
Next n lines contain the elements of the triangle.

### Output
Print the minimum path sum.

### Constraints
1 <= n <= 200

### Example
**Input:**
\`\`\`
4
2
3 4
6 5 7
4 1 8 3
\`\`\`

**Output:**
\`\`\`
11
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 262144
},


{
  problem_id: 103,
  category: 'Dynamic Programming',
  title: 'Subset Sum Count',
  description: `
Given an array of integers and a target sum, find the number of subsets that sum to the target.  
Use dynamic programming.

### Input
First line: two integers n and target.  
Second line: n integers representing array elements.

### Output
Print the count of subsets that sum to target modulo 10^9+7.

### Constraints
1 <= n <= 100  
0 <= arr[i] <= 1000  
0 <= target <= 1000

### Example
**Input:**
\`\`\`
4 5
1 2 3 4
\`\`\`

**Output:**
\`\`\`
2
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 262144
},


];

module.exports = { problems };
