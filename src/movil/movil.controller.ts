import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { MovilService } from './movil.service';
import {
  LoginRequestDto,
  RegisterClienteRequestDto,
  CrearSolicitudRequestDto,
  EditarClienteRequestDto,
  FacturaClienteResponseDto,
} from './movil.dto';

@Controller('movil')
export class MovilController {
  constructor(private readonly movilService: MovilService) { }

  @Get('health')
  health() {
    return { status: 'ok' };
  }

  @Post('login-movil')
  async login(@Body() loginDto: LoginRequestDto) {
    try {
      return await this.movilService.login(loginDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('register_cliente')
  async registerCliente(@Body() registerDto: RegisterClienteRequestDto) {
    try {
      return await this.movilService.registerCliente(registerDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('usuario/:user_id')
  async obtenerUsuario(@Param('user_id') userId: string) {
    try {
      return await this.movilService.obtenerUsuario(userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('cliente/:client_id/crear_solicitud')
  async crearSolicitud(
    @Param('client_id') clientId: string,
    @Body() solicitudDto: CrearSolicitudRequestDto,
  ) {
    try {
      return await this.movilService.crearSolicitud(clientId, solicitudDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('cliente/:client_id/operaciones')
  async getOperacionesCliente(
    @Param('client_id') clientId: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    try {
      return await this.movilService.getOperacionesCliente(clientId, limit, offset);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('cliente/:client_id/cotizaciones')
  async getCotizacionesCliente(
    @Param('client_id') clientId: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    try {
      return await this.movilService.getCotizacionesCliente(clientId, limit, offset);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('cliente/:client_id/solicitudes')
  async getSolicitudesCliente(
    @Param('client_id') clientId: string,
    @Query('limit') limit: number = 10,
    @Query('offset') offset: number = 0,
  ) {
    try {
      return await this.movilService.getSolicitudesCliente(clientId, limit, offset);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put('cliente/:client_id')
  async editarCliente(
    @Param('client_id') clientId: string,
    @Body() editarDto: EditarClienteRequestDto,
  ) {
    try {
      return await this.movilService.editarCliente(clientId, editarDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('cliente/:client_id/info')
  async getClienteUsuarioInfo(@Param('client_id') clientId: string) {
    try {
      return await this.movilService.getClienteUsuarioInfo(clientId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('cliente/:client_id/facturas')
  async getFacturasCliente(@Param('client_id') clientId: string): Promise<FacturaClienteResponseDto[]> {
    try {
      return await this.movilService.getFacturasCliente(clientId);
    } catch (error) {
      throw new HttpException('Error al obtener facturas: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('tracking/:id_operacion')
  async getTrackingPorOperacion(@Param('id_operacion') idOperacion: string) {
    try {
      return await this.movilService.getTrackingPorOperacion(idOperacion);
    } catch (error) {
      throw new HttpException('Error al obtener el tracking: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Endpoint de prueba para debugging - NO USAR EN PRODUCCIÓN
   * Este endpoint es solo para testing y desarrollo
   */
  @Post('debug/test')
  async debugTest(@Body() payload: any) {
    try {
      // Este endpoint puede ser usado para pruebas durante el desarrollo
      return { message: 'Debug endpoint - use only for testing', payload };
    } catch (error) {
      throw new HttpException('Error en debug endpoint: ' + error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
