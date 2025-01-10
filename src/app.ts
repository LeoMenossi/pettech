import fastify from 'fastify'
import { personRoutes } from '@/http/controllers/person/routes'
import { userRoutes } from './http/controllers/user/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { ResourceNotFoundError } from './use-cases/errors/resource-not-found-error'
import { globalErrorHandler } from './utils/global-error-handles'

export const app = fastify()

app.register(personRoutes)
app.register(userRoutes)

app.setErrorHandler(globalErrorHandler)
