import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IBlog } from '../shared/models/blog.model';
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

  constructor() { }

  ngOnInit(): void {
  }

  addLike(data: IBlog): void {
    data.likes += 1;
    this.updateBlogDetails()
  }

  addComments(data: IBlog): void {
    this.submitting = true;

    data.children.push({
      id: this.selectedId + 100,
      parentId: data.id,
      author: 'chris',
      avatar: this.avatar,
      content: this.userComment,
      likes: 0,
      img: '',
      children: []
    })

    this.updateBlogDetails();
    this.selectedId = 0;
    this.userComment = '';
    this.submitting = false;
  }

  deleteComment(data: IBlog) {
    if (data.parentId) {
      this.deleteByParentId(this.dataSource, data.parentId);
    }
    else {
      const index = this.dataSource.findIndex(item => item.id === data.id);
      this.dataSource.splice(index, 1);
    }
    this.updateBlogDetails();
  }

  deleteByParentId(data: any[], id: any) {
    data.forEach(item => {
      if (item.id === id) item.children = [];
      if (item.children.length > 0) this.deleteByParentId(item.children, id)
    });
  }

  updateBlogDetails() {
    localStorage.setItem('BlogDetails', JSON.stringify(this.dataSource));
  }

}
