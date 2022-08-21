import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private _imagesPath: string = '/assets/images';

  constructor() {}
  userDefault: string = `${this._imagesPath}/defaultProfileImage.jpg`;
}
