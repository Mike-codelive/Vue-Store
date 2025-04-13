export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  colors: string[] | string;
  company: string;
  description: string;
  category: string;
  shipping?: boolean;
  featured?: boolean;
}

export interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
  thumbnails?: {
    small: Thumbnail;
    large: Thumbnail;
    full: Thumbnail;
  };
}

export interface ProductDetails {
  id: string;
  stock: number;
  price: number;
  shipping: boolean;
  colors: string[];
  category: string;
  images: Image[];
  reviews: number;
  stars: number;
  name: string;
  description: string;
  company: string;
}
