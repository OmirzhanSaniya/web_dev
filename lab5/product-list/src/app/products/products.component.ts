import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';

interface Product {
  images: string[];
  name: string;
  description: string;
  rating: number;
  price: string;
  kaspiLink: string;
  isFavorite: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [NgClass, NgForOf, CarouselModule],
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
    products: Product[] = [
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/h35/h8f/84378448232478.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h32/h70/84378448199710.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h3d/h8e/64208874405918.jpg?format=gallery-medium'
        ],
        name: 'Apple iPhone 13 128Gb',
        description: 'Apple iPhone 13 features a 6.1-inch Super Retina XDR display, which boasts incredibly high pixel density—photos, videos, and text look amazingly clear.',
        rating: 4.9,
        price:'266 970',
        kaspiLink: 'https://kaspi.kz/shop/p/apple-iphone-13-128gb-chernyi-102298404/?c=750000000',
        isFavorite: false
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/hdc/hf3/85428948664350.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h03/h20/85428948598814.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h25/h62/85428948795422.png?format=gallery-medium',
  ],
        name: 'Samsung Galaxy A55 5G 8Gb/128Gb',
        description: 'Samsung has unveiled a new mid-budget smartphone in the A-series – the Galaxy A55, and today it is the top model of the line, which has received significant improvements in both specifications and software, including a powerful processor with graphics from AMD.',
        rating: 4.8,
        price:'162 726',
  
        kaspiLink: 'https://kaspi.kz/shop/p/samsung-galaxy-a55-5g-8-gb-128-gb-temno-sinii-117420239/?c=750000000',
        isFavorite: false
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/pe4/p9a/5542339.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/p55/p9b/5542335.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/p78/p98/5542340.png?format=gallery-medium',
  
  ],
        name: 'Apple Watch SE GPS Gen.2 2024 S/M 40 мм',
        description: 'Three stylish colors. Powerful sensors for information about your health and activity. Innovative safety features.',
        rating: 4.9,
        price:'118 982',
        kaspiLink: 'https://kaspi.kz/shop/p/apple-watch-se-gps-gen-2-2024-s-m-40-mm-bezhevyi-129172890/?c=750000000',
        isFavorite: false
      },
      {
        images: [
  'https://resources.cdn-kaspi.kz/img/m/p/h39/hca/86274830139422.jpg?format=gallery-medium',
  'https://resources.cdn-kaspi.kz/img/m/p/h58/h61/86274830073886.jpg?format=gallery-medium',
  'https://resources.cdn-kaspi.kz/img/m/p/hb5/hb9/86274830204958.jpg?format=gallery-medium',
  ],
        name: 'ThundeRobot 911 X Wild Hunter G2 Pro 15.6" / 16 GB / SSD 512GB',
        description: 'Maximum processor frequency 4400.0 MHz Processor Intel Core i5-12450H Base processor frequency 2000.0 MHz Number of processor cores 8 cores L3 cache size 12 MB',
        rating: 4.7,
        price:'529 765',
        kaspiLink: 'https://kaspi.kz/shop/p/thunderobot-911-x-wild-hunter-g2-pro-15-6-16-gb-ssd-512-gb-win-11-pro--120386920/?c=750000000',
        isFavorite: false
      },
      {
        images: [
  'https://resources.cdn-kaspi.kz/img/m/p/p0f/pc2/17680137.jpg?format=gallery-medium',
  'https://resources.cdn-kaspi.kz/img/m/p/pf3/pc1/17680136.jpg?format=gallery-medium',
  'https://resources.cdn-kaspi.kz/img/m/p/p2b/pc2/17680138.jpg?format=gallery-medium',
        ],
        name: 'Marshall Major IV black',
        description: 'The MARSHALL Major IV Bluetooth headset, thanks to its features, will give you comfortable listening to music of various genres.',
        rating: 4.8,
        price:'34 646',
        kaspiLink: 'https://kaspi.kz/shop/p/marshall-major-iv-chernyi-102138144/?c=750000000',
        isFavorite: false
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/hc8/hd7/86369746386974.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h2a/hed/86369746354206.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h45/h86/86369746419742.png?format=gallery-medium',
        ],
        name: 'Apple iPad Air 2022 10.9 Wi-Fi 10.9  8GB/64GB',
        description: 'Stunning 10.9-inch Liquid Retina display. The innovative Apple M1 chip delivers faster performance, making iPad Air a powerful tool for creativity and mobile gaming.',
        rating: 4.6,
        price:'274 438',
        kaspiLink: 'https://kaspi.kz/shop/p/apple-ipad-air-2022-10-9-wi-fi-10-9-djuim-8-gb-64-gb-sinii-104235571/?c=750000000',
        isFavorite: false
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/h94/hee/65264766582814.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h43/h4e/65264766058526.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h34/h7b/65264767107102.jpg?format=gallery-medium',
        ],
        name: 'Hollyland Lark M1 Duo',
        description: 'Hollyland Lark M1 Duo Microphone Typecondenser Designlavalier (clip) Purposefor studio, for group recordings, for voice recorder, for vocals, universal. Connection typewireless. Frequency range20-20000 Hz',
        rating: 4.9,
        price:'43 228',
        kaspiLink: 'https://kaspi.kz/shop/p/hollyland-lark-m1-duo-107394818/?c=750000000',
        isFavorite: false
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/h9f/h2f/85887766233118.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/hdd/h5e/85887766167582.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h95/hf0/85887766298654.jpg?format=gallery-medium',
        ],
        name: 'Samsung UE55DU7100UXCE 140 cm black',
        description: 'The Samsung UE55DU7100UXCE LED TV with a 55-inch 4K UltraHD screen delivers high-quality images with realistic detail while watching TV channels and other multimedia content.',
        rating: 4.7,
        price:'259 295',
        kaspiLink: 'https://kaspi.kz/shop/p/samsung-ue55du7100uxce-140-sm-chernyi-118907988/?c=750000000',
        isFavorite: false
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/h5c/h7e/64124766388254.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h07/h48/64124763701278.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h22/h78/64124769206302.jpg?format=gallery-medium',
  
        ],
        name: 'Canon LIDE 400 2996C010 black',
        description: 'Scanner Canon LIDE 400 2996C010 black Additional information Interfaces USB 2.0 Color black Power consumption 4.5 W Power consumption 0.3 W',
        rating: 4.5,
        price:'54 324',
        kaspiLink: 'https://kaspi.kz/shop/p/canon-lide-400-2996c010-chernyi-101317689/?c=750000000',
        isFavorite: false
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/h58/hc8/87295489769502.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/hd4/h2c/87295489736734.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h04/ha7/87295489802270.png?format=gallery-medium',
        ],
        name: 'Apple iPhone 16 Pro Max 512Gb',
        description: 'The flagship iPhone 16 Pro Max has absorbed the best features of a modern gadget. This is the most productive device in the Apple iPhone line with a large display, amazing performance and incredible external ergonomics. The iPhone 16 Pro Max is a real titan in its family.',
        rating: 5,
        price:'806 016',
        kaspiLink: 'https://kaspi.kz/shop/p/apple-iphone-16-pro-max-512gb-chernyi-123890344/?c=750000000',
        isFavorite: false
      },
    ];

  showFavorites: boolean = false;

  get favorites(): Product[] {
    return this.products.filter(product => product.isFavorite);
  }

  toggleFavorite(product: any){
    product.isFavorite = !product.isFavorite;
    this.products = [...this.products]; 
  
  }
  isFavorite(product: Product): boolean {
    return product.isFavorite;
  }

  openKaspiLink(link: string) {
    window.open(link, '_blank');
  }

  shareViaWhatsApp(link: string) {
    window.open(`https://api.whatsapp.com/send?text=Buy on Kaspi.kz: ${encodeURIComponent(link)}`, '_blank');
  }

  shareViaTelegram(link: string) {
    window.open(`https://telegram.me/share/url?url=${encodeURIComponent(link)}&text=Buy on Kaspi.kz`, '_blank');
  }

  getStars(rating: number) {
    return Array(5).fill(0).map((_, i) => i < rating);
  }
}
