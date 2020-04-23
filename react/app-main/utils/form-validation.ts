export const isValidEmail = (email: string): boolean => {
    const emailRegex = RegExp(/^[^@]+@[^@]+\.[^@]+$/);
    return emailRegex.test(email);
};

export const isValidUrl = (url: string): boolean => {
    const emailRegex = RegExp(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/,
    );
    return emailRegex.test(url);
};
