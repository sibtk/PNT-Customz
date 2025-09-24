export const PRICING = {
  tint: {
    compact: { ceramic: [249, 349], dyed: [149, 229] },
    sedan: { ceramic: [299, 399], dyed: [179, 259] },
    suv: { ceramic: [349, 499], dyed: [199, 299] },
    truck: { ceramic: [329, 449], dyed: [189, 289] },
  },
  ppf_full_front: {
    compact: [999, 1399],
    sedan: [1099, 1599],
    suv: [1299, 1899],
    truck: [1299, 1899],
  },
  vinyl_wrap_full: {
    compact: [2999, 4499],
    sedan: [3499, 4999],
    suv: [3999, 5999],
    truck: [3999, 5999],
  },
  starlights: { standard_headliner: [699, 1299] },
  ceramic_coating: {
    compact: [599, 999],
    sedan: [699, 1199],
    suv: [899, 1499],
    truck: [899, 1499],
  },
  paint_correction_single: {
    compact: [299, 499],
    sedan: [349, 549],
    suv: [399, 649],
    truck: [399, 649],
  },
  caliper_paint: { all: [249, 449] },
  powder_coating_wheels: { set_of_4: [499, 899] },
  wheel_paint_set: { set_of_4: [349, 699] },
  aftermarket_install: { labor_hourly: [95, 145] },
} as const;

export type VehicleSize = "compact" | "sedan" | "suv" | "truck";


