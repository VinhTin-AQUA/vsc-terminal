import { Component } from '@angular/core';
import { TitleBar } from "../../components/title-bar/title-bar";
import { TabBar } from "../../components/tab-bar/tab-bar";
import { TermView } from "../../components/term-view/term-view";

@Component({
  selector: 'app-home',
  imports: [TitleBar, TabBar, TermView],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
