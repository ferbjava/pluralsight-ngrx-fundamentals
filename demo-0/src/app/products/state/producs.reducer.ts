import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ProductsState extends EntityState<Product> {
  showProductCode: boolean;
  loading: boolean;
  errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialState: ProductsState = adapter.getInitialState({
  showProductCode: true,
  loading: false,
  errorMessage: '',
});

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),

  on(ProductsPageActions.loadProducts, (state) =>
    adapter.setAll([], {
      ...state,
      loading: true,
      errorMessage: '',
    }),
  ),

  on(ProductsApiActions.loadProductsSuccess, (state, { products }) =>
    adapter.setAll(products, {
      ...state,
      loading: false,
    }),
  ),

  on(ProductsApiActions.loadProductsFailure, (state, { message }) =>
    adapter.setAll([], {
      ...state,
      loading: false,
      errorMessage: message,
    }),
  ),

  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),

  on(ProductsApiActions.addProductSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      loading: false,
    }),
  ),

  on(ProductsApiActions.addProductFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),

  on(ProductsPageActions.updateProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),

  on(ProductsApiActions.updateProductSuccess, (state, { update }) =>
    adapter.updateOne(update, {
      ...state,
      loading: false,
    }),
  ),

  on(ProductsApiActions.updateProductFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),

  on(ProductsPageActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),

  on(ProductsApiActions.deleteProductSuccess, (state, { id }) =>
    adapter.removeOne(id, {
      ...state,
      loading: false,
    }),
  ),

  on(ProductsApiActions.deleteProductFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
);

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectAllProducts = selectAll;
export const selectProductEntities = selectEntities;