import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styles: []
})
export class ArtistaComponent {
  myArtista: any = {};

  loadingArtista: boolean;
  topTracks: any[] = [];

  constructor(private router: ActivatedRoute, private spotify: SpotifyService) {
    this.router.params.subscribe(params => {
      this.loadingArtista = true;

      this.spotify.getArtista(params['id']).subscribe(artista => {
        this.myArtista = artista;
        this.loadingArtista = false;
      });

      this.spotify.getTopTracks(params['id']).subscribe(topTracks => {
        console.log(topTracks);
        this.topTracks = topTracks;
      });
    });
  }
}
