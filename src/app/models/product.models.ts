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

export class AverageRating {
    public productId: string;
    public averageRatingNumber: number;
}

export class Rating extends BaseType {
    public productId: string;
    public ratingNumber: number;
    public comment: string;
}

export class ProductDetails extends Product {
    public averageRatingNumber?: number;
    public ratings?: Rating[];
}

export class ProductStock {
    public productId: string;
    public quantity: number;
}
