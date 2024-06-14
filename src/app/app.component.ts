import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { GlobalService } from './services/global.service';
import { LoginComponent } from './pages/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule, RegisterComponent, LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'is---studio';
  isBrowser = signal(false);
  menuToggleActive = false;
  showcaseActive = false;
  slideIndex = 0;
  slides = [
    { src: '../assets/images/IMG-0110.jpg' },
    { src: '../assets/images/IMG-0236.jpg' },
    { src: '../assets/images/IMG-0869.jpg' },
    { src: '../assets/images/IMG-1476.jpg' },
    { src: '../assets/images/IMG-1479.jpg' },
    { src: '../assets/images/IMG-9933.jpg' },
  ];

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    public globalService: GlobalService
  ) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit(){
    if(this.isBrowser()) {
      setInterval(() => { this.showSlides() }, 2000);
    }
  }

  toggleMenu() {
    this.menuToggleActive = !this.menuToggleActive;
    this.showcaseActive = !this.showcaseActive;
  }

  showSlides() {
    this.slideIndex++;
    if (this.slideIndex >= this.slides.length) {
      this.slideIndex = 0;
    }
  }

  showRegisterComponent(){
    this.globalService.registerComponent = true;
  }

  showLoginComponent(){
    this.globalService.loginComponent = true;
  }
}
