import { Component } from '@angular/core';
import { MainServiceService } from '../service/main-service.service';
import { Player } from 'src/DataType';
import { Router } from '@angular/router';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent {
  constructor(private main: MainServiceService, private router: Router) { };

  player1 = "";
  player2 = "";

  players: Player = {
    player1: '',
    player2: ''
  };

  savePlayers() {
    if(this.player1 == "" || this.player2 == ""){
      alert("Player names cannot be empty");
      return
    }
    this.players = {
      player1: this.player1,
      player2: this.player2
    };
    this.main.setPlayers(this.players);
    console.log("players saved");

    this.router.navigate(['/game']);
  }
}
