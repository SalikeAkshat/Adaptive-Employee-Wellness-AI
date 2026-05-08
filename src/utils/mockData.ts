import { User, DashboardStats } from '../types';

// Generate random consumption history
const generateConsumptionHistory = (avg: number, isThief: boolean, days: number = 30): number[] => {
  const history: number[] = [];
  
  for (let i = 0; i < days; i++) {
    // Thieves have more erratic patterns with occasional dips
    if (isThief) {
      // For thieves, create occasional significant drops in reported consumption
      const multiplier = Math.random() > 0.3 ? 1 : 0.3;
      history.push(avg * (0.7 + Math.random() * 0.6) * multiplier);
    } else {
      // Regular users have more consistent consumption with natural variation
      history.push(avg * (0.85 + Math.random() * 0.3));
    }
  }
  
  return history;
};

// Generate mock users
export const generateMockUsers = (count: number = 100): User[] => {
  const users: User[] = [];
  
  for (let i = 1; i <= count; i++) {
    const isThief = Math.random() < 0.15; // 15% chance of being a thief
    const avgConsumption = isThief 
      ? 20 + Math.random() * 15 // Thieves have lower reported consumption
      : 30 + Math.random() * 40; // Regular users have higher consumption
    
    const predictionError = isThief 
      ? 15 + Math.random() * 10 // Thieves have higher prediction errors
      : Math.random() * 5; // Regular users have lower prediction errors
    
    const history = generateConsumptionHistory(avgConsumption, isThief);
    
    users.push({
      id: i,
      avgConsumption,
      totalConsumption: avgConsumption * 30, // Assuming 30 days
      potentialTheft: isThief,
      predictionError,
      cluster: isThief ? 0 : (Math.random() > 0.5 ? 1 : 2),
      consumptionHistory: history
    });
  }
  
  return users;
};

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalUsers: 100,
  potentialThieves: 15,
  averageConsumption: 35.2,
  detectionAccuracy: 92.5
};

// Mock API with delay to simulate real data fetching
export const fetchMockUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockUsers());
    }, 800);
  });
};

export const fetchMockDashboardStats = async (): Promise<DashboardStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDashboardStats);
    }, 500);
  });
};