import { Component,OnInit } from '@angular/core';
import {Album} from "../Album";
import {AlbumsService} from "../albums.service";
import {toNumbers} from "@angular/compiler-cli/src/version_helpers";

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent {
  albums:Album[];
  loaded:boolean;

  newAlbum:Album;

  constructor(private albumsService:AlbumsService) {
    this.albums=[];
    this.loaded=true;
    this.newAlbum = {} as Album;
  }

  ngOnInit():void{
  this.getAlbums()
  }

  getAlbums(){
    this.loaded = false;
    this.albumsService.getAlbums().subscribe((albums)=>{
      this.albums = albums;
      this.loaded  = true;
    })
  }

  addAlbum(){
    this.loaded = false;
    this.albumsService.addAlbum(this.newAlbum).subscribe((album) => {
      // this.posts.push(post);
      this.albums.unshift(album);
      this.loaded = true;
      this.newAlbum = {} as Album;
    });
  }
  deleteAlbum(id: number){
    this.loaded = false;
    this.albumsService.deleteAlbum(id).subscribe((album)=>{
      this.albums = this.albums.filter((item) => item.id !== id);
      this.loaded = true;


      }
    )
  }
}
