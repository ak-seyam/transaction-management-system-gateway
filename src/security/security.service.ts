import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SecurityService {
  // NOTE: I can extend the strategie to this part as well, I kep it like this for simplicity
  // as it doesn't have real implementation
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
