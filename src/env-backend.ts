import { z } from 'zod'

const envSchema = z.object({
  GITHUB_AUTH_TOKEN: z.string(),
  BASE_URL: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success)
  throw new Error(
    `environment validation error: ${JSON.stringify(_env.error.format())}`,
  )

export const envBackend = _env.data
