import React from "react";
import YourErrorPageDesign from "./YourErrorPageDesign ";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    console.log("error***", error);
    // Update state so next render shows fallback UI
    return { hasError: true, message: error };
  }

  componentDidCatch(error, errorInfo) {
    // You can log error details to a reporting service
    console.log("error*** Error caught by Error Boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <YourErrorPageDesign error={this.state.message} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
