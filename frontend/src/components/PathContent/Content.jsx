import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css"; // You can choose any theme

const TutorialSection = ({ content }) => {
  return (
    <div className="prose prose-invert max-w-none p-6 overflow-y-auto bg-[#0a0a0a] rounded-xl shadow-lg">
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
      />
    </div>
  );
};

export default TutorialSection;
