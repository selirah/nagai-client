import React from 'react';

class ErrorBoundary extends React.Component<{}, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    console.log(error);
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <p>Loading failed! Please reload</p>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
