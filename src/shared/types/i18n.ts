export type Language = 'en' | 'es' | 'qu';

export type LocalizedString = {
  en: string;
  es: string;
  qu: string;
};

export interface UITranslations {
  // Brand
  site_name: string;

  // Navigation
  nav_home: string;
  nav_menu: string;
  nav_favorites: string;

  // Regions
  region_costa: string;
  region_andes: string;
  region_amazon: string;
  region_all: string;

  // Courses
  course_appetizers: string;
  course_mains: string;
  course_desserts: string;
  course_drinks: string;
  course_all: string;

  // Region page
  region_costa_desc: string;
  region_andes_desc: string;
  region_amazon_desc: string;
  region_page_view_all: string;
  region_ingredients_title: string;
  region_culture_title: string;
  region_recipes_title: string;

  // Home page
  home_hero_title: string;
  home_hero_subtitle: string;
  home_hero_cta: string;
  home_featured_title: string;
  home_regions_title: string;
  home_regions_subtitle: string;
  home_region_recipes: string;

  // Menu page
  menu_title: string;
  menu_subtitle: string;
  menu_filter_region: string;
  menu_filter_course: string;
  menu_no_results: string;
  menu_search_placeholder: string;

  // Recipe page
  recipe_prep_time: string;
  recipe_cook_time: string;
  recipe_servings: string;
  recipe_difficulty: string;
  recipe_ingredients: string;
  recipe_instructions: string;
  recipe_step: string;
  recipe_not_found: string;
  recipe_back_to_menu: string;
  recipe_related: string;

  // Difficulty levels
  difficulty_easy: string;
  difficulty_medium: string;
  difficulty_hard: string;

  // Ratings
  rating_title: string;
  rating_average: string;
  rating_count: string;
  rating_submit: string;
  rating_thanks: string;

  // Comments
  comments_title: string;
  comments_name: string;
  comments_text: string;
  comments_submit: string;
  comments_empty: string;
  comments_loading: string;

  // Favorites
  favorites_title: string;
  favorites_empty: string;
  favorites_browse: string;

  // Share
  share_title: string;
  share_copy_link: string;
  share_copied: string;
  share_whatsapp: string;
  share_facebook: string;
  share_pinterest: string;
  share_twitter: string;

  // Blog
  nav_blog: string;
  blog_title: string;
  blog_subtitle: string;
  blog_read_more: string;
  blog_back: string;
  blog_min_read: string;

  // Newsletter
  newsletter_title: string;
  newsletter_subtitle: string;
  newsletter_placeholder: string;
  newsletter_submit: string;
  newsletter_success: string;
  newsletter_error: string;

  // 404
  not_found_title: string;
  not_found_message: string;

  // General
  loading: string;
  error: string;
  optional: string;

  // Footer
  footer_tagline: string;
  footer_copyright: string;

  // Language names
  lang_en: string;
  lang_es: string;
  lang_qu: string;
}
