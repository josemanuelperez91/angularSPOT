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
        'Bearer BQDzjHtAwezyAc-mwPX_H-KN4mMxW1zOT6eTujaUx61VjEM9smj9d7YQyUTArwq8nCYjvKoxulOJbtLv224'
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