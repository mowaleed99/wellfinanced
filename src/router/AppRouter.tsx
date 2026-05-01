import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MobileLayout from '../components/layout/MobileLayout';

// Auth
import WelcomeOnboarding from '../pages/WelcomeOnboarding';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';

// Core
import Dashboard from '../pages/Dashboard';
import AnalyticsIncome from '../pages/AnalyticsIncome';
import AiAssistant from '../pages/AiAssistant';
import GoalSettings from '../pages/GoalSettings';

// Nav Tabs
import Plans from '../pages/Plans';
import Timeline from '../pages/Timeline';
import History from '../pages/History';

// Savings
import SavingsHub from '../pages/SavingsHub';
import SavingsGoals from '../pages/SavingsGoals';

// Profile & Settings
import Profile from '../pages/Profile';
import StableSalary from '../pages/StableSalary';
import TaxPreferences from '../pages/TaxPreferences';
import LinkedAccounts from '../pages/LinkedAccounts';

// Utility Screens
import FinancialEntry from '../pages/FinancialEntry';
import TransactionDetails from '../pages/TransactionDetails';
import SearchHistory from '../pages/SearchHistory';
import PriorityPayments from '../pages/PriorityPayments';
import NotificationsCenter from '../pages/NotificationsCenter';
import HelpSupport from '../pages/HelpSupport';
import Installments from '../pages/Installments';
import AccountDetails from '../pages/AccountDetails';
import InstallmentDetails from '../pages/InstallmentDetails';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MobileLayout />}>
          {/* Auth Flow */}
          <Route path="/" element={<WelcomeOnboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Main App */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<AnalyticsIncome />} />
          <Route path="/ai-assistant" element={<AiAssistant />} />
          <Route path="/goals" element={<GoalSettings />} />

          {/* Bottom Nav Tabs */}
          <Route path="/plans" element={<Plans />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/history" element={<History />} />

          {/* Savings */}
          <Route path="/savings" element={<SavingsHub />} />
          <Route path="/savings-goals" element={<SavingsGoals />} />

          {/* Profile & Settings */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/stable-salary" element={<StableSalary />} />
          <Route path="/tax-preferences" element={<TaxPreferences />} />
          <Route path="/linked-accounts" element={<LinkedAccounts />} />

          {/* Utility Screens */}
          <Route path="/financial-entry" element={<FinancialEntry />} />
          <Route path="/transaction/:id" element={<TransactionDetails />} />
          <Route path="/search" element={<SearchHistory />} />
          <Route path="/priority-payments" element={<PriorityPayments />} />
          <Route path="/notifications" element={<NotificationsCenter />} />
          <Route path="/help-support" element={<HelpSupport />} />
          <Route path="/installments" element={<Installments />} />
          <Route path="/accounts/:id" element={<AccountDetails />} />
          <Route path="/installments/:id" element={<InstallmentDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
