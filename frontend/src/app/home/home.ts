import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { File } from '../file';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  fileName: string = '';
  file: File | null = null;

  files: Array<File> = [
    new File('example.txt', 1024, 'http://example.com/example.txt', new Date()),
    new File('image.png', 204800, 'http://example.com/image.png', new Date()),
  ];

  getfiles() {
    fetch('', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {
        this.files = data;
      })
      .catch((error) => {
        console.error('Error fetching files:', error);
      });
  }

  addFile() {
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: this.fileName, file: this.file }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.files.push(new File(this.fileName, this.file!.size, this.file!.url, this.file!.lastModified));
        this.fileName = '';
      })
      .catch((error) => {
        console.error('Error adding file:', error);
      });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }

  onDownload(file: File) {
    fetch(file.url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error('Error downloading file:', error);
      });
  }
}