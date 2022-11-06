import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { formatDistance } from 'date-fns';
import { IBlog } from './blog.model';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  @Input() dataSource: IBlog[] = [];
  likes!: number;
  dislikes!: number;
  time = formatDistance(new Date(), new Date());

  constructor() { }

  ngOnInit(): void {
  }

  like(): void {
    this.likes = 1;
    this.dislikes = 0;
  }

  dislike(): void {
    this.likes = 0;
    this.dislikes = 1;
  }

}
