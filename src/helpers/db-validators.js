import Category from "../category/category.model.js"

export const categoryExists = async(uid = " ") =>{
    const existe = await Category.findById(uid);
    if(!existe){
        throw new Error("The category with the entered id does not exist");
    }
}