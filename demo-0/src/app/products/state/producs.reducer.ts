import { createReducer, on } from '@ngrx/store';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import { Product } from '../product.model';

export interface ProductsState {
  showProductCode: boolean;
  loading: boolean;
  products: Product[];
  errorMessage: string;
}

const initialState: ProductsState = {
  showProductCode: true,
  loading: false,
  products: [],
  errorMessage: '',
};

export const productsReducer = createReducer(
  initialState,
  on(ProductsPageActions.toggleShowProductCode, (state) => ({
    ...state,
    showProductCode: !state.showProductCode,
  })),

  on(ProductsPageActions.loadProducts, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductsApiActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),

  on(ProductsApiActions.loadProductsFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),

  on(ProductsPageActions.addProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: '',
  })),

  on(ProductsApiActions.addProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: [...state.products, product],
  })),

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

  on(ProductsApiActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    products: state.products.map((existingProduct) => 
      existingProduct.id === product.id ? product : existingProduct),
  })),

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

  on(ProductsApiActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    products: state.products.filter((existingProduct) =>
      existingProduct.id !== id),
  })),

  on(ProductsApiActions.deleteProductFailure, (state, { message }) => ({
    ...state,
    loading: false,
    errorMessage: message,
  })),
);
