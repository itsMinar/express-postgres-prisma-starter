const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { ApiError } = require('../../../utils/ApiError.js');
const prisma = require('../../../utils/prisma.js');

const deleteTodoById = asyncHandler(async (req, res) => {
  const { todoId } = req.params;

  // find todo by ID and delete from DB
  const todo = await prisma.todo.delete({
    where: {
      id: todoId,
    },
  });

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, todo, 'Todo Info fetched Successfully'));
});

module.exports = deleteTodoById;
