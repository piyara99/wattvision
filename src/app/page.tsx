
"use client";

import { useEffect, useState } from "react";
import {
  getSensorReading,
  getHistoricalData,
  SensorReading,
  HistoricalDataPoint,
} from "@/services/power-sensor";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { format, startOfDay } from "date-fns";
import { Power, Bolt, Calendar } from "lucide-react";

export default function Home() {
  const [sensorReading, setSensorReading] = useState<SensorReading | null>(null);
  const [dailyKwh, setDailyKwh] = useState<number>(0);
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  useEffect(() => {
    const fetchSensorData = async () => {
      const reading = await getSensorReading();
      setSensorReading(reading);
    };

    const fetchHistoricalData = async () => {
      const today = new Date();
      const start = startOfDay(today);
      const end = today;
      const data = await getHistoricalData(start, end);
      setHistoricalData(data);
    };

    fetchSensorData();
    fetchHistoricalData();

    // Fetch data every 5 seconds
    const intervalId = setInterval(() => {
      fetchSensorData();
      fetchHistoricalData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Calculate daily kWh (example calculation - needs to be refined)
    if (historicalData.length > 0) {
      const totalWatts = historicalData.reduce((sum, dataPoint) => sum + dataPoint.watts, 0);
      // Assuming data is in hourly intervals, convert watts to kWh
      const kwh = totalWatts / 1000;
      setDailyKwh(kwh);
    }
  }, [historicalData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Daily Consumption
          </CardTitle>
          <CardDescription>Used today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-semibold">{dailyKwh.toFixed(2)} kWh</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Power className="h-5 w-5" />
            Power Usage
          </CardTitle>
          <CardDescription>Power being used</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-semibold">
            {sensorReading ? `${sensorReading.watts} W` : "Loading..."}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Bolt className="h-4 w-4" />
            Kitchen Power
          </CardTitle>
          <CardDescription>240V 0.25A</CardDescription>
        </CardHeader>
        <CardContent>
        {sensorReading ? (
            <div className="grid gap-2">
            <div className="flex justify-between">
              <span>Power:</span>
              <span>{sensorReading.watts} W</span>
            </div>
            <Separator />
              <div className="flex justify-between">
                <span>Voltage:</span>
                <span>{sensorReading.voltage} V</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Amperage:</span>
                <span>{sensorReading.amperage} A</span>
              </div>
            </div>
          ) : (
            "Loading..."
          )}
        </CardContent>
      </Card>

       <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
            <Bolt className="h-4 w-4" />
             Living Room
          </CardTitle>
          <CardDescription>240V 0.25A</CardDescription>
        </CardHeader>
        <CardContent>
        {sensorReading ? (
            <div className="grid gap-2">
            <div className="flex justify-between">
              <span>Power:</span>
              <span>{sensorReading.watts} W</span>
            </div>
            <Separator />
              <div className="flex justify-between">
                <span>Voltage:</span>
                <span>{sensorReading.voltage} V</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span>Amperage:</span>
                <span>{sensorReading.amperage} A</span>
              </div>
            </div>
          ) : (
            "Loading..."
          )}
        </CardContent>
      </Card>


      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight">Kitchen Power Usage</CardTitle>
          <CardDescription>Power consumption over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historicalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(date) => format(date, "HH:mm")} />
              <YAxis />
              <Tooltip labelFormatter={(date) => format(date, "HH:mm")} />
              <Area type="monotone" dataKey="watts" stroke="#008080" fill="#008080" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl font-bold tracking-tight">Living Room Power Usage</CardTitle>
          <CardDescription>Power consumption over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={historicalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" tickFormatter={(date) => format(date, "HH:mm")} />
              <YAxis />
              <Tooltip labelFormatter={(date) => format(date, "HH:mm")} />
              <Area type="monotone" dataKey="watts" stroke="#008080" fill="#008080" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
