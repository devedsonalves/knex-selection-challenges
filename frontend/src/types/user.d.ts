export interface UserType {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  dob: {
    age: number;
  };
  location: {
    city: string;
    state: string;
    country: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}