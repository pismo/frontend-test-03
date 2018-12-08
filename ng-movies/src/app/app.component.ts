import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Ng Movies';
  constructor(public translate: TranslateService) {
    translate.addLangs(['en-US', 'pt-BR']);
    translate.setDefaultLang('pt-BR');
  }
  
}
