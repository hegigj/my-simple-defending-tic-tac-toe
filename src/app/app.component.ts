import {Component, OnInit} from '@angular/core';
import {BusinessLogicService} from './business-logic.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  boxes: number;
  winLabel: string;
  signs: string[];

  userIndexes: number[];
  pcIndexes: number[];

  constructor(private bl: BusinessLogicService) {
    this.boxes = 0;
    this.winLabel = '';
    this.signs = [];
    for (let i = 0; i < 9; i++) {
      this.signs.push('blur_on');
    }
    this.userIndexes = [];
    this.pcIndexes = [];
  }

  ngOnInit() {
  }

  userMove(index) {
    // user move
    this.boxes++;
    this.signs[index] = 'close';
    this.userIndexes.push(index);
    if (this.bl.didSomeOneWin(this.userIndexes.sort())) {
      this.restart();
    }
    // pc move
    this.pcMove(index);
    if (this.bl.didSomeOneWin(this.pcIndexes.sort())) {
      this.restart();
    }
    // no moves reset game
    this.winLabel = this.userIndexes.length === 1 ? '' : this.winLabel;
    this.reset();
  }

  private restart() {
    this.winLabel = this.bl.didSomeOneWin(this.userIndexes.sort()) ? 'you win' : 'pc win';
    for (let i = 0; i < 9; i++) {
      this.signs[i] = 'blur_on';
    }
    this.pcIndexes = [];
    this.userIndexes = [];
  }

  private reset() {
    if (this.boxes >= 9) {
      for (let i = 0; i < 9; i++) {
        this.signs[i] = 'blur_on';
      }
      this.pcIndexes = [];
      this.userIndexes = [];
      setTimeout(() => this.boxes = 0, 1000);
    }
  }

  private pcMove(index) {
    const i = this.bl.pcSecondMove(index, this.pcIndexes, this.userIndexes);
    this.signs[i] = 'adjust';
    this.pcIndexes.push(i);
    this.boxes++;
  }
}
