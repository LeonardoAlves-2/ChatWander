import { Component } from '@angular/core';

@Component({
  selector: 'header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss'],
})
export class HeaderLayoutComponent {
  logoImagePath: string;

  constructor() {
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    this.logoImagePath = prefersDarkMode
      ? 'assets/images/logo-white.svg'
      : 'assets/images/logo-dark.svg';
  }
}
