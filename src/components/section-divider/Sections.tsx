import React from 'react';

import Guards from 'src/utils/guards';

import Section from './Section';
import Divider from './Divider';

const sizesOfSections = (children: React.ReactNode) =>
    React.Children.toArray(children)
        .filter(Guards.notNull)
        .filter((el): el is { props: { size: string } } => typeof el === 'object' && 'props' in el)
        .map((child) => child.props.size || '1');

const getMinMaxSize = (children: React.ReactNode, key: 'minSize' | 'maxSize') =>
    React.Children.toArray(children)
        .filter(Guards.notNull)
        .filter((el): el is { props: Record<string, string> } => typeof el === 'object' && 'props' in el)
        .map((child) => child.props[key] || (key === 'maxSize' ? '100%' : '0'));

const dimensionsOfSections = (sections: Record<number, HTMLElement>) =>
    Object.values(sections)
        .filter(Guards.notNull)
        .map((el) => el.getBoundingClientRect());

const extractSize = (size: string, limit: number) => {
    const parsedSize = Number(size.replace(/(px)|%/g, ''));
    if (size.endsWith('%')) {
        // Size is a percentage
        return (parsedSize * limit) / 100;
    }
    return parsedSize;
};

interface WrapperProps {
    innerRef: React.RefObject<HTMLDivElement>;
    className?: string;
    split: 'vertical' | 'horizontal';
}
const Wrapper: React.FC<WrapperProps> = ({ split, className = '', innerRef, ...props }) =>
    split === 'vertical' ? (
        <div
            ref={innerRef}
            {...props}
            className={`flex flex-row flex-1 no-outline overflow-hidden select-none h-full ${className}`}
        />
    ) : (
        <div
            ref={innerRef}
            {...props}
            className={`flex flex-col flex-1 no-outline overflow-hidden select-none h-full ${className}`}
        />
    );

interface SectionsProps {
    split: 'vertical' | 'horizontal';
    className?: string;
    onChange?: (sizes: string[]) => void;
}
const Sections: React.FC<SectionsProps> = ({ split = 'vertical', children, className, onChange }) => {
    const ref = React.useRef<HTMLDivElement>(null);
    const startClientX = React.useRef(0);
    const startClientY = React.useRef(0);
    const selectedDivider: React.MutableRefObject<number | null> = React.useRef<number>(null);
    const [sizes, setSizes] = React.useState(sizesOfSections(children));
    const [sections, setSections] = React.useState<Record<number, HTMLElement>>({});

    const onMove = React.useCallback(
        (clientX, clientY) => {
            if (!ref.current) {
                // This should never happen
                throw new Error('Something went wrong when loading "<Sections />"...');
            }
            if (selectedDivider.current === null) {
                // Do not move any section if no divider has been selected
                return;
            }

            const isVertical = split === 'vertical';
            const { width: wrapperWidth, height: wrapperHeight } = ref.current.getBoundingClientRect();
            const limitSize = isVertical ? wrapperWidth : wrapperHeight;

            const dimensions = dimensionsOfSections(sections);
            const minSizes = getMinMaxSize(children, 'minSize').map((n) => extractSize(n, limitSize));
            const maxSizes = getMinMaxSize(children, 'maxSize').map((n) => extractSize(n, limitSize));

            const leftSectionMinSize = minSizes[selectedDivider.current];
            const rightSectionMinSize = minSizes[selectedDivider.current + 1];
            const leftSectionMaxSize = maxSizes[selectedDivider.current] - rightSectionMinSize;
            const rightSectionMaxSize = maxSizes[selectedDivider.current + 1] - leftSectionMinSize;

            let leftSectionSize = isVertical ? clientX - dimensions[0].left : clientY - dimensions[0].top;
            let rightSectionSize = limitSize - leftSectionSize;
            if (leftSectionMinSize > leftSectionSize) {
                leftSectionSize = leftSectionMinSize;
                rightSectionSize = limitSize - leftSectionSize;
            } else if (leftSectionMaxSize < leftSectionSize) {
                leftSectionSize = leftSectionMaxSize;
                rightSectionSize = limitSize - leftSectionSize;
            } else if (rightSectionMinSize > rightSectionSize) {
                rightSectionSize = rightSectionMinSize;
                leftSectionSize = limitSize - rightSectionSize;
            } else if (rightSectionMaxSize < rightSectionSize) {
                rightSectionSize = rightSectionMaxSize;
                leftSectionSize = limitSize - rightSectionSize;
            }

            const newSizes = [
                String((leftSectionSize * 100) / limitSize),
                String((rightSectionSize * 100) / limitSize),
            ];

            // Call "onChange" callback if provided
            onChange?.(newSizes);

            setSizes(newSizes);
        },
        [split, sections, children, onChange],
    );

    const onDown = React.useCallback(
        (dividerIndex, clientX, clientY) => {
            selectedDivider.current = dividerIndex;
            startClientX.current = clientX;
            startClientY.current = clientY;

            const onMouseMove = (event: MouseEvent) => {
                onMove(event.clientX, event.clientY);
            };
            document.addEventListener('mousemove', onMouseMove);

            const onTouchMove = (event: TouchEvent) => {
                const { clientX, clientY } = event.touches[0];
                onMove(clientX, clientY);
            };
            document.addEventListener('touchmove', onTouchMove);

            const onMouseUp = () => {
                selectedDivider.current = null;
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('touchmove', onTouchMove);
            };
            document.addEventListener('mouseup', onMouseUp);
        },
        [onMove],
    );

    const onMouseDown = React.useCallback(
        (event, resizerIndex) => {
            if (event.button === 0) {
                const { clientX, clientY } = event;
                onDown(resizerIndex, clientX, clientY);
            }
        },
        [onDown],
    );

    const onTouchStart = React.useCallback(
        (event, dividerIndex) => {
            const { clientX, clientY } = event.touches[0];
            onDown(dividerIndex, clientX, clientY);
        },
        [onDown],
    );

    const addSectionRef = React.useCallback(
        (el: HTMLElement, index: number) => {
            setSections((sections) => ({ ...sections, [index]: el }));
        },
        [setSections],
    );

    React.useEffect(() => {
        setSizes(sizesOfSections(children));
    }, [children]);

    return (
        <Wrapper {...{ className, innerRef: ref, split }}>
            {React.Children.toArray(children)
                .filter(Guards.notNull)
                .reduce<React.ReactElement[]>((acc, child, index) => {
                    const sectionProps = {
                        key: `Section-${index}`,
                        index,
                        split,
                        sectionRef: addSectionRef,
                        size: sizes[index],
                    };

                    const section = <Section {...sectionProps}>{child}</Section>;

                    if (acc.length > 0) {
                        return [
                            ...acc,
                            <Divider
                                index={index - 1 /* <section1>|<divider>|<section2> */}
                                key={`Divider-${index - 1}`}
                                split={split}
                                onMouseDown={onMouseDown}
                                onTouchStart={onTouchStart}
                            />,
                            section,
                        ];
                    }

                    return [...acc, section];
                }, [])}
        </Wrapper>
    );
};

export default Sections;
