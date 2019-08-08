import {
  Component,
  ViewChild,
  AfterViewInit,
  ElementRef,
  OnInit,
  OnDestroy } from '@angular/core';
import { HostListener } from "@angular/core";
import { debounceTime } from "rxjs/operators";
import { Subject } from 'rxjs/internal/Subject';

@Component({
    selector: 'app-home',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    providers: [{ provide: Window, useValue: window }]
  })

export class HomePageComponent implements OnInit, OnDestroy, AfterViewInit {
  
  public isSticky: boolean = false;

  @ViewChild('header', {static: false}) header: ElementRef;
  private navbarOffsetTop: number;
  private resizeObservable;

  private pageYOffsetSubject = new Subject<number>();

  constructor(private window: Window) {}

  @HostListener("window:scroll", [])
  onWindowScroll() {
    this.pageYOffsetSubject.next(this.window.pageYOffset);
  }

  ngOnInit(): void {
    this.resizeObservable = this.pageYOffsetSubject
                                .asObservable()
                                .pipe(debounceTime(10))
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

  private onWindowScrollEvent(pageYOffset: number): void {
    if (!this.isSticky) {
      this.isSticky = (pageYOffset - 200) > this.navbarOffsetTop
    }
  }

}