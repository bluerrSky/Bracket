const problems = [
  {
    problem_id: 10,
    category: 'Greedy',
    title: 'Coin Piles',
    description: `
There are two coin piles containing a and b coins. On each move, you may take two coins from one pile and one coin from the other pile.
Your task is to determine if it is possible to empty both piles completely.


### Input
The input consists of two integers a and b.


### Output
Print "YES" if it is possible to empty both piles, otherwise print "NO".


### Constraints
0 <= a,b <= 10^9


### Example
**Input:**
\`\`\`
2 1
\`\`\`

**Output:**
\`\`\`
YES
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 11,
    category: 'Greedy',
    title: 'Ferris Wheel',
    description: `
There are n children who want to go on a Ferris wheel. The maximum allowed weight for a gondola is x.
Each gondola may have one or two children whose total weight does not exceed x.
Your task is to find the minimum number of gondolas needed.


### Input
The first line contains two integers n and x.
The next line contains n integers w_1, w_2, ..., w_n representing the weights.


### Output
Print the minimum number of gondolas needed.


### Constraints
1 <= n <= 2 * 10^5
1 <= w_i <= x <= 10^9


### Example
**Input:**
\`\`\`
4 10
7 2 3 9
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
    problem_id: 12,
    category: 'Greedy',
    title: 'Movie Festival',
    description: `
You have n movies and for each movie, you know its start and end times. You can watch only one movie at a time.
What is the maximum number of movies you can watch completely?


### Input
The first input line contains an integer n.
After this, there are n lines that describe the movies.
Each line has two integers a and b: the starting and ending times.


### Output
Print one integer: the maximum number of movies.


### Constraints
1 <= n <= 2 * 10^5
1 <= a < b <= 10^9


### Example
**Input:**
\`\`\`
3
3 5
4 9
5 8
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
    problem_id: 13,
    category: 'Greedy',
    title: 'Apartments',
    description: `
There are n applicants and m apartments. Each applicant has a desired apartment size, and each apartment has a size.
If the desired size and apartment size differ by at most k, the applicant can accept it.
Find the maximum number of applicants who can get an apartment.


### Input
The first line has three integers n, m, k.
The next line has n integers representing applicants' sizes.
The last line has m integers representing apartment sizes.


### Output
Print one integer: the maximum number of applicants that can get an apartment.


### Constraints
1 <= n,m <= 2 * 10^5
0 <= k <= 10^9
1 <= size <= 10^9


### Example
**Input:**
\`\`\`
4 3 5
60 45 80 60
30 60 75
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
    problem_id: 14,
    category: 'Greedy',
    title: 'Restaurant Customers',
    description: `
A restaurant has n customers. Each customer arrives and leaves at a certain time.
What is the maximum number of customers present at the same time?


### Input
The first input line has an integer n.
After this, there are n lines with two integers a and b: arrival and leaving times.


### Output
Print one integer: the maximum number of customers.


### Constraints
1 <= n <= 2 * 10^5
1 <= a < b <= 10^9


### Example
**Input:**
\`\`\`
3
5 8
2 4
3 9
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
    problem_id: 15,
    category: 'Greedy',
    title: 'Stick Lengths',
    description: `
You are given n sticks, each with some length. Your task is to modify their lengths so that all are equal, minimizing the total cost.
In one operation, you can increase or decrease the length of any stick by one unit, and the cost is one per operation.


### Input
The first line has an integer n.
The next line has n integers: the stick lengths.


### Output
Print one integer: the minimum total cost.


### Constraints
1 <= n <= 2 * 10^5
1 <= length <= 10^9


### Example
**Input:**
\`\`\`
5
2 3 1 5 2
\`\`\`

**Output:**
\`\`\`
5
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 16,
    category: 'Greedy',
    title: 'Collecting Numbers',
    description: `
You are given a permutation of numbers 1...n. You collect them in order from 1 to n.
On each round, you can collect numbers that appear in increasing order.
Find the number of rounds needed.


### Input
The first input line contains an integer n.
The second line contains n integers: the permutation.


### Output
Print one integer: the number of rounds required.


### Constraints
1 <= n <= 2 * 10^5
1 <= p_i <= n


### Example
**Input:**
\`\`\`
5
4 2 1 5 3
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
    problem_id: 17,
    category: 'Greedy',
    title: 'Maximum Subarray Sum',
    description: `
You are given an array of n integers. Your task is to find the maximum subarray sum.
This is the largest possible sum of a contiguous subarray.


### Input
The first line has an integer n.
The next line has n integers x_1, x_2, ..., x_n.


### Output
Print one integer: the maximum subarray sum.


### Constraints
1 <= n <= 2 * 10^5
-10^9 <= x_i <= 10^9


### Example
**Input:**
\`\`\`
8
-1 3 -2 5 3 -5 2 2
\`\`\`

**Output:**
\`\`\`
9
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 18,
    category: 'Greedy',
    title: 'Missing Coin Sum',
    description: `
You are given all coin values of n coins. What is the smallest sum of money that you cannot create using these coins?


### Input
The first line has an integer n.
The second line has n integers x_1, x_2, ..., x_n.


### Output
Print one integer: the smallest unconstructable sum.


### Constraints
1 <= n <= 10^6
1 <= x_i <= 10^9


### Example
**Input:**
\`\`\`
5
2 9 1 2 7
\`\`\`

**Output:**
\`\`\`
6
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 19,
    category: 'Greedy',
    title: 'Towers',
    description: `
You are given n cubes, each with an integer size. 
Your task is to build towers using the cubes such that each tower's cube sizes are in non-decreasing order from bottom to top.
Find the minimum number of towers needed.

### Input
The first line has an integer n.
The next line has n integers k_1, k_2, ..., k_n.

### Output
Print one integer: the minimum number of towers.

### Constraints
1 <= n <= 2 * 10^5
1 <= k_i <= 10^9

### Example
**Input:**
\`\`\`
5
3 8 2 1 5
\`\`\`

**Output:**
\`\`\`
2
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 20,
    category: 'Greedy',
    title: 'High Score',
    description: `
You play a game consisting of n rooms and m tunnels. Your initial score is 0, and each tunnel increases your score by x where x may be both positive or negative. You may go through a tunnel several times.

Your task is to walk from room 1 to room n. What is the maximum score you can get?

### Input
The first input line has two integers n and m: the number of rooms and tunnels.


Then, there are m lines describing the tunnels. Each line has three integers a, b and x: the tunnel starts at room a, ends at room b, and it increases your score by x. All tunnels are one-way tunnels.

You can assume that it is possible to get from room 1 to room n.

### Output
Print one integer: the maximum score you can get. However, if you can get an arbitrarily large score, print -1.

### Constraints
1 <= n <= 2500
1 <= m <= 5000
-10^9 <= x <= 10^9

### Example
**Input:**
\`\`\`
4 5
1 2 3
2 4 -1
1 3 -2
3 4 7
1 4 4
\`\`\`

**Output:**
\`\`\`
5
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 1,
    memory_limit: 524288
  },
  {
  problem_id: 58,
  category: 'Greedy',
  title: 'Activity Selection',
  description: `
You are given n activities with their start and end times. You can perform only one activity at a time.  
Your task is to select the maximum number of activities that can be performed.

### Input
The first line contains an integer n — the number of activities.  
The next n lines each contain two integers s and e — the start and end time of an activity.

### Output
Print the maximum number of activities you can perform.

### Constraints
1 <= n <= 10^5  
1 <= s < e <= 10^9

### Example
**Input:**
\`\`\`
6
1 3
2 5
3 9
6 8
5 7
8 9
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
  problem_id: 59,
  category: 'Greedy',
  title: 'Minimum Coins',
  description: `
You are given an integer n representing an amount of money.  
You have infinite coins of denominations {1, 2, 5, 10, 20, 50, 100, 500, 1000}.  
Find the minimum number of coins required to make this amount.

### Input
A single integer n — the total amount.

### Output
Print the minimum number of coins required.

### Constraints
1 <= n <= 10^6

### Example
**Input:**
\`\`\`
121
\`\`\`

**Output:**
\`\`\`
3
\`\`\`

**Explanation:**
100 + 20 + 1 = 121
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 512000
},
{
  problem_id: 60,
  category: 'Greedy',
  title: 'Maximize Array Sum After K Negations',
  description: `
You are given an array of integers and an integer k.  
In one operation, you can choose any element and multiply it by -1.  
You can perform at most k such operations.  
Find the maximum possible sum of the array after k operations.

### Input
The first line contains two integers n and k.  
The next line contains n integers — the elements of the array.

### Output
Print the maximum possible sum after k negations.

### Constraints
1 <= n <= 10^5  
1 <= k <= 10^9  
-10^4 <= arr[i] <= 10^4

### Example
**Input:**
\`\`\`
5 2
2 -3 -1 5 -4
\`\`\`

**Output:**
\`\`\`
13
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 512000
},
{
  problem_id: 61,
  category: 'Greedy',
  title: 'Chocolate Distribution',
  description: `
You are given n packets of chocolates, each containing a[i] chocolates.  
There are m students, and you need to distribute packets such that the difference between  
the maximum and minimum chocolates given to students is minimized.

### Input
The first line contains two integers n and m.  
The next line contains n integers — the chocolates in each packet.

### Output
Print the minimum difference possible.

### Constraints
1 <= m <= n <= 10^5  
1 <= a[i] <= 10^9

### Example
**Input:**
\`\`\`
7 3
7 3 2 4 9 12 56
\`\`\`

**Output:**
\`\`\`
2
\`\`\`

**Explanation:**
We can pick packets with 2, 3, 4 chocolates. Difference = 4 - 2 = 2.
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 512000
},

{
  problem_id: 62,
  category: 'Greedy',
  title: 'Largest Number from Array',
  description: `
You are given a list of non-negative integers. Arrange them such that they form the largest possible number.

### Input
The first line contains an integer n — the size of the array.  
The next line contains n space-separated non-negative integers.

### Output
Print the largest number that can be formed.

### Constraints
1 <= n <= 10^5  
0 <= a[i] <= 10^9

### Example
**Input:**
\`\`\`
5
3 30 34 5 9
\`\`\`

**Output:**
\`\`\`
9534330
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 512000
}



];

module.exports = { problems };
