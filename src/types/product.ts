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
