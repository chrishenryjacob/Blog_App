import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IBlog } from './blog.model';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  @Input() dataSource: IBlog[] = [];

  selectedId: number = 0;
  avatar = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png';
  userComment!: string;
  submitting = false;
  file!: NzUploadFile;

  constructor() { }

  ngOnInit(): void {
  }

  addLike(id: number): void {
    const index = this.dataSource.findIndex(item => item.id === id);
    this.dataSource[index].likes += 1;
    this.updateBlogDetails()
  }

  addComments(data: IBlog): void {
    this.submitting = true;

    data.children.push({
      id: this.selectedId + 100,
      author: 'chris',
      avatar: this.avatar,
      content: this.userComment,
      likes: 0,
      img: this.file,
      children: []
    })

    this.updateBlogDetails();
    this.selectedId = 0;
    this.userComment = '';
    this.submitting = false;
  }

  updateBlogDetails() {
    localStorage.setItem('BlogDetails', JSON.stringify(this.dataSource));
  }

}
