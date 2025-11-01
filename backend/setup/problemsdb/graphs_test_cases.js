const test_cases = [
  // --- Problem 51: Graph Traversal (BFS) ---
  { problem_id: 51, input: "5 4 1\n1 2\n1 3\n2 4\n3 5", expected_output: "1 2 3 4 5", is_sample: true },
  { problem_id: 51, input: "3 2 2\n1 2\n2 3", expected_output: "2 1 3", is_sample: true },
  { problem_id: 51, input: "4 3 3\n1 3\n3 4\n2 3", expected_output: "3 1 4 2", is_sample: true },

  { problem_id: 51, input: "6 5 1\n1 2\n1 3\n2 4\n3 5\n4 6", expected_output: "1 2 3 4 5 6", is_sample: false },
  { problem_id: 51, input: "4 2 2\n1 2\n3 4", expected_output: "2 1", is_sample: false },
  { problem_id: 51, input: "7 6 4\n4 2\n4 5\n5 6\n6 7\n1 3\n3 1", expected_output: "4 2 5 6 7", is_sample: false },
  { problem_id: 51, input: "5 4 3\n1 2\n2 3\n3 4\n4 5", expected_output: "3 2 4 1 5", is_sample: false },
  { problem_id: 51, input: "5 0 1", expected_output: "1", is_sample: false },

  // --- Problem 52: Connected Components ---
  { problem_id: 52, input: "5 2\n1 2\n3 4", expected_output: "3", is_sample: true },
  { problem_id: 52, input: "4 0", expected_output: "4", is_sample: true },
  { problem_id: 52, input: "3 2\n1 2\n2 3", expected_output: "1", is_sample: true },

  { problem_id: 52, input: "6 3\n1 2\n2 3\n4 5", expected_output: "3", is_sample: false },
  { problem_id: 52, input: "7 5\n1 2\n2 3\n3 4\n5 6\n6 7", expected_output: "2", is_sample: false },
  { problem_id: 52, input: "8 7\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n7 8", expected_output: "1", is_sample: false },
  { problem_id: 52, input: "9 0", expected_output: "9", is_sample: false },
  { problem_id: 52, input: "10 5\n1 2\n3 4\n5 6\n7 8\n9 10", expected_output: "5", is_sample: false },

  // --- Problem 53: Shortest Path (Dijkstra) ---
  { problem_id: 53, input: "5 7 1 5\n1 2 2\n2 3 4\n1 3 1\n3 4 7\n4 5 3\n3 5 6\n2 5 12", expected_output: "10", is_sample: true },
  { problem_id: 53, input: "3 3 1 3\n1 2 5\n2 3 10\n1 3 100", expected_output: "15", is_sample: true },
  { problem_id: 53, input: "4 4 4 3\n1 4 1\n4 2 2\n2 3 3\n1 3 10", expected_output: "6", is_sample: true },

  { problem_id: 53, input: "5 6 2 4\n2 1 7\n1 3 10\n3 4 5\n4 5 1\n5 2 2\n2 3 3", expected_output: "14", is_sample: false },
  { problem_id: 53, input: "6 8 1 6\n1 2 3\n2 3 4\n3 4 5\n4 5 6\n5 6 7\n1 3 10\n2 4 1\n3 5 2", expected_output: "21", is_sample: false },
  { problem_id: 53, input: "3 3 1 3\n1 2 1\n2 3 1\n1 3 10", expected_output: "2", is_sample: false },
  { problem_id: 53, input: "2 1 1 2\n1 2 100", expected_output: "100", is_sample: false },
  { problem_id: 53, input: "5 3 1 5\n1 2 10\n2 3 10\n4 5 10", expected_output: "-1", is_sample: false },

  // --- Problem 54: Detect Cycle (Undirected Graph) ---
  { problem_id: 54, input: "4 4\n1 2\n2 3\n3 4\n4 1", expected_output: "YES", is_sample: true },
  { problem_id: 54, input: "3 2\n1 2\n2 3", expected_output: "NO", is_sample: true },
  { problem_id: 54, input: "5 5\n1 2\n2 3\n3 4\n4 5\n5 1", expected_output: "YES", is_sample: true },

  { problem_id: 54, input: "6 5\n1 2\n2 3\n3 4\n4 5\n5 6", expected_output: "NO", is_sample: false },
  { problem_id: 54, input: "7 7\n1 2\n2 3\n3 4\n4 5\n5 6\n6 7\n7 1", expected_output: "YES", is_sample: false },
  { problem_id: 54, input: "8 6\n1 2\n3 4\n5 6\n7 8\n2 3\n6 7", expected_output: "NO", is_sample: false },
  { problem_id: 54, input: "5 4\n1 2\n2 3\n3 1\n4 5", expected_output: "YES", is_sample: false },
  { problem_id: 54, input: "5 3\n1 2\n2 3\n3 4", expected_output: "NO", is_sample: false },

  // --- Problem 55: Topological Sort ---
  { problem_id: 55, input: "6 6\n1 2\n2 3\n3 4\n4 5\n2 6\n6 4", expected_output: "1 2 6 3 4 5", is_sample: true },
  { problem_id: 55, input: "5 4\n1 2\n1 3\n3 4\n4 5", expected_output: "1 2 3 4 5", is_sample: true },
  { problem_id: 55, input: "3 2\n1 2\n2 3", expected_output: "1 2 3", is_sample: true },

  { problem_id: 55, input: "4 3\n1 3\n2 3\n3 4", expected_output: "1 2 3 4", is_sample: false },
  { problem_id: 55, input: "7 6\n1 2\n3 4\n2 4\n6 7\n5 6\n4 5", expected_output: "1 3 2 4 5 6 7", is_sample: false },
  { problem_id: 55, input: "5 5\n1 2\n2 3\n3 4\n4 5\n1 3", expected_output: "1 2 3 4 5", is_sample: false },
  { problem_id: 55, input: "6 7\n1 2\n1 3\n2 4\n3 4\n4 5\n5 6\n3 6", expected_output: "1 2 3 4 5 6", is_sample: false },
  { problem_id: 55, input: "3 2\n2 3\n1 2", expected_output: "1 2 3", is_sample: false },

  // --- Problem 56: Strongly Connected Components ---
  { problem_id: 56, input: "5 5\n1 2\n2 3\n3 1\n4 5\n5 4", expected_output: "2", is_sample: true },
  { problem_id: 56, input: "4 4\n1 2\n2 3\n3 4\n4 2", expected_output: "2", is_sample: true },
  { problem_id: 56, input: "3 2\n1 2\n2 3", expected_output: "3", is_sample: true },

  { problem_id: 56, input: "6 8\n1 2\n2 3\n3 1\n3 4\n4 5\n5 6\n6 4\n2 6", expected_output: "2", is_sample: false },
  { problem_id: 56, input: "7 7\n1 2\n2 3\n3 1\n4 5\n5 6\n6 4\n7 7", expected_output: "3", is_sample: false },
  { problem_id: 56, input: "5 0", expected_output: "5", is_sample: false },
  { problem_id: 56, input: "3 3\n1 2\n2 3\n3 1", expected_output: "1", is_sample: false },
  { problem_id: 56, input: "5 4\n1 2\n2 3\n3 4\n4 5", expected_output: "5", is_sample: false },

  // --- Problem 57: Minimum Spanning Tree ---
  { problem_id: 57, input: "4 5\n1 2 1\n2 3 2\n3 4 3\n4 1 4\n1 3 5", expected_output: "6", is_sample: true },
  { problem_id: 57, input: "3 3\n1 2 10\n2 3 15\n1 3 5", expected_output: "15", is_sample: true },
  { problem_id: 57, input: "5 7\n1 2 2\n1 3 3\n2 3 1\n3 4 5\n4 5 7\n2 5 4\n1 5 6", expected_output: "14", is_sample: true },

  { problem_id: 57, input: "6 8\n1 2 1\n2 3 2\n3 4 3\n4 5 4\n5 6 5\n6 1 6\n2 4 7\n3 5 8", expected_output: "15", is_sample: false },
  { problem_id: 57, input: "7 9\n1 2 4\n1 3 3\n2 4 1\n2 5 2\n3 6 3\n4 7 5\n5 6 2\n6 7 4\n5 7 1", expected_output: "12", is_sample: false },
  { problem_id: 57, input: "3 3\n1 2 100\n2 3 200\n1 3 50", expected_output: "150", is_sample: false },
  { problem_id: 57, input: "5 4\n1 2 1\n2 3 2\n3 4 3\n4 5 4", expected_output: "10", is_sample: false },
  { problem_id: 57, input: "4 5\n1 2 2\n2 3 2\n3 4 2\n1 3 3\n1 4 10", expected_output: "6", is_sample: false }
];

module.exports = { test_cases };
