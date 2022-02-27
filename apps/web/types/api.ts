export interface Pagination {
  total: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
  from: number;
  to: number;
}

export interface PaginatedResponse<T> {
  page: T;
  pagination: Pagination;
}
