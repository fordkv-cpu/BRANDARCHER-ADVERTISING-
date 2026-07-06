
import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      let errorMessage = "An unexpected error occurred within the BrandArcher ecosystem.";
      let isFirestoreError = false;

      try {
        const parsed = JSON.parse(this.state.error?.message || "");
        if (parsed.error && parsed.operationType) {
          errorMessage = `Intelligence Sync Error: ${parsed.error}`;
          isFirestoreError = true;
        }
      } catch (e) {
        // Not a JSON error
      }

      return (
        <div className="min-h-screen bg-black flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-10 border border-red-600/20 bg-zinc-950 shadow-2xl">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center border border-red-600/20">
                <AlertTriangle size={40} className="text-red-600" />
              </div>
            </div>
            
            <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-4">
              System Interruption
            </h2>
            
            <p className="text-zinc-500 text-xs uppercase tracking-widest leading-relaxed mb-10">
              {errorMessage}
            </p>

            <button
              onClick={this.handleReset}
              className="w-full bg-red-600 text-white py-4 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all"
            >
              <RefreshCw size={14} /> Re-Initialize Ecosystem
            </button>
            
            {isFirestoreError && (
              <p className="mt-6 text-[8px] text-zinc-700 uppercase tracking-[0.3em]">
                Error Code: 360-FS-SYNC-FAIL
              </p>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
