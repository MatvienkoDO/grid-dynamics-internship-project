import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CardProduct } from '../../models';
import { FavouritesService } from 'src/app/shared/services';

@Component({
  selector: 'app-favourite-button',
  templateUrl: './favourite-button.component.html',
  styleUrls: ['./favourite-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavouriteButtonComponent implements OnInit {

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(
    // private readonly cardProduct: CardProduct,
    // private readonly favouritesService: FavouritesService,
    ) {
      // const id = cardProduct.id;
      // const list = this.favouritesService.getListOfFavourites()
      // for (let i =0 ; i<list.length; i++){
      //   if (list[i].id === id){
      //     this.selected = true;
      //   }
      // }
     }
     
  ngOnInit() {
  }

  public toggleSelected() {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }

}
