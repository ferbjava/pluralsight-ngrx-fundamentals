import { Component } from '@angular/core';
import { Product } from '../product.model';
import { Store } from '@ngrx/store';
import { selectProductsById, selectProductsLoading } from '../state/products.selectors';
import { ProductsPageActions } from '../state/products.actions';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
})
export class ProductPageComponent {
  product$ = this.store.select(selectProductsById);
  loading$ = this.store.select(selectProductsLoading);

  constructor(
    private store: Store
  ) {}

  addProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.addProduct({ product }));
  }

  updateProduct(product: Product) {
    console.log('Updating product:', product);
    this.store.dispatch(ProductsPageActions.updateProduct({ product }));
  }

  deleteProduct(id: number) {
    this.store.dispatch(ProductsPageActions.deleteProduct({ id }));
  }
}
