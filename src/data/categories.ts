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
    description: "Laptops, audio, wearables, and smart gadgets.",
    imageUrl:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80",
  },
  {
    id: "cat-2",
    name: "Mobiles",
    slug: "mobiles",
    description: "Smartphones and mobile accessories.",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
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
    name: "Footwear",
    slug: "shoes",
    description: "Sneakers, running shoes, and everyday footwear.",
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  },
  {
    id: "cat-5",
    name: "Home & Kitchen",
    slug: "home",
    description: "Furniture, decor, and home essentials.",
    imageUrl:
      "https://images.unsplash.com/photo-1484101403633-562f91b996bc?w=800&q=80",
  },
  {
    id: "cat-6",
    name: "Appliances",
    slug: "appliances",
    description: "Kitchen and home appliances for daily use.",
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
  },
  {
    id: "cat-7",
    name: "Beauty",
    slug: "beauty",
    description: "Skincare, grooming, and personal care.",
    imageUrl:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
  },
  {
    id: "cat-8",
    name: "Sports",
    slug: "sports",
    description: "Fitness gear and outdoor sports equipment.",
    imageUrl:
      "https://images.unsplash.com/photo-1461896836934-ffe607ba6851?w=800&q=80",
  },
];
