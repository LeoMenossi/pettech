import { makeUpdateProductUseCase } from "@/use-cases/factory/make-update-product-use-case";
import { UpdateProductUseCase } from "@/use-cases/update-product";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(request: FastifyRequest, reply: FastifyReply){

    const registerParamsSchema = z.object({
        id: z.string()
    })

    const registerBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        image_url: z.string(),
        price: z.coerce.number(),
        categories: z.array(
            z.object({
                id: z.coerce.number().optional(),
                name: z.string()
            })
        ).optional(),
    })

    const {id} = registerParamsSchema.parse(request.params)

    const {name, description, image_url, price, categories} = registerBodySchema.parse(request.body)

    const updateProductUseCase = makeUpdateProductUseCase()

    const product = await updateProductUseCase.handler({
        id,
        name,
        description,
        image_url,
        price,
        categories
    })

    return reply.status(200).send(product)
}