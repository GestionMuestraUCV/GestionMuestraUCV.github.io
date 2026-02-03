import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-shared',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shared.component.html',
  styleUrl: './shared.component.css'
})
export class SharedComponent {

}
