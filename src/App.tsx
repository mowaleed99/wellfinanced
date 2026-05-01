import AppRouter from './router/AppRouter';
import { FinanceProvider } from './context/FinanceContext';

import { ErrorBoundary } from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <FinanceProvider>
        <AppRouter />
      </FinanceProvider>
    </ErrorBoundary>
  );
}

export default App;
