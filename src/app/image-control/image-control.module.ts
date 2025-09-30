import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component,EventEmitter, Input, NgZone, Output, computed, effect, inject, signal} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs/operators';
import {
  Storage,
  getDownloadURL,
  ref,
  uploadBytes,
} from '@angular/fire/storage';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]
})
export class ImageControlModule { }
