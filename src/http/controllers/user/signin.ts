import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeSigninUseCase } from "@/use-cases/factory/make-signin-use-case";
import { compare } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function signin(request: FastifyRequest, reply: FastifyReply){
    const registerBodySchema = z.object({
        username: z.string(),
        password: z.string()
    })

    const {username, password} = registerBodySchema.parse(request.body)

    const singinUseCase = makeSigninUseCase()

    const user = await singinUseCase.handler(username)

    const doesPasswordMatch = await compare(password, user.password)

    if(!doesPasswordMatch){
        throw new InvalidCredentialsError()
    }

    const token = await reply.jwtSign({username})

    return reply.status(200).send({token: token})
}