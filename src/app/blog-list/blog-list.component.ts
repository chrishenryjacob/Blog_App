import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { IBlog } from './blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  @Input() dataSource: IBlog[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  addLike(id: number): void {
    const index = this.dataSource.findIndex(item => item.id === id);
    this.dataSource[index].likes += 1;
    this.updateBlogDetails()
  }

  addComments(id: number) {

  }

  updateBlogDetails() {
    localStorage.setItem('BlogDetails', JSON.stringify(this.dataSource));
  }

}
