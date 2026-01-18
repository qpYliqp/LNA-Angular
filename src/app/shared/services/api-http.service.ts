import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiHttpService {

  private _httpClient = inject(HttpClient);
  private _baseUrl: string = "";


  get<T>(url: string, displayToast: boolean = false): Observable<T> {
    return this._httpClient.get<T>(this._baseUrl + url).pipe(
      this.handleResponse<T>(displayToast)
    );
  }

  post<T>(url: string, body: any, displayToast: boolean = false): Observable<T> {
    return this._httpClient.post<T>(this._baseUrl + url, body).pipe(
      this.handleResponse<T>(displayToast)
    );
  }

  put<T>(url: string, body: any, displayToast: boolean = false): Observable<T> {
    return this._httpClient.put<T>(this._baseUrl + url, body).pipe(
      this.handleResponse<T>(displayToast)
    );
  }

  delete<T>(url: string, displayToast: boolean = false): Observable<T> {
    return this._httpClient.delete<T>(this._baseUrl + url).pipe(
      this.handleResponse<T>(displayToast)
    );
  }


  private handleResponse<T>(displayToast: boolean) {
    return (source: Observable<T>) => source.pipe(
      tap(() => {
        if (displayToast) {
          //this.toastService.showSuccess('Opération réussie');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (displayToast) {
          const message = error.error?.message || 'Une erreur est survenue';
          //this.toastService.showError(message);
        }
        return throwError(() => error);
      })
    );
  }

}
