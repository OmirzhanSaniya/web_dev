import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Album} from "./Album";
import {Photo} from "./Photo";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {
  BASE_URL="https://jsonplaceholder.typicode.com"

  constructor(private client:HttpClient) { }

  getAlbums():Observable<Album[]>{
    return this.client.get<Album[]>(`${this.BASE_URL}/albums`)
  }

  getAlbum(id: number): Observable<Album> {
    return this.client.get<Album>(`${this.BASE_URL}/albums/${id}`)
  }

  getAlbumPhotos(id:number):Observable<Photo[]>{
    return  this.client.get<Photo[]>( `${this.BASE_URL}/albums/${id}/photos`)
  }


  addAlbum(album : Album) : Observable<Album>{
    return  this.client.post<Album>(`${this.BASE_URL}/albums`,album)
  }

  deleteAlbum(id:number): Observable<Album>{
    return  this.client.delete<Album>(`${this.BASE_URL}/albums/${id}`)
  }

  updateAlbum(id:number,newTitle:string){
    return this.client.put<Album>(`${this.BASE_URL}/albums/${id}`,{id:id,title:newTitle})
  }

 // updateAlbum(id:number): Observable<Album>{
 //    return  this.client.put<Album>(`${this.BASE_URL}/albums/${id}`)
 //  }
}
