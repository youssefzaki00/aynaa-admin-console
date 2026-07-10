export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  pages?: number;
}

export interface PaginatedData<T> {
  items: T[];
  pagination?: Pagination;
}

export interface ApiListResponse<T> {
  success?: boolean;
  message?: string;
  data: PaginatedData<T>;
}

export interface ApiItemResponse<T> {
  success: boolean;
  message: string;
  data: { item: T };
}

/** Reads list rows from `{ data: { items } }` API responses. */
export function getItemsFromListResponse<T>(
  response: { data?: { items?: T[] } } | undefined,
): T[] {
  return response?.data?.items ?? [];
}

/** Reads a single entity from `{ data: { item } }` API responses. */
export function getItemFromResponse<T>(
  response: { data?: { item?: T } } | undefined,
): T | undefined {
  return response?.data?.item;
}
