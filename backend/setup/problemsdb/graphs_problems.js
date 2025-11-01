const problems = [
  // --- Easy ---
  {
    problem_id: 51,
    category: 'Graphs',
    title: 'Graph Traversal (BFS)',
    description: `
Given an undirected graph with n nodes and m edges, and a starting node s, print the order of nodes visited using Breadth-First Search (BFS), starting from s.

### Input
\`\`\`
First line: n m s
Next m lines: u v (edges)
\`\`\`

### Output
\`\`\`
The BFS traversal order as a space-separated list.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000
1 <= m <= 5000
1 <= s, u, v <= n
\`\`\`

### Example
**Input:**
\`\`\`
5 4 1
1 2
1 3
2 4
3 5
\`\`\`
**Output:**
\`\`\`
1 2 3 4 5
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 65536
  },

  {
    problem_id: 52,
    category: 'Graphs',
    title: 'Connected Components',
    description: `
Given an undirected graph, count the number of connected components.

### Input
\`\`\`
First line: n m
Next m lines: u v
\`\`\`

### Output
\`\`\`
Print one integer: number of connected components.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000
1 <= m <= 5000
\`\`\`

### Example
**Input:**
\`\`\`
5 2
1 2
3 4
\`\`\`

**Output:**
\`\`\`
3
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 65536
  },

  // --- Medium ---
  {
    problem_id: 53,
    category: 'Graphs',
    title: 'Shortest Path (Dijkstra)',
    description: `
Given a directed weighted graph (no negative weights), find the shortest path from node s to t.

### Input
\`\`\`
First line: n m s t
Next m lines: u v w (edge from u to v with weight w)
\`\`\`

### Output
\`\`\`
Print the length of the shortest path, or -1 if unreachable.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000
1 <= m <= 10000
1 <= s, t, u, v <= n
1 <= w <= 10^6
\`\`\`

### Example
**Input:**
\`\`\`
5 7 1 5
1 2 2
2 3 4
1 3 1
3 4 7
4 5 3
3 5 6
2 5 12
\`\`\`

**Output:**
\`\`\`
10
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 2,
    memory_limit: 65536
  },

  {
    problem_id: 54,
    category: 'Graphs',
    title: 'Detect Cycle (Undirected Graph)',
    description: `
Given an undirected graph, determine if it contains any cycles.

### Input
\`\`\`
First line: n m
Next m lines: u v
\`\`\`

### Output
\`\`\`
Print "YES" if the graph contains a cycle, otherwise "NO".
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000
1 <= m <= 5000
\`\`\`

### Example
**Input:**
\`\`\`
4 4
1 2
2 3
3 4
4 1
\`\`\`

**Output:**
\`\`\`
YES
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 2,
    memory_limit: 65536
  },

  {
    problem_id: 55,
    category: 'Graphs',
    title: 'Topological Sort',
    description: `
Given a directed acyclic graph (DAG), output a valid topological ordering of nodes.

### Input
\`\`\`
First line: n m
Next m lines: u v (edge from u to v)
\`\`\`

### Output
\`\`\`
Any valid topological order, space-separated.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000
1 <= m <= 10000
\`\`\`

### Example
**Input:**
\`\`\`
6 6
1 2
2 3
3 4
4 5
2 6
6 4
\`\`\`

**Output:**
\`\`\`
1 2 6 3 4 5
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 2,
    memory_limit: 65536
  },

  // --- Hard ---
  {
    problem_id: 56,
    category: 'Graphs',
    title: 'Strongly Connected Components (Kosaraju’s Algorithm)',
    description: `
Given a directed graph, find the number of strongly connected components.

### Input
\`\`\`
First line: n m
Next m lines: u v (edge from u to v)
\`\`\`

### Output
\`\`\`
Print one integer: number of strongly connected components.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000
1 <= m <= 10000
\`\`\`

### Example
**Input:**
\`\`\`
5 5
1 2
2 3
3 1
4 5
5 4
\`\`\`

**Output:**
\`\`\`
2
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 3,
    memory_limit: 131072
  },

  {
    problem_id: 57,
    category: 'Graphs',
    title: 'Minimum Spanning Tree (Kruskal’s Algorithm)',
    description: `
Given an undirected, weighted graph, find the total weight of the minimum spanning tree.

### Input
\`\`\`
First line: n m
Next m lines: u v w (edge between u and v with weight w)
\`\`\`

### Output
\`\`\`
Print one integer: total weight of MST.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000
1 <= m <= 10000
1 <= w <= 10^6
\`\`\`

### Example
**Input:**
\`\`\`
4 5
1 2 1
2 3 2
3 4 3
4 1 4
1 3 5
\`\`\`

**Output:**
\`\`\`
6
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 3,
    memory_limit: 131072
  }
];

module.exports = { problems };
