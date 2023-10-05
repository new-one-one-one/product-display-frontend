export interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  averageRating: number;
}

export interface IProductActions {
  onPurchaseClick: any;
}

export interface IProductCardProps {
  productDetails: IProduct;
  productActions?: IProductActions;
}

export enum SORT_OPTIONS {
  ASCENDING = "ascending",
  DESCENDING = "descending",
}
