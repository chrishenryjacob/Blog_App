import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { IBlog } from '../blog-list/blog.model';

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

    const result: IBlog = {
      id: formData.length + 1,
      parentId: null,
      author: 'chris',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: this.blogContent,
      likes: 0,
      img: this.fileList[0],
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
  }
}
