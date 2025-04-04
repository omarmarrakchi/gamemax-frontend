import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gamemax-frontend';

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateBodyClass();
      }
    });
  }
  
  updateBodyClass(): void {
    const body = document.body;
    if(this.router.url ==='/'){
      this.renderer.setAttribute(body, 'class', 'home page-template page-template-full-width page-template-full-width-php page page-id-14 theme-playerx playerx-core-2.0 woocommerce-no-js qodef-qi--no-touch qi-addons-for-elementor-1.5.4 playerx-ver-2.0 edgtf-smooth-page-transitions edgtf-smooth-page-transitions-fadeout edgtf-grid-1200 edgtf-wide-dropdown-menu-content-in-grid edgtf-sticky-header-on-scroll-down-up edgtf-dropdown-slide-from-bottom edgtf-header-divided edgtf-menu-area-in-grid-shadow-disable edgtf-menu-area-border-disable edgtf-menu-area-in-grid-border-disable edgtf-logo-area-border-disable edgtf-header-vertical-shadow-disable edgtf-header-vertical-border-disable edgtf-side-menu-slide-from-right edgtf-woocommerce-columns-3 edgtf-woo-normal-space edgtf-woo-pl-info-below-image edgtf-woo-single-thumb-on-left-side edgtf-woo-single-has-pretty-photo edgtf-default-mobile-header edgtf-sticky-up-mobile-header edgtf-fullscreen-search edgtf-search-fade elementor-default elementor-kit-12 elementor-page elementor-page-14');
    }
    else if (this.router.url === '/game-detail'){
      this.renderer.setAttribute(body, 'class', 'product-template-default single single-product postid-197 theme-playerx playerx-core-2.0 woocommerce woocommerce-page woocommerce-no-js qodef-qi--no-touch qi-addons-for-elementor-1.5.4 playerx-ver-2.0 edgtf-smooth-page-transitions edgtf-smooth-page-transitions-fadeout edgtf-grid-1200 edgtf-wide-dropdown-menu-content-in-grid edgtf-sticky-header-on-scroll-down-up edgtf-dropdown-slide-from-bottom edgtf-header-standard edgtf-menu-area-shadow-disable edgtf-menu-area-in-grid-shadow-disable edgtf-menu-area-border-disable edgtf-menu-area-in-grid-border-disable edgtf-logo-area-border-disable edgtf-header-vertical-shadow-disable edgtf-header-vertical-border-disable edgtf-side-menu-slide-from-right edgtf-woocommerce-page edgtf-woo-single-page edgtf-woocommerce-columns-4 edgtf-woo-normal-space edgtf-woo-pl-info-below-image edgtf-woo-single-thumb-on-left-side edgtf-woo-single-has-pretty-photo edgtf-default-mobile-header edgtf-sticky-up-mobile-header edgtf-fullscreen-search edgtf-search-fade elementor-default elementor-kit-12');
    }
    else if (this.router.url === '/login'){
      this.renderer.setAttribute(body, 'class', 'page-template-default page page-id-10 theme-playerx playerx-core-2.0 woocommerce-account woocommerce-page woocommerce-no-js qodef-qi--no-touch qi-addons-for-elementor-1.5.4 playerx-ver-2.0 edgtf-smooth-page-transitions edgtf-smooth-page-transitions-fadeout edgtf-grid-1200 edgtf-wide-dropdown-menu-content-in-grid edgtf-sticky-header-on-scroll-down-up edgtf-dropdown-slide-from-bottom edgtf-header-standard edgtf-menu-area-shadow-disable edgtf-menu-area-in-grid-shadow-disable edgtf-menu-area-border-disable edgtf-menu-area-in-grid-border-disable edgtf-logo-area-border-disable edgtf-header-vertical-shadow-disable edgtf-header-vertical-border-disable edgtf-side-menu-slide-from-right edgtf-woocommerce-page edgtf-woocommerce-columns-3 edgtf-woo-normal-space edgtf-woo-pl-info-below-image edgtf-woo-single-thumb-on-left-side edgtf-woo-single-has-pretty-photo edgtf-default-mobile-header edgtf-sticky-up-mobile-header edgtf-fullscreen-search edgtf-search-fade elementor-default elementor-kit-12');
    }
  }

  isHomePage(): boolean {
    return this.router.url === '/';
  }

  // updateBodyClass(): void {
  //   const body = document.body;
  //   const homeClass = 'home page-template page-template-full-width page-template-full-width-php page page-id-14 theme-playerx playerx-core-2.0 woocommerce-no-js qodef-qi--no-touch qi-addons-for-elementor-1.5.4 playerx-ver-2.0 edgtf-smooth-page-transitions edgtf-smooth-page-transitions-fadeout edgtf-grid-1200 edgtf-wide-dropdown-menu-content-in-grid edgtf-sticky-header-on-scroll-down-up edgtf-dropdown-slide-from-bottom edgtf-header-divided edgtf-menu-area-in-grid-shadow-disable edgtf-menu-area-border-disable edgtf-menu-area-in-grid-border-disable edgtf-logo-area-border-disable edgtf-header-vertical-shadow-disable edgtf-header-vertical-border-disable edgtf-side-menu-slide-from-right edgtf-woocommerce-columns-3 edgtf-woo-normal-space edgtf-woo-pl-info-below-image edgtf-woo-single-thumb-on-left-side edgtf-woo-single-has-pretty-photo edgtf-default-mobile-header edgtf-sticky-up-mobile-header edgtf-fullscreen-search edgtf-search-fade elementor-default elementor-kit-12 elementor-page elementor-page-14';
  //   const archiveClass = 'archive post-type-archive post-type-archive-product theme-playerx playerx-core-2.0 woocommerce-shop woocommerce woocommerce-page woocommerce-no-js qodef-qi--no-touch qi-addons-for-elementor-1.5.4 playerx-ver-2.0 edgtf-smooth-page-transitions edgtf-smooth-page-transitions-fadeout edgtf-grid-1200 edgtf-wide-dropdown-menu-content-in-grid edgtf-sticky-header-on-scroll-down-up edgtf-dropdown-slide-from-bottom edgtf-header-standard edgtf-menu-area-shadow-disable edgtf-menu-area-in-grid-shadow-disable edgtf-menu-area-border-disable edgtf-menu-area-in-grid-border-disable edgtf-logo-area-border-disable edgtf-header-vertical-shadow-disable edgtf-header-vertical-border-disable edgtf-side-menu-slide-from-right edgtf-woocommerce-page edgtf-woo-main-page edgtf-woocommerce-columns-3 edgtf-woo-normal-space edgtf-woo-pl-info-below-image edgtf-woo-single-thumb-on-left-side edgtf-woo-single-has-pretty-photo edgtf-default-mobile-header edgtf-sticky-up-mobile-header edgtf-fullscreen-search edgtf-search-fade elementor-default elementor-kit-12';

  //   if (this.isHomePage()) {
  //     this.renderer.setAttribute(body, 'class', homeClass);
  //   } else {
  //     this.renderer.setAttribute(body, 'class', archiveClass);
  //   }
  // }
}
