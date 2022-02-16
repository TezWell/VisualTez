interface ClassNames {
    classes: string;
    append?: boolean;
}

export const buildClassName = (classNames: ClassNames[]) =>
    classNames
        .filter(({ append = true }) => append)
        .map(({ classes }) => classes)
        .join(' ');
