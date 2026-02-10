import type { LocalizedString } from './i18n.ts';

export type Region = 'costa' | 'andes' | 'amazon';
export type Course = 'appetizers' | 'mains' | 'desserts' | 'drinks';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Ingredient {
  name: LocalizedString;
  amount: string;
  optional?: boolean;
}

export interface RecipeTip {
  title: LocalizedString;
  text: LocalizedString;
}

export interface Recipe {
  id: string;
  slug: string;
  title: LocalizedString;
  description: LocalizedString;
  region: Region;
  course: Course;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: Difficulty;
  ingredients: Ingredient[];
  instructions: LocalizedString[];
  tips?: RecipeTip[];
  tags: string[];
  featured?: boolean;
}

export interface RecipeFilters {
  region?: Region;
  course?: Course;
  search?: string;
}
