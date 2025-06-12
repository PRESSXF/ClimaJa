import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalizacaoService {
  private readonly CURRENT_LOCATION_KEY = 'current_location';

  /**
   * Obtém a localização atual do usuário usando a API de Geolocalização
   * @returns Observable com as coordenadas (latitude e longitude)
   */
  obterLocalizacaoAtual(): Observable<{ latitude: number; longitude: number }> {
    return from(
      new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error('Geolocalização não suportada pelo navegador'));
        }

        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position),
          (error) => reject(error),
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
          }
        );
      })
    ).pipe(
      map(position => ({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }))
    );
  }

  /**
   * Define a cidade atual no localStorage
   * @param cidade Nome da cidade a ser definida como atual
   */
  definirLocalizacaoAtual(cidade: string): void {
    localStorage.setItem(this.CURRENT_LOCATION_KEY, cidade);
  }

  /**
   * Obtém a cidade atual do localStorage
   * @returns Nome da cidade atual ou null se não estiver definida
   */
  obterLocalizacaoAtualSalva(): Observable<string | null> {
    const cidade = localStorage.getItem(this.CURRENT_LOCATION_KEY);
    return of(cidade);
  }

  /**
   * Remove a cidade atual do localStorage
   */
  removerLocalizacaoAtual(): void {
    localStorage.removeItem(this.CURRENT_LOCATION_KEY);
  }

  /**
   * Verifica se o serviço de geolocalização está disponível
   * @returns boolean indicando se o serviço está disponível
   */
  isGeolocationDisponivel(): boolean {
    return 'geolocation' in navigator;
  }

  /**
   * Solicita permissão para usar a geolocalização
   * @returns Promise que resolve quando a permissão é concedida
   */
  async solicitarPermissao(): Promise<PermissionState> {
    if ('permissions' in navigator) {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return permission.state;
    }
    return 'prompt';
  }
}
