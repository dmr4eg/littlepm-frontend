import React from 'react';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        className?: string;
    }
}

declare module 'react-router-dom' {
    export * from 'react-router-dom';
} 