declare const CodeBlock: import("svelte").Component<{
    code: any;
    language?: string;
    className?: string;
    showCopyButton?: boolean;
} & Record<string, any>, {}, "">;
type CodeBlock = ReturnType<typeof CodeBlock>;
export default CodeBlock;
