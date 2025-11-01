const problems = [
  {
    problem_id: 30,
    category: 'Trees',
    title: 'Tree Height',
    description: `
You are given a tree with n nodes. Your task is to find its height.
The height of a tree is the length of the longest path from the root to a leaf.

### Input
The first line contains integer n.
Next line contains n integers representing the parent of each node (-1 for root).

### Output
Print the height of the tree.

### Constraints
1 <= n <= 2*10^5
-1 <= parent_i <= n-1

### Example
**Input:**
\`\`\`
5
4 -1 4 1 1
\`\`\`
**Output:**
\`\`\`
3
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 31,
    category: 'Trees',
    title: 'Number of Leaf Nodes',
    description: `
Given a tree with n nodes, find the number of leaves (nodes with no children).

### Input
First line integer n.
Next line has n integers representing parents (-1 for root).

### Output
Print the count of leaf nodes.

### Constraints
1 <= n <= 2*10^5

### Example
**Input:**
\`\`\`
5
-1 0 0 1 1
\`\`\`
**Output:**
\`\`\`
3
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 32,
    category: 'Trees',
    title: 'LCA (Lowest Common Ancestor)',
    description: `
Given a rooted tree with n nodes and q queries.
Queries ask for the lowest common ancestor of two nodes.

### Input
First line: n and q.
Next n-1 lines: edges.
Next q lines: two nodes to find LCA.

### Output
For each query, print the LCA.

### Constraints
1 <= n, q <= 2*10^5

### Example
**Input:**
\`\`\`
5 2
1 2
1 3
3 4
3 5
4 5
2 4
\`\`\`
**Output:**
\`\`\`
3
1
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 33,
    category: 'Trees',
    title: 'Diameter of Tree',
    description: `
Find the diameter (longest path) of a tree.

### Input
First line integer n.
Next n-1 lines: edges.

### Output
Print the diameter length.

### Constraints
1 <= n <= 10^5

### Example
**Input:**
\`\`\`
4
1 2
2 3
3 4
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
    problem_id: 34,
    category: 'Trees',
    title: 'Rooted Tree Distances',
    description: `
Given a rooted tree, find distances from the root to every other node.

### Input
First line n.
Next n-1 lines: edges.

### Output
Print distances from root (node 1).

### Constraints
1 <= n <= 2*10^5

### Example
**Input:**
\`\`\`
5
1 2
1 3
3 4
3 5
\`\`\`
**Output:**
\`\`\`
0 1 1 2 2
\`\`\`
`,
    difficulty: 'Easy',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 35,
    category: 'Trees',
    title: 'Counting Subtrees',
    description: `
Count the number of subtrees in a tree that have a certain property (e.g., even number of nodes).

### Input
First line: n.
Next n-1 lines: edges.

### Output
Print the number of such subtrees.

### Constraints
1 <= n <= 10^5

### Example
**Input:**
\`\`\`
6
1 2
1 3
2 4
2 5
3 6
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
    problem_id: 36,
    category: 'Trees',
    title: 'Check if Binary Tree Is BST',
    description: `
Given a binary tree represented by its nodes, determine if it is a Binary Search Tree.

### Input
First line integer n.
Next n lines: node value and its children.

### Output
Print "YES" or "NO".

### Constraints
1 <= n <= 10^5

### Example
**Input:**
\`\`\`
3
2 1 3
1 -1 -1
3 -1 -1
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
    problem_id: 37,
    category: 'Trees',
    title: 'Count Nodes at Distance K',
    description: `
Given a tree and a node, count how many nodes are at distance k from that node.

### Input
First line has n and q.
Next n-1 lines: edges.
Next q lines: node and k.

### Output
Print counts for each query.

### Constraints
1 <= n, q <= 10^5

### Example
**Input:**
\`\`\`
5 2
1 2
1 3
3 4
3 5
1 2
3 1
\`\`\`
**Output:**
\`\`\`
2
3
\`\`\`
`,
    difficulty: 'Medium',
    time_limit: 1,
    memory_limit: 524288
  },


  {
    problem_id: 38,
    category: 'Trees',
    title: 'Serialize and Deserialize Binary Tree',
    description: `
Write functions to serialize a binary tree to a string and deserialize it back, verifying correct restoration.

### Input
Description of a binary tree.

### Output
Output of serialization and verification.

### Constraints
Tree size up to 10^4 nodes.

### Example
**Input:**
\`\`\`
[Serialized format or tree description]
\`\`\`
**Output:**
\`\`\`
[Verification output]
\`\`\`
`,
    difficulty: 'Hard',
    time_limit: 1,
    memory_limit: 524288
  }
];

module.exports = { problems };
