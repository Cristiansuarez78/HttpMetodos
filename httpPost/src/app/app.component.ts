import { Component } from '@angular/core';

interface Usuario {
  id: number;
  nombre: string;
  email: string;
  empresa: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  usuarios: Usuario[] = [];
  nuevoUsuario: Partial<Usuario> = {};
  usuarioSeleccionado: Usuario | null = null;
  idEliminar: number | null = null;
  nextId: number = 1;

  agregarUsuario() {
    if (this.nuevoUsuario.nombre && this.nuevoUsuario.email && this.nuevoUsuario.empresa) {
      this.usuarios.push({ id: this.nextId++, ...this.nuevoUsuario } as Usuario);
      this.nuevoUsuario = {};
    }
  }

  cargarUsuario(id: number) {
    this.usuarioSeleccionado = this.usuarios.find(usuario => usuario.id === id) || null;
  }

  modificarUsuario() {
    if (this.usuarioSeleccionado) {
      const index = this.usuarios.findIndex(usuario => usuario.id === this.usuarioSeleccionado!.id);
      if (index !== -1) {
        this.usuarios[index] = { ...this.usuarioSeleccionado };
        this.usuarioSeleccionado = null; // Reset the selected user
      }
    }
  }

  eliminarUsuario() {
    if (this.idEliminar !== null) {
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== this.idEliminar);
      this.idEliminar = null; // Reset the ID after deletion
    }
  }
}
