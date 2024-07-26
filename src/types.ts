export interface ApiDish {
  title: string;
  price: string;
  image: string;
}

export interface ApiDishes {
  [key: string]: ApiDish;
}

export interface Dish extends ApiDish {
  id: string;
}