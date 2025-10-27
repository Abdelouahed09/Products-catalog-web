export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface ProductFilters {
  category: string;
  search: string;
  sortBy: "price-asc" | "price-desc" | "title-asc" | "title-desc";
}

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
}
