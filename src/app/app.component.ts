import { Component, OnInit } from '@angular/core';
import { IBlog } from './shared/models/blog.model';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  blogDetails: IBlog[] = [];

  constructor(private translate: TranslationService) {

  }

  ngOnInit(): void {
    this.getallBlogs();
  }

  getLang(lang: string) {
    this.translate.use(lang);
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
