import { Component,EventEmitter, Input, NgZone, Output, computed, effect, inject, signal} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Storage, getDownloadURL, ref, uploadBytes} from '@angular/fire/storage';
import { getStorage} from "firebase/storage";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";



@Component({
  selector: 'app-image-control',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './image-control.component.html',
  styleUrl: './image-control.component.css'
})
export class ImageControlComponent {
  imageWidth = signal(0);
  @Input({ required: true }) set width(val: number) {
    this.imageWidth.set(val);
  }

  imageHeight = signal(0);
  @Input({ required: true }) set height(val: number) {
    this.imageHeight.set(val);
  }

  imagePath = signal('');
  @Input({ required: true }) set path(val: string) {
    this.imagePath.set(val);
  }

  placeholder = computed(
    () => `https://placehold.co/${this.imageWidth()}X${this.imageHeight()}`
  );

  croppedImageURL = signal<string | undefined>(undefined);

  imageSource = computed(() => {
    return this.croppedImageURL() ?? this.placeholder();
  });

  uploading = signal(false);

  dialog = inject(MatDialog);

  fileSelected(event: any) {
    const file = event.target?.files[0];
    this.uploadImage(file);
  }

  @Output() imageReady = new EventEmitter<string>();

  constructor() {
    effect(() => {
      if (this.croppedImageURL()) {
        this.imageReady.emit(this.croppedImageURL());
      }
    });
  }

  storage = getStorage();
  zone = inject(NgZone);

  async uploadImage(blob: Blob) {
    this.uploading.set(true);
    const storageRef = ref(this.storage, this.imagePath());
    const uploadTask = await uploadBytes(storageRef, blob);
    const downloadUrl = await getDownloadURL(uploadTask.ref);
    this.croppedImageURL.set(downloadUrl);
    this.uploading.set(false);
  }

}
