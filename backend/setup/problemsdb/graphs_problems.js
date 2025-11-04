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
  },



  {
  problem_id: 104,
  category: 'Graphs',
  title: 'Count Nodes and Edges',
  description: `
You are given an undirected graph with n nodes and m edges.  
Your task is to count and print the number of nodes and edges.

### Input
\`\`\`
First line: n m  
Next m lines: u v (each line represents an edge)
\`\`\`

### Output
\`\`\`
Print two integers — the number of nodes and the number of edges.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000  
0 <= m <= 5000  
1 <= u, v <= n
\`\`\`

### Example
**Input:**
\`\`\`
5 3
1 2
2 3
4 5
\`\`\`

**Output:**
\`\`\`
5 3
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 65536
},


{
  problem_id: 105,
  category: 'Graphs',
  title: 'Degree of Each Node',
  description: `
Given an undirected graph, print the degree (number of edges) of each node from 1 to n.

### Input
\`\`\`
First line: n m  
Next m lines: u v (each line represents an edge)
\`\`\`

### Output
\`\`\`
Print n integers separated by spaces — the degree of each node from 1 to n.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000  
0 <= m <= 5000  
1 <= u, v <= n
\`\`\`

### Example
**Input:**
\`\`\`
5 4
1 2
1 3
3 4
4 5
\`\`\`

**Output:**
\`\`\`
2 1 2 2 1
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 65536
},


{
  problem_id: 106,
  category: 'Graphs',
  title: 'Check if Graph is a Tree',
  description: `
A graph is a tree if it is connected and has exactly n - 1 edges.  
Given an undirected graph, determine if it forms a tree.

### Input
\`\`\`
First line: n m  
Next m lines: u v (each line represents an edge)
\`\`\`

### Output
\`\`\`
Print "YES" if the graph is a tree, otherwise print "NO".
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000  
0 <= m <= 5000  
1 <= u, v <= n
\`\`\`

### Example
**Input:**
\`\`\`
4 3
1 2
2 3
3 4
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
  problem_id: 107,
  category: 'Graphs',
  title: 'Count Isolated Nodes',
  description: `
Given an undirected graph, count the number of isolated nodes.  
An isolated node is one that has no edges connected to it.

### Input
\`\`\`
First line: n m  
Next m lines: u v (each line represents an edge)
\`\`\`

### Output
\`\`\`
Print one integer — the number of isolated nodes.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000  
0 <= m <= 5000  
1 <= u, v <= n
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
1
\`\`\`
`,
  difficulty: 'Easy',
  time_limit: 1,
  memory_limit: 65536
},


{
  problem_id: 108,
  category: 'Graphs',
  title: 'Check if Path Exists',
  description: `
Given an undirected graph and two nodes a and b, determine if there exists a path between them using DFS or BFS.

### Input
\`\`\`
First line: n m a b  
Next m lines: u v (each line represents an edge)
\`\`\`

### Output
\`\`\`
Print "YES" if there exists a path between a and b, otherwise print "NO".
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000  
0 <= m <= 5000  
1 <= a, b, u, v <= n
\`\`\`

### Example
**Input:**
\`\`\`
5 4 1 5
1 2
2 3
3 4
4 5
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
  problem_id: 109,
  category: 'Graphs',
  title: 'Shortest Path in Unweighted Graph',
  description: `
Given an unweighted undirected graph and a source node s, find the shortest distance from s to all other nodes using Breadth-First Search (BFS).

### Input
\`\`\`
First line: n m s  
Next m lines: u v (edges)
\`\`\`

### Output
\`\`\`
Print n integers representing the shortest distance from s to each node (1-indexed).  
If a node is not reachable, print -1 for that node.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 10^5  
1 <= m <= 2*10^5  
1 <= s, u, v <= n
\`\`\`

### Example
**Input:**
\`\`\`
6 7 1
1 2
1 3
2 4
3 5
5 6
4 6
2 5
\`\`\`

**Output:**
\`\`\`
0 1 1 2 2 3
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 2,
  memory_limit: 262144
},
{
  problem_id: 110,
  category: 'Graphs',
  title: 'Detect Cycle in Directed Graph',
  description: `
Given a directed graph, determine if it contains a cycle.

### Input
\`\`\`
First line: n m  
Next m lines: u v (directed edge from u to v)
\`\`\`

### Output
\`\`\`
Print "YES" if there is a cycle, otherwise "NO".
\`\`\`

### Constraints
\`\`\`
1 <= n <= 10^5  
1 <= m <= 2*10^5  
1 <= u, v <= n
\`\`\`

### Example
**Input:**
\`\`\`
4 4
1 2
2 3
3 4
4 2
\`\`\`

**Output:**
\`\`\`
YES
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 2,
  memory_limit: 262144
},
{
  problem_id: 111,
  category: 'Graphs',
  title: 'Course Schedule (Topological Sort Check)',
  description: `
You are given n courses labeled from 1 to n and a list of prerequisite pairs.  
Return "YES" if you can finish all courses (no cycle exists), otherwise "NO".

### Input
\`\`\`
First line: n m  
Next m lines: a b meaning you must complete b before a.
\`\`\`

### Output
\`\`\`
Print "YES" if all courses can be completed, otherwise "NO".
\`\`\`

### Constraints
\`\`\`
1 <= n <= 10^5  
0 <= m <= 2*10^5
\`\`\`

### Example
**Input:**
\`\`\`
4 3
1 2
2 3
3 4
\`\`\`

**Output:**
\`\`\`
YES
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 2,
  memory_limit: 262144
},
{
  problem_id: 112,
  category: 'Graphs',
  title: 'Number of Provinces (Connected Components in Adjacency Matrix)',
  description: `
You are given an adjacency matrix representing connections between cities.  
A province is a group of directly or indirectly connected cities.

### Input
\`\`\`
First line: n  
Next n lines: n integers (0 or 1)
\`\`\`

### Output
\`\`\`
Print the number of provinces.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 200
\`\`\`

### Example
**Input:**
\`\`\`
3
1 1 0
1 1 0
0 0 1
\`\`\`

**Output:**
\`\`\`
2
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 65536
},
{
  problem_id: 113,
  category: 'Graphs',
  title: 'Clone an Undirected Graph',
  description: `
Given an undirected connected graph represented as adjacency lists, create a deep copy (clone) of the graph.

### Input
\`\`\`
First line: n (number of nodes)  
Next n lines: adjacency list for each node (space-separated node numbers)
\`\`\`

### Output
\`\`\`
Print the adjacency list of the cloned graph in the same format.
\`\`\`

### Constraints
\`\`\`
1 <= n <= 1000
\`\`\`

### Example
**Input:**
\`\`\`
3
2 3
1 3
1 2
\`\`\`

**Output:**
\`\`\`
2 3
1 3
1 2
\`\`\`
`,
  difficulty: 'Medium',
  time_limit: 1,
  memory_limit: 65536
}





];

module.exports = { problems };
