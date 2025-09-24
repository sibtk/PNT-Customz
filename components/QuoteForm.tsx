"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { quoteSchema, type QuoteFormInput } from "@/lib/validators";
import { SERVICES } from "@/config/services";
import { YEARS, MAKES, MODELS } from "@/config/vehicles";

export function QuoteForm() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<QuoteFormInput>({ resolver: zodResolver(quoteSchema), defaultValues: { notes: "" } as Partial<QuoteFormInput> });

  const [serviceTags, setServiceTags] = useState<string[]>([]);
  const serviceTypeValue = watch("serviceType");
  useEffect(() => {
    const tags = (serviceTypeValue || "").split(" + ").filter(Boolean);
    setServiceTags(tags);
  }, [serviceTypeValue]);

  function updateServiceTypeFromTags(tags: string[]) {
    setServiceTags(tags);
    setValue("serviceType", tags.join(" + "));
  }

  const selectedMake = watch("vehicleMake");

  // Reset form on initial mount to avoid stale values on hard refresh
  useEffect(() => {
    reset({
      serviceType: "",
      vehicleYear: "",
      vehicleMake: "",
      vehicleModel: "",
      name: "",
      phone: "",
      email: "",
      notes: "",
      estimatorRange: undefined,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prefill from chatbot estimator
  useEffect(() => {
    function onPrefill(e: Event) {
      const detail = (e as CustomEvent).detail as Partial<QuoteFormInput & { serviceType: string }> | undefined;
      if (!detail) return;
      if (detail.serviceType) (document.querySelector('select[name="serviceType"]') as HTMLSelectElement | null)?.focus();
      // Apply safe fields
      if (detail.serviceType) (document.querySelector('select[name="serviceType"]') as HTMLSelectElement | null)?.blur();
      reset({
        serviceType: detail.serviceType ?? "tint",
        vehicleYear: (detail as Partial<QuoteFormInput>).vehicleYear ?? "",
        vehicleMake: (detail as Partial<QuoteFormInput>).vehicleMake ?? "",
        vehicleModel: (detail as Partial<QuoteFormInput>).vehicleModel ?? "",
        name: "",
        phone: "",
        email: "",
        notes: detail.notes ?? "",
        estimatorRange: (detail as Partial<QuoteFormInput>).estimatorRange ?? undefined,
      });
    }
    window.addEventListener("prefill-quote", onPrefill as EventListener);
    return () => window.removeEventListener("prefill-quote", onPrefill as EventListener);
  }, [reset]);

  async function onSubmit(values: QuoteFormInput) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data?.ok) {
        alert("Request sent. We'll be in touch shortly.");
        reset();
      } else {
        alert("There was an issue. Please try again.");
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="quote" className="py-16" aria-label="Quote form">
      <div className="container-max">
        <h2 className="text-2xl sm:text-3xl font-bold font-[var(--font-display)] mb-6">Get a Quote</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-4" noValidate autoComplete="off">
          <div className="grid gap-2">
            <label className="text-sm">Selected Services</label>
            <div className="bg-[#1A1B1E] border border-white/10 rounded-xl p-2 min-h-12 flex flex-wrap items-center gap-2">
              {serviceTags.map((tag) => (
                <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-[#2A2C31] border border-white/10">
                  {tag}
                  <button
                    type="button"
                    aria-label={`Remove ${tag}`}
                    className="ml-1 text-white/70 hover:text-white"
                    onClick={() => updateServiceTypeFromTags(serviceTags.filter((t) => t !== tag))}
                  >
                    ×
                  </button>
                </span>
              ))}
              <select
                aria-label="Add service"
                className="ml-auto bg-[#2A2C31] border border-white/10 rounded-lg p-2 text-xs"
                onChange={(e) => {
                  const v = e.target.value;
                  if (!v) return;
                  if (!serviceTags.includes(v)) updateServiceTypeFromTags([...serviceTags, v]);
                  e.currentTarget.selectedIndex = 0;
                }}
              >
                <option value="">Add service…</option>
                {SERVICES.map((s) => (
                  <option key={s.key} value={s.key}>{s.title}</option>
                ))}
              </select>
              <input readOnly {...register("serviceType")} className="sr-only" aria-label="Selected services value" />
            </div>
            <p className="text-xs text-white/60">Edit services here or from the estimator.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="grid gap-2">
              <label className="text-sm">Year</label>
              <select {...register("vehicleYear")} className="bg-[#1A1B1E] border border-white/10 rounded-xl p-3 h-12 focus:outline-none focus:ring-2 focus:ring-[#E02727]">
                <option value="">Select year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              {errors.vehicleYear && <p className="text-red-400 text-sm">{String(errors.vehicleYear.message)}</p>}
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Make</label>
              <select {...register("vehicleMake")} className="bg-[#1A1B1E] border border-white/10 rounded-xl p-3 h-12 focus:outline-none focus:ring-2 focus:ring-[#E02727]">
                <option value="">Select make</option>
                {MAKES.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              {errors.vehicleMake && <p className="text-red-400 text-sm">{String(errors.vehicleMake.message)}</p>}
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Model</label>
              <select {...register("vehicleModel")} className="bg-[#1A1B1E] border border-white/10 rounded-xl p-3 h-12 focus:outline-none focus:ring-2 focus:ring-[#E02727]">
                <option value="">Select model</option>
                {(MODELS[selectedMake as keyof typeof MODELS] || []).map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
              {errors.vehicleModel && <p className="text-red-400 text-sm">{String(errors.vehicleModel.message)}</p>}
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Name</label>
            <input {...register("name")} className="bg-[#1A1B1E] border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#E02727]" />
            {errors.name && <p className="text-red-400 text-sm">{String(errors.name.message)}</p>}
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Phone</label>
            <input placeholder="(###) ###-####" {...register("phone")} className="bg-[#1A1B1E] border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#E02727]" />
            {errors.phone && <p className="text-red-400 text-sm">{String(errors.phone.message)}</p>}
          </div>
          <div className="grid gap-2">
            <label className="text-sm">Email</label>
            <input type="email" {...register("email")} className="bg-[#1A1B1E] border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#E02727]" />
            {errors.email && <p className="text-red-400 text-sm">{String(errors.email.message)}</p>}
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm">Photos (Optional)</label>
            <div className="bg-[#1A1B1E] border border-white/10 rounded-xl p-4">
              <input
                type="file"
                multiple
                accept="image/*"
                className="w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#E02727] file:text-white hover:file:bg-[#C02323]"
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files.length > 0) {
                    console.log(`Selected ${files.length} photos`);
                    // TODO: Implement photo upload to server
                  }
                }}
              />
              <p className="text-xs text-white/60 mt-2">Upload photos of your vehicle or specific areas you want worked on (max 6 photos)</p>
            </div>
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm">Notes</label>
            <textarea 
              rows={4} 
              {...register("notes")} 
              className="bg-[#1A1B1E] border border-white/10 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-[#E02727]" 
              placeholder="State any damages, specific parts in need of repair or install, custom requests, or any other details about your project..."
            />
          </div>
          <div className="md:col-span-2">
            <button disabled={submitting} className="rounded-full bg-[#E02727] text-white px-6 py-3 font-medium disabled:opacity-70">
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}


