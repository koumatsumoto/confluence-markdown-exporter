import { z } from "zod";

const envSchema = z.object({
  CONFLUENCE_BASE_URL: z.string().url(),
  CONFLUENCE_EMAIL: z.string().email(),
  CONFLUENCE_API_TOKEN: z.string().min(1),
  DEFAULT_PAGE_ID: z.string().min(1),
  EXPORT_DIR: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export function parseEnv(env: Record<string, string | undefined>): Env {
  const parsed = envSchema.safeParse(env);

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.format());
    throw new Error("Invalid environment variables");
  }

  return parsed.data;
}
