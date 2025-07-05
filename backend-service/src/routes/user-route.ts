import { getUsers, patchUser, postUsers } from "@/handlers/user-handler.ts"
import { Access, Authorization } from "@/middleware/authorization.ts"
import { CreateUserSchema, UserInformationModifySchema, UserRegisterSchema, UserResponseSchema } from "@/schemas/user-schema.ts"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import {
  resolver,
  validator,
} from 'hono-openapi/zod'

export const userRoute = new Hono()

userRoute
.get('/',
    Authorization([Access.ADMINISTRATOR, Access.ALUMNI]),
    describeRoute({
        description: "Get all users information",
        tags: ["Users"],
        responses: {
            200: {
                description: "Successfully get all users information",
                content: {
                    "application/json": {
                        schema: resolver(UserResponseSchema)        
                    }
                }
            },
        }
    }),
    getUsers
)
.post(
    describeRoute({
        description: "Create new users",
        tags: ["Users"],
        responses: {
            200: {
                description: "Successfuly create new users",
                content: {
                    "application/json": {
                        schema: resolver(CreateUserSchema)
                    }
                }
            }
        }
    }), 
    validator("json", UserRegisterSchema), 
    postUsers
)
.patch(
    Authorization([Access.ALUMNI, Access.ADMINISTRATOR]),
    describeRoute({
        description: "Modify user information",
        tags: ["Users"],
        responses: {
            200: {
                description: "Successfuly modify user information",
                content: {
                    "application/json": {
                        schema: resolver(CreateUserSchema)
                    }
                }
            }
        }
    }),
    validator("json", UserInformationModifySchema),
    patchUser
)