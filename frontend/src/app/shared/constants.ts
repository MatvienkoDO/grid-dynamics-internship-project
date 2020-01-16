import { NotifierOptions } from 'angular-notifier';

export const localStorageCartKey = 'CART_ITEMS';
export const localStorageFavouritesKey = 'FAVOURITES_ITEMS';
export const localStorageLocaleKey = 'LOCALE';

export const langs = ['en', 'ru', 'fr', 'gr'];

export const authFailedMessage = 'client_is_not_authorized';
export const signupInvalidForm = 'signup_invalid_form';
export const emailIsNotUnique = 'email_is_not_unique';
export const incorrectLoginPasswordPair = 'incorrect_login_password_pair';
export const invalidEmailPassword = 'Invalid email/password';

export const gridDynamicsOfficeAddress = {
  lat: 51.5349366,
  lon: 46.0100668,
  address: 'Grid Dynamics',
};

export const customNotifierOptions: NotifierOptions = {
 position: {
  horizontal: {
   position: 'right',
   distance: 12
  },
  vertical: {
   position: 'bottom',
   distance: 12,
   gap: 10
  }
 },
 theme: 'material',
 behaviour: {
  autoHide: 5000,
  onClick: 'hide',
  onMouseover: 'pauseAutoHide',
  showDismissButton: true,
  stacking: 4
 },
 animations: {
  enabled: true,
  show: {
   preset: 'slide',
   speed: 300,
   easing: 'ease'
  },
  hide: {
   preset: 'fade',
   speed: 300,
   easing: 'ease',
   offset: 50
  },
  shift: {
   speed: 300,
   easing: 'ease'
  },
  overlap: 150
 }
};
