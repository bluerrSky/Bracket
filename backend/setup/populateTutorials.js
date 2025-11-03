const pool = require('../db/pool');


const tutorials = [
  {
    topic_name: 'Recursion',
    title: 'Recursion',
    content: `## Introduction to Recursion

Recursion is a fundamental programming concept where a function calls itself to solve smaller subproblems of the same type. It is often used when a problem can naturally be divided into similar subproblems.

### The Two Key Components
1. **Base Case:** The simplest instance of the problem that can be solved directly.
2. **Recursive Case:** The part of the function where the problem is broken down and the function calls itself with smaller inputs.

### Example: Factorial
The factorial of a number n is defined as n × (n−1) × ... × 1.

\`\`\`js
function factorial(n) {
    if (n === 0 || n === 1) return 1;  // Base Case
    return n * factorial(n - 1);       // Recursive Case
}
console.log(factorial(5)); // Output: 120
\`\`\`

### Visualizing the Stack
Each recursive call is placed on the call stack until the base case is reached. Then the stack unwinds as results are returned back up.

### Common Examples
- Fibonacci sequence
- Tower of Hanoi
- Binary search
- Tree traversals

### Advantages
- Simplifies code for problems that are naturally recursive.
- Reduces complex iterative logic.

### Drawbacks
- High memory usage due to stack calls.
- May cause **stack overflow** if not properly bounded by a base case.

### Tips for Writing Recursive Functions
1. Always define a **base case**.
2. Ensure the recursive step progresses toward it.
3. Use **memoization** to optimize repeated subproblems.

### Example: Fibonacci with Memoization
\`\`\`js
function fib(n, memo = {}) {
    if (n <= 1) return n;
    if (memo[n]) return memo[n];
    memo[n] = fib(n-1, memo) + fib(n-2, memo);
    return memo[n];
}
\`\`\`

### Real-World Applications
- Divide and conquer algorithms (merge sort, quicksort)
- Backtracking (N-Queens, Sudoku)
- Traversing hierarchical structures like file systems or trees.
`,
    subtopics: JSON.stringify(['Base Case', 'Recursive Step', 'Memoization', 'Stack Overflow'])
  },

  {
    topic_name: 'Arrays',
    title: 'Arrays',
    content: `## Introduction to Arrays

An **array** is a data structure that stores elements of the same type in contiguous memory locations. It allows random access using an index.

### Declaration
\`\`\`js
let arr = [10, 20, 30, 40];
console.log(arr[2]); // 30
\`\`\`

### Common Operations
| Operation | Description | Example |
|------------|-------------|----------|
| Traversal | Access each element | Loop through array |
| Insertion | Add an element | arr.push(50) |
| Deletion | Remove an element | arr.splice(2, 1) |
| Searching | Find an element | arr.indexOf(20) |
| Sorting | Arrange elements | arr.sort() |

### Example: Find Maximum Element
\`\`\`js
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
\`\`\`

### Multidimensional Arrays
\`\`\`js
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];
console.log(matrix[1][2]); // 6
\`\`\`

### Time Complexities
| Operation | Average Time |
|------------|---------------|
| Access | O(1) |
| Search | O(n) |
| Insert/Delete | O(n) |

### Real-World Applications
- Storing and manipulating lists.
- Representing matrices, graphs (adjacency matrix).
- Sliding window and prefix-sum problems.

### Example: Prefix Sum
\`\`\`js
function prefixSum(arr) {
  let prefix = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i-1] + arr[i];
  }
  return prefix;
}
\`\`\`
`,
    subtopics: JSON.stringify(['Traversal', 'Insertion', 'Deletion', 'Searching', 'Sorting', 'Prefix Sum'])
  },

  {
    topic_name: 'Trees',
    title: 'Trees',
    content: `## Introduction to Trees

A **tree** is a hierarchical data structure made up of nodes connected by edges. The topmost node is called the **root**, and each node may have child nodes.

### Key Terminologies
- **Root:** The top node of the tree.
- **Parent & Child:** Relationship between nodes.
- **Leaf Node:** Node with no children.
- **Depth:** Number of edges from root to node.
- **Height:** Number of edges on the longest path to a leaf.

### Binary Tree Example
\`\`\`js
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}
let root = new Node(10);
root.left = new Node(5);
root.right = new Node(15);
\`\`\`

### Tree Traversals
1. **Inorder (Left, Root, Right)**
2. **Preorder (Root, Left, Right)**
3. **Postorder (Left, Right, Root)**
4. **Level Order (Breadth-first)**

\`\`\`js
function inorder(node) {
  if (!node) return;
  inorder(node.left);
  console.log(node.value);
  inorder(node.right);
}
\`\`\`

### Binary Search Tree (BST)
A tree where the left child < root < right child.

- Search, insert, delete operations have average O(log n) time complexity.
- Used in databases, map implementations, and search algorithms.

### Applications
- Parsing expressions
- File directory structure
- Decision trees in AI
- Heaps and priority queues
`,
    subtopics: JSON.stringify(['Tree Terminologies', 'Traversals', 'BST', 'Applications'])
  },

  {
    topic_name: 'dp',
    title: 'Dynamic Programming',
    content: `## Introduction to Dynamic Programming

Dynamic Programming (DP) is an optimization technique used to solve problems with **overlapping subproblems** and **optimal substructure**.

### Core Concepts
1. **Overlapping Subproblems:** Subproblems are solved multiple times.
2. **Optimal Substructure:** The optimal solution of a problem can be built from its subproblems.

### Two Common Approaches
- **Top-Down (Memoization):** Use recursion + cache.
- **Bottom-Up (Tabulation):** Build table iteratively.

### Example: Fibonacci with DP
\`\`\`js
function fib(n) {
  let dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}
\`\`\`

### Example: Knapsack Problem
\`\`\`js
function knapSack(W, wt, val, n) {
  let dp = Array(n+1).fill().map(()=>Array(W+1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (wt[i-1] <= w)
        dp[i][w] = Math.max(val[i-1] + dp[i-1][w-wt[i-1]], dp[i-1][w]);
      else
        dp[i][w] = dp[i-1][w];
    }
  }
  return dp[n][W];
}
\`\`\`

### Advantages
- Reduces time complexity by avoiding recomputation.
- Converts exponential-time recursion into polynomial-time solution.

### Applications
- Fibonacci sequence
- Shortest path algorithms (Bellman-Ford, Floyd-Warshall)
- Knapsack, coin change, LIS
`,
    subtopics: JSON.stringify(['Overlapping Subproblems', 'Memoization', 'Tabulation', 'Optimal Substructure'])
  },

  {
    topic_name: 'Graphs',
    title: 'Graphs',
    content: `## Introduction to Graphs

A **graph** is a collection of nodes (vertices) and edges connecting pairs of nodes. Graphs represent networks like roads, social media connections, or web pages.

### Terminology
- **Vertex (Node):** A point in the graph.
- **Edge:** A connection between two vertices.
- **Directed Graph:** Edges have direction.
- **Weighted Graph:** Edges have weights or costs.
- **Degree:** Number of edges connected to a node.

### Representation
1. **Adjacency Matrix**
\`\`\`js
let matrix = [
  [0, 1, 1],
  [1, 0, 1],
  [1, 1, 0]
];
\`\`\`

2. **Adjacency List**
\`\`\`js
let graph = {
  A: ['B', 'C'],
  B: ['A', 'C'],
  C: ['A', 'B']
};
\`\`\`

### Traversals
- **BFS (Breadth-First Search):** Explore level by level.
- **DFS (Depth-First Search):** Go as deep as possible before backtracking.

\`\`\`js
function bfs(graph, start) {
  let visited = new Set();
  let queue = [start];
  while (queue.length) {
    let node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      console.log(node);
      queue.push(...graph[node]);
    }
  }
}
\`\`\`

### Applications
- Social networks, routing, dependency graphs.
- Shortest path algorithms (Dijkstra, BFS).
- Cycle detection, topological sorting.

### Complexity
| Representation | Space | Traversal Time |
|----------------|--------|----------------|
| Adjacency Matrix | O(V²) | O(V²) |
| Adjacency List | O(V+E) | O(V+E) |
`,
    subtopics: JSON.stringify(['Terminology', 'Adjacency Matrix', 'BFS', 'DFS', 'Applications'])
  },

  {
    topic_name: 'Greedy',
    title: 'Greedy Algorithms',
    content: `## Introduction to Greedy Algorithms

A **Greedy Algorithm** builds a solution step by step, always choosing the next step that offers the most immediate benefit (locally optimal choice), hoping it leads to the global optimum.

### Strategy
1. Make a **greedy choice** at each step.
2. Ensure that this choice is **safe** and leads to an optimal solution.
3. Solve smaller remaining subproblems.

### Example: Coin Change (Greedy)
\`\`\`js
function coinChange(coins, amount) {
  coins.sort((a,b)=>b-a);
  let count = 0;
  for (let coin of coins) {
    count += Math.floor(amount / coin);
    amount %= coin;
  }
  return count;
}
console.log(coinChange([25,10,5,1], 63)); // 6 coins
\`\`\`

### Famous Greedy Problems
- Activity Selection
- Huffman Encoding
- Kruskal’s and Prim’s algorithms for MST
- Dijkstra’s shortest path

### Example: Activity Selection
\`\`\`js
function activitySelection(start, finish) {
  let n = start.length;
  let activities = [];
  for (let i=0; i<n; i++) activities.push({start:start[i], finish:finish[i]});
  activities.sort((a,b)=>a.finish-b.finish);
  let res = [activities[0]];
  let lastFinish = activities[0].finish;
  for (let i=1; i<n; i++) {
    if (activities[i].start >= lastFinish) {
      res.push(activities[i]);
      lastFinish = activities[i].finish;
    }
  }
  return res;
}
\`\`\`

### Characteristics
- Greedy Choice Property
- Optimal Substructure

### When Greedy Fails
Not all problems can be solved with greedy methods; e.g., 0/1 Knapsack requires DP.

### Applications
- Scheduling and resource allocation
- Compression algorithms
- Minimum spanning trees
`,
    subtopics: JSON.stringify(['Greedy Choice', 'Optimal Substructure', 'Applications', 'Common Problems'])
  }
];


async function main() {
    let client;
    try {
        client = await pool.connect();
        await client.query('BEGIN');
        console.log('Populating tutorials');

        for (const t of tutorials) {
            await client.query(
                `INSERT INTO tutorials (topic_name, title, content, subtopics) VALUES ($1, $2, $3, $4)
                 ON CONFLICT (topic_name) DO UPDATE SET
                   title = $2, content = $3, subtopics = $4`,
                [t.topic_name, t.title, t.content, t.subtopics]
            );
        }
        
        await client.query('COMMIT');
        console.log(`${tutorials.length} tutorials populated!`);
    } catch (err) {
        if (client) await client.query('ROLLBACK');
        console.error('FAILED TO POPULATE TUTORIALS', err.message);
    } finally {
        if (client) client.release();
        await pool.end();
    }
}
main();