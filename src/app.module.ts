import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { ClientesModule } from './clientes/clientes.module';
import { AgentesModule } from './agentes/agentes.module';
import { PaisesModule } from './paises/paises.module';
import { UsuarioController } from './usuario/usuario.controller';

@Module({
  imports: [UsuariosModule, ProveedoresModule, ClientesModule, AgentesModule, PaisesModule],
  controllers: [AppController, UsuarioController],
  providers: [AppService],
})
export class AppModule {}
