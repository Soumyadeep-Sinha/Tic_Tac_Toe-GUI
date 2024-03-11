import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/DataType';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  private DataKey = 'userData';

  constructor() { }

  setPlayers(players: Player){
      localStorage.setItem(this.DataKey, JSON.stringify(players));
      console.log('Players is set');
  }

  getPlayers(): any | null{
    const Data = localStorage.getItem(this.DataKey);
    return Data ? JSON.parse(Data) : null;
  }

  clearData() {
    localStorage.removeItem(this.DataKey);
    console.log('Data cleared');
  }

}
