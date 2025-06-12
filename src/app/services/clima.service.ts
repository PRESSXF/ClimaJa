import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, interval, of } from 'rxjs';
import { catchError, retry, switchMap, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClimaService {
  private apiKey = '0493ba0aca663cf9a780f6bf65b6af69';
  private apiUrl = 'https://api.openweathermap.org/data/2.5';
  private geoApiUrl = 'http://api.openweathermap.org/geo/1.0/direct';
  private climaCache: { [cidade: string]: any } = {}; // Cache para os dados do clima

  constructor(private http: HttpClient) {}

  // Buscar clima atual por cidade
  getClima(cidade: string): Observable<any> {
    if (this.climaCache[cidade]) {
      // Se a cidade estiver em cache, retorna os dados do cache
      console.log(`Dados do clima para ${cidade} obtidos do cache.`);
      return of(this.climaCache[cidade]);
    }

    const url = `${this.apiUrl}/weather?q=${cidade}&appid=${this.apiKey}&units=metric&lang=pt_br}`;
    return this.http.get(url).pipe(
      retry(2),
      catchError(this.handleError),
      tap(data => {
        // Salva os dados no cache
        this.climaCache[cidade] = data;
        console.log(`Dados do clima para ${cidade} salvos no cache.`);
      })
    );
  }

  // Buscar previsão de 5 dias por cidade
  getPrevisao(cidade: string): Observable<any> {
    const url = `${this.apiUrl}/forecast?q=${cidade}&appid=${this.apiKey}&units=metric&lang=pt_br}`;
    return this.http.get(url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Buscar sugestões de cidades
  getSugestoes(cidade: string): Observable<any[]> {
    const url = `${this.geoApiUrl}?q=${cidade}&limit=5&appid=${this.apiKey}`;
    return this.http.get<any[]>(url).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  // Tratamento de erros
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Erro desconhecido';

    if (error.error instanceof ErrorEvent) {
      // Erro do lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro do lado do servidor
      switch (error.status) {
        case 404:
          errorMessage = 'Cidade não encontrada';
          break;
        case 401:
          errorMessage = 'Chave da API inválida';
          break;
        case 429:
          errorMessage = 'Muitas requisições. Tente novamente em alguns minutos';
          break;
        case 0:
          errorMessage = 'Erro de conexão. Verifique sua internet';
          break;
        default:
          errorMessage = `Erro do servidor: ${error.status}`;
  }
}

    console.error('Erro no serviço de clima:', error);
    return throwError(() => new Error(errorMessage));
  }
}
