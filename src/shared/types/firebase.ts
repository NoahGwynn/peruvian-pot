export interface Rating {
  recipeId: string;
  value: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  recipeId: string;
  authorName: string;
  text: string;
  createdAt: Date;
}

export interface RatingAggregation {
  average: number;
  count: number;
}
