import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  fileName: string = '';
  file: File | null = null;

  files: Array<File> = [];

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
        this.files.push(new File([this.file!], this.fileName));
        this.fileName = '';
      })
      .catch((error) => {
        console.error('Error adding file:', error);
      });
  }

  onFileChange(event: any) {
    this.file = event.target.files[0];
  }
}