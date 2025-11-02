const problems = [
  {
    problem_id: 1,
    category: 'Arrays',
    title: 'Distinct Values',
    description: `
You are given an array of n integers.
Your task is to count how many distinct values there are in the array.


### Input
The first input line contains an integer n.
The next line contains n integers x_1, x_2, ..., x_n.


### Output
Print one integer: the number of distinct values.


### Constraints
1 <= n <= 2*10^5
1 <= x_i <= 10^9


### Example
**Input:**
\`\`\`
5
2 3 2 2 3
\`\`\`
**Output:**
\`\`\`
2
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 2,
    category: 'Arrays',
    title: 'Array Queries',
    description: `
You are given an array of n integers and q queries.
Each query consists of index i and value x. Set a[i] = x.
After each query, print the sum of the array.


### Input
The first line contains two integers n and q.
The next line contains n integers a_1, ..., a_n.
Then there are q lines, each with two integers i and x.


### Output
After each query, print the sum of the array.


### Constraints
1 <= n, q <= 2*10^5
1 <= a_i, x <= 10^9
1 <= i <= n


### Example
**Input:**
\`\`\`
4 3
1 2 3 4
2 7
4 1
1 2
\`\`\`
**Output:**
\`\`\`
15
12
13
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 3,
    category: 'Arrays',
    title: 'Prefix Sums',
    description: `
You are given an array of n integers.
Calculate the prefix sums of the array, that is, create a new array p where p[i] = a[1] + ... + a[i] for each i.


### Input
The first line contains an integer n.
The second line has n integers a_1,...,a_n.


### Output
Print n integers: the prefix sums.


### Constraints
1 <= n <= 2*10^5
-10^9 <= a_i <= 10^9


### Example
**Input:**
\`\`\`
5
3 2 4 2 1
\`\`\`
**Output:**
\`\`\`
3 5 9 11 12
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 4,
    category: 'Arrays',
    title: 'Searching Subarray',
    description: `
Given an array of n integers, determine if there exists a contiguous subarray that sums to a given target s.


### Input
The first line contains two integers n and s.
The second line contains n integers a_1,...,a_n.


### Output
Print "YES" if a subarray exists, otherwise print "NO".


### Constraints
1 <= n <= 2*10^5
-10^9 <= a_i <= 10^9
1 <= s <= 10^9


### Example
**Input:**
\`\`\`
5 7
2 3 1 2 4
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
    problem_id: 5,
    category: 'Arrays',
    title: 'Rotate Array',
    description: `
Given an array of n integers, rotate the array right by k positions.


### Input
The first line contains two integers n and k.
The second line contains n integers a_1,...,a_n.


### Output
Print the rotated array.


### Constraints
1 <= n <= 2*10^5
0 <= k <= n
1 <= a_i <= 10^9


### Example
**Input:**
\`\`\`
5 2
1 2 3 4 5
\`\`\`
**Output:**
\`\`\`
4 5 1 2 3
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 6,
    category: 'Arrays',
    title: 'Two Sum',
    description: `
You are given an array of n integers and a target sum s.
Determine if there exist two numbers in the array whose sum is s. If such a pair exists, print any one pair of indices (1-based).


### Input
The first line contains two integers n and s.
The second line contains n integers a_1,...,a_n.


### Output
Print two integers: the indices of the pair. If no such pair exists, print "IMPOSSIBLE".


### Constraints
1 <= n <= 2*10^5
-10^9 <= a_i <= 10^9
1 <= s <= 10^9


### Example
**Input:**
\`\`\`
4 7
2 7 5 1
\`\`\`
**Output:**
\`\`\`
1 3
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 7,
    category: 'Arrays',
    title: 'Largest Rectangle',
    description: `
You are given an array representing heights of bars in a histogram. Find the largest rectangle that fits entirely beneath the histogram.


### Input
The first input line has an integer n: the number of bars.
The second line has n integers: heights.


### Output
Print one integer: the area of the largest rectangle.


### Constraints
1 <= n <= 2*10^5
1 <= height_i <= 10^9


### Example
**Input:**
\`\`\`
7
2 1 4 5 1 3 3
\`\`\`
**Output:**
\`\`\`
8
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 8,
    category: 'Arrays',
    title: 'Majority Element',
    description: `
You are given an array of n integers.
Find the element that appears more than n / 2 times. If no majority element exists, print "-1".


### Input
The first input line contains an integer n.
The next line contains n integers a_1,...,a_n.


### Output
Print the majority element or "-1" if it does not exist.


### Constraints
1 <= n <= 2*10^5
1 <= a_i <= 10^9


### Example
**Input:**
\`\`\`
6
3 3 4 2 3 3
\`\`\`
**Output:**
\`\`\`
3
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 9,
    category: 'Arrays',
    title: 'Next Permutation',
    description: `
Given a permutation of n integers, generate the next lexicographical permutation. If it is the last permutation, print the first permutation.


### Input
The first input line contains an integer n.
The second line contains n integers a_1,...,a_n.


### Output
Print n integers: the next permutation.


### Constraints
1 <= n <= 2*10^5
1 <= a_i <= n


### Example
**Input:**
\`\`\`
3
1 3 2
\`\`\`
**Output:**
\`\`\`
2 1 3
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  }
];

module.exports = { problems };
