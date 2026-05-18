import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import { selectProducts, selectProductsErrorMessage, selectProductsLoading, selectProductsTotal, selectShowProductsCode } from '../state/products.selectors';
import { ProductsStore } from '../products.store';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
  providers: [ProductsStore],
})
export class ProductsPageComponent {
  // products$ = this.store.select(selectProducts);
  products$ = this.productsStore.products$;
  total$ = this.store.select(selectProductsTotal);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectShowProductsCode);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(
    private store: Store,
    private productsStore: ProductsStore,
  ) {
    this.store.subscribe((state) => {
      console.log('State changed:', state);
    });
  }

  ngOnInit() {
    this.productsStore.getProducts();
  }

  toggleShowProductCode() {
    // this.showProductCode = !this.showProductCode;
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
