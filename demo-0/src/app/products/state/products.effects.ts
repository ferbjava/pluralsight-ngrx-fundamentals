import { Injectable } from '@angular/core';
import { ProductsService } from '../products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsApiActions, ProductsPageActions } from './products.actions';
import {
  catchError,
  concatMap,
  exhaustMap,
  map,
  mergeMap,
  of,
  tap,
} from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ProductsEffects {
  ngrxOnInitEffects() {
    return ProductsPageActions.loadProducts();
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.loadProducts),
      exhaustMap(() =>
        this.productsService.getAll().pipe(
          map((products) =>
            ProductsApiActions.loadProductsSuccess({ products }),
          ),
          catchError((error) =>
            of(ProductsApiActions.loadProductsFailure({ message: error })),
          ),
        ),
      ),
    ),
  );

  addProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.addProduct),
      mergeMap(({ product }) =>
        this.productsService.add(product).pipe(
          map((newProduct) =>
            ProductsApiActions.addProductSuccess({ product: newProduct }),
          ),
          catchError((error) =>
            of(ProductsApiActions.addProductFailure({ message: error })),
          ),
        ),
      ),
    ),
  );

  updateProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.updateProduct),
      concatMap(({ product }) =>
        this.productsService.update(product).pipe(
          map(() =>
            ProductsApiActions.updateProductSuccess({
              update: { id: product.id, changes: product },
            }),
          ),
          catchError((error) =>
            of(ProductsApiActions.updateProductFailure({ message: error })),
          ),
        ),
      ),
    ),
  );

  deleteProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsPageActions.deleteProduct),
      mergeMap(({ id }) =>
        this.productsService.delete(id).pipe(
          map(() => ProductsApiActions.deleteProductSuccess({ id })),
          catchError((error) =>
            of(ProductsApiActions.deleteProductFailure({ message: error })),
          ),
        ),
      ),
    ),
  );

  redirectToProductsPage = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          ProductsApiActions.addProductSuccess,
          ProductsApiActions.updateProductSuccess,
          ProductsApiActions.deleteProductSuccess,
        ),
        tap(() => this.router.navigate(['/products'])),
      ),
    { dispatch: false },
  );

  constructor(
    private actions$: Actions,
    private productsService: ProductsService,
    private router: Router,
  ) {}
}
