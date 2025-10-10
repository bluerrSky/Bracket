const test_cases = [
  // --- Problem 1: Dice Combinations ---
  { problem_id: 1, input: "1", expected_output: "1", is_sample: true },
  { problem_id: 1, input: "2", expected_output: "2", is_sample: true },
  { problem_id: 1, input: "3", expected_output: "4", is_sample: true },
  { problem_id: 1, input: "4", expected_output: "8", is_sample: true },

  { problem_id: 1, input: "5", expected_output: "16", is_sample: false },
  { problem_id: 1, input: "6", expected_output: "32", is_sample: false },
  { problem_id: 1, input: "7", expected_output: "63", is_sample: false },
  { problem_id: 1, input: "8", expected_output: "125", is_sample: false },
  { problem_id: 1, input: "9", expected_output: "248", is_sample: false },
  { problem_id: 1, input: "10", expected_output: "492", is_sample: false },

  { problem_id: 1, input: "15", expected_output: "5170", is_sample: false },
  { problem_id: 1, input: "20", expected_output: "463968", is_sample: false },
  { problem_id: 1, input: "25", expected_output: "9148827", is_sample: false },
  { problem_id: 1, input: "30", expected_output: "56035759", is_sample: false },
  { problem_id: 1, input: "35", expected_output: "211836641", is_sample: false },

  { problem_id: 1, input: "40", expected_output: "676509799", is_sample: false },
  { problem_id: 1, input: "45", expected_output: "798341736", is_sample: false },
  { problem_id: 1, input: "50", expected_output: "600074216", is_sample: false },
  { problem_id: 1, input: "100", expected_output: "944427251", is_sample: false },
  { problem_id: 1, input: "1000", expected_output: "235068587", is_sample: false },
  
  
  
  
  {
    problem_id: 2,
    input: "3 11\n1 5 7",
    expected_output: "3",
    is_sample: true
  },
  {
    problem_id: 2,
    input: "3 7\n2 4 6",
    expected_output: "-1",
    is_sample: true
  },
  {
    problem_id: 2,
    input: "4 6\n1 3 4 5",
    expected_output: "2",
    is_sample: true
  },
  {
    problem_id: 2,
    input: "2 10\n2 5",
    expected_output: "2",
    is_sample: true
  },

  { problem_id: 2, input: "1 7\n2", expected_output: "-1", is_sample: false },
  { problem_id: 2, input: "2 8\n3 5", expected_output: "2", is_sample: false },
  { problem_id: 2, input: "3 9\n2 3 5", expected_output: "3", is_sample: false },
  { problem_id: 2, input: "3 18\n2 5 9", expected_output: "2", is_sample: false },
  { problem_id: 2, input: "3 19\n4 6 9", expected_output: "-1", is_sample: false },
  { problem_id: 2, input: "4 25\n7 10 15 20", expected_output: "2", is_sample: false },

  { problem_id: 2, input: "5 100\n1 7 10 25 50", expected_output: "2", is_sample: false },
  { problem_id: 2, input: "5 99\n1 7 10 25 50", expected_output: "6", is_sample: false },
  { problem_id: 2, input: "2 999999\n2 3", expected_output: "333333", is_sample: false },
  { problem_id: 2, input: "2 1000000\n7 11", expected_output: "-1", is_sample: false },
  { problem_id: 2, input: "3 1000000\n1 500000 999999", expected_output: "2", is_sample: false },

  { problem_id: 2, input: "4 1000\n4 7 13 29", expected_output: "35", is_sample: false },
  { problem_id: 2, input: "5 12345\n5 11 23 47 97", expected_output: "127", is_sample: false },
  { problem_id: 2, input: "3 500\n7 10 25", expected_output: "20", is_sample: false },
  { problem_id: 2, input: "2 1000000\n1 999999", expected_output: "2", is_sample: false },
  { problem_id: 2, input: "3 999983\n2 7 11", expected_output: "90908", is_sample: false },

  { problem_id: 3, input: "3 9\n2 3 5", expected_output: "8", is_sample: true },
  { problem_id: 3, input: "3 4\n1 2 3", expected_output: "7", is_sample: true },
  { problem_id: 3, input: "2 3\n2 5", expected_output: "0", is_sample: true },
  { problem_id: 3, input: "2 5\n1 2", expected_output: "16", is_sample: true },

  { problem_id: 3, input: "1 10\n2", expected_output: "0", is_sample: false },
  { problem_id: 3, input: "1 7\n7", expected_output: "1", is_sample: false },
  { problem_id: 3, input: "2 6\n2 3", expected_output: "5", is_sample: false },
  { problem_id: 3, input: "2 7\n2 5", expected_output: "0", is_sample: false },
  { problem_id: 3, input: "3 7\n2 3 5", expected_output: "5", is_sample: false },
  { problem_id: 3, input: "3 10\n2 3 5", expected_output: "14", is_sample: false },

  { problem_id: 3, input: "4 20\n1 2 3 4", expected_output: "10671", is_sample: false },
  { problem_id: 3, input: "5 50\n1 5 10 25 50", expected_output: "341451", is_sample: false },
  { problem_id: 3, input: "2 100\n2 3", expected_output: "945100314", is_sample: false },
  { problem_id: 3, input: "3 200\n3 5 7", expected_output: "617334678", is_sample: false },
  { problem_id: 3, input: "3 500\n7 11 13", expected_output: "40706140", is_sample: false },

  { problem_id: 3, input: "2 1000\n2 5", expected_output: "158385092", is_sample: false },
  { problem_id: 3, input: "2 999999\n2 3", expected_output: "846603163", is_sample: false },
  { problem_id: 3, input: "3 1000000\n1 999999 1000000", expected_output: "3", is_sample: false },
  { problem_id: 3, input: "5 1000000\n2 5 7 11 13", expected_output: "189081861", is_sample: false },
  { problem_id: 3, input: "2 1000000\n1 2", expected_output: "688423210", is_sample: false },

  { problem_id: 4, input: "3 9\n2 3 5", expected_output: "3", is_sample: true },
  { problem_id: 4, input: "3 4\n1 2 3", expected_output: "4", is_sample: true },
  { problem_id: 4, input: "2 3\n2 5", expected_output: "0", is_sample: true },
  { problem_id: 4, input: "2 5\n1 2", expected_output: "3", is_sample: true },

  { problem_id: 4, input: "1 10\n2", expected_output: "0", is_sample: false },
  { problem_id: 4, input: "1 7\n7", expected_output: "1", is_sample: false },
  { problem_id: 4, input: "2 6\n2 3", expected_output: "2", is_sample: false },
  { problem_id: 4, input: "2 7\n2 5", expected_output: "1", is_sample: false },
  { problem_id: 4, input: "3 7\n2 3 5", expected_output: "2", is_sample: false },
  { problem_id: 4, input: "3 10\n2 3 5", expected_output: "4", is_sample: false },

  { problem_id: 4, input: "4 20\n1 2 3 4", expected_output: "60", is_sample: false },
  { problem_id: 4, input: "5 50\n1 5 10 25 50", expected_output: "49", is_sample: false },
  { problem_id: 4, input: "2 100\n2 3", expected_output: "17", is_sample: false },
  { problem_id: 4, input: "3 200\n3 5 7", expected_output: "136", is_sample: false },
  { problem_id: 4, input: "3 500\n7 11 13", expected_output: "1465", is_sample: false },

  { problem_id: 4, input: "2 1000\n2 5", expected_output: "101", is_sample: false },
  { problem_id: 4, input: "2 999999\n2 3", expected_output: "166667", is_sample: false },
  { problem_id: 4, input: "3 1000000\n1 999999 1000000", expected_output: "3", is_sample: false },
  { problem_id: 4, input: "5 1000000\n2 5 7 11 13", expected_output: "129430", is_sample: false },
  { problem_id: 4, input: "2 1000000\n1 2", expected_output: "500001", is_sample: false },


  { problem_id: 5, input: "27", expected_output: "5", is_sample: true },
  { problem_id: 5, input: "10", expected_output: "2", is_sample: true },
  { problem_id: 5, input: "19", expected_output: "2", is_sample: true },
  { problem_id: 5, input: "1", expected_output: "1", is_sample: true },

  { problem_id: 5, input: "99", expected_output: "10", is_sample: false },
  { problem_id: 5, input: "100", expected_output: "2", is_sample: false },
  { problem_id: 5, input: "123", expected_output: "12", is_sample: false },
  { problem_id: 5, input: "256", expected_output: "19", is_sample: false },
  { problem_id: 5, input: "999", expected_output: "111", is_sample: false },
  { problem_id: 5, input: "2020", expected_output: "202", is_sample: false },

  { problem_id: 5, input: "1234", expected_output: "308", is_sample: false },
  { problem_id: 5, input: "4321", expected_output: "433", is_sample: false },
  { problem_id: 5, input: "9876", expected_output: "110", is_sample: false },
  { problem_id: 5, input: "5000", expected_output: "5", is_sample: false },
  { problem_id: 5, input: "7654321", expected_output: "777", is_sample: false },

  { problem_id: 5, input: "1000000", expected_output: "7", is_sample: false },
  { problem_id: 5, input: "999999", expected_output: "111111", is_sample: false },
  { problem_id: 5, input: "876543", expected_output: "13351", is_sample: false },
  { problem_id: 5, input: "111111", expected_output: "111111", is_sample: false },
  { problem_id: 5, input: "246810", expected_output: "11112", is_sample: false },


  { problem_id: 6, input: "4\n....\n.*..\n...*\n*...", expected_output: "3", is_sample: true },
  { problem_id: 6, input: "2\n..\n..", expected_output: "2", is_sample: true },
  { problem_id: 6, input: "2\n.*\n..", expected_output: "1", is_sample: true },
  { problem_id: 6, input: "1\n.", expected_output: "1", is_sample: true },

  { problem_id: 6, input: "3\n...\n...\n...", expected_output: "6", is_sample: false },
  { problem_id: 6, input: "3\n..*\n.*.\n...", expected_output: "1", is_sample: false },
  { problem_id: 6, input: "3\n*..\n..*\n...", expected_output: "0", is_sample: false },
  { problem_id: 6, input: "4\n....\n....\n....\n....", expected_output: "20", is_sample: false },
  { problem_id: 6, input: "5\n.....\n.....\n.....\n.....\n.....", expected_output: "70", is_sample: false },
  { problem_id: 6, input: "5\n.*...\n.....\n.....\n.....\n.....", expected_output: "56", is_sample: false },

  { problem_id: 6, input: "6\n......\n......\n......\n......\n......\n......", expected_output: "252", is_sample: false },
  { problem_id: 6, input: "6\n..*...\n......\n......\n......\n......\n......", expected_output: "210", is_sample: false },
  { problem_id: 6, input: "7\n.......\n.......\n.......\n.......\n.......\n.......\n.......", expected_output: "924", is_sample: false },
  { problem_id: 6, input: "7\n.......\n.......\n.......\n...*...\n.......\n.......\n.......", expected_output: "792", is_sample: false },
  { problem_id: 6, input: "8\n........\n........\n........\n........\n........\n........\n........\n........", expected_output: "3432", is_sample: false },

  { problem_id: 6, input: "10\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........\n..........", expected_output: "48620", is_sample: false },
  { problem_id: 6, input: "15\n...............\n...............\n...............\n...............\n...............\n...............\n...............\n...............\n...............\n...............\n...............\n...............\n...............\n...............\n...............", expected_output: "40116600", is_sample: false },
  { problem_id: 6, input: "20\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................\n....................", expected_output: "35345263800", is_sample: false },
  { problem_id: 6, input: "3\n***\n***\n***", expected_output: "0", is_sample: false }


];


module.exports={test_cases};
