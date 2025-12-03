import { FC, ReactNode } from 'react';

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
    bgImage?: string;
    title?: string;
}

export const Section: FC<SectionProps> = ({ id, children, className, bgImage = '/images/placeholder.jpg', title }) => (
    <section 
        id={id} 
        className={`min-h-screen flex flex-col relative ${className || ''}`}
    >
        <div className="absolute inset-0 -z-10 bg-cover bg-center opacity-5 pointer-events-none" style={{ backgroundImage: `url(${bgImage})` }} />
        
        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col w-full relative">
            {/* Title Zone - Fixed at Top */}
            {title && (
                <div className="absolute top-[12vh] left-0 right-0 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto z-20 pointer-events-none">
                    {/* Title rendering is handled by components usually, but this reserves the slot */}
                </div>
            )}

            {/* Main Content Zone - Balanced Padding for Header Safety + Vertical Centering */}
            <div className={`flex-1 flex flex-col justify-center w-full px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 pt-28 pb-32 md:py-24 ${title ? 'pt-[15vh]' : ''}`}>
                {children}
            </div>
        </div>
    </section>
);
