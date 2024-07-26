export interface ApiDish {
  title: string;
  price: string;
  image: string;
}
export interface ApiDishes {
  [key: string]: ApiDish;
}