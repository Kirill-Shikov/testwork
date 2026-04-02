export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

//загрузка api
export const fetchProducts = async (): Promise<ApiProduct[]> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  //преобразование данных
  const data = await response.json();
  return data.map((post: { id: number; title: string; body: string }) => ({
    id: post.id,
    title: post.title,
    description: post.body,
    price: Math.floor(Math.random() * 100) + 10,
    image: `https://picsum.photos/id/${post.id}/300/200`,
  }));
};