import Todo from "../models/todo.model.js";
import { successResponse } from "../utilis/apiResponse.js";
import { ApiError } from "../utilis/apiError.js";

// CREATE
export const createTodo = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    if (!title) throw new ApiError(400, "Title is required");

    const todo = await Todo.create({ title, description,user: req.user.id, });
    return successResponse(res, 201, "✅ Todo created successfully", todo);
    await logActivity(req.user.id, "CREATE_TODO", `Created todo: ${title}`);

  } catch (error) {
    next(error); // handled by global middleware
  }
};

// READ  todo
export const getTodos = async (req, res, next) => {
  try {
    // fetch all todos
    const todos = await Todo.find({ user: req.user.id }); // 👈 only current user’s todos


    // if no todos found (optional check)
    if (!todos || todos.length === 0)
      throw new ApiError(404, "No todos found");

    // send success response
    return successResponse(res, 200, "✅ Fetched all todos", todos);
  } catch (error) {
    next(error);
  }
};


// DELETE TODO



export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ success: false, message: "Todo not found" });
    }

    // Optional: Check ownership
    if (todo.user.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await todo.deleteOne();
    res.status(200).json({ success: true, message: "Todo deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};




// UPDATE TODO 

export const updateTodo = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body;

    // 🧩 Validate title (we need it to find the todo)
    if (!title) throw new ApiError(400, "Title is required to update a todo");

    // 🧠 Find and update the todo based on title
    const updatedTodo = await Todo.findOneAndUpdate(
      { title ,user: req.user.id}, // find by title
      { description, completed }, // update fields
      {
        new: true, // return updated document
        runValidators: true, // validate schema
      }
    );

    if (!updatedTodo)
      throw new ApiError(404, `No todo found with title '${title}'`);

    return successResponse(res, 200, `✅ Todo '${title}' updated successfully`, updatedTodo);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE TODO BY TITLE
export const getTodoByTitle = async (req, res, next) => {
  try {
    const { title } = req.body; // or req.query.title if you prefer ?title=
    if (!title) throw new ApiError(400, "Title is required to find todo");

    const todo = await Todo.findOne({ title });
    if (!todo) throw new ApiError(404, `No todo found with title '${title}'`);

    return successResponse(res, 200, "✅ Todo fetched successfully", todo);
  } catch (error) {
    next(error);
  }
};
