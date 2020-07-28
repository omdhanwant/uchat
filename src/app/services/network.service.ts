import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private http: HttpClient, public auth: AuthService, private _sanitizer: DomSanitizer) { }

    get(url: string) {
       return this.http.get(url, { reportProgress : true})
    }

    post(url: string, body: any, options?): Observable<Object> {
        return this.http.post(url, body, options);
    }


    put(url: string, body: any, options?): Observable<Object> {
        return this.http.put(url, body, options);
    }

    delete(url: string) {
        return this.http.delete(url);
    }

    // upload image
   uploadImage(file: File){
     const fd = new FormData();
     fd.append('image', file)
    //  return this.post(`${environment.baseUrl}/upload-image`,fd,{
    //   headers: {
    //       'Content-Type': 'multipart/form-data'
    //   } });

      return fetch(`${environment.baseUrl}/upload-image`, {
        method: 'POST',
        body: fd
      })
   }

   getSanitizedImage(image) {
    // return this._sanitizer.bypassSecurityTrustStyle(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`);
    // return this._sanitizer.bypassSecurityTrustHtml(`linear-gradient(rgba(29, 29, 29, 0), rgba(16, 16, 23, 0.5)), url(${image})`)
    return this._sanitizer.bypassSecurityTrustUrl(`${image}`)
}

}
