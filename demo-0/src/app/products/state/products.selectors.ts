import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './producs.reducer';
import { sumProducts } from 'src/app/utils/sum-products';
import { getRouterSelectors } from '@ngrx/router-store';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
  selectProductsState,
  (productsState) => productsState.products,
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (productsState) => productsState.loading,
);

export const selectShowProductsCode = createSelector(
  selectProductsState,
  (productsState) => productsState.showProductCode,
);

export const selectProductsTotal = createSelector(selectProducts, sumProducts);

export const selectProductsErrorMessage = createSelector(
  selectProductsState,
  (productsState) => productsState.errorMessage,
);

export const { selectRouteParams } = getRouterSelectors();

export const selectProductsById =  createSelector(
    selectProducts,
    selectRouteParams,
    (products, { id }) =>
    products.find((product) => product.id === parseInt(id)),
  );
