import { Router } from "express";
import { addCategoryValidator, deleteCategoryValidator, editCategoriesValidator } from "../middlewares/category-validator.js";
import { addCategory, categoriesList, deleteCategory, editCategories } from "./category.controller.js";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API for managing categories
 */

/**
 * @swagger
 * /addCategory:
 *   post:
 *     summary: Add a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *                 example: Hotels
 *     responses:
 *       200:
 *         description: Category added successfully
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /categoriesList:
 *   get:
 *     summary: Get the list of categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Unique identifier of the category
 *                   name:
 *                     type: string
 *                     description: Name of the category
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /categories/{uid}:
 *   put:
 *     summary: Edit a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the category
 *                 example: Resorts
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Category not found
 */

/**
 * @swagger
 * /deleteCategories/{uid}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the category
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 */
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