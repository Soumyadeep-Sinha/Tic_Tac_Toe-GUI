import { Component, OnInit } from '@angular/core';
import { PlayersComponent } from '../players/players.component';
import { MainServiceService } from '../service/main-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  Players: any = {};
  player1: string = "";
  player2: string = "";
  board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  currentPlayer: number = 1; 
  winner: string | null = null;

  player1Score:number = 0;
  player2Score:number = 0;

  winners: string[] = [];


  constructor(private main: MainServiceService, private router:Router) { }

  ngOnInit(): void {

    this.Players = this.main.getPlayers();

    if (this.Players) {
      this.player1 = this.Players.player1;
      this.player2 = this.Players.player2;
    } else {
      console.log('NO SAVED DATA FOUND');
    }
  }

  chance : string = "Start the game."

  handleButtonClick(index: number): void {
    

    if (this.board[index] === 0 && !this.winner) {
      this.board[index] = this.currentPlayer;
      this.checkWinner();

      // switch
      if(this.currentPlayer === 1){
        this.currentPlayer = 2;
        this.chance = this.player2 + "'s chance."
      }else{
        this.currentPlayer = 1;
        this.chance = this.player1 + "'s chance."
      }
    }
  }

  getCellValue(cell: number): string {
    return cell === 1 ? '❌' : cell === 2 ? '⭕' : '';
  }

  checkWinner(): void {
    const winningConditions: number[][] = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
  
    for (const condition of winningConditions) {
      const [a, b, c] = condition;
      if (this.board[a] !== 0 && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        if(this.currentPlayer === 1){
          this.winner = this.player1 + " wins";
          this.player1Score += 10;
          this.winners.push(this.player1);
        }else{
          this.winner = this.player2 + " wins";
          this.player2Score += 10;
          this.winners.push(this.player2);
        }
        return;
      }
    }
  
    //tie
    if (!this.board.includes(0)) {
      this.winner = "Tie";
      this.player1Score += 5;
      this.player2Score += 5;
      this.winners.push("GAME DRAW");
    }
  }


  resetGame(): void {
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.winner = null;
    this.currentPlayer = 1;
    this.chance = "Start the game.";
  }

  quitGame():void {
    this.main.clearData();
    this.router.navigate(['/player']);
  }

}
