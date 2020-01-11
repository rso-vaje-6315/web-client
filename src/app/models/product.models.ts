import { BaseType } from "./base.model";

export class Category extends BaseType {
    public name: string;
    public parentCategory: Category;
}

export class Product extends BaseType {
    public code: string;
    public name: string;
    public description: string;
    public price: number;
    public visible: boolean;
    public imagePath: string;
    public category: Category;
}
