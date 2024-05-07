// Dark & Light theme settings
const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // Palette values for dark mode
                    primary: {
                        dark: "text-blue-200",
                        main: "text-blue-500",
                        light: "text-blue-800",
                    },
                    neutral: {
                        dark: "text-gray-100",
                        main: "text-gray-200",
                        mediumMain: "text-gray-300",
                        medium: "text-gray-400",
                        light: "text-gray-700",
                    },
                    background: {
                        default: "bg-gray-900",
                        alt: "bg-gray-800",
                    },
                }
                : {
                    // Palette values for light mode
                    primary: {
                        dark: "text-blue-700",
                        main: "text-blue-500",
                        light: "text-blue-50",
                    },
                    neutral: {
                        dark: "text-gray-700",
                        main: "text-gray-500",
                        mediumMain: "text-gray-400",
                        medium: "text-gray-300",
                        light: "text-gray-50",
                    },
                    background: {
                        default: "bg-gray-10",
                        alt: "bg-gray-0",
                    },
                }),
        },
        typography: {
            fontFamily: "font-rubik",
            fontSize: "text-base",
            h1: "text-5xl",
            h2: "text-4xl",
            h3: "text-3xl",
            h4: "text-2xl",
            h5: "text-xl",
            h6: "text-lg",
        },
    };
};

export { themeSettings };
