import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
import { CotizacionCargosModule } from './cotizacion-cargos/cotizacion-cargos.module';
import { FacturasClienteModule } from './facturas-cliente/facturas-cliente.module';
import { DocumentosRelacionadosModule } from './documentos-relacionados/documentos-relacionados.module';
import { NotasCreditoModule } from './notas-credito/notas-credito.module';
import { DemorasModule } from './demoras/demoras.module';
import { IncidenciasModule } from './incidencias/incidencias.module';
import { TrackingModule } from './tracking/tracking.module';
import { getDatabaseConfig } from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot(getDatabaseConfig()),
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
    CotizacionCargosModule,
    FacturasClienteModule,
    DocumentosRelacionadosModule,
    NotasCreditoModule,
    DemorasModule,
    IncidenciasModule,
    TrackingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
