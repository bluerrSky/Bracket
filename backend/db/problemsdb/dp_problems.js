const problems = [
  {
    problem_id: 1,
    category: 'Dynamic Programming',
    title: 'Dice Combinations',
    description: `
Your task is to count the number of ways to construct sum \`n\` by throwing a dice one or more times. Each throw produces an outcome between 1 and 6.  

For example, if \`n = 3\`, there are 4 ways:

- 1+1+1  
- 1+2  
- 2+1  
- 3  

### Input  
\`\`\`  
The only input line has an integer n.  
\`\`\`  

### Output  
\`\`\`  
Print the number of ways modulo 10^9+7.  
\`\`\`  

### Constraints  
\`\`\`  
1 <= n <= 10^6  
\`\`\`  

### Example  
**Input:**  
\`\`\`  
3  
\`\`\`  

**Output:**  
\`\`\`  
4  
\`\`\`  
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 2,
    category: 'Dynamic Programming',
    title: 'Minimizing Coins',
    description: `
Consider a money system consisting of \`n\` coins. Each coin has a positive integer value. Your task is to produce a sum of money \`x\` using the available coins in such a way that the number of coins is minimal.  

For example, if the coins are {1,5,7} and the desired sum is 11, an optimal solution is 5+5+1 which requires 3 coins.  

### Input  
\`\`\`  
The first input line has two integers n and x: the number of coins and the desired sum of money.  
The second line has n distinct integers c_1,c_2,...,c_n: the value of each coin.  
\`\`\`  

### Output  
\`\`\`  
Print one integer: the minimum number of coins. If it is not possible, print -1.  
\`\`\`  

### Constraints  
\`\`\`  
1 <= n <= 100  
1 <= x <= 10^6  
1 <= c_i <= 10^6  
\`\`\`  

### Example  
**Input:**  
\`\`\`  
3 11  
1 5 7  
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
    problem_id: 3,
    category: 'Dynamic Programming',
    title: 'Coin Combinations I',
    description: `
Consider a money system consisting of \`n\` coins. Each coin has a positive integer value. Your task is to calculate the number of distinct ways you can produce a money sum \`x\` using the available coins.  

For example, if the coins are {2,3,5} and the desired sum is 9, there are 8 ways:

- 2+2+5  
- 2+5+2  
- 5+2+2  
- 3+3+3  
- 2+2+2+3  
- 2+2+3+2  
- 2+3+2+2  
- 3+2+2+2  

### Input  
\`\`\`  
The first input line has two integers n and x: the number of coins and the desired sum.  
The second line has n distinct integers c_1,c_2,...,c_n.  
\`\`\`  

### Output  
\`\`\`  
Print one integer: the number of ways modulo 10^9+7.  
\`\`\`  

### Constraints  
\`\`\`  
1 <= n <= 100  
1 <= x <= 10^6  
1 <= c_i <= 10^6  
\`\`\`  

### Example  
**Input:**  
\`\`\`  
3 9  
2 3 5  
\`\`\`  

**Output:**  
\`\`\`  
8  
\`\`\`  
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 4,
    category: 'Dynamic Programming',
    title: 'Coin Combinations II',
    description: `
Consider a money system consisting of \`n\` coins. Each coin has a positive integer value. Your task is to calculate the number of distinct ordered ways you can produce a money sum \`x\` using the available coins.  

For example, if the coins are {2,3,5} and the desired sum is 9, there are 3 ways:

- 2+2+5  
- 3+3+3  
- 2+2+2+3  

### Input  
\`\`\`  
The first input line has two integers n and x: the number of coins and the desired sum.  
The second line has n distinct integers.  
\`\`\`  

### Output  
\`\`\`  
Print one integer: the number of ways modulo 10^9+7.  
\`\`\`  

### Constraints  
\`\`\`  
1 <= n <= 100  
1 <= x <= 10^6  
1 <= c_i <= 10^6  
\`\`\`  

### Example  
**Input:**  
\`\`\`  
3 9  
2 3 5  
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
    problem_id: 5,
    category: 'Dynamic Programming',
    title: 'Removing Digits',
    description: `
You are given an integer \`n\`. On each step, you may subtract one of the digits from the number.  
How many steps are required to make the number equal to 0?  

### Input  
\`\`\`  
The only input line has an integer n.  
\`\`\`  

### Output  
\`\`\`  
Print one integer: the minimum number of steps.  
\`\`\`  

### Constraints  
\`\`\`  
1 <= n <= 10^6  
\`\`\`  

### Example  
**Input:**  
\`\`\`  
27  
\`\`\`  

**Output:**  
\`\`\`  
5  
\`\`\`  

**Explanation:**  
An optimal solution is 27 → 20 → 18 → 10 → 9 → 0.  
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },

  {
    problem_id: 6,
    category: 'Dynamic Programming',
    title: 'Grid Paths',
    description: `
Consider an \`n × n\` grid whose squares may have traps. It is not allowed to move to a square with a trap.  
Your task is to calculate the number of paths from the upper-left square to the lower-right square. You can only move right or down.  

### Input  
\`\`\`  
The first input line has an integer n: the size of the grid.  
After this, there are n lines that describe the grid.  
'.' denotes an empty cell, '*' denotes a trap.  
\`\`\`  

### Output  
\`\`\`  
Print the number of paths modulo 10^9+7.  
\`\`\`  

### Constraints  
\`\`\`  
1 <= n <= 1000  
\`\`\`  

### Example  
**Input:**  
\`\`\`  
4  
....  
.*..  
...*  
*...  
\`\`\`  

**Output:**  
\`\`\`  
3  
\`\`\`  
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  }
];

module.exports = { problems };
