export const wrapText = (input: string, maxLength: number): string => {
    if (input && input.length > maxLength) {
        return `${input.substr(0, maxLength)}...`;
    }
    return input;
};
