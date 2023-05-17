interface IProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  categories: Array<string>;
  imageLink: string;
  stock: number;
  seller: string;
}

export default IProduct;
