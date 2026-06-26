"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertCircle,
  CheckCircle,
  Users,
  AlertTriangle,
  Smile,
  Zap,
  Droplet,
  TrendingUp,
  ClipboardList,
  Hourglass,
  Shield,
  MapPin,
  Calendar,
  ChevronDown,
  Info,
  ArrowUpRight,
  ArrowRight,
  Plus,
  Minus,
  Target,
  FileText,
  Road,
  HardHat,
  Sparkles,
} from "lucide-react";
import Map, { Source, Layer, NavigationControl } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

const delhiBoundaryData = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {},
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [76.838, 28.404],
            [77.348, 28.404],
            [77.348, 28.883],
            [76.838, 28.883],
            [76.838, 28.404]
          ]
        ]
      }
    }
  ]
};

const complaintPointsData = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { priority: "high" }, geometry: { type: "Point", coordinates: [77.1025, 28.7041] } },
    { type: "Feature", properties: { priority: "high" }, geometry: { type: "Point", coordinates: [77.2090, 28.6139] } },
    { type: "Feature", properties: { priority: "medium" }, geometry: { type: "Point", coordinates: [77.0697, 28.5355] } },
    { type: "Feature", properties: { priority: "low" }, geometry: { type: "Point", coordinates: [77.3000, 28.6300] } },
  ]
};

export default function DashboardPage() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).replace(/, /g, '\n')
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F8FAFC] p-4 lg:p-5 font-sans text-[#0F172A] gap-4">
      {/* 1. Header Section */}
      <header className="shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#0F172A]">
            Good Morning, Chief Minister
          </h1>
          <p className="mt-1 text-xs font-medium text-[#64748B]">
            Here's what's happening in Delhi today.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Date & Time */}
          <div className="flex items-center gap-3 rounded-xl bg-[#FFFFFF] px-4 py-2 shadow-sm border border-[#E8EDF5]">
            <Calendar className="h-5 w-5 text-[#64748B]" />
            <div className="flex flex-col leading-tight">
              <span className="text-[13px] font-bold text-[#0F172A]">20 May 2025</span>
              <span className="text-[12px] font-semibold text-[#64748B]">10:30 AM</span>
            </div>
          </div>
          
          {/* Profile */}
          <div className="flex items-center gap-3 rounded-xl bg-[#FFFFFF] px-4 py-2 shadow-sm border border-[#E8EDF5] cursor-pointer hover:bg-slate-50 transition-colors">
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/notionists/svg?seed=Rekha&backgroundColor=E8EDF5"
                alt="Avatar"
                className="h-9 w-9 rounded-full object-cover border border-slate-200"
              />
              <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-[#22C55E] border-2 border-white"></div>
            </div>
            <div className="flex flex-col leading-tight pr-2">
              <span className="text-[13px] font-bold text-[#0F172A]">Smt. Rekha Gupta</span>
              <span className="text-[11px] font-semibold text-[#64748B]">Chief Minister, Delhi</span>
            </div>
            <ChevronDown className="h-4 w-4 text-[#64748B]" />
          </div>
        </div>
      </header>

      {/* 2. Top Metric Cards (KPI) */}
      <div className="shrink-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card 1 */}
        <Card className="rounded-2xl border border-[#E8EDF5] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-[#FFFFFF]">
          <CardContent className="p-3 flex flex-col justify-between h-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-11 w-11 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0 shadow-sm">
                <ClipboardList className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold text-[#64748B] tracking-wide uppercase">TOTAL COMPLAINTS</p>
                <h3 className="text-xl font-black text-[#0F172A] leading-none mt-1">12,487</h3>
              </div>
            </div>
            <p className="text-[11px] font-bold text-[#22C55E] flex items-center gap-1 mt-auto">
              ↑ 8.7% vs last 7 days
            </p>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="rounded-2xl border border-[#E8EDF5] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-[#FFFFFF]">
          <CardContent className="p-3 flex flex-col justify-between h-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-11 w-11 rounded-full bg-[#22C55E] flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold text-[#64748B] tracking-wide uppercase">RESOLVED</p>
                <h3 className="text-xl font-black text-[#0F172A] leading-none mt-1">9,842</h3>
              </div>
            </div>
            <p className="text-[11px] font-bold text-[#22C55E] flex items-center gap-1 mt-auto">
              ↑ 12.5% vs last 7 days
            </p>
          </CardContent>
        </Card>

        {/* Card 3 */}
        <Card className="rounded-2xl border border-[#E8EDF5] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-[#FFFFFF]">
          <CardContent className="p-3 flex flex-col justify-between h-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-11 w-11 rounded-full bg-[#F59E0B] flex items-center justify-center shrink-0 shadow-sm">
                <Hourglass className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold text-[#64748B] tracking-wide uppercase">PENDING</p>
                <h3 className="text-xl font-black text-[#0F172A] leading-none mt-1">2,645</h3>
              </div>
            </div>
            <p className="text-[11px] font-bold text-[#EF4444] flex items-center gap-1 mt-auto">
              ↓ 4.3% vs last 7 days
            </p>
          </CardContent>
        </Card>

        {/* Card 4 */}
        <Card className="rounded-2xl border border-[#E8EDF5] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-[#FFFFFF]">
          <CardContent className="p-3 flex flex-col justify-between h-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-11 w-11 rounded-full bg-[#EF4444] flex items-center justify-center shrink-0 shadow-sm">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold text-[#64748B] tracking-wide uppercase">CRITICAL CASES</p>
                <h3 className="text-xl font-black text-[#0F172A] leading-none mt-1">312</h3>
              </div>
            </div>
            <p className="text-[11px] font-bold text-[#EF4444] flex items-center gap-1 mt-auto">
              ↑ 5.1% vs last 7 days
            </p>
          </CardContent>
        </Card>

        {/* Card 5 */}
        <Card className="rounded-2xl border border-[#E8EDF5] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-[#FFFFFF]">
          <CardContent className="p-3 flex flex-col justify-between h-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-11 w-11 rounded-full bg-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold text-[#64748B] tracking-wide uppercase">DELHI HEALTH SCORE</p>
                <h3 className="text-xl font-black text-[#0F172A] leading-none mt-1">84 <span className="text-xs text-[#64748B] font-semibold">/100</span></h3>
              </div>
            </div>
            <p className="text-[11px] font-bold text-[#22C55E] flex items-center gap-1.5 mt-auto">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span> Stable
            </p>
          </CardContent>
        </Card>

        {/* Card 6 */}
        <Card className="rounded-2xl border border-[#E8EDF5] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-[#FFFFFF]">
          <CardContent className="p-3 flex flex-col justify-between h-full">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-11 w-11 rounded-full bg-[#14B8A6] flex items-center justify-center shrink-0 shadow-sm">
                <Smile className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <p className="text-[10px] font-bold text-[#64748B] tracking-wide uppercase">CITIZEN SATISFACTION</p>
                <h3 className="text-xl font-black text-[#0F172A] leading-none mt-1">87%</h3>
              </div>
            </div>
            <p className="text-[11px] font-bold text-[#22C55E] flex items-center gap-1 mt-auto">
              ↑ 4% vs last 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 3. Main Content (65/35 Split) */}
      <div className="flex-1 min-h-0 flex gap-4">
        
        {/* Left: DELHI HEAT MAP (65%) */}
        <Card className="flex-[6.5] h-full overflow-hidden rounded-2xl border border-[#E8EDF5] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] bg-[#FFFFFF] flex flex-col">
          <CardHeader className="flex flex-row items-start justify-between pb-2 pt-4 px-6 border-none shrink-0">
            <div>
              <CardTitle className="text-lg font-black text-[#0F172A] uppercase tracking-wide">
                LIVE COMPLAINT MAP
              </CardTitle>
              <div className="flex items-center gap-1.5 mt-1">
                <p className="text-[13px] font-medium text-[#64748B]">Complaint Density Across Districts</p>
                <Info className="h-3.5 w-3.5 text-[#64748B] cursor-pointer" />
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <MapPin className="h-3 w-3 text-[#64748B]" />
                <p className="text-[11px] font-medium text-[#64748B]">Click on a district to view details</p>
              </div>
            </div>
            <a href="#" className="flex items-center gap-1 text-[13px] font-bold text-[#2563EB] hover:text-blue-800 transition-colors">
              View All Districts <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </CardHeader>
          <CardContent className="p-0 flex-1 relative mt-4">
            
            {/* Legend */}
            <div className="absolute left-6 bottom-4 flex flex-row gap-4 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-lg border border-slate-200 shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#EF4444] rounded-[2px]"></div>
                <span className="text-[10px] font-bold text-[#0F172A]">High (500+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#F59E0B] rounded-[2px]"></div>
                <span className="text-[10px] font-bold text-[#0F172A]">Medium (200–500)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#FBBF24] rounded-[2px]"></div>
                <span className="text-[10px] font-bold text-[#0F172A]">Low (50–200)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#22C55E] rounded-[2px]"></div>
                <span className="text-[10px] font-bold text-[#0F172A]">Very Low (0–50)</span>
              </div>
            </div>

            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-bl-2xl rounded-br-2xl">
              <Map
                initialViewState={{
                  longitude: 77.1025,
                  latitude: 28.7041,
                  zoom: 10
                }}
                mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                style={{ width: '100%', height: '100%' }}
              >
                <Source id="delhi-boundary" type="geojson" data={delhiBoundaryData as any}>
                  <Layer
                    id="boundary-layer"
                    type="line"
                    paint={{
                      "line-color": "#64748B",
                      "line-width": 1.5,
                      "line-opacity": 0.8
                    }}
                  />
                </Source>

                <Source id="complaints" type="geojson" data={complaintPointsData as any}>
                  <Layer
                    id="complaints-layer"
                    type="circle"
                    paint={{
                      "circle-radius": 6,
                      "circle-color": [
                        "match",
                        ["get", "priority"],
                        "high", "#EF4444",
                        "medium", "#F59E0B",
                        "low", "#22C55E",
                        "#64748B"
                      ],
                      "circle-opacity": 0.8,
                      "circle-stroke-width": 1,
                      "circle-stroke-color": "#ffffff"
                    }}
                  />
                </Source>
                
                <NavigationControl position="bottom-right" />
              </Map>
            </div>
          </CardContent>
        </Card>

        {/* Right: ACTION REQUIRED TODAY (35%) */}
        <Card className="flex-[3.5] h-full overflow-hidden rounded-2xl border border-[#E8EDF5] shadow-[0_4px_20px_-8px_rgba(0,0,0,0.05)] bg-[#FFFFFF] flex flex-col p-4">
          <CardHeader className="flex flex-row items-center justify-between p-0 pb-2 border-none shrink-0">
            <CardTitle className="text-lg font-black text-[#0F172A] uppercase tracking-wide">
              ACTION REQUIRED TODAY
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden gap-2">
              
              {/* Alert 1 */}
              <div className="flex items-center bg-[#FEF2F2] rounded-xl px-3 py-1.5 transition-transform hover:-translate-y-0.5 border border-[#FEE2E2]/50 shrink-0">
                <div className="h-9 w-9 shrink-0 rounded-full bg-[#EF4444] flex items-center justify-center mr-3 shadow-sm shadow-red-200">
                  <Droplet className="h-4 w-4 text-white" fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-[13px] font-bold text-[#0F172A] truncate leading-snug">Water Crisis in North-East Delhi</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[11px] font-semibold text-[#64748B] truncate">482 complaints reported</p>
                    <Badge className="bg-[#FEE2E2] text-[#EF4444] hover:bg-[#FEE2E2] shadow-none border-none font-bold rounded px-1.5 py-0 leading-none h-4 text-[9px]">Critical</Badge>
                  </div>
                </div>
                <button className="text-[11px] font-bold text-[#0F172A] border border-[#E8EDF5] bg-white rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-1 shrink-0">
                  Take Action <ChevronDown className="h-3 w-3 -rotate-90 text-[#64748B]" />
                </button>
              </div>
              
              {/* Alert 2 */}
              <div className="flex items-center bg-[#FFFBEB] rounded-xl px-3 py-1.5 transition-transform hover:-translate-y-0.5 border border-[#FEF3C7]/50 shrink-0">
                <div className="h-9 w-9 shrink-0 rounded-full bg-[#F59E0B] flex items-center justify-center mr-3 shadow-sm shadow-orange-200">
                  <Zap className="h-4 w-4 text-white" fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-[13px] font-bold text-[#0F172A] truncate leading-snug">Power Outage Incidents</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[11px] font-semibold text-[#64748B] truncate">18 incidents unresolved</p>
                    <Badge className="bg-[#FEF3C7] text-[#F59E0B] hover:bg-[#FEF3C7] shadow-none border-none font-bold rounded px-1.5 py-0 leading-none h-4 text-[9px]">High</Badge>
                  </div>
                </div>
                <button className="text-[11px] font-bold text-[#0F172A] border border-[#E8EDF5] bg-white rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-1 shrink-0">
                  Take Action <ChevronDown className="h-3 w-3 -rotate-90 text-[#64748B]" />
                </button>
              </div>

              {/* Alert 3 */}
              <div className="flex items-center bg-[#FFFBEB] rounded-xl px-3 py-1.5 transition-transform hover:-translate-y-0.5 border border-[#FEF3C7]/50 shrink-0">
                <div className="h-9 w-9 shrink-0 rounded-full bg-[#F59E0B] flex items-center justify-center mr-3 shadow-sm shadow-orange-200">
                  <HardHat className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-[13px] font-bold text-[#0F172A] truncate leading-snug">Roads Department Backlog</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[11px] font-semibold text-[#64748B] truncate">147 cases pending &gt; 7 days</p>
                    <Badge className="bg-[#FEF3C7] text-[#F59E0B] hover:bg-[#FEF3C7] shadow-none border-none font-bold rounded px-1.5 py-0 leading-none h-4 text-[9px]">High</Badge>
                  </div>
                </div>
                <button className="text-[11px] font-bold text-[#0F172A] border border-[#E8EDF5] bg-white rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-1 shrink-0">
                  Take Action <ChevronDown className="h-3 w-3 -rotate-90 text-[#64748B]" />
                </button>
              </div>

              {/* Alert 4 */}
              <div className="flex items-center bg-[#F5F3FF] rounded-xl px-3 py-1.5 transition-transform hover:-translate-y-0.5 border border-[#EDE9FE]/50 shrink-0">
                <div className="h-9 w-9 shrink-0 rounded-full bg-[#7C3AED] flex items-center justify-center mr-3 shadow-sm shadow-purple-200">
                  <Users className="h-4 w-4 text-white" fill="currentColor" />
                </div>
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-[13px] font-bold text-[#0F172A] truncate leading-snug">VIP / High Escalation Cases</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-[11px] font-semibold text-[#64748B] truncate">6 cases require immediate attention</p>
                    <Badge className="bg-[#EDE9FE] text-[#7C3AED] hover:bg-[#EDE9FE] shadow-none border-none font-bold rounded px-1.5 py-0 leading-none h-4 text-[9px]">Medium</Badge>
                  </div>
                </div>
                <button className="text-[11px] font-bold text-[#0F172A] border border-[#E8EDF5] bg-white rounded-lg px-2.5 py-1.5 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-1 shrink-0">
                  Take Action <ChevronDown className="h-3 w-3 -rotate-90 text-[#64748B]" />
                </button>
              </div>

            </div>
            <div className="mt-3 shrink-0">
              <a href="#" className="w-full py-3.5 bg-[#EFF6FF] rounded-xl flex items-center justify-center gap-2 hover:bg-[#DBEAFE] transition-colors text-[13px] font-bold text-[#2563EB]">
                View All Urgent Issues <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 4. AI INSIGHTS */}
      <div className="shrink-0 flex flex-col gap-2">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-black text-[#0F172A] tracking-wide">AI INSIGHTS</h2>
            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#64748B]">
              Powered by <span className="text-[#2563EB] font-bold flex items-center gap-1"><Sparkles className="h-3.5 w-3.5" /> Gemini</span>
            </div>
          </div>
          <a href="#" className="flex items-center gap-1 text-[13px] font-bold text-[#2563EB] hover:text-blue-800 transition-colors">
            View All Insights <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
        
        <Card className="rounded-2xl border border-[#E8EDF5] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] bg-[#FFFFFF] overflow-hidden">
          <CardContent className="p-0 flex flex-row divide-x divide-gray-200">
            
            <div className="flex-1 p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
              <div className="bg-[#FEF2F2] p-2 rounded-lg shrink-0">
                <TrendingUp className="h-4 w-4 text-[#EF4444]" />
              </div>
              <p className="text-[11px] text-[#64748B] leading-tight font-medium">
                Water complaints increased by <strong className="text-[#EF4444]">28%</strong> in North-East Delhi compared to last week.
              </p>
            </div>

            <div className="flex-1 p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
              <div className="bg-[#EFF6FF] p-2 rounded-lg shrink-0">
                <Droplet className="h-4 w-4 text-[#2563EB]" fill="currentColor" />
              </div>
              <p className="text-[11px] text-[#64748B] leading-tight font-medium">
                Water supply issues are the highest concern today (<strong className="text-[#0F172A]">37%</strong> of total complaints).
              </p>
            </div>

            <div className="flex-1 p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
              <div className="bg-[#F8FAFC] p-2 rounded-lg shrink-0">
                <Road className="h-4 w-4 text-[#0F172A]" />
              </div>
              <p className="text-[11px] text-[#64748B] leading-tight font-medium">
                Roads Department has the highest unresolved backlog (<strong className="text-[#0F172A]">147 cases &gt; 7 days</strong>).
              </p>
            </div>

            <div className="flex-1 p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
              <div className="bg-[#FFFBEB] p-2 rounded-lg shrink-0">
                <Zap className="h-4 w-4 text-[#F59E0B]" fill="currentColor" />
              </div>
              <p className="text-[11px] text-[#64748B] leading-tight font-medium">
                Power outage complaints reduced by <strong className="text-[#22C55E]">15%</strong> compared to last week.
              </p>
            </div>

            <div className="flex-1 p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
              <div className="bg-[#F5F3FF] p-2 rounded-lg shrink-0">
                <Users className="h-4 w-4 text-[#7C3AED]" fill="currentColor" />
              </div>
              <p className="text-[11px] text-[#64748B] leading-tight font-medium">
                Women safety complaints increased by <strong className="text-[#0F172A]">12%</strong> in last 7 days.
              </p>
            </div>

          </CardContent>
        </Card>
      </div>
      
    </div>
  );
}
