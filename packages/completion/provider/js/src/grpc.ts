import { status } from '@grpc/grpc-js';
import { HttpStatus } from '@nestjs/common';

export const HTTP_STATUS_TO_GRPC = {
  [HttpStatus.BAD_REQUEST]: status.INVALID_ARGUMENT,
  [HttpStatus.UNAUTHORIZED]: status.UNAUTHENTICATED,
  [HttpStatus.FORBIDDEN]: status.PERMISSION_DENIED,
  [HttpStatus.NOT_FOUND]: status.NOT_FOUND,
  [HttpStatus.NOT_ACCEPTABLE]: status.INVALID_ARGUMENT,
  [HttpStatus.REQUEST_TIMEOUT]: status.DEADLINE_EXCEEDED,
  [HttpStatus.CONFLICT]: status.ALREADY_EXISTS,
  [HttpStatus.GONE]: status.NOT_FOUND,
  [HttpStatus.UNPROCESSABLE_ENTITY]: status.INVALID_ARGUMENT,
  [HttpStatus.TOO_MANY_REQUESTS]: status.RESOURCE_EXHAUSTED,
  [HttpStatus.INTERNAL_SERVER_ERROR]: status.INTERNAL,
  [HttpStatus.NOT_IMPLEMENTED]: status.UNIMPLEMENTED,
  [HttpStatus.BAD_GATEWAY]: status.UNAVAILABLE,
  [HttpStatus.SERVICE_UNAVAILABLE]: status.UNAVAILABLE,
  [HttpStatus.GATEWAY_TIMEOUT]: status.UNAVAILABLE,
};
