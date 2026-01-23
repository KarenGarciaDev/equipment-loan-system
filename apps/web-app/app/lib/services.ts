export const SERVICES = {
  auth: process.env.NEXT_PUBLIC_AUTH_URL!,
  users: process.env.NEXT_PUBLIC_USERS_URL!,
  inventory: process.env.NEXT_PUBLIC_INVENTORY_URL!,
  loans: process.env.NEXT_PUBLIC_LOANS_URL!,
  reservations: process.env.NEXT_PUBLIC_RESERVATIONS_URL!,
  reports: process.env.NEXT_PUBLIC_REPORTS_URL!,
  automation: process.env.NEXT_PUBLIC_AUTOMATION_URL!,
  integration: process.env.NEXT_PUBLIC_INTEGRATION_URL!,
} as const;

export type ServiceKey = keyof typeof SERVICES;
