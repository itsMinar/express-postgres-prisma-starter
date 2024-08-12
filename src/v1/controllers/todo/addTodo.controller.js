const { asyncHandler } = require('../../../utils/asyncHandler.js');
const { ApiResponse } = require('../../../utils/ApiResponse.js');
const { ApiError } = require('../../../utils/ApiError.js');
const prisma = require('../../../utils/prisma.js');

const addTodo = asyncHandler(async (req, res) => {
  // get todo details from client
  const { title } = req.body;

  // validation
  if (!title) {
    throw new ApiError(400, 'Title is Required!');
  }

  // create new todo and entry in DB
  const todo = await prisma.todo.create({ data: { title } });

  // check that new todo has been added into the DB
  const createdTodo = await prisma.todo.findUnique({ where: { id: todo.id } });

  // check for todo creation
  if (!createdTodo) {
    throw new ApiError(500, 'Something went wrong while adding new todo');
  }

  // return response
  return res
    .status(201)
    .json(new ApiResponse(201, createdTodo, 'Todo Added Successfully'));
});

module.exports = addTodo;
