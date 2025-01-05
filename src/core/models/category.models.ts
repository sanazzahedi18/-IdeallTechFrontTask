export type CategoryType = "All" | "Open" | "Closed" | "Archived";

export interface CategoryChipsProps {
  selectedCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}