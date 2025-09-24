import { z } from "zod";
import { SERVICE_KEYS } from "@/config/services";

export const phoneRegex = /^(\(\d{3}\)\s?\d{3}-\d{4}|\d{10})$/;

export const quoteSchema = z.object({
  serviceType: z.enum(SERVICE_KEYS as unknown as [string, ...string[]]),
  vehicleYear: z
    .string()
    .min(2)
    .max(4)
    .regex(/^\d{2,4}$/, "Enter a valid year"),
  vehicleMake: z.string().min(2).max(50),
  vehicleModel: z.string().min(1).max(50),
  name: z.string().min(2).max(100),
  phone: z
    .string()
    .transform((s) => s.replace(/[^\d()\s-]/g, ""))
    .refine((v) => phoneRegex.test(v), {
      message: "Use (###) ###-#### or 10 digits",
    }),
  email: z.string().email(),
  notes: z.string().max(2000).optional().default(""),
  photos: z.array(z.string().url().or(z.string().min(1))).max(6).optional(),
  estimatorRange: z
    .object({
      min: z.number().int().nonnegative(),
      max: z.number().int().nonnegative(),
      label: z.string().optional(),
    })
    .optional(),
});

// Input type for forms (before Zod defaults/refinements)
export type QuoteFormInput = z.input<typeof quoteSchema>;
// Output type after validation
export type QuoteData = z.infer<typeof quoteSchema>;


