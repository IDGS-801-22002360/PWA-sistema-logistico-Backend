import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { Usuario } from '../usuarios/usuario.entity';
import { Cliente } from '../clientes/clientes.entity';
import { Cotizacion } from '../cotizaciones/cotizaciones.entity';
import { Operacion } from '../operaciones/operaciones.entity';
import { SolicitudCotizacionCliente } from '../solicitudes/solicitudes.entity';
import { FacturaCliente } from '../facturas-cliente/facturas-cliente.entity';
import { Tracking } from '../tracking/tracking.entity';
import { Pais } from '../paises/paises.entity';
import { Localizacion } from '../localizacion/localizacion.entity';
import {
  LoginRequestDto,
  RegisterClienteRequestDto,
  CrearSolicitudRequestDto,
  EditarClienteRequestDto,
  FacturaClienteResponseDto,
} from './movil.dto';
import { RolUsuario } from '../usuarios/usuario.enum';
import { TipoUbicacion } from '../localizacion/localizacion.enum';

@Injectable()
export class MovilService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    @InjectRepository(Cotizacion)
    private cotizacionRepo: Repository<Cotizacion>,
    @InjectRepository(Operacion)
    private operacionRepo: Repository<Operacion>,
    @InjectRepository(SolicitudCotizacionCliente)
    private solicitudRepo: Repository<SolicitudCotizacionCliente>,
    @InjectRepository(FacturaCliente)
    private facturaRepo: Repository<FacturaCliente>,
    @InjectRepository(Tracking)
    private trackingRepo: Repository<Tracking>,
    @InjectRepository(Pais)
    private paisRepo: Repository<Pais>,
    @InjectRepository(Localizacion)
    private localizacionRepo: Repository<Localizacion>,
  ) { }

  private sha256Hash(text: string): string {
    return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
  }

  async login(loginDto: LoginRequestDto) {
    const pwdHash = this.sha256Hash(loginDto.password);

    const usuario = await this.usuarioRepo.findOne({
      where: { email: loginDto.email },
    });

    if (!usuario) {
      return { status: 0, message: 'Credenciales inválidas', user: [] };
    }

    // Verificar password con SHA256 (como en tu Python API)
    const storedPassword = await this.usuarioRepo.findOne({
      where: { id_usuario: usuario.id_usuario },
      select: ['password'],
    });

    if (!storedPassword || storedPassword.password !== pwdHash) {
      return { status: 0, message: 'Credenciales inválidas', user: [] };
    }

    if (!usuario.activo) {
      return { status: 0, message: 'Usuario inactivo', user: [] };
    }

    // Buscar cliente asociado por id_usuario (ya que en registerCliente guardamos el id_usuario del cliente creado)
    const cliente = await this.clienteRepo.findOne({
      where: { id_cliente: usuario.id_usuario },
    });

    const userResponse = {
      id_usuario: usuario.id_usuario,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      rol: usuario.rol,
      activo: usuario.activo,
      id_cliente: cliente?.id_cliente || null,
    };

    return { status: 1, message: 'Login exitoso', user: [userResponse] };
  }

  async registerCliente(registerDto: RegisterClienteRequestDto) {
    try {
      // Verificar si el email ya existe
      const existingUser = await this.usuarioRepo.findOne({
        where: { email: registerDto.email },
      });

      if (existingUser) {
        return { id_usuario: null, status: 0, message: 'El email ya está registrado', usuario: [] };
      }

      // Verificar si el RFC ya existe
      const existingCliente = await this.clienteRepo.findOne({
        where: { rfc: registerDto.rfc },
      });

      if (existingCliente) {
        return { id_usuario: null, status: 0, message: 'El RFC ya está registrado', usuario: [] };
      }

      const pwdHash = this.sha256Hash(registerDto.password);

      // Crear usuario
      const nuevoUsuario = this.usuarioRepo.create({
        nombre: registerDto.nombre,
        apellido: registerDto.apellido,
        email: registerDto.email,
        password: pwdHash,
        rol: RolUsuario.CLIENTE,
        activo: true,
      });

      const usuarioGuardado = await this.usuarioRepo.save(nuevoUsuario);

      // Buscar país si se proporciona
      let idPais: number | null = null;
      if (registerDto.pais) {
        const pais = await this.paisRepo.findOne({
          where: { nombre: registerDto.pais },
        });
        idPais = pais?.id || null;
      }

      // Crear cliente usando INSERT directo para que id_cliente = id_usuario
      await this.clienteRepo.query(`
        INSERT INTO clientes (id_cliente, nombre_empresa, rfc, id_pais, telefono, email_contacto, contacto_nombre, contacto_puesto, fecha_creacion) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
      `, [
        usuarioGuardado.id_usuario,
        registerDto.nombre_empresa,
        registerDto.rfc,
        idPais,
        registerDto.telefono || null,
        registerDto.email,
        registerDto.nombre,
        registerDto.apellido,
        'Titular',
      ]);

      // Obtener el cliente creado para confirmar
      const clienteGuardado = await this.clienteRepo.findOne({
        where: { id_cliente: usuarioGuardado.id_usuario }
      });

      const usuarioResponse = {
        id_usuario: usuarioGuardado.id_usuario,
        nombre: usuarioGuardado.nombre,
        apellido: usuarioGuardado.apellido,
        email: usuarioGuardado.email,
        rol: usuarioGuardado.rol,
        id_cliente: clienteGuardado!.id_cliente,
        nombre_empresa: clienteGuardado!.nombre_empresa,
        rfc: clienteGuardado!.rfc,
      };

      return {
        id_usuario: usuarioGuardado.id_usuario,
        status: 1,
        message: 'Cliente registrado exitosamente',
        usuario: [usuarioResponse],
      };
    } catch (error) {
      return {
        id_usuario: null,
        status: 0,
        message: 'Error al registrar cliente: ' + error.message,
        usuario: [],
      };
    }
  }

  async obtenerUsuario(userId: string) {
    try {
      const usuario = await this.usuarioRepo.findOne({
        where: { id_usuario: parseInt(userId) },
      });

      if (!usuario) {
        return { user: null };
      }

      // Buscar cliente asociado
      const cliente = await this.clienteRepo.findOne({
        where: { id_cliente: usuario.id_usuario },
      });

      const userResponse = {
        id_usuario: usuario.id_usuario,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol,
        activo: usuario.activo,
        id_cliente: cliente?.id_cliente || null,
        nombre_empresa: cliente?.nombre_empresa || null,
        rfc: cliente?.rfc || null,
      };

      return { user: [userResponse] };
    } catch (error) {
      return { user: null };
    }
  }

  async crearSolicitud(clientId: string, solicitudDto: CrearSolicitudRequestDto) {
    try {
      const idCliente = parseInt(clientId);

      // Buscar o crear localizaciones de origen y destino
      const origenPais = await this.paisRepo.findOne({
        where: { nombre: solicitudDto.origen_pais },
      });

      const destinoPais = await this.paisRepo.findOne({
        where: { nombre: solicitudDto.destino_pais },
      });

      let origenLocalizacion = await this.localizacionRepo.findOne({
        where: {
          nombre_ciudad: solicitudDto.origen_ciudad,
          id_pais: origenPais?.id,
        },
      });

      if (!origenLocalizacion) {
        origenLocalizacion = this.localizacionRepo.create({
          nombre_ciudad: solicitudDto.origen_ciudad,
          id_pais: origenPais?.id,
          tipo_ubicacion: TipoUbicacion.DOMICILIO,
        });
        origenLocalizacion = await this.localizacionRepo.save(origenLocalizacion);
      }

      let destinoLocalizacion = await this.localizacionRepo.findOne({
        where: {
          nombre_ciudad: solicitudDto.destino_ciudad,
          id_pais: destinoPais?.id,
        },
      });

      if (!destinoLocalizacion) {
        destinoLocalizacion = this.localizacionRepo.create({
          nombre_ciudad: solicitudDto.destino_ciudad,
          id_pais: destinoPais?.id,
          tipo_ubicacion: TipoUbicacion.DOMICILIO,
        });
        destinoLocalizacion = await this.localizacionRepo.save(destinoLocalizacion);
      }

      // Crear solicitud
      const nuevaSolicitud = this.solicitudRepo.create({
        id_cliente: idCliente,
        tipo_servicio: solicitudDto.tipo_servicio as any,
        tipo_carga: solicitudDto.tipo_carga as any,
        id_origen_localizacion: origenLocalizacion.id_localizacion,
        id_destino_localizacion: destinoLocalizacion.id_localizacion,
        descripcion_mercancia: solicitudDto.descripcion_mercancia,
        valor_estimado_mercancia: solicitudDto.valor_estimado_mercancia?.toString(),
      });

      const solicitudGuardada = await this.solicitudRepo.save(nuevaSolicitud);

      return {
        id_solicitud: solicitudGuardada.id_solicitud,
        status: 1,
        message: 'Solicitud creada exitosamente',
        created: [solicitudGuardada],
      };
    } catch (error) {
      return {
        id_solicitud: null,
        status: 0,
        message: 'Error al crear solicitud: ' + error.message,
        created: [],
      };
    }
  }

  async getOperacionesCliente(clientId: string, limit: number = 10, offset: number = 0) {
    try {
      const idCliente = parseInt(clientId);
      const operaciones = await this.operacionRepo.find({
        where: { id_cliente: idCliente },
        relations: ['cliente', 'usuario_operativo', 'proveedor', 'agente'],
        take: limit,
        skip: offset,
        order: { fecha_creacion: 'DESC' },
      });

      return { operaciones };
    } catch (error) {
      return { operaciones: [] };
    }
  }

  async getCotizacionesCliente(clientId: string, limit: number = 10, offset: number = 0) {
    try {
      const idCliente = parseInt(clientId);
      const cotizaciones = await this.cotizacionRepo.find({
        where: { id_cliente: idCliente },
        relations: ['cliente', 'usuario_ventas', 'origen', 'destino', 'proveedor'],
        take: limit,
        skip: offset,
        order: { fecha_creacion: 'DESC' },
      });

      return { cotizaciones };
    } catch (error) {
      return { cotizaciones: [] };
    }
  }

  async getSolicitudesCliente(clientId: string, limit: number = 10, offset: number = 0) {
    try {
      const idCliente = parseInt(clientId);
      const solicitudes = await this.solicitudRepo.find({
        where: { id_cliente: idCliente },
        relations: ['cliente'],
        take: limit,
        skip: offset,
        order: { id_solicitud: 'DESC' },
      });

      return { solicitudes };
    } catch (error) {
      return { solicitudes: [] };
    }
  }

  async editarCliente(clientId: string, editarDto: EditarClienteRequestDto) {
    try {
      const idCliente = parseInt(clientId);

      // Actualizar información del cliente
      const updateDataCliente: any = {};
      if (editarDto.nombre_empresa) updateDataCliente.nombre_empresa = editarDto.nombre_empresa;
      if (editarDto.rfc) updateDataCliente.rfc = editarDto.rfc;
      if (editarDto.telefono) updateDataCliente.telefono = editarDto.telefono;
      if (editarDto.email_contacto) updateDataCliente.email_contacto = editarDto.email_contacto;
      if (editarDto.contacto_nombre) updateDataCliente.contacto_nombre = editarDto.contacto_nombre;
      if (editarDto.contacto_puesto) updateDataCliente.contacto_puesto = editarDto.contacto_puesto;

      if (Object.keys(updateDataCliente).length > 0) {
        await this.clienteRepo.update(idCliente, updateDataCliente);
      }

      // Actualizar información del usuario
      const updateDataUsuario: any = {};
      if (editarDto.nombre_usuario) updateDataUsuario.nombre = editarDto.nombre_usuario;
      if (editarDto.apellido_usuario) updateDataUsuario.apellido = editarDto.apellido_usuario;
      if (editarDto.email_usuario) updateDataUsuario.email = editarDto.email_usuario;

      if (Object.keys(updateDataUsuario).length > 0) {
        await this.usuarioRepo.update(idCliente, updateDataUsuario);
      }

      return { status: 1, message: 'Cliente actualizado exitosamente' };
    } catch (error) {
      return { status: 0, message: 'Error al actualizar cliente: ' + error.message };
    }
  }

  async getClienteUsuarioInfo(clientId: string) {
    try {
      const idCliente = parseInt(clientId);

      const cliente = await this.clienteRepo.findOne({
        where: { id_cliente: idCliente },
        relations: ['pais'],
      });

      if (!cliente) {
        return { cliente: null };
      }

      const usuario = await this.usuarioRepo.findOne({
        where: { id_usuario: idCliente },
      });

      const clienteInfo = {
        // Información del cliente
        id_cliente: cliente.id_cliente,
        nombre_empresa: cliente.nombre_empresa,
        rfc: cliente.rfc,
        id_pais: cliente.id_pais,
        nombre_pais: cliente.pais?.nombre || null,
        telefono: cliente.telefono,
        email_contacto: cliente.email_contacto,
        contacto_nombre: cliente.contacto_nombre,
        contacto_puesto: cliente.contacto_puesto,
        // Información del usuario
        id_usuario: usuario?.id_usuario || null,
        nombre_usuario: usuario?.nombre || null,
        apellido_usuario: usuario?.apellido || null,
        email_usuario: usuario?.email || null,
        rol: usuario?.rol || null,
        activo: usuario?.activo || null,
      };

      return { cliente: clienteInfo };
    } catch (error) {
      return { cliente: null };
    }
  }

  async getFacturasCliente(clientId: string): Promise<FacturaClienteResponseDto[]> {
    try {
      const idCliente = parseInt(clientId);

      const facturas = await this.facturaRepo
        .createQueryBuilder('factura')
        .leftJoinAndSelect('factura.cliente', 'cliente')
        .leftJoinAndSelect('factura.operacion', 'operacion')
        .leftJoinAndSelect('factura.cotizacion', 'cotizacion')
        .where('factura.id_cliente = :idCliente', { idCliente })
        .orderBy('factura.fecha_creacion', 'DESC')
        .getMany();

      const facturasResponse: FacturaClienteResponseDto[] = facturas.map(factura => ({
        id_factura_cliente: factura.id_factura_cliente.toString(),
        id_cliente: factura.id_cliente.toString(),
        id_operacion: factura.id_operacion != null ? factura.id_operacion.toString() : null,
        id_cotizacion: factura.id_cotizacion != null ? factura.id_cotizacion.toString() : null,
        numero_factura: factura.numero_factura,
        fecha_emision: factura.fecha_emision,
        fecha_vencimiento: factura.fecha_vencimiento,
        monto_total: parseFloat(factura.monto_total),
        monto_pagado: parseFloat(factura.monto_pagado),
        moneda: factura.moneda,
        estatus: factura.estatus,
        observaciones: factura.observaciones,
        fecha_creacion: factura.fecha_creacion,
        cotizacion_tipo_servicio: factura.cotizacion?.tipo_servicio || null,
        cotizacion_tipo_carga: factura.cotizacion?.tipo_carga || null,
        cotizacion_incoterm: factura.cotizacion?.incoterm || null,
        descripcion_mercancia: factura.cotizacion?.descripcion_mercancia || null,
        operacion_tipo_servicio: factura.operacion?.tipo_servicio || null,
        fecha_inicio_operacion: factura.operacion?.fecha_inicio_operacion || null,
        fecha_estimada_entrega: factura.operacion?.fecha_estimada_entrega || null,
      }));

      return facturasResponse;
    } catch (error) {
      return [];
    }
  }

  async getTrackingPorOperacion(idOperacion: string) {
    try {
      const operacionId = parseInt(idOperacion);

      const tracking = await this.trackingRepo.find({
        where: { id_operacion: operacionId },
        relations: ['operacion'],
        order: { fecha_hora_actualizacion: 'DESC' },
      });

      return { tracking };
    } catch (error) {
      return { tracking: [] };
    }
  }
}