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
        // extends React's HTMLAttributes
        className?: string;
    }
}

declare module 'react-router-dom' {
    export * from 'react-router-dom';
}

export interface Day {
    order: number;
    title: string;
    description: string;
    content: {
        type: 'text' | 'video' | 'checklist' | 'completion';
        data: any;
    }[];
    nextDay?: number;
    isCompleted: boolean;
    projectBlueprintUuid: string;
}

export interface Project {
    uuid: string;
    title: string;
    description: string;
    blueprintUuid: string;
    status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
    currentDay?: number;
    days: Day[];
}

export interface ProjectBlueprint {
    uuid: string;
    title: string;
    description: string;
    days: number;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    estimatedDuration: string;
}

export interface User {
    uuid: string;
    username: string;
    email: string;
    projects: Project[];
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
} 