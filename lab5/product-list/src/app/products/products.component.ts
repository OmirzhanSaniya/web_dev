import { Component } from '@angular/core';
import { NgClass, NgForOf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

interface Product {
  images: string[];
  name: string;
  description: string;
  rating: number;
  price: string;
  kaspiLink: string;
  isFavorite: boolean;
  category: string;
  // likeCount: number;
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  imports: [NgClass, NgForOf],
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
    categories = ['All', 'Liked', 'Phones', 'Laptops', 'Headphones', 'TVs', 'Others'];
    selectedCategory: string = 'All';
    showFavorites: boolean = false;

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
        isFavorite: false,
        category: 'Phones'
        // likeCount: 0 
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
        isFavorite: false,
        category: 'Phones',
        // likeCount: 0
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
        isFavorite: false,
        category: 'Others',
        // likeCount: 0

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
        isFavorite: false,
        category: 'Laptops',
        // likeCount: 0
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
        isFavorite: false,
        category: 'Headphones',
        // likeCount: 0
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
        isFavorite: false,
        category: 'Others',
        // likeCount: 0
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
        isFavorite: false,
        category: 'Others',
        // likeCount: 0
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
        isFavorite: false,
        category: 'TVs',
        // likeCount: 0
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
        isFavorite: false,
        category: 'Others',
        // likeCount: 0
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
        isFavorite: false,
        category: 'Phones',
        // likeCount: 0
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/haa/h49/84963524771870.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/hd1/h74/84963524706334.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/hf3/h6d/84963582541854.png?format=gallery-medium',
        ],
        name: 'Samsung Galaxy S24 Ultra 5G 12 ГБ/512Gb',
        description: 'With the most megapixels ever in a smartphone and AI, Galaxy S24 Ultra sets the industry standard for photo quality every time you press the shutter. What’s more, the new ProVisual engine recognizes objects to improve color tone, reduce noise, and enhance details.',
        rating: 5,
        price:'557 535',
        kaspiLink: 'https://kaspi.kz/shop/p/samsung-galaxy-s24-ultra-5g-12-gb-512-gb-chernyi-116044201/?c=750000000',
        isFavorite: false,
        category: 'Phones',
        // likeCount: 0
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/h86/h70/64509325803550.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/hf4/h52/64509322919966.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h45/hb7/64509328457758.jpg?format=gallery-medium',
        ],
        name: 'Apple MacBook Air 13 2022 13.6"/8 Гб/SSD 256 Гб/macOS',
        description: 'The 2022 MacBook Air is one of the biggest updates to the lineup ever, with a completely new look, a newer and more powerful M2 processor, an improved webcam, quad surround speakers, a MagSafe 3 port, and a newer keyboard, all while weighing just 1,240 grams and still featuring the same premium aluminum chassis.',
        rating: 4.9,
        price:'495 321',
        kaspiLink: 'https://kaspi.kz/shop/p/apple-macbook-air-13-2022-13-6-8-gb-ssd-256-gb-macos-mlxw3-105933794/?c=750000000',
        isFavorite: false,
        category: 'Laptops',
        // likeCount: 0
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/h5d/h65/64373055684638.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h89/haa/64373052571678.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h06/h47/64373056897054.jpg?format=gallery-medium',
        ],
        name: 'Lenovo IdeaPad 3 15.6" / 4 Гб / SSD 256 Гб / Без ОС / 15IGL05',
        description: 'The IdeaPad 3 costs as much as a regular everyday laptop, but it is more than that. With an Intel Celeron processor, 4GB of RAM, and an SSD, it is sure to exceed your expectations. And as a bonus, it comes with a numeric keypad that will keep you well-equipped for spreadsheets or budgeting.',
        rating: 4,
        price:'171 917',
        kaspiLink: 'https://kaspi.kz/shop/p/samsung-galaxy-s24-ultra-5g-12-gb-512-gb-chernyi-116044201/?c=750000000',
        isFavorite: false,
        category: 'Laptops',
        // likeCount: 0
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/h8f/h39/84558388953118.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h0d/hc8/84558388887582.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/hf4/h3e/84558389018654.jpg?format=gallery-medium',
        ],
        name: 'Acer Aspire 3 15.6" / 8 Гб / SSD 256 Гб / Win 11 / A315-35',
        description: 'Play videos quickly and smoothly, surf the web, or get work done with an Intel® processor and graphics card. This combination and memory ensure faster application loading, better graphics, and seamless multitasking.',
        rating: 4.5,
        price:'222 668',
        kaspiLink: 'https://kaspi.kz/shop/p/acer-aspire-3-15-6-8-gb-ssd-256-gb-win-11-a315-35-nx-a9aex-00h-114792265/?c=750000000',
        isFavorite: false,
        category: 'Laptops',
        // likeCount: 0
      },
      {
        images: [
        'https://resources.cdn-kaspi.kz/img/m/p/he8/h47/64362670358558.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h31/hd7/64362668556318.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h30/ha4/64362737860638.jpg?format=gallery-medium',
        ],
        name: 'Apple AirPods 3 with Lightning Charging Case белый',
        description: 'The Apple-designed dynamic driver uses a custom amplifier to deliver incredible detail. You will hear everything from deep, rich bass to crystal-clear highs.',
        rating: 4.8,
        price:'67 208',
        kaspiLink: 'https://kaspi.kz/shop/p/apple-airpods-3-with-lightning-charging-case-belyi-106667987/?c=750000000',
        isFavorite: false,
        category: 'Headphones',
        // likeCount: 0
      },
      {
        images: [
        'https://resources.cdn-kaspi.kz/img/m/p/h7a/hf4/85254956613662.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/h89/h0f/85254956482590.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/hea/h17/85254956875806.jpg?format=gallery-medium',
        ],
        name: 'Huawei Free Clip фиолетовый',
        description: 'The TWS HUAWEI FreeClip earphones with clip-on mount are convenient for sports and an active lifestyle. The True Wireless Stereo design with Bluetooth connection eliminates unnecessary wires. The built-in noise-canceling microphone allows you to use the earphones as a headset for phone calls. The model lasts up to 8 hours of active work or 36 hours when charging from the case.',
        rating: 4.4,
        price:'74 071',
        kaspiLink: 'https://kaspi.kz/shop/p/huawei-free-clip-fioletovyi-116760058/?c=750000000',
        isFavorite: false,
        category: 'Headphones',
        // likeCount: 0
      },
      {
        images: [
        'https://resources.cdn-kaspi.kz/img/m/p/h94/hf8/63881967697950.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/hda/h35/63881966288926.jpg?format=gallery-medium',
        'https://resources.cdn-kaspi.kz/img/m/p/hbb/h9e/63881970417694.jpg?format=gallery-medium',
        ],
        name: 'Logitech G Pro X black',
        description: 'The Logitech G PRO X wired headset is a powerful gaming model with a stylish black case and a steel adjustable headband. Soft headphones with closed acoustics have a memory effect and are complemented by breathable velour pads.',
        rating: 4.0,
        price:'57 552',
        kaspiLink: 'https://kaspi.kz/shop/p/logitech-g-pro-x-chernyi-100383545/?c=750000000',
        isFavorite: false,
        category: 'Headphones',
        // likeCount: 0
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/h00/hf2/86215715848222.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h00/hf2/86215715848222.jpg?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h00/hf2/86215715848222.jpg?format=gallery-medium',
        ],
        name: 'Xiaomi A 2025 L50MA-ARU 127 см black',
        description: 'Ultra-high definition 4K picture With our 3840 x 2160 display, where every detail counts, you will enjoy extraordinary picture clarity. Enjoy the beauty that lies in the smallest details.',
        rating: 4.7,
        price:'159 990',
        kaspiLink: 'https://kaspi.kz/shop/p/xiaomi-a-2025-l50ma-aru-127-sm-chernyi-120147296/?c=750000000',
        isFavorite: false,
        category: 'TVs',
        // likeCount: 0
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/hd3/hb7/86373095997470.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h54/h0b/86373095964702.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/h62/h3d/86373096063006.png?format=gallery-medium',
        ],
        name: 'Qwatt Q55YK-MB 140 cm black',
        description: 'Smart TV with smart voice assistant Alice. Ability to control your smart home via TV. All entertainment on one screen (watch movies, TV series from KinoPoisk, tracks and podcasts from Yandex. Music, YouTube, children is profile). Ecosystem - Yandex Smart Home.',
        rating: 4.5,
        price:'184 988',
        kaspiLink: 'https://kaspi.kz/shop/p/qwatt-q55yk-mb-140-sm-chernyi-103717670/?c=750000000',
        isFavorite: false,
        category: 'TVs',
        // likeCount: 0
      },
      {
        images: [
          'https://resources.cdn-kaspi.kz/img/m/p/p14/pd9/12145151.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/pff/pd5/12145144.png?format=gallery-medium',
          'https://resources.cdn-kaspi.kz/img/m/p/pf8/pd8/12145150.png?format=gallery-medium',
        ],
        name: 'ARG LD65D7500 165 cm black',
        description: 'Sound power 8.0 W Subwoofer No Wi-Fi Yes InputsAV, HDMI, Ethernet (RJ-45), USB, antenna, Bluetooth Audio outputs',
        rating: 4.7,
        price:'199 990',
        kaspiLink: 'https://kaspi.kz/shop/p/arg-ld65d7500-165-sm-chernyi-131021112/?c=750000000',
        isFavorite: false,
        category: 'TVs',
        // likeCount: 0
      },
    ];
    
    constructor(private cdr: ChangeDetectorRef) {}
    get filteredProducts(): Product[] {
      let filtered = this.products;
      if (this.selectedCategory === 'Liked') {
        return this.products.filter(product => product.isFavorite); // Показываем только избранное
      }
      if (this.selectedCategory !== 'All' && this.selectedCategory !== 'all') {
        filtered = filtered.filter(product => product.category === this.selectedCategory);
      }
      return filtered;
    }
    trackByProduct(index: number, product: Product) {
      return product.name; 
    }
    toggleFavorite(product: Product) {
      product.isFavorite = !product.isFavorite;
      this.cdr.markForCheck(); 
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
    filterByCategory(event: Event) {
      const target = event.target as HTMLSelectElement;
      this.selectedCategory = target.value;
    }    
    toggleShowFavorites() {
      this.showFavorites = !this.showFavorites;
    }
    // likeProduct(product: any) {
    //   product.likeCount += 1;
    // }    
    removeProduct(product: any) {
      this.products = this.products.filter(p => p !== product);
    }
    
}
