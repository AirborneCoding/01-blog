const Category = require("../models/categories.model")
const { StatusCodes } = require("http-status-codes")
const CustomError = require("../errors")
//*#######################################################################################

/**-----------------------------------------------
 * @desc    create category
 * @route   /api/v1/category
 * @method  POST
 * @access  private (admin) 
------------------------------------------------*/
const createCategory = async (req, res) => {
    const { name } = req.body;
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
        throw new CustomError.BadRequestError("This category already exists. Enter a different one.")
    }

    await Category.create({ name });

    res.status(StatusCodes.CREATED).json({ msg: "Category created successfully" });
}


/**-----------------------------------------------
 * @desc    delete category
 * @route   /api/v1/category/:id
 * @method  PUT
 * @access  private (admin) 
 * TODO : may some issues here with posts
------------------------------------------------*/
const deleteCategory = async (req, res) => {
    const categoryId = req.params.id;

    const existingCategory = await Category.findById(categoryId);

    if (!existingCategory) {
        throw new CustomError.NotFoundError("Category not found")
    }

    await existingCategory.deleteOne();

    res.status(StatusCodes.OK).json({ message: "Category deleted successfully" });
}

/**-----------------------------------------------
 * @desc    get all categories
 * @route   /api/v1/category
 * @method  GET
 * @access  public  
------------------------------------------------*/
const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(StatusCodes.OK).json(categories);
}


module.exports = {
    createCategory,
    deleteCategory,
    getAllCategories,
}