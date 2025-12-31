
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[]; // Array of additional image URLs
  category: 'notebooks' | 'pens' | 'stickers' | 'planners' | 'greeting-cards' | 'accessories';
  subCategory?: string;
  isNew?: boolean;
  details?: string[]; // Specific product details/specs
  tags?: string[]; // For better searchability
}

// Using const object instead of enum for better runtime compatibility
export const GeneratorTone = {
  SASSY: 'Sassy',
  WITTY: 'Witty',
  SAVAGE: 'Savage',
  SWEET_BUT_SPICY: 'Sweet but Spicy',
  SWEET: 'Sweet',
  LOVE: 'Love'
} as const;

export type GeneratorTone = typeof GeneratorTone[keyof typeof GeneratorTone];

export interface GeneratedMessage {
  text: string;
  tone: GeneratorTone;
}
