import type * as React from "react";

interface OpenRouterLogoProps extends React.SVGProps<SVGSVGElement> {
    size?: number;
    className?: string;
}

const OpenRouterLogo = ({
                            size = 24,
                            className = "",
                            ...props
                        }: OpenRouterLogoProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 30 30"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            aria-label="OpenRouter Logo"
            {...props}
        >
            <title>OpenRouter</title>
            <defs>
                <linearGradient id="or-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C3AED"/>
                    <stop offset="100%" stopColor="#EC4899"/>
                </linearGradient>
            </defs>
            <circle cx="15" cy="15" r="14" fill="url(#or-gradient)"/>
            <path
                d="M22.5 10.5L15 18L7.5 10.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <path
                d="M22.5 19.5L15 12L7.5 19.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                opacity="0.5"
            />
        </svg>
    );
};

export default OpenRouterLogo;
