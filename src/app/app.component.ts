import { Component, OnInit } from '@angular/core';
import { IBlog } from './shared/models/blog.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  blogDetails: IBlog[] = [];

  ngOnInit(): void {
    this.getallBlogs();
  }

  onBlogSubmit(val: boolean) {
    if (val) {
      this.getallBlogs();
    }
  }

  getallBlogs() {
    const blogData = localStorage.getItem('BlogDetails');
    this.blogDetails = blogData ? JSON.parse(blogData) : [];
  }
}
