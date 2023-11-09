import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  async (data: any, context: ExecutionContext) => {
    const request = await context.switchToHttp().getRequest();
    return request.user;
  },
);
