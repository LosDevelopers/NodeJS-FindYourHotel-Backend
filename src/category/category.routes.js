import { Router } from "express";
import { addCategoryValidator, deleteCategoryValidator, editCategoriesValidator } from "../middlewares/category-validator.js";
import { addCategory, categoriesList, deleteCategory, editCategories } from "./category.controller.js";

const router = Router();

router.post(
    "/addCategory",
    addCategoryValidator,
    addCategory
);

router.get(
    "/categoriesList", 
    categoriesList,
);

router.put(
    "/categories/:uid", 
    editCategoriesValidator,
    editCategories
);

router.delete(
    "/deleteCategories/:uid", 
    deleteCategoryValidator, 
    deleteCategory
);

export default router;