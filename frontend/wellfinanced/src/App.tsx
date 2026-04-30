import AppRouter from './router/AppRouter';
import { FinanceProvider } from './context/FinanceContext';

function App() {
  return (
    <FinanceProvider>
      <AppRouter />
    </FinanceProvider>
  );
}

export default App;
