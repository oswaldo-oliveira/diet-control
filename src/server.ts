import Elysia from 'elysia'
import { registerUserController } from './http/controllers/register-user-controller'
import { authenticateController } from './http/controllers/authenticate-controller'
import { UserAlreadyExistsError } from './service/errors/user-already-exists-error'
import { registerFoodController } from './http/controllers/register-food-controller'
import { ResourceNotFoundError } from './service/errors/resource-not-found-error'
import { getFoodsController } from './http/controllers/get-foods-controller'
import { getFoodByIdController } from './http/controllers/get-food-by-id-controller'
import { updateFoodController } from './http/controllers/update-food-controller'
import { deleteFoodController } from './http/controllers/delete-food-controller'

const app = new Elysia()
  .use(registerUserController)
  .use(authenticateController)
  .use(registerFoodController)
  .use(getFoodsController)
  .use(getFoodByIdController)
  .use(updateFoodController)
  .use(deleteFoodController)
  .error({
    BAD_REQUEST: UserAlreadyExistsError,
    NOT_FOUND: ResourceNotFoundError,
  })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'VALIDATION': {
        set.status = error.status
        return error.toResponse()
      }
      case 'BAD_REQUEST': {
        set.status = 400
        return { code, message: error.message }
      }
      case 'NOT_FOUND': {
        set.status = 404
        return { code, message: error.message }
      }
      default: {
        return new Response(null, { status: 500 })
      }
    }
  })

app.listen(3333, () => {
  console.log('🚀 Http server running!')
})
