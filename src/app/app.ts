import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Settings } from "./pages/settings/settings";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Settings],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('vsc-terminal');
}
