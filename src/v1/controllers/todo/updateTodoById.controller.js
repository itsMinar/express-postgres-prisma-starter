const { z } = require('zod');
const { asyncHandler } = require('../../../utils/asyncHandler.js');
const CustomError = require('../../../utils/Error.js');
const updateTodoByIdService = require('../../services/todo/updateTodoByIdService.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');

const updateTodoById = asyncHandler(async (req, res, next) => {
  const { todoId } = req.params;

  const schema = z.object({
    id: z.string({ message: 'Todo ID is Required' }),
    title: z
      .string({ message: 'Title is required' })
      .min(2, 'Title must be at least 2 characters')
      .optional(),
    isComplete: z
      .boolean({ message: 'isComplete must be a Boolean Value' })
      .optional(),
  });

  const validation = schema.safeParse({ id: todoId, ...req.body });

  if (!validation.success) {
    const error = CustomError.badRequest({
      message: 'Validation Error',
      errors: validation.error.errors.map((err) => err.message),
      hints: 'Please provide all the required fields',
    });

    return next(error);
  }

  const todo = await updateTodoByIdService(validation.data);

  // return response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        ...todo,
        links: {
          get: `/todos/${todo.id}`,
          delete: `/todos/${todo.id}`,
        },
      },
      'Todo Updated Successfully'
    )
  );
});

module.exports = updateTodoById;
