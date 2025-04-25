import { Component,OnInit } from '@angular/core';
import {Photo} from "../Photo";
import {AlbumsService} from "../albums.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-album-photos',
  templateUrl: './album-photos.component.html',
  styleUrls: ['./album-photos.component.css']
})
export class AlbumPhotosComponent {
  photos: Photo[];
  loaded: boolean;
  width:number;

  height:number;


  albumsId:number;
  constructor(private albumsService: AlbumsService, private route: ActivatedRoute) {
    this.photos = [] as Photo[];
    this.loaded = true;
    this.width = 600;
    this.height= 600;
    this.albumsId=0;

  }

  ngOnInit(): void {
    this.getPhotos()

  }

  getPhotos() {
    console.log(this.route.paramMap)
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.albumsId = id;
      this.loaded = false;
      this.albumsService.getAlbumPhotos(id).subscribe((photos) => {
        this.photos = photos;
        this.loaded = true;
      });

    })
  }
}
