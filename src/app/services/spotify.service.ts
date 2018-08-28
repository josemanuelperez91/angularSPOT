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
        'Bearer BQC-RBdFDDibjAQakg6vTv7MpFe33drp44_xmQYQAxhNr1d9ajsu3594CLY4NRcgDuFUvhq8O7u1CgzSZzA'
    });

    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?offset=0&limit=20').pipe(
      map(data => data['albums'].items)
    );
  }

  getArtistas(consulta: string) {
    return this.getQuery(`search?q=${consulta}&type=artist&limit=15`).pipe(
      map(data => data['artists'].items)
    );
  }
  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map(data => data['tracks'])
    );
  }
}
