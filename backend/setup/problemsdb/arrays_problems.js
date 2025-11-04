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
  },
  {
  problem_id: 63,
  category: 'Array',
  title: 'Second Largest Element',
  description: `
Given an array of integers, find the **second largest distinct** element in the array.  
If there is no such element (all elements are the same), print -1.

### Input
The first line contains an integer n — the number of elements.  
The next line contains n integers — the elements of the array.

### Output
Print the second largest distinct element.

### Constraints
1 <= n <= 10^5  
-10^9 <= a[i] <= 10^9

### Example
**Input:**
\`\`\`
6
1 2 4 5 5 3
\`\`\`

**Output:**
\`\`\`
4
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 512000
},
{
  problem_id: 64,
  category: 'Array',
  title: 'Move Zeroes to End',
  description: `
Given an array, move all the zeroes to the end while maintaining the relative order of the non-zero elements.

### Input
The first line contains an integer n — the number of elements.  
The next line contains n integers — the elements of the array.

### Output
Print the array after moving all zeroes to the end.

### Constraints
1 <= n <= 10^5  
-10^9 <= a[i] <= 10^9

### Example
**Input:**
\`\`\`
6
0 1 0 3 12 0
\`\`\`

**Output:**
\`\`\`
1 3 12 0 0 0
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 512000
},
{
  problem_id: 65,
  category: 'Array',
  title: 'Sum of Array Elements',
  description: `
Given an array of integers, find the sum of all its elements.

### Input
The first line contains an integer n — the number of elements.  
The next line contains n integers — the elements of the array.

### Output
Print the sum of all elements.

### Constraints
1 <= n <= 10^6  
-10^9 <= a[i] <= 10^9

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
  memory_limit: 512000
},
{
  problem_id: 66,
  category: 'Array',
  title: 'Check if Array is Sorted',
  description: `
Given an array of integers, check if the array is sorted in non-decreasing order.

### Input
The first line contains an integer n — the number of elements.  
The next line contains n integers — the elements of the array.

### Output
Print "YES" if the array is sorted, otherwise print "NO".

### Constraints
1 <= n <= 10^5  
-10^9 <= a[i] <= 10^9

### Example
**Input:**
\`\`\`
5
1 2 2 4 5
\`\`\`

**Output:**
\`\`\`
YES
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 512000
},
{
  problem_id: 67,
  category: 'Array',
  title: 'Maximum Subarray Sum (Kadane’s Algorithm)',
  description: `
Find the contiguous subarray within a one-dimensional array that has the largest sum.
Though its a dynamic programming problem but this still uses arrays.

### Input
The first line contains an integer n — the number of elements.  
The next line contains n integers — the elements of the array.

### Output
Print the maximum subarray sum.

### Constraints
1 <= n <= 10^5  
-10^9 <= a[i] <= 10^9

### Example
**Input:**
\`\`\`
8
-2 -3 4 -1 -2 1 5 -3
\`\`\`

**Output:**
\`\`\`
7
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 512000
},
{
  problem_id: 68,
  category: 'Arrays',
  title: 'Subarray with Given Sum (Positive Integers)',
  description: `
You are given an array of n positive integers and a target sum s.  
Find a contiguous subarray whose sum equals s.  
If multiple answers exist, print any one pair of indices (1-based).  
If no such subarray exists, print "IMPOSSIBLE".

### Input
The first line contains two integers n and s.  
The next line contains n integers a_1, a_2, ..., a_n.

### Output
Print two integers: the starting and ending indices of the subarray, or "IMPOSSIBLE".

### Constraints
1 <= n <= 2*10^5  
1 <= a_i <= 10^9  
1 <= s <= 10^14

### Example
**Input:**
\`\`\`
5 11
1 2 3 7 5
\`\`\`

**Output:**
\`\`\`
2 4
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},
{
  problem_id: 69,
  category: 'Arrays',
  title: 'Longest Subarray with Sum ≤ K',
  description: `
Given an array of n integers and an integer k,  
find the length of the longest contiguous subarray whose sum is less than or equal to k.

### Input
The first line contains two integers n and k.  
The next line contains n integers a_1, a_2, ..., a_n.

### Output
Print one integer — the length of the longest subarray with sum ≤ k.

### Constraints
1 <= n <= 2*10^5  
-10^9 <= a_i <= 10^9  
-10^14 <= k <= 10^14

### Example
**Input:**
\`\`\`
5 7
2 1 3 4 1
\`\`\`

**Output:**
\`\`\`
3
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},
{
  problem_id: 70,
  category: 'Arrays',
  title: 'Rearrange Alternating High-Low',
  description: `
Given an array of n integers, rearrange the array so that:  
a[0] <= a[1] >= a[2] <= a[3] >= a[4] ...  

You may modify the array in-place. Print the rearranged array.

### Input
The first line contains an integer n.  
The next line contains n integers.

### Output
Print the rearranged array satisfying the alternating pattern.

### Constraints
1 <= n <= 10^5  
-10^9 <= a[i] <= 10^9

### Example
**Input:**
\`\`\`
6
3 5 2 1 6 4
\`\`\`

**Output:**
\`\`\`
3 5 1 6 2 4
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},
{
  problem_id: 71,
  category: 'Arrays',
  title: 'Minimum Platforms Required',
  description: `
Given arrival and departure times of trains at a station,  
find the minimum number of platforms required so that no train waits.
Though its greedy problem but it also includes arrays.

### Input
The first line contains an integer n — number of trains.  
The second line contains n integers denoting arrival times.  
The third line contains n integers denoting departure times.

### Output
Print one integer — the minimum number of platforms required.

### Constraints
1 <= n <= 10^5  
0 <= arrival[i], departure[i] <= 2359  
Each time is given in 24-hour format, and arrival[i] <= departure[i].

### Example
**Input:**
\`\`\`
6
900 940 950 1100 1500 1800
910 1200 1120 1130 1900 2000
\`\`\`

**Output:**
\`\`\`
3
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
},
{
  problem_id: 72,
  category: 'Arrays',
  title: 'Product of Array Except Self',
  description: `
Given an integer array nums, return an array answer such that  
answer[i] is equal to the product of all the elements of nums except nums[i].  
You must solve it without using division and in O(n) time.

### Input
The first line contains an integer n.  
The next line contains n integers.

### Output
Print n integers — the product of array elements except self.

### Constraints
2 <= n <= 10^5  
-30 <= nums[i] <= 30  
The product of any prefix or suffix fits in a 64-bit integer.

### Example
**Input:**
\`\`\`
4
1 2 3 4
\`\`\`

**Output:**
\`\`\`
24 12 8 6
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 524288
}










];

module.exports = { problems };
