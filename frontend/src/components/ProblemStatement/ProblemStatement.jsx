import RenderMarkdown from "../helper/markdownRenderer";
import styles from "./ProblemStatement.module.css"
const problemStatement = `
### Climbing Stairs

You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?

#### **Input Format**

A single integer \`n\`, representing the total number of steps in the staircase.

#### **Output Format**

An integer representing the total number of distinct ways to climb the staircase.

#### **Constraints**

* \`1 <= n <= 45\`

#### **Sample Input 1**

\`\`\`
2
\`\`\`

#### **Sample Output 1**

\`\`\`
2
\`\`\`

#### **Explanation 1**

There are two ways to climb a 2-step staircase:

1. 1 step + 1 step
2. 2 steps

#### **Sample Input 2**

\`\`\`
3
\`\`\`

#### **Sample Output 2**

\`\`\`
3
\`\`\`

#### **Explanation 2**

There are three ways to climb a 3-step staircase:

1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
`;



export default function ProblemStatement(){
    return (
        <div className={styles.probStatementContainer}>
            <RenderMarkdown content={problemStatement}/>
        </div>
    )
}