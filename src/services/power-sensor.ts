// src/services/power-sensor.ts

export interface SensorReading {
    watts: number;
    voltage: number;
    amperage: number;
  }
  
  export interface HistoricalDataPoint {
    timestamp: number; // UNIX timestamp or Date.getTime()
    watts: number;
  }
  
  // Simulate real-time sensor data
  export async function getSensorReading(): Promise<SensorReading> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return {
      watts: Math.floor(Math.random() * (400 - 100 + 1)) + 100, // 100W - 400W
      voltage: 230 + Math.random() * 10, // 230V ± 10V
      amperage: (Math.random() * (2 - 0.5) + 0.5), // 0.5A - 2A
    };
  }
  
  // Simulate historical data points
  export async function getHistoricalData(start: Date, end: Date): Promise<HistoricalDataPoint[]> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const points: HistoricalDataPoint[] = [];
    const now = new Date();
    for (let i = 0; i < 20; i++) {
      const timestamp = now.getTime() - (20 - i) * 5 * 1000; // simulate 5s interval
      points.push({
        timestamp,
        watts: Math.floor(Math.random() * (400 - 100 + 1)) + 100,
      });
    }
    return points;
  }
  