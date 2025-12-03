import React from 'react';

export const RichTextRenderer = ({ text }: { text: string }) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
        <span>
            {parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    const content = part.slice(2, -2);
                    return (
                        <span key={i} className="inline-block px-2 py-0.5 mx-1 text-xs font-medium bg-primary/10 text-primary rounded border border-primary/20 translate-y-[-1px]">
                            {content}
                        </span>
                    );
                }
                return part;
            })}
        </span>
    );
};
