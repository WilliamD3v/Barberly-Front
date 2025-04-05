export interface ProductProps {
  _id: string;
  barbearia_id: string;
  name: string;
  description: string;
  counter: number;
  price: number;
  image: {
    _id: string;
    name: string;
    cloudinary_id: string;
    url: string;
  }
}