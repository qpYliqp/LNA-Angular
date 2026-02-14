import {Component, input, model, output, signal} from '@angular/core';

@Component({
  selector: 'upload-image',
  imports: [],
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent {

  selectedFile = model<File | null>();
  preview = signal<string | ArrayBuffer | null>(null);
  isDragging = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.handleFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files?.[0];
    if (file && file.type.startsWith('image/')) {
      this.handleFile(file);
    }
  }

  private handleFile(file: File) {
    this.selectedFile.set(file);

    const reader = new FileReader();
    reader.onload = () => this.preview.set(reader.result);
    reader.readAsDataURL(file);
  }

  clearSelection() {
    this.selectedFile.set(null);
    this.preview.set(null);
  }
}
