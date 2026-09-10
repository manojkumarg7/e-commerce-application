export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
};

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Electronics",
    slug: "electronics",
    description: "Phones, laptops, audio, and smart devices.",
    imageUrl:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
  },
  {
    id: "cat-2",
    name: "Shoes",
    slug: "shoes",
    description: "Sneakers, running shoes, and everyday footwear.",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
  {
    id: "cat-3",
    name: "Fashion",
    slug: "fashion",
    description: "Apparel and accessories for every season.",
    imageUrl:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80",
  },
  {
    id: "cat-4",
    name: "Home",
    slug: "home",
    description: "Furniture and essentials for modern living.",
    imageUrl:
      "https://images.unsplash.com/photo-1484101403633-562f91b996bc?w=800&q=80",
  },
];
