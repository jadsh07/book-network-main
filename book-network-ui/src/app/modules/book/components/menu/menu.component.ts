import { Component, OnInit } from '@angular/core';
import { KeycloakService } from '../../../../api/keycloak/keycloak.service';

@Component({
  selector: 'app-menu',
  standalone: false,
  
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {

  constructor(
   private keycloakService: KeycloakService
  ) {
  }
    ngOnInit(): void {
      const linkColor = document.querySelectorAll('.nav-link');
      linkColor.forEach(link => {
        if (window.location.href.endsWith(link.getAttribute('href') || '')) {
          link.classList.add('active');
        }
        link.addEventListener('click', () => {
          linkColor.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }

  async logout() {
    await this.keycloakService.logout();
   // localStorage.removeItem('token');
  //  window.location.reload();
  }

  async accountManagement() {
    await this.keycloakService.accountManagement();
  }
}
