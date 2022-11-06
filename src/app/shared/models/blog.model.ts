import { NzUploadFile } from "ng-zorro-antd/upload";

export interface IBlog {
  id: number,
  parentId: null | number,
  author: string,
  avatar: string,
  content: string,
  likes: number,
  img: NzUploadFile,
  children: IBlog[]
}
