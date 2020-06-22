import { createMethodDecorator } from 'type-graphql'

export const Encrypted = (): MethodDecorator => {
  return createMethodDecorator(async (data , next) => {
    console.log(data)

    return next()
  })
}
