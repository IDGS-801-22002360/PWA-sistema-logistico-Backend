import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { PaisesModule } from './paises/paises.module';
import { ClientesModule } from './clientes/clientes.module';
import { AgentesModule } from './agentes/agentes.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'usuarios',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsuariosModule,
    ProveedoresModule,
    ClientesModule,
    AgentesModule,
    PaisesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
