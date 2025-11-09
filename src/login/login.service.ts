import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/usuario.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepo: Repository<Usuario>,
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.usuarioRepo.findOne({
      where: { email: dto.email },
      select: ['id_usuario', 'email', 'rol', 'activo', 'password'], // Incluye todos los campos que necesitas, ESPECIALMENTE 'password'
    });

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    if (!usuario.activo) {
      throw new UnauthorizedException('Usuario inactivo. Contacte al administrador.');
    }
    const match = await bcrypt.compare(dto.password, usuario.password);
    if (!match) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const payload = { sub: usuario.id_usuario, email: usuario.email, rol: usuario.rol };
    const secret = process.env.JWT_SECRET || 'changeme';
    const expiresIn = process.env.JWT_EXPIRES_IN || '1h';
    const token = jwt.sign(payload, secret, { expiresIn });

    const { password, ...userSafe } = usuario;

    return { access_token: token, user: userSafe };
  }
}
