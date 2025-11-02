import React from "react";
import ReactMarkdown from "react-markdown";
// --- REQUIRED FOR MATH RENDERING ---
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; 
// ------------------------------------

import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; 
import styles from "./markdownRenderer.module.css"

const RenderMarkdown = ({ content }) => {
  return (
    <div className={styles["markdown-container"]}>
      <ReactMarkdown
        children={content}
        remarkPlugins={[
            remarkGfm,
            remarkMath // Add this plugin to process $...$ and $$...$$
        ]}
        rehypePlugins={[
            rehypeHighlight,
            rehypeKatex // Add this plugin to convert the processed math to HTML
        ]}
      />
    </div>
  );
};

export default RenderMarkdown;