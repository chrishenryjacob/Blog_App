import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { IBlog } from '../shared/models/blog.model';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {

  @Output() submitEvent = new EventEmitter<boolean>();

  blogContent !: string;
  fileList: NzUploadFile[] = [];
  attachment!: NzUploadFile;
  fileAttached: string = '';

  constructor(private msg: NzMessageService) { }

  ngOnInit(): void {
  }

  beforeUpload = (file: NzUploadFile) => {
    const reader = new FileReader();
    reader.readAsBinaryString(file as unknown as File);
    reader.onloadend = () => {
      this.fileList = [];
      this.fileList = this.fileList.concat(file);
      this.attachment = this.fileList[0];
      this.getBase64(this.attachment as unknown as File, (img: string) => {
        const base64 = img.split(',')[1];
        this.fileAttached = base64;
      });
    };
    return false;
  };

  getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result?.toString() as string));
    reader.readAsDataURL(img);
  }

  onSubmit() {
    const blogData = localStorage.getItem('BlogDetails');
    let formData = blogData ? JSON.parse(blogData) : [];

    const imgData = new FormData();
    this.fileList.forEach((file: any) => {
      imgData.append('files[]', file);
    });

    const result: IBlog = {
      id: formData.length + 1,
      parentId: null,
      author: 'chris',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: this.blogContent,
      likes: 0,
      img: this.fileAttached ? 'data:image/png;base64,' + this.fileAttached : '',
      children: []
    }

    formData.push(result);
    localStorage.setItem('BlogDetails', JSON.stringify(formData));

    this.msg.create('success', 'New blog post added');

    this.submitEvent.emit(true);
    this.resetForm();
  }

  resetForm() {
    this.blogContent = '';
    this.fileList = [];
    this.fileAttached = '';
  }
}
