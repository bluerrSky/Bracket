import styles from "./PathContent.module.css"
import RenderMarkdown from "../helper/markdownRenderer";

const dpLesson = `
Welcome, traveler, to the art of **Dynamic Programming (DP)**.

> "Don't solve the same problem twice."

DP is a powerful technique for solving problems by breaking them down into simpler, smaller subproblems. It's like building a complex LEGO castle: you don't start at the top; you build the foundation and lower levels first, and each new piece rests on the solid work you've already done.

The two key properties that indicate a problem can be solved with DP are **Optimal Substructure** and **Overlapping Subproblems**. When a problem has both, DP shines by storing the results of subproblems to avoid re-computation.

There are two main approaches to DP:
1.  **Memoization (Top-Down):** The recursive approach. You break the big problem down and solve subproblems as needed, storing the results in a lookup table (a cache or "memo") so you never have to solve the same one twice.
2.  **Tabulation (Bottom-Up):** The iterative approach. You solve the smallest possible subproblem first, then use its result to solve the next largest one, and so on, until you have solved the main problem. This is typically done by filling out a table.

#### Example: Fibonacci Sequence

The classic recursive solution is simple but incredibly inefficient because it re-computes the same values many times.
\`\`\`python
# Inefficient Recursive Solution
def fib(n):
    if n <= 1:
        return n
    return fib(n-1) + fib(n-2)
\`\`\`

This is inefficient. Let’s optimize it using **memoization**.

\`\`\`python
# Memoization (Top-Down DP)
memo = {}

def fib_memo(n):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1) + fib_memo(n-2)
    return memo[n]
\`\`\`
Now let's see the **tabulation** approach, where we build the solution from the ground up.

\`\`\`python
# Tabulation (Bottom-Up DP)
def fib_tab(n):
    if n <= 1:
        return n
    
    # Create a table to store results
    dp_table = [0] * (n + 1)
    dp_table[1] = 1
    
    # Fill the table from 2 up to n
    for i in range(2, n + 1):
        dp_table[i] = dp_table[i-1] + dp_table[i-2]
        
    return dp_table[n]
\`\`\`
***

### Optimal Substructure

A problem has **Optimal Substructure** if the optimal solution to the overall problem can be constructed from the optimal solutions to its subproblems.

Think of finding the shortest route from your home to the park, which requires passing a specific library. The shortest route overall *must* be composed of two parts:
1. The shortest route from your home to the library.
2. The shortest route from the library to the park.

If you took a longer, scenic route to the library, your total trip could not possibly be the shortest. The overall optimal path is built from the optimal sub-paths.

#### Example: Fibonacci Sequence
This property is clear in the Fibonacci sequence. The solution for \`fib(n)\` is built directly from the solutions for \`fib(n-1)\` and \`fib(n-2)\`. You cannot calculate \`fib(n)\` without them.

#### A Counter-Example: Longest Simple Path
A problem that lacks optimal substructure is finding the longest simple path (a path with no repeated vertices) between two nodes in a graph. The longest path from node A to node C is not necessarily the combination of the longest path from A to B and the longest path from B to C, because those two sub-paths might share nodes, which is not allowed.

***

### Overlapping Subproblems

A problem has **Overlapping Subproblems** if the algorithm ends up solving the exact same subproblem multiple times. DP is powerful because it stores the solution to each subproblem in a table, so it only needs to be computed once.

This is the "Don't solve the same problem twice" mantra in action. Instead of re-calculating, you just look up the answer you already found.

#### Example: Fibonacci Sequence Call Tree
When calculating \`fib(5)\` recursively, the function calls look like a tree. Notice how \`fib(3)\` is calculated twice, and \`fib(2)\` is calculated three times. As \`n\` grows, the number of redundant calculations explodes. With memoization or tabulation, each value is computed only once.

***

### DP Problems

Here are a few classic problems where Dynamic Programming is the ideal solution.

#### 1. 0/1 Knapsack Problem

> Imagine you are a thief with a knapsack that can hold a maximum weight. You are in a store with several items, each with its own weight and value. You can either take an item or leave it (0/1 choice). Your goal is to maximize the total value of the items in your knapsack without exceeding the weight limit.

* **Optimal Substructure:** The maximum value for a given weight \`W\` is the maximum of two choices:
    1.  Don't include the current item: The value is the optimal solution for the remaining items with the same weight limit \`W\`.
    2.  Include the current item: The value is the current item's value plus the optimal solution for the remaining items with a reduced weight limit \`W - item_weight\`.
* **Overlapping Subproblems:** You repeatedly need to find the optimal value for the same remaining weight limits.

\`\`\`python
def knapsack(weights, values, W):
    n = len(values)
    dp = [[0 for _ in range(W + 1)] for _ in range(n + 1)]

    for i in range(1, n + 1):
        for w in range(1, W + 1):
            # If the current item's weight is more than the capacity
            if weights[i-1] > w:
                dp[i][w] = dp[i-1][w]
            else:
                # Max of: 1. Not including the item | 2. Including the item
                dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])
    
    return dp[n][W]
\`\`\`

#### 2. Longest Common Subsequence (LCS)

> Given two strings, find the length of the longest subsequence that is present in both of them. A subsequence is a sequence that appears in the same relative order, but not necessarily contiguous. For example, "ace" is a subsequence of "abcde".

* **Optimal Substructure:** The LCS of two strings \`X\` and \`Y\` depends on the LCS of their prefixes.
    * If the last characters match, the LCS length is \`1 + LCS(X_prefix, Y_prefix)\`.
    * If they don't match, the LCS length is \`max(LCS(X_prefix, Y), LCS(X, Y_prefix))\`.
* **Overlapping Subproblems:** You repeatedly solve for the LCS of the same prefixes.

\`\`\`python
def lcs(X, Y):
    m = len(X)
    n = len(Y)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if X[i-1] == Y[j-1]:
                dp[i][j] = 1 + dp[i-1][j-1]
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]
\`\`\`
`;


export default function PathContent(){
    return (
        <div className={styles.pathContentContainer}>
            <div className={styles.pathTitle}>
                Dynamic programming
            </div>
            <div className={styles.contentSections}>
                <div className={styles.introSection}>
                    <div className={styles.sectionTitle}>
                        Introduction to DP
                    </div>
                    <RenderMarkdown content={dpLesson} />
                </div>
            </div>
        </div>
    )
}