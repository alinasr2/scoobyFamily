import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor(private httpClient:HttpClient) { }

  getAllPets():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/Pets/getallpets`);
  }
  getCats():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/Pets/getcats`);
  }
  getDogs():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/Pets/getdogs`);
  }
  getTopCollection():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/Pets/get-top-collection`);
  }
  getTopCollectionCats():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/Pets/get-top-collection-cat`);
  }
  getTopCollectionDogs():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/Pets/get-top-collection-dog`);
  }
  getCatsForKids():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/Pets/filtercatsforkids`);
  }
  getDogsForKids():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/Pets/filterdogsforkids`);
  }
  getSuccessAdaped():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/Pets/successfullyAdaped`);
  }
  addToFavourite(petId:any):Observable<any>
  {
    return this.httpClient.patch(`https://scoobyfamily.onrender.com/scooby/api/fav/addfav?petId=${petId}`, {});
  }
  getFavPets():Observable<any>
  {
    return this.httpClient.get(`https://scoobyfamily.onrender.com/scooby/api/fav/getfavpet`);
  }
}
