"use client";
import { PRICING, type VehicleSize } from "@/config/pricing";
import { SERVICES } from "@/config/services";
import { YEARS, MAKES, MODELS } from "@/config/vehicles";
import { useEffect, useMemo, useState } from "react";

type EstimatorState = {
  selectedServices: string[];
  year: string;
  make: string;
  model: string;
  size: VehicleSize | "";
  notes?: string;
};

const STORAGE_KEY = "pnt_estimator_v1";
const DEFAULTS: EstimatorState = { selectedServices: ["tint"], year: "", make: "", model: "", size: "" };

export function Estimator({ onSend }: { onSend: (payload: {
  serviceType: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  notes?: string;
  estimatorRange?: { min: number; max: number; label?: string } | null;
}) => void }) {
  const [state, setState] = useState<EstimatorState>(() => {
    const defaults: EstimatorState = DEFAULTS;
    if (typeof window === "undefined") return defaults;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    try {
      const parsed = JSON.parse(raw) as Partial<EstimatorState & { serviceType?: string }>;
      const selectedServices = Array.isArray(parsed.selectedServices)
        ? parsed.selectedServices
        : parsed.serviceType
        ? [parsed.serviceType]
        : defaults.selectedServices;
      return { ...defaults, ...parsed, selectedServices } as EstimatorState;
    } catch {
      return defaults;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  // Clear persisted estimator on first load / refresh
  useEffect(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setState(DEFAULTS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getRangeForService(key: string): { min: number; max: number } | null {
    const s = key as keyof typeof PRICING;
    const entry = PRICING[s];
    if (!entry) return null;
    const e = entry as unknown;
    if (s === "starlights") {
      const head = (e as { standard_headliner: readonly [number, number] }).standard_headliner;
      return { min: head[0], max: head[1] } as { min: number; max: number };
    }
    if (s === "caliper_paint") {
      const all = (e as { all: readonly [number, number] }).all;
      return { min: all[0], max: all[1] } as { min: number; max: number };
    }
    if (s === "powder_coating_wheels" || s === "wheel_paint_set") {
      const first = Object.values(e as Record<string, readonly [number, number]>)[0] as readonly [number, number];
      return { min: first[0], max: first[1] } as { min: number; max: number };
    }
    if (s === "aftermarket_install") {
      const lh = (e as { labor_hourly: readonly [number, number] }).labor_hourly;
      return { min: lh[0], max: lh[1] } as { min: number; max: number };
    }
    const size = state.size || ("sedan" as VehicleSize);
    type PriceValue = { ceramic?: readonly [number, number] } | readonly [number, number];
    const record = e as Record<string, PriceValue>;
    const val = record[size];
    const ceramic = (val as { ceramic?: readonly [number, number] } | undefined)?.ceramic;
    const generic = Array.isArray(val) ? (val as readonly [number, number]) : undefined;
    const pair = ceramic || generic;
    if (!pair) return null;
    return { min: pair[0], max: pair[1] } as { min: number; max: number };
  }

  const totalRange = useMemo((): { min: number; max: number } | null => {
    const services = Array.isArray(state.selectedServices) ? state.selectedServices : [];
    const ranges = services.map((k) => getRangeForService(k)).filter(Boolean) as { min: number; max: number }[];
    if (ranges.length === 0) return null;
    return ranges.reduce(
      (acc, r) => ({ min: acc.min + r.min, max: acc.max + r.max }),
      { min: 0, max: 0 }
    );
  }, [state.selectedServices, state.size]);

  function update<K extends keyof EstimatorState>(key: K, value: EstimatorState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  return (
    <div className="rounded-2xl bg-[#111214] border border-white/10 p-4 w-[340px] text-sm shadow-lg">
      <div className="mb-3">
        <div className="text-xs uppercase tracking-wide text-white/60">Estimate</div>
        <div className="font-semibold text-white">Build your services</div>
      </div>
      <div className="grid gap-3">
        <span className="block">Services</span>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-auto pr-1">
          {SERVICES.map((s) => {
            const checked = state.selectedServices.includes(s.key);
            return (
              <button
                key={s.key}
                type="button"
                onClick={() =>
                  update(
                    "selectedServices",
                    checked
                      ? state.selectedServices.filter((k) => k !== s.key)
                      : [...state.selectedServices, s.key]
                  )
                }
                className={`px-3 py-1 rounded-full border text-xs ${
                  checked ? "bg-[#E02727] border-[#E02727] text-white" : "bg-[#1A1B1E] border-white/10 text-white/90 hover:border-white/30"
                }`}
                aria-pressed={checked}
              >
                {s.title}
              </button>
            );
          })}
        </div>
        <div className="grid grid-cols-3 gap-2 mt-1">
          <select value={state.year} onChange={(e) => update("year", e.target.value)} className="bg-[#2A2C31] rounded-lg p-2">
            <option value="">Year</option>
            {YEARS.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select value={state.make} onChange={(e) => update("make", e.target.value)} className="bg-[#2A2C31] rounded-lg p-2">
            <option value="">Make</option>
            {MAKES.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <select value={state.model} onChange={(e) => update("model", e.target.value)} className="bg-[#2A2C31] rounded-lg p-2">
            <option value="">Model</option>
            {(MODELS[state.make as keyof typeof MODELS] || []).map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        <label>
          <span className="block mb-1">Size</span>
          <select value={state.size} onChange={(e) => update("size", e.target.value as VehicleSize | "")} className="w-full bg-[#2A2C31] rounded-lg p-2">
            <option value="">Select</option>
            <option value="compact">Compact</option>
            <option value="sedan">Sedan</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
          </select>
        </label>
        <textarea placeholder="Notes (sunroof, film tier, etc.)" value={state.notes || ""} onChange={(e) => update("notes", e.target.value)} className="bg-[#2A2C31] rounded-lg p-2" />
        <div className="mt-1">
          <div className="flex items-center justify-between rounded-xl bg-[#1A1B1E] border border-white/10 px-3 py-2">
            <div className="inline-flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#E02727]" />
              <span className="font-medium">Total Estimate</span>
            </div>
            <div className="font-semibold">{totalRange ? `$${totalRange.min} – $${totalRange.max}` : "—"}</div>
          </div>
          <div className="text-[11px] text-white/60 mt-1">Approximate; final quote after inspection</div>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            className="rounded-full bg-[#E02727] text-white px-4 py-2 flex-1"
            onClick={() =>
              onSend({
                serviceType: state.selectedServices.length > 1 ? state.selectedServices.join(" + ") : (state.selectedServices[0] || "tint"),
                vehicleYear: state.year,
                vehicleMake: state.make,
                vehicleModel: state.model,
                notes: state.notes || "",
                estimatorRange: totalRange ?? undefined,
              })
            }
          >
            Send as Quote Request
          </button>
          <a href="#quote" className="rounded-full border border-white/20 px-4 py-2">Open Quote</a>
        </div>
      </div>
    </div>
  );
}


