const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { ApiError } = require('../../../utils/ApiError.js');
const prisma = require('../../../utils/prisma.js');

const getTodoById = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  // find todo by ID in DB
  const todo = await prisma.todo.findUnique({ where: { id: todoId } });

  // check validation
  if (!todo) {
    throw new ApiError(404, 'Todo not Found');
  }

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, todo, 'Todo Info fetched Successfully'));
});

module.exports = getTodoById;
