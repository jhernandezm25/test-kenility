import { Injectable } from '@nestjs/common';
import { getResponse } from '../common/commonFuctions';
import { MESSAGES } from '../utils/variables';
import { STATUS_CODE } from '../utils/variables';
import { response } from 'src/utils/interfaces';

@Injectable()
export class FileService {
  async transformImage(file: any): Promise<response> {
    try {
      const bytes = file.buffer.toString('base64');
      const response = getResponse(
        STATUS_CODE.Success,
        MESSAGES.Success,
        bytes
      );
      return response;
    } catch (error) {
      const response = getResponse(
        STATUS_CODE.InternalError,
        MESSAGES.InternalError,
        error.message
      );
      return response;
    }
  }
}
