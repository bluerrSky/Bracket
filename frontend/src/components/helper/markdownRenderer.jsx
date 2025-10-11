import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // You can choose any theme
import styles from "./markdownRenderer.module.css"
const RenderMarkdown = ({ content }) => {
  return (
    <div className={styles["markdown-container"]}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      />
    </div>
  );
};

export default RenderMarkdown;
