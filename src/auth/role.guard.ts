import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass()

        ])
        if (!roles) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();

        return user && user.role && roles.some((requiredRole) => user.role === requiredRole)

    }
}