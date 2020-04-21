export const isValidEmail = (email: string): boolean => {
    const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/);
    return emailRegex.test(email);
};
