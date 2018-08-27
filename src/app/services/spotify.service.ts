import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization:
        'Bearer BQCoiuJcZtWeU5qgF1EdyLHYv9UXtheoF4b3i_uz8cT1nmCuILEWCDVh2IFwSjcIe12XbdBRyc2Sdf5ZnhQ'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?offset=0&limit=20').pipe(
      map(data => data['albums'].items)
    );
  }

  getArtista(consulta: string) {
    return this.getQuery(`search?q=${consulta}&type=artist&limit=15`).pipe(
      map(data => data['artists'].items)
    );
  }
}
