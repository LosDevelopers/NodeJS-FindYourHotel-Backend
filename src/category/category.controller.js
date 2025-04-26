import Category from "../category/category.model.js"

export const addCategory = async (req, res) => {
    try{
        const data = req.body
        const category = await Category.create(data)

        return res.status(200).json({
            message: "Category has been registered",
            category
        })
    }catch(failure){
        return res.status(500).json({
            message: "Failed to register the category.",
            error: failure.message
        })
    }
}

export const categoriesList = async (req, res) => {
    try{
        const query = { status: true }
        const categories = await Category.find(query);
        return res.status(200).json(categories)
    }catch(failure){
        return res.status(500).json({
            message: "Failure to obtain the categories",
            error: failure.message
        })
    }
}

export const editCategories = async (req, res) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const category = await Category.findByIdAndUpdate(uid, data, { new: true });
        if (!category) {
            return res.status(404).json({
                message: "Categories not found"
            })
        }
        return res.status(200).json({
            message: "Category successfully updated",
            category
        })
    } catch (failure) {
        return res.status(500).json({
            message: "Error updating the category",
            error: failure.message
        })
    }
}

export const deleteCategory = async (req, res) => {
    try{
        const { uid } = req.params
        
        const category = await Category.findByIdAndUpdate(uid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Category eliminated",
            category
        })
    }catch(failure){
        return res.status(500).json({
            success: false,
            message: "Error deleting category",
            error: failure.message
        })
    }
}