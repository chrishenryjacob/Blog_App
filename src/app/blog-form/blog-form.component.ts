import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrls: ['./blog-form.component.scss']
})
export class BlogFormComponent implements OnInit {

  @Output() submitEvent = new EventEmitter<boolean>();

  blogContent !: string;
  fileList: NzUploadFile[] = [];

  constructor(private msg: NzMessageService) { }

  ngOnInit(): void {
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  onSubmit() {
    const blogData = localStorage.getItem('BlogDetails');
    let formData = blogData ? JSON.parse(blogData) : [];

    const result = {
      description: this.blogContent,
      img: this.fileList
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
  }
}
