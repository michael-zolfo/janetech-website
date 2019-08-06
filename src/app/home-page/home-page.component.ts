import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnInit,
  OnDestroy, 
  AfterViewChecked} from '@angular/core';
import { HostListener } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { Subject } from 'rxjs/internal/Subject';

@Component({
    selector: 'app-home',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss']
  })

export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  
  public isSticky: boolean = false;
  public isAnimated: boolean = false; 

  @ViewChild('header', {static: false}) header: ElementRef;
  private navbarOffsetTop: number;
  private resizeObservable;

  private pageYOffsetSubject = new Subject<number>();

  constructor() {}

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event: Event|any) {
    this.pageYOffsetSubject.next(event.path[1].pageYOffset)
  }

  ngOnInit(): void {
    this.resizeObservable = this.pageYOffsetSubject
                                .asObservable()
                                .pipe(debounceTime(15))
                                .subscribe((e:number) => this.onWindowScrollEvent(e))
  }

  ngOnDestroy(): void {
    if (this.resizeObservable != null) {
      this.resizeObservable.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.navbarOffsetTop = this.header.nativeElement.offsetTop;
  }

  ngAfterViewChecked(): void {
    this.isAnimated = true;
  }

  private onWindowScrollEvent(pageYOffset: number): void {
    this.isSticky = pageYOffset > (this.navbarOffsetTop - 150)
  }

}