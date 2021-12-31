import React from 'react';

interface SectionLayoutProps {
    split?: 'vertical' | 'horizontal';
    size?: string;
    minSize?: string;
    maxSize?: string;
}

const getSectionCSS = ({
    split = 'vertical',
    size = '1',
    minSize = '0',
    maxSize = '100%',
}: SectionLayoutProps): Record<string, unknown> => {
    const isVertical = split === 'vertical';

    return {
        display: 'flex',
        outline: 'none',
        [isVertical ? 'minWidth' : 'minHeight']: minSize,
        [isVertical ? 'maxWidth' : 'maxHeight']: maxSize,
        flex: size,
    };
};

interface SectionProps extends SectionLayoutProps {
    index?: number;
    className?: string;
    sectionRef?: (el: HTMLElement, index: number) => void;
}

const Section: React.FC<SectionProps> = ({ children, className, sectionRef, index = 0, ...props }) => {
    const css = getSectionCSS(props);

    const setRef = React.useCallback(
        (el) => {
            sectionRef?.(el, index);
        },
        [index, sectionRef],
    );

    return (
        <div className={className} style={css} ref={setRef}>
            {children}
        </div>
    );
};

export default Section;
