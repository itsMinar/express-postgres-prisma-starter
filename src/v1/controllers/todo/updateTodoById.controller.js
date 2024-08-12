const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const prisma = require('../../../utils/prisma.js');

const updateTodoById = asyncHandler(async (req, res) => {
  // get todo details from client
  const { title, isComplete } = req.body;
  const { todoId } = req.params;

  // find todo by ID and update to DB
  const todo = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      title,
      isComplete,
    },
  });

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, todo, 'Todo Info fetched Successfully'));
});

module.exports = updateTodoById;
