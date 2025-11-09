import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ProveedoresModule } from './proveedores/proveedores.module';
import { PaisesModule } from './paises/paises.module';
import { ClientesModule } from './clientes/clientes.module';
import { AgentesModule } from './agentes/agentes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocalizacionModule } from './localizacion/localizacion.module';
import { LoginModule } from './login/login.module';
import { TarifasModule } from './tarifas/tarifas.module';
import { CotizacionesModule } from './cotizaciones/cotizaciones.module';
import { OperacionesModule } from './operaciones/operaciones.module';
import { SolicitudesModule } from './solicitudes/solicitudes.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Admin',
      database: 'logistica',
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsuariosModule,
    ProveedoresModule,
    ClientesModule,
    AgentesModule,
    PaisesModule,
    LocalizacionModule,
    TarifasModule,
    CotizacionesModule,
    OperacionesModule,
    SolicitudesModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
