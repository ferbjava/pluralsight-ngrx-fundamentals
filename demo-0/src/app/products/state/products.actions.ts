import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Product } from '../product.model';

export const ProductsPageActions = createActionGroup({
  source: 'Products Page',
  events: {
    'Toggle Show Product Code': emptyProps(),
    'Load Products': emptyProps(),
    'Add Product': props<{ product: Product }>(),
    'Update Product': props<{ product: Product }>(),
    'Delete Product': props<{ id: number }>(),
  },
});

export const ProductsApiActions = createActionGroup({
  source: 'Products API',
  events: {
    'Load Products Success': props<{ products: Product[] }>(),
    'Load Products Failure': props<{ message: string }>(),
    'Add Product Success': props<{ product: Product }>(),
    'Add Product Failure': props<{ message: string }>(),
    'Update Product Success': props<{ product: Product }>(),
    'Update Product Failure': props<{ message: string }>(),
    'Delete Product Success': props<{ id: number }>(),
    'Delete Product Failure': props<{ message: string }>(),
  },
});
