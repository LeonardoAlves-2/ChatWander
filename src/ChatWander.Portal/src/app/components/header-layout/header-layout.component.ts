import { Component } from '@angular/core';

/** Component for the header layout. */
@Component({
  selector: 'header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss'],
})
export class HeaderLayoutComponent {
  /** The path to the logo image, determined based on the user's color scheme preference.*/
  logoImagePath: string;

  constructor() {
    /** Determines if the user's color scheme preference is dark mode. */
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    /** The path to the logo image is set based on the user's color scheme preference. */
    this.logoImagePath = prefersDarkMode
      ? 'assets/images/logo-white.svg'
      : 'assets/images/logo-dark.svg';
  }
}
