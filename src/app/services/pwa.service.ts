import { Injectable } from '@angular/core';
import { Platform } from '@angular/cdk/platform';
import { take, timer } from 'rxjs';
import { PromptComponent } from '../prompt/prompt.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private bottomSheet: MatBottomSheet,
    private platform: Platform
  ) { }

  public initPwaPrompt() {
    //console.log("chosing");
    if (this.platform.ANDROID) {
      console.log('android');
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    /*
    if (this.platform.IOS) {
      console.log('ios');
      const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator['standalone']);
      if (!isInStandaloneMode) {
        this.openPromptComponent('ios');
      }
    }
    console.log('endchoose');*/
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {

    timer(2000)
      .pipe(take(1))
      .subscribe(() => this.bottomSheet.open(PromptComponent, { data: { mobileType, promptEvent: this.promptEvent } }));
  }
}
