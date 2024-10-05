import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SecurityService {
  async validatePSP1Request(rawRequest: Buffer) {
    Logger.debug(
      `validating raw request from PSP1 ${rawRequest.toLocaleString()}`,
    );
  }

  async validatePSP2Request(rawRequest: Buffer) {
    Logger.debug(
      `validating raw request from PSP2 ${rawRequest.toLocaleString()}`,
    );
  }
}
