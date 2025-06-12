import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public darkMode = false;
  public isFahrenheit = false;
  public notificationsEnabled = true;
  public autoLocationEnabled = false;

  constructor() {
    this.loadSettings();
    this.initializeTheme();
  }

  private loadSettings() {
    // Carrega configurações salvas no localStorage
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.isFahrenheit = localStorage.getItem('isFahrenheit') === 'true';
    this.notificationsEnabled = localStorage.getItem('notificationsEnabled') !== 'false';
    this.autoLocationEnabled = localStorage.getItem('autoLocationEnabled') === 'true';
  }

  private initializeTheme() {
    // Verifica se há uma preferência salva para o tema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (localStorage.getItem('darkMode') === null) {
      this.darkMode = prefersDark.matches;
    }
    
    this.applyTheme();

    // Adiciona listener para mudanças na preferência do sistema
    prefersDark.addEventListener('change', (mediaQuery) => {
      if (localStorage.getItem('darkMode') === null) {
        this.darkMode = mediaQuery.matches;
        this.applyTheme();
      }
    });
  }

  toggleTheme() {
    this.darkMode = !this.darkMode;
    this.applyTheme();
    localStorage.setItem('darkMode', this.darkMode.toString());
  }

  private applyTheme() {
    document.body.classList.toggle('dark', this.darkMode);
  }

  toggleTemperatureUnit() {
    this.isFahrenheit = !this.isFahrenheit;
    localStorage.setItem('isFahrenheit', this.isFahrenheit.toString());
    
    // Emite evento para outros componentes saberem da mudança
    window.dispatchEvent(new CustomEvent('temperatureUnitChanged', {
      detail: { isFahrenheit: this.isFahrenheit }
    }));
  }

  toggleNotifications() {
    this.notificationsEnabled = !this.notificationsEnabled;
    localStorage.setItem('notificationsEnabled', this.notificationsEnabled.toString());
    
    if (this.notificationsEnabled) {
      this.requestNotificationPermission();
    }
  }

  toggleAutoLocation() {
    this.autoLocationEnabled = !this.autoLocationEnabled;
    localStorage.setItem('autoLocationEnabled', this.autoLocationEnabled.toString());
    
    // Emite evento para outros componentes saberem da mudança
    window.dispatchEvent(new CustomEvent('autoLocationChanged', {
      detail: { enabled: this.autoLocationEnabled }
    }));
  }

  private async requestNotificationPermission() {
    if ('Notification' in window) {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Permissão de notificação concedida');
        } else {
          console.log('Permissão de notificação negada');
          this.notificationsEnabled = false;
          localStorage.setItem('notificationsEnabled', 'false');
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão de notificação:', error);
      }
    }
  }

  // Método para obter configurações (pode ser usado por outros componentes)
  getSettings() {
    return {
      darkMode: this.darkMode,
      isFahrenheit: this.isFahrenheit,
      notificationsEnabled: this.notificationsEnabled,
      autoLocationEnabled: this.autoLocationEnabled
    };
  }
}
