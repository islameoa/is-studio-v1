import { Component, Inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
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
  userForm!: FormGroup;  

  constructor(@Inject(PLATFORM_ID) platformId: object,
  private formBuilder: FormBuilder,
  private globalService: GlobalService
  ) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  ngOnInit(){
    if(this.isBrowser()) {
      setInterval(() => { this.showSlides() }, 2000);
    }
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      pwd2: ['', [Validators.required, Validators.minLength(6)]]
    });
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

  onSubmit(){
    console.log(this.userForm?.value);
    if (this.userForm.valid) {
      this.globalService.registerUser(this.userForm!.value).subscribe({
        next: this.handleCorrectResponse.bind(this),
        error: this.handleError.bind(this)
     });
    } else {
      // Form is invalid, do something
    }
  }

  handleCorrectResponse(response: any) {
    // Handle successful response
    alert("Success!");
    // You can redirect the user, display a success message, or perform any other action
  }
  
  handleError(error: any) {
    // Handle error
    alert("Error!");
    // You can display an error message to the user or perform any other error handling logic
  }

  closeRegisterDialog(){
    this.globalService.registerComponent = false;    
  }
}