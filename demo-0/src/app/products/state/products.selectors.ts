import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./producs.reducer";
import { sumProducts } from "src/app/utils/sum-products";

export const selectProductsState = createFeatureSelector<ProductsState>('products');

export const selectProducts = createSelector(
    selectProductsState,
    (productsState) => productsState.products
);

export const selectProductsLoading = createSelector(
    selectProductsState,
    (productsState) => productsState.loading
);

export const selectShowProductsCode = createSelector(
    selectProductsState,
    (productsState) => productsState.showProductCode
);

export const selectProductsTotal = createSelector(
    selectProducts,
    sumProducts
);

export const selectProductsErrorMessage = createSelector(
    selectProductsState,
    (productsState) => productsState.errorMessage
);