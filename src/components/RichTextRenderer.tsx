interface RichTextRendererProps {
    text: string;
    highlights?: string[];
}

export const RichTextRenderer = ({ text, highlights = [] }: RichTextRendererProps) => {
    if (!text) return null;

    const highlightPattern = highlights.length > 0 
        ? `|(?:${highlights
            .sort((a, b) => b.length - a.length)
            .map(h => {
                const escaped = h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const prefix = /^\w/.test(h) ? '\\b' : '';
                const suffix = /\w$/.test(h) ? '\\b' : '';
                return `${prefix}${escaped}${suffix}`;
            })
            .join('|')})` 
        : '';
        
    const pattern = new RegExp(`(\\*\\*.*?\\*\\*${highlightPattern})`, 'g');
    
    // Split by double newline for paragraphs
    const paragraphs = text.split(/\n\n/);

    return (
        <div className="space-y-4">
            {paragraphs.map((paragraph, pIdx) => {
                const parts = paragraph.split(pattern);
                return (
                    <p key={pIdx}>
                        {parts.map((part, i) => {
                            if (!part) return null; // Safety check for undefined captures

                            // Handle Bold **text**
                            if (part.startsWith('**') && part.endsWith('**')) {
                                return (
                                    <strong key={i} className="font-bold text-primary">
                                        {part.slice(2, -2)}
                                    </strong>
                                );
                            }
                            
                            // Handle Highlighted Skill (Case insensitive check) - NOW UNIFIED STYLE
                            if (highlights.some(h => h.toLowerCase() === part.toLowerCase())) {
                                return (
                                    <strong key={i} className="font-bold text-primary">
                                        {part}
                                    </strong>
                                );
                            }

                            return part;
                        })}
                    </p>
                );
            })}
        </div>
    );
};
