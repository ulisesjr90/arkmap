import React, { Component, ErrorInfo } from 'react';
import { AlertOctagon, RefreshCcw, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

// Helper to get user-friendly error messages
const getReadableError = (error: Error): string => {
  if (error.message.includes('useParams')) {
    return 'Unable to load page details. The requested resource might not exist.';
  }
  if (error.message.includes('Firebase')) {
    return 'Unable to connect to the service. Please check your connection.';
  }
  return error.message || 'An unexpected error occurred';
};

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleBackToHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="h-full bg-gray-900 text-white flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md text-center shadow-xl">
            <AlertOctagon className="w-16 h-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-3">Oops! Something went wrong</h2>
            <p className="text-gray-400 mb-6">
              {getReadableError(this.state.error!)}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button
                onClick={this.handleReload}
                className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                <RefreshCcw className="w-4 h-4" />
                Try Again
              </button>
              <button
                onClick={this.handleBackToHome}
                className="flex items-center justify-center gap-2 bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </div>
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <details className="mt-6 text-left text-sm text-gray-500">
                <summary className="cursor-pointer hover:text-gray-400">Error Details</summary>
                <pre className="mt-2 p-4 bg-gray-900 rounded overflow-auto">
                  {this.state.error?.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Wrapper component to provide navigation context
const ErrorBoundary: React.FC<Props> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};

export default ErrorBoundary;