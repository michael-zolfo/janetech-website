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
  public copyInview: boolean = false;
  public connectInview: boolean = false;

  @ViewChild('header', {static: false}) header: ElementRef;
  @ViewChild('copyContainer', {static: false}) copyContainer: ElementRef;
  @ViewChild('connectContainer', {static: false}) connectContainer: ElementRef;

  private resizeObservable;
  private headerOffSetTop: number;
  private copyContainerOffSetTop: number;
  private connectContainerOffSetTop: number;

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
    this.headerOffSetTop = this.header.nativeElement.offsetTop;
    this.copyContainerOffSetTop = this.copyContainer.nativeElement.offsetTop;
    this.connectContainerOffSetTop = this.connectContainer.nativeElement.offsetTop;
  }

  // TODO create a fade in when in view component!
  private onWindowScrollEvent(pageYOffset: number): void {
    this.isSticky = true

    if (!this.copyInview) {
      this.copyInview = (pageYOffset - 100) > this.copyContainerOffSetTop;
    }

    if (!this.connectInview) {
      this.connectInview = (pageYOffset - 900) > this.connectContainerOffSetTop;
    }
  }

}