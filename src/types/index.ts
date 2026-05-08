export interface User {
  id: number;
  avgConsumption: number;
  totalConsumption: number;
  potentialTheft: boolean;
  predictionError?: number;
  cluster?: number;
  consumptionHistory: number[];
}

export interface DashboardStats {
  totalUsers: number;
  potentialThieves: number;
  averageConsumption: number;
  detectionAccuracy: number;
}

export interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}