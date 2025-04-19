"use client"

import { useState, useEffect } from "react"
import { Cloud, CloudRain, CloudSun, Droplets, Sun, Thermometer } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WeatherWidget() {
  const [location, setLocation] = useState("Mumbai, Maharashtra")
  const [loading, setLoading] = useState(false)

  // Indian cities
  const cities = [
    { name: "Mumbai, Maharashtra", lat: 19.076, lon: 72.8777 },
    { name: "Delhi, NCR", lat: 28.7041, lon: 77.1025 },
    { name: "Bangalore, Karnataka", lat: 12.9716, lon: 77.5946 },
    { name: "Chennai, Tamil Nadu", lat: 13.0827, lon: 80.2707 },
    { name: "Kolkata, West Bengal", lat: 22.5726, lon: 88.3639 },
    { name: "Hyderabad, Telangana", lat: 17.385, lon: 78.4867 },
    { name: "Pune, Maharashtra", lat: 18.5204, lon: 73.8567 },
    { name: "Ahmedabad, Gujarat", lat: 23.0225, lon: 72.5714 },
  ]

  // Mock weather data - in a real app, this would come from a weather API
  const weatherData = {
    Mumbai: {
      current: {
        temp: 32,
        condition: "Partly Cloudy",
        humidity: 75,
        wind: 12,
        icon: <CloudSun className="h-10 w-10 text-amber-500" />,
      },
      forecast: [
        { day: "Mon", temp: 33, icon: <Sun className="h-6 w-6 text-amber-500" /> },
        { day: "Tue", temp: 32, icon: <CloudSun className="h-6 w-6 text-amber-500" /> },
        { day: "Wed", temp: 31, icon: <Cloud className="h-6 w-6 text-gray-500" /> },
        { day: "Thu", temp: 30, icon: <CloudRain className="h-6 w-6 text-blue-500" /> },
        { day: "Fri", temp: 31, icon: <CloudSun className="h-6 w-6 text-amber-500" /> },
      ],
      farmingTips: [
        "Consider early morning or evening irrigation to reduce water loss due to evaporation.",
        "Monitor for increased pest activity due to high humidity levels.",
        "Good time to plant leafy vegetables before the rain on Thursday.",
        "Ensure proper drainage systems are in place for the upcoming rainfall.",
      ],
    },
    Delhi: {
      current: {
        temp: 38,
        condition: "Sunny",
        humidity: 45,
        wind: 8,
        icon: <Sun className="h-10 w-10 text-amber-500" />,
      },
      forecast: [
        { day: "Mon", temp: 39, icon: <Sun className="h-6 w-6 text-amber-500" /> },
        { day: "Tue", temp: 40, icon: <Sun className="h-6 w-6 text-amber-500" /> },
        { day: "Wed", temp: 39, icon: <Sun className="h-6 w-6 text-amber-500" /> },
        { day: "Thu", temp: 37, icon: <CloudSun className="h-6 w-6 text-amber-500" /> },
        { day: "Fri", temp: 36, icon: <CloudSun className="h-6 w-6 text-amber-500" /> },
      ],
      farmingTips: [
        "Increase frequency of irrigation due to high temperatures.",
        "Consider shade cloth for sensitive crops to prevent sun damage.",
        "Early morning harvesting recommended to maintain produce freshness.",
        "Monitor soil moisture levels closely in these dry conditions.",
      ],
    },
    Bangalore: {
      current: {
        temp: 26,
        condition: "Pleasant",
        humidity: 65,
        wind: 10,
        icon: <CloudSun className="h-10 w-10 text-amber-500" />,
      },
      forecast: [
        { day: "Mon", temp: 27, icon: <CloudSun className="h-6 w-6 text-amber-500" /> },
        { day: "Tue", temp: 28, icon: <Sun className="h-6 w-6 text-amber-500" /> },
        { day: "Wed", temp: 27, icon: <CloudSun className="h-6 w-6 text-amber-500" /> },
        { day: "Thu", temp: 26, icon: <Cloud className="h-6 w-6 text-gray-500" /> },
        { day: "Fri", temp: 25, icon: <CloudRain className="h-6 w-6 text-blue-500" /> },
      ],
      farmingTips: [
        "Ideal conditions for planting most vegetables and flowering plants.",
        "Good time for grafting and propagation activities.",
        "Light irrigation recommended for established plants.",
        "Prepare for light rainfall expected by end of week.",
      ],
    },
  }

  const [currentWeather, setCurrentWeather] = useState(weatherData.Mumbai)

  useEffect(() => {
    // Simulate API call to get weather data
    setLoading(true)
    setTimeout(() => {
      const cityName = location.split(",")[0].trim()
      if (cityName === "Mumbai") {
        setCurrentWeather(weatherData.Mumbai)
      } else if (cityName === "Delhi") {
        setCurrentWeather(weatherData.Delhi)
      } else if (cityName === "Bangalore") {
        setCurrentWeather(weatherData.Bangalore)
      } else {
        // Default to Mumbai if city not found
        setCurrentWeather(weatherData.Mumbai)
      }
      setLoading(false)
    }, 500)
  }, [location])

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="w-[240px]">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city.name} value={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardTitle>
              <CardDescription>Current conditions and forecast</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              {loading ? (
                <div className="animate-pulse flex items-center gap-2">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <>
                  {currentWeather.current.icon}
                  <div className="text-3xl font-bold">{currentWeather.current.temp}°C</div>
                </>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-20 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-40 bg-gray-200 rounded"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                  <Thermometer className="h-5 w-5 text-orange-500 mb-1" />
                  <span className="text-sm text-gray-500">Feels Like</span>
                  <span className="font-semibold">{currentWeather.current.temp}°C</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                  <Droplets className="h-5 w-5 text-blue-500 mb-1" />
                  <span className="text-sm text-gray-500">Humidity</span>
                  <span className="font-semibold">{currentWeather.current.humidity}%</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-blue-500 mb-1"
                  >
                    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
                  </svg>
                  <span className="text-sm text-gray-500">Wind</span>
                  <span className="font-semibold">{currentWeather.current.wind} km/h</span>
                </div>
                <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-yellow-500 mb-1"
                  >
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M5 5l1.5 1.5" />
                    <path d="M17.5 17.5 19 19" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M5 19l1.5-1.5" />
                    <path d="M17.5 6.5 19 5" />
                  </svg>
                  <span className="text-sm text-gray-500">UV Index</span>
                  <span className="font-semibold">High</span>
                </div>
              </div>

              <Tabs defaultValue="forecast">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="forecast">5-Day Forecast</TabsTrigger>
                  <TabsTrigger value="farming-tips">Farming Tips</TabsTrigger>
                </TabsList>
                <TabsContent value="forecast" className="mt-4">
                  <div className="grid grid-cols-5 gap-2 text-center">
                    {currentWeather.forecast.map((day, index) => (
                      <div key={index} className="p-2">
                        <div className="font-medium">{day.day}</div>
                        <div className="flex justify-center my-2">{day.icon}</div>
                        <div className="font-semibold">{day.temp}°C</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="farming-tips" className="mt-4">
                  <ul className="space-y-2">
                    {currentWeather.farmingTips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="mt-1 rounded-full bg-green-100 p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-3 w-3 text-green-600"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
