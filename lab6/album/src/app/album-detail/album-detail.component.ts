import { Component,OnInit } from '@angular/core';
import {Album} from "../Album";
import {AlbumsService} from "../albums.service";
import {ActivatedRoute} from "@angular/router";

  @Component({
    selector: 'app-album-detail',
    templateUrl: './album-detail.component.html',
    styleUrls: ['./album-detail.component.css']
  })
  export class AlbumDetailComponent {
    album:Album;
    loaded:boolean;

    newTitle:string;

    constructor(private  route :ActivatedRoute,private  albumsService:AlbumsService) {
      this.album = {} as Album;
      this.loaded = true;
      this.newTitle ="";
    }

    ngOnInit():void{
        this.getAlbum()
  }

    getAlbum():void{
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      // this.post = POSTS.find((post) => post.id === id) as Post;
      this.loaded = false;
      this.albumsService.getAlbum(id).subscribe((album) => {
        this.album = album;
        this.loaded = true;
      });
    })
  }

     updateAlbum(){
       this.loaded = false;
        this.albumsService.updateAlbum(this.album.id,this.newTitle).subscribe((album)=>{
          this.album.title = this.newTitle;
          this.loaded = true;
          }

        )
     }
  }
