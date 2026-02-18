export type Brand = 'Nike' | 'Jordan' | 'Adidas' | 'New Balance' | 'Converse' | 'Vans' | 'Puma' | 'Reebok';

export type ShoeType = 'Low-top' | 'High-top' | 'Slip-on' | 'Boot' | 'Mid-top' | 'Sandal';

export type Theme =
  | 'Streetwear'
  | 'Floral'
  | 'Vintage'
  | 'Anime'
  | 'Abstract'
  | 'Minimalist'
  | 'Graffiti'
  | 'Tamil Culture'
  | 'Nature'
  | 'Retro';

export interface Shoe {
  id: string;
  name: string;
  brand: Brand;
  type: ShoeType;
  themes: Theme[];
  imageUrl: string;
  aspectRatio: 'tall' | 'wide' | 'square'; // drives masonry height variation
  tags: string[];
  featured: boolean;
}

export interface FilterState {
  brands: Brand[];
  types: ShoeType[];
  themes: Theme[];
}
