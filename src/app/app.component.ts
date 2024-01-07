import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  form: FormGroup;
  
  constructor(private fb:FormBuilder){
    this.setScrollThreshold();
    this.form = this.fb.group({
      name: this.fb.control(null),
      email: this.fb.control(null),
      message: this.fb.control(null),
    });
  }
  ngOnInit(): void {
    this.buildForm();
  }
  title = 'skn-app';
  isScrolled: boolean = false;
  scrollThreshold: number = 1000; // Initial threshold value

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setScrollThreshold();
  }

  setScrollThreshold() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      this.scrollThreshold = 0;
    } else {
      this.scrollThreshold = 1000;
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > this.scrollThreshold) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }
  private buildForm(): void {
    this.form = this.fb.group({
      name: this.fb.control(null),
      email: this.fb.control(null),
      message: this.fb.control(null),
    });
  }

  send(): void {
    emailjs.init('RSCk66fud5dOs67u1')
    const { name, email, message } = this.form.value;
    console.log(emailjs.send("service_9aw2wvd","template_tual0si",{
      to_name: name,
      to_email:email,
      message: message
      }));
    alert(`Name: ${name}, Email: ${email}, Message: ${message} `);
    this.form.reset();
  }
} 

