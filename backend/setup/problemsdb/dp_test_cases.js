const test_cases = [
  // --- Problem 39: Longest Increasing Subsequence ---
  { problem_id: 39, input: "6\n10 9 2 5 3 7", expected_output: "3", is_sample: true },
  { problem_id: 39, input: "1\n42", expected_output: "1", is_sample: true },
  { problem_id: 39, input: "4\n1 2 3 4", expected_output: "4", is_sample: true },
  { problem_id: 39, input: "6\n5 4 3 2 1 0", expected_output: "1", is_sample: true },

  { problem_id: 39, input: "5\n3 1 2 2 1", expected_output: "2", is_sample: false },
  { problem_id: 39, input: "7\n5 2 8 6 3 6 9", expected_output: "4", is_sample: false },
  { problem_id: 39, input: "10\n1 3 2 4 3 5 4 6 5 7", expected_output: "6", is_sample: false },
  { problem_id: 39, input: "5\n3 10 2 1 20", expected_output: "3", is_sample: false },
  { problem_id: 39, input: "5\n50 3 10 7 40", expected_output: "3", is_sample: false },
  { problem_id: 39, input: "15\n1 9 2 4 7 3 4 8 4 5 9 10 11 12 13", expected_output: "10", is_sample: false },

  { problem_id: 39, input: "6\n1 1 1 1 1 1", expected_output: "1", is_sample: false },
  { problem_id: 39, input: "8\n5 7 4 8 6 9 8 10", expected_output: "5", is_sample: false },
  { problem_id: 39, input: "9\n10 20 10 30 20 50 40 60 50", expected_output: "5", is_sample: false },
  { problem_id: 39, input: "10\n7 7 7 7 7 7 7 7 7 7", expected_output: "1", is_sample: false },
  { problem_id: 39, input: "5\n2 5 3 7 101", expected_output: "4", is_sample: false },

  // --- Problem 40: Knapsack Problem ---
  { problem_id: 40, input: "4 5\n1 2 3 2\n8 4 0 5", expected_output: "17", is_sample: true },
  { problem_id: 40, input: "3 4\n3 2 2\n7 4 5", expected_output: "9", is_sample: true },
  { problem_id: 40, input: "2 1\n2 1\n10 5", expected_output: "5", is_sample: true },
  { problem_id: 40, input: "1 10\n7\n3", expected_output: "3", is_sample: false },

  { problem_id: 40, input: "5 10\n2 2 6 5 4\n6 10 12 13 15", expected_output: "31", is_sample: false },
  { problem_id: 40, input: "6 6\n1 2 3 1 2 3\n10 20 30 40 50 60", expected_output: "150", is_sample: false },
  { problem_id: 40, input: "3 7\n2 3 4\n1 2 3", expected_output: "5", is_sample: false },
  { problem_id: 40, input: "3 3\n4 5 6\n7 8 9", expected_output: "0", is_sample: false },
  { problem_id: 40, input: "5 5\n1 2 3 4 5\n5 4 3 2 1", expected_output: "9", is_sample: false },
  { problem_id: 40, input: "10 55\n1 2 3 4 5 6 7 8 9 10\n11 12 13 14 15 16 17 18 19 20", expected_output: "155", is_sample: false },

  { problem_id: 40, input: "4 9\n2 2 4 5\n5 2 8 10", expected_output: "18", is_sample: false },
  { problem_id: 40, input: "6 10\n3 2 4 2 1 2\n5 7 8 2 1 3", expected_output: "21", is_sample: false },
  { problem_id: 40, input: "7 4\n2 2 2 2 2 2 2\n1 2 3 4 5 6 7", expected_output: "13", is_sample: false },
  { problem_id: 40, input: "8 20\n2 3 4 5 6 7 8 9\n8 7 6 5 4 3 2 1", expected_output: "30", is_sample: false },
  { problem_id: 40, input: "4 7\n1 2 3 4\n1 2 3 4", expected_output: "7", is_sample: false },

  // --- Problem 41: Edit Distance ---
  { problem_id: 41, input: "horse\nros", expected_output: "3", is_sample: true },
  { problem_id: 41, input: "intention\nexecution", expected_output: "5", is_sample: true },
  { problem_id: 41, input: "a\nb", expected_output: "1", is_sample: true },
  { problem_id: 41, input: "abcde\nabcde", expected_output: "0", is_sample: true },

  { problem_id: 41, input: "kitten\nsitting", expected_output: "3", is_sample: false },
  { problem_id: 41, input: "sunday\nsaturday", expected_output: "3", is_sample: false },
  { problem_id: 41, input: "apple\nbanana", expected_output: "5", is_sample: false },
  { problem_id: 41, input: "abc\n", expected_output: "3", is_sample: false },
  { problem_id: 41, input: "abcdef\ngfedcba", expected_output: "6", is_sample: false },
  { problem_id: 41, input: "\nabc", expected_output: "3", is_sample: false },

  { problem_id: 41, input: "abcdefg\naceg", expected_output: "3", is_sample: false },
  { problem_id: 41, input: "abac\nabad", expected_output: "1", is_sample: false },
  { problem_id: 41, input: "xyz\nabc", expected_output: "3", is_sample: false },
  { problem_id: 41, input: "palindrome\nanagram", expected_output: "7", is_sample: false },
  { problem_id: 41, input: "aaaaa\nbbbbb", expected_output: "5", is_sample: false },

  // --- Problem 42: Partition Equal Subset Sum ---
  { problem_id: 42, input: "4\n1 5 11 5", expected_output: "YES", is_sample: true },
  { problem_id: 42, input: "2\n2 2", expected_output: "YES", is_sample: true },
  { problem_id: 42, input: "3\n1 2 3", expected_output: "YES", is_sample: true },
  { problem_id: 42, input: "5\n1 5 5 11 6", expected_output: "NO", is_sample: true },

  { problem_id: 42, input: "6\n2 2 2 2 2 2", expected_output: "YES", is_sample: false },
  { problem_id: 42, input: "3\n1 1 1", expected_output: "NO", is_sample: false },
  { problem_id: 42, input: "4\n1 2 3 5", expected_output: "NO", is_sample: false },
  { problem_id: 42, input: "5\n3 3 3 3 6", expected_output: "YES", is_sample: false },
  { problem_id: 42, input: "6\n1 2 3 4 5 6", expected_output: "NO", is_sample: false },
  { problem_id: 42, input: "7\n2 2 2 2 2 2 15", expected_output: "NO", is_sample: false },

  { problem_id: 42, input: "4\n9 1 3 2", expected_output: "NO", is_sample: false },
  { problem_id: 42, input: "8\n3 3 3 3 6 6 6 6", expected_output: "YES", is_sample: false },
  { problem_id: 42, input: "3\n100 200 300", expected_output: "YES", is_sample: false },
  { problem_id: 42, input: "5\n100 100 100 100 100", expected_output: "NO", is_sample: false },
  { problem_id: 42, input: "7\n1 2 3 4 5 6 7", expected_output: "YES", is_sample: false },

  // --- Problem 43: Unique Paths in Grid ---
  { problem_id: 43, input: "3 3", expected_output: "6", is_sample: true },
  { problem_id: 43, input: "1 1", expected_output: "1", is_sample: true },
  { problem_id: 43, input: "2 2", expected_output: "2", is_sample: true },
  { problem_id: 43, input: "2 3", expected_output: "3", is_sample: true },

  { problem_id: 43, input: "4 4", expected_output: "20", is_sample: false },
  { problem_id: 43, input: "5 5", expected_output: "70", is_sample: false },
  { problem_id: 43, input: "6 6", expected_output: "252", is_sample: false },
  { problem_id: 43, input: "7 7", expected_output: "924", is_sample: false },
  { problem_id: 43, input: "8 8", expected_output: "3432", is_sample: false },
  { problem_id: 43, input: "9 9", expected_output: "12870", is_sample: false },

  { problem_id: 43, input: "10 10", expected_output: "48620", is_sample: false },
  { problem_id: 43, input: "10 5", expected_output: "715", is_sample: false },
  { problem_id: 43, input: "5 10", expected_output: "715", is_sample: false },
  { problem_id: 43, input: "15 10", expected_output: "817190", is_sample: false },
  { problem_id: 43, input: "20 20", expected_output: "345263555", is_sample: false },



  { problem_id: 93, input: "1", expected_output: "1", is_sample: true },
{ problem_id: 93, input: "2", expected_output: "2", is_sample: false },
{ problem_id: 93, input: "3", expected_output: "3", is_sample: false },
{ problem_id: 93, input: "4", expected_output: "5", is_sample: false },
{ problem_id: 93, input: "5", expected_output: "8", is_sample: false },
{ problem_id: 93, input: "6", expected_output: "13", is_sample: false },
{ problem_id: 93, input: "7", expected_output: "21", is_sample: false },
{ problem_id: 93, input: "8", expected_output: "34", is_sample: false },
{ problem_id: 93, input: "10", expected_output: "89", is_sample: false },
{ problem_id: 93, input: "15", expected_output: "987", is_sample: false },



{ problem_id: 94, input: "3\n1 2 5\n11", expected_output: "3", is_sample: true },
{ problem_id: 94, input: "3\n2 4 6\n7", expected_output: "-1", is_sample: false },
{ problem_id: 94, input: "1\n1\n0", expected_output: "0", is_sample: false },
{ problem_id: 94, input: "2\n1 3\n5", expected_output: "3", is_sample: false },
{ problem_id: 94, input: "4\n9 6 5 1\n11", expected_output: "2", is_sample: false },
{ problem_id: 94, input: "3\n2 5 10\n27", expected_output: "4", is_sample: false },
{ problem_id: 94, input: "3\n1 5 10\n18", expected_output: "5", is_sample: false },
{ problem_id: 94, input: "2\n5 7\n13", expected_output: "2", is_sample: false },
{ problem_id: 94, input: "3\n3 4 7\n28", expected_output: "4", is_sample: false },
{ problem_id: 94, input: "4\n2 3 7 8\n12", expected_output: "2", is_sample: false },



{ problem_id: 95, input: "5\n-2 1 -3 4 -1", expected_output: "4", is_sample: true },
{ problem_id: 95, input: "5\n1 2 3 4 5", expected_output: "15", is_sample: false },
{ problem_id: 95, input: "5\n-1 -2 -3 -4 -5", expected_output: "-1", is_sample: false },
{ problem_id: 95, input: "8\n-2 1 -3 4 -1 2 1 -5", expected_output: "6", is_sample: false },
{ problem_id: 95, input: "3\n5 -2 3", expected_output: "6", is_sample: false },
{ problem_id: 95, input: "4\n2 -1 2 3", expected_output: "6", is_sample: false },
{ problem_id: 95, input: "6\n-2 -3 4 -1 -2 1 5 -3", expected_output: "4", is_sample: false },
{ problem_id: 95, input: "2\n100 -50", expected_output: "100", is_sample: false },
{ problem_id: 95, input: "1\n-10", expected_output: "-10", is_sample: false },
{ problem_id: 95, input: "5\n0 0 0 0 0", expected_output: "0", is_sample: false },



{ problem_id: 96, input: "3 3\n1 3 1\n1 5 1\n4 2 1", expected_output: "7", is_sample: true },
{ problem_id: 96, input: "1 1\n5", expected_output: "5", is_sample: false },
{ problem_id: 96, input: "2 2\n1 2\n1 1", expected_output: "3", is_sample: false },
{ problem_id: 96, input: "2 3\n1 2 3\n4 5 6", expected_output: "12", is_sample: false },
{ problem_id: 96, input: "3 2\n1 2\n1 3\n2 1", expected_output: "5", is_sample: false },
{ problem_id: 96, input: "3 3\n5 9 1\n4 7 2\n3 8 6", expected_output: "23", is_sample: false },
{ problem_id: 96, input: "4 4\n1 2 5 9\n3 2 1 8\n4 2 1 3\n7 1 2 1", expected_output: "10", is_sample: false },
{ problem_id: 96, input: "3 4\n1 1 1 1\n1 1 1 1\n1 1 1 1", expected_output: "6", is_sample: false },
{ problem_id: 96, input: "2 3\n1 99 1\n1 1 1", expected_output: "4", is_sample: false },
{ problem_id: 96, input: "4 2\n1 2\n3 4\n1 1\n2 2", expected_output: "8", is_sample: false },



{ problem_id: 97, input: "5\n2 7 9 3 1", expected_output: "12", is_sample: true },
{ problem_id: 97, input: "4\n1 2 3 1", expected_output: "4", is_sample: false },
{ problem_id: 97, input: "1\n5", expected_output: "5", is_sample: false },
{ problem_id: 97, input: "2\n2 1", expected_output: "2", is_sample: false },
{ problem_id: 97, input: "3\n2 1 1", expected_output: "3", is_sample: false },
{ problem_id: 97, input: "6\n10 2 9 3 1 7", expected_output: "26", is_sample: false },
{ problem_id: 97, input: "7\n5 3 4 11 2 1 10", expected_output: "26", is_sample: false },
{ problem_id: 97, input: "8\n2 1 1 2 2 1 1 2", expected_output: "7", is_sample: false },
{ problem_id: 97, input: "5\n10 10 10 10 10", expected_output: "30", is_sample: false },
{ problem_id: 97, input: "9\n1 2 3 1 5 6 7 1 3", expected_output: "19", is_sample: false },



{ problem_id: 98, input: "abcde\nace", expected_output: "3", is_sample: true },
{ problem_id: 98, input: "abc\nabc", expected_output: "3", is_sample: false },
{ problem_id: 98, input: "abc\ndef", expected_output: "0", is_sample: false },
{ problem_id: 98, input: "aggtab\ngxtxayb", expected_output: "4", is_sample: false },
{ problem_id: 98, input: "aaaa\naaa", expected_output: "3", is_sample: false },
{ problem_id: 98, input: "AXYT\nAYZX", expected_output: "2", is_sample: false },
{ problem_id: 98, input: "abcbdab\nbdcaba", expected_output: "4", is_sample: false },
{ problem_id: 98, input: "XMJYAUZ\nMZJAWXU", expected_output: "4", is_sample: false },
{ problem_id: 98, input: "abcdxyz\nxyzabcd", expected_output: "4", is_sample: false },
{ problem_id: 98, input: "abcdef\nfbdamn", expected_output: "2", is_sample: false },



{ problem_id: 99, input: "4\n10 30 40 20", expected_output: "30", is_sample: true },
{ problem_id: 99, input: "2\n10 20", expected_output: "10", is_sample: false },
{ problem_id: 99, input: "3\n10 50 10", expected_output: "0", is_sample: false },
{ problem_id: 99, input: "5\n30 10 60 10 60", expected_output: "30", is_sample: false },
{ problem_id: 99, input: "1\n5", expected_output: "0", is_sample: false },
{ problem_id: 99, input: "6\n10 30 20 40 30 50", expected_output: "40", is_sample: false },
{ problem_id: 99, input: "7\n7 4 8 2 9 1 6", expected_output: "5", is_sample: false },
{ problem_id: 99, input: "8\n1 2 3 4 5 6 7 8", expected_output: "7", is_sample: false },
{ problem_id: 99, input: "5\n100 10 50 10 100", expected_output: "100", is_sample: false },
{ problem_id: 99, input: "5\n10 20 10 20 10", expected_output: "0", is_sample: false },
{ problem_id: 99, input: "6\n1 100 1 100 1 100", expected_output: "99", is_sample: false },
{ problem_id: 99, input: "3\n5 5 5", expected_output: "0", is_sample: false },
{ problem_id: 99, input: "4\n10 20 10 30", expected_output: "20", is_sample: false },
{ problem_id: 99, input: "5\n50 40 30 20 10", expected_output: "40", is_sample: false },
{ problem_id: 99, input: "6\n10 60 10 60 10 60", expected_output: "50", is_sample: false },



{ problem_id: 100, input: "3", expected_output: "5", is_sample: true },
{ problem_id: 100, input: "1", expected_output: "2", is_sample: false },
{ problem_id: 100, input: "2", expected_output: "3", is_sample: false },
{ problem_id: 100, input: "4", expected_output: "8", is_sample: false },
{ problem_id: 100, input: "5", expected_output: "13", is_sample: false },
{ problem_id: 100, input: "6", expected_output: "21", is_sample: false },
{ problem_id: 100, input: "7", expected_output: "34", is_sample: false },
{ problem_id: 100, input: "8", expected_output: "55", is_sample: false },
{ problem_id: 100, input: "9", expected_output: "89", is_sample: false },
{ problem_id: 100, input: "10", expected_output: "144", is_sample: false },
{ problem_id: 100, input: "15", expected_output: "1597", is_sample: false },
{ problem_id: 100, input: "20", expected_output: "17711", is_sample: false },
{ problem_id: 100, input: "25", expected_output: "196418", is_sample: false },
{ problem_id: 100, input: "30", expected_output: "2178309", is_sample: false },
{ problem_id: 100, input: "40", expected_output: "267914296", is_sample: false },



{ problem_id: 101, input: "4", expected_output: "4", is_sample: true },
{ problem_id: 101, input: "0", expected_output: "0", is_sample: false },
{ problem_id: 101, input: "1", expected_output: "1", is_sample: false },
{ problem_id: 101, input: "2", expected_output: "1", is_sample: false },
{ problem_id: 101, input: "3", expected_output: "2", is_sample: false },
{ problem_id: 101, input: "5", expected_output: "7", is_sample: false },
{ problem_id: 101, input: "6", expected_output: "13", is_sample: false },
{ problem_id: 101, input: "7", expected_output: "24", is_sample: false },
{ problem_id: 101, input: "8", expected_output: "44", is_sample: false },
{ problem_id: 101, input: "9", expected_output: "81", is_sample: false },
{ problem_id: 101, input: "10", expected_output: "149", is_sample: false },
{ problem_id: 101, input: "11", expected_output: "274", is_sample: false },
{ problem_id: 101, input: "12", expected_output: "504", is_sample: false },
{ problem_id: 101, input: "13", expected_output: "927", is_sample: false },
{ problem_id: 101, input: "14", expected_output: "1705", is_sample: false },



{ problem_id: 102, input: "4\n2\n3 4\n6 5 7\n4 1 8 3", expected_output: "11", is_sample: true },
{ problem_id: 102, input: "1\n5", expected_output: "5", is_sample: false },
{ problem_id: 102, input: "2\n1\n2 3", expected_output: "3", is_sample: false },
{ problem_id: 102, input: "3\n1\n2 3\n3 6 7", expected_output: "6", is_sample: false },
{ problem_id: 102, input: "3\n2\n3 4\n6 5 7", expected_output: "10", is_sample: false },
{ problem_id: 102, input: "4\n1\n2 3\n4 5 6\n7 8 9 10", expected_output: "14", is_sample: false },
{ problem_id: 102, input: "5\n7\n6 3\n3 8 5\n11 2 10 9\n8 5 12 4 6", expected_output: "23", is_sample: false },
{ problem_id: 102, input: "4\n5\n9 6\n4 6 8\n0 7 1 5", expected_output: "18", is_sample: false },
{ problem_id: 102, input: "3\n5\n9 6\n4 6 8", expected_output: "17", is_sample: false },
{ problem_id: 102, input: "2\n3\n7 4", expected_output: "7", is_sample: false },
{ problem_id: 102, input: "3\n10\n5 6\n2 3 4", expected_output: "17", is_sample: false },
{ problem_id: 102, input: "5\n2\n3 4\n6 5 7\n4 1 8 3\n2 2 2 2 2", expected_output: "13", is_sample: false },
{ problem_id: 102, input: "3\n3\n2 4\n6 1 3", expected_output: "6", is_sample: false },
{ problem_id: 102, input: "4\n1\n1 1\n1 1 1\n1 1 1 1", expected_output: "4", is_sample: false },
{ problem_id: 102, input: "3\n7\n2 3\n1 1 1", expected_output: "10", is_sample: false },


{ problem_id: 103, input: "4 5\n1 2 3 4", expected_output: "2", is_sample: true },
{ problem_id: 103, input: "3 3\n1 1 1", expected_output: "1", is_sample: false },
{ problem_id: 103, input: "3 4\n1 2 3", expected_output: "1", is_sample: false },
{ problem_id: 103, input: "5 10\n2 3 5 6 8", expected_output: "2", is_sample: false },
{ problem_id: 103, input: "4 0\n1 2 3 4", expected_output: "1", is_sample: false },
{ problem_id: 103, input: "5 11\n1 2 3 4 5", expected_output: "2", is_sample: false },
{ problem_id: 103, input: "5 6\n1 2 3 3 2", expected_output: "5", is_sample: false },
{ problem_id: 103, input: "3 5\n2 2 3", expected_output: "2", is_sample: false },
{ problem_id: 103, input: "6 9\n3 3 3 3 3 3", expected_output: "20", is_sample: false },
{ problem_id: 103, input: "4 7\n1 2 3 4", expected_output: "2", is_sample: false },
{ problem_id: 103, input: "5 8\n2 3 5 6 8", expected_output: "3", is_sample: false },
{ problem_id: 103, input: "4 4\n1 1 1 1", expected_output: "1", is_sample: false },
{ problem_id: 103, input: "3 2\n1 1 1", expected_output: "3", is_sample: false },
{ problem_id: 103, input: "3 6\n1 2 3", expected_output: "1", is_sample: false },
{ problem_id: 103, input: "5 5\n5 5 5 5 5", expected_output: "5", is_sample: false },

];

module.exports = { test_cases };
