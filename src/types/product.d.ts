export interface Variant {
 id: string;
 price: number;
 specialPrice?: number;
 inventoryQuantity?: number;
}
interface ProductTag {
 tags: any;
 tag: {
   id: string;
   title: string;
   slug: string;
   description: string;
 };
}


export interface Product {
 inStore: unknown;
 sameDay: unknown;
 tags?: ProductTag[];
 attributes: any;
 id: string;
 title: string;
 description?: string;
 thumbnail?: string;
 averageRating?: number;
 reviewsCount?: number;
 brand?: string;
 priceStart?: number;
 priceEnd?: number;
 variants?: {
   id?: string;
   price?: number;
   specialPrice?: number;
   currentPrice?: number;
 }[];
 productImages?: { id?: string; image?: string }[];
 categories?: string[];
 tags?: string[];
 productValuesForAttribute?: ProductValueForAttribute[];
}





