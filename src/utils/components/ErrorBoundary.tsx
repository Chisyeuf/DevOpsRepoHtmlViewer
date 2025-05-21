import React, { Component, type ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    message?: string
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
        console.error(error);
        return { 
            message: error.message,
            hasError: true
         };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error("Uncaught error:", error, info);
        // Tu peux aussi logguer vers un outil externe ici
    }

    render() {
        if (this.state.hasError) {
            return <><h2>An error occurred:</h2> <p>{this.state.message}</p></>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
