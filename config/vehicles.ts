export const YEARS: string[] = (() => {
  const current = new Date().getFullYear();
  const list: string[] = [];
  for (let y = current + 1; y >= 1990; y--) list.push(String(y));
  return list;
})();

export const MAKES = [
  "Tesla","Toyota","Honda","Ford","Chevrolet","BMW","Mercedes-Benz","Audi","Lexus","Nissan","Kia","Hyundai","Volkswagen","Subaru","Dodge","Jeep","Ram","GMC","Porsche","Mazda"
] as const;

export const MODELS: Record<string, string[]> = {
  Tesla: ["Model 3","Model Y","Model S","Model X","Cybertruck"],
  Toyota: ["Camry","Corolla","RAV4","Tacoma","Tundra"],
  Honda: ["Civic","Accord","CR-V","Pilot","Ridgeline"],
  Ford: ["F-150","Explorer","Mustang","Escape","Bronco"],
  Chevrolet: ["Silverado","Tahoe","Camaro","Equinox","Suburban"],
  BMW: ["3 Series","5 Series","X3","X5","M3"],
  "Mercedes-Benz": ["C-Class","E-Class","GLC","GLE","S-Class"],
  Audi: ["A4","A6","Q5","Q7","S4"],
  Lexus: ["IS","ES","RX","GX","NX"],
  Nissan: ["Altima","Sentra","Rogue","Frontier","Pathfinder"],
  Kia: ["K5","Forte","Sportage","Telluride","Stinger"],
  Hyundai: ["Elantra","Sonata","Tucson","Santa Fe","Ioniq 5"],
  Volkswagen: ["Jetta","Passat","Tiguan","Atlas","GTI"],
  Subaru: ["Impreza","WRX","Outback","Forester","Crosstrek"],
  Dodge: ["Charger","Challenger","Durango","Hornet","Ram 1500"],
  Jeep: ["Wrangler","Grand Cherokee","Gladiator","Compass","Renegade"],
  Ram: ["1500","2500","3500"],
  GMC: ["Sierra","Yukon","Canyon","Acadia","Terrain"],
  Porsche: ["911","Cayenne","Macan","Panamera","Taycan"],
  Mazda: ["Mazda3","Mazda6","CX-5","CX-50","MX-5"]
};


