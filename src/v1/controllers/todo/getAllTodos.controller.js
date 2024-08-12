const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const prisma = require('../../../utils/prisma.js');

const getAllTodos = asyncHandler(async (req, res) => {
  // find all todos in DB
  const todos = await prisma.todo.findMany();

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, todos, 'Get All Todos Successfully'));
});

module.exports = getAllTodos;
