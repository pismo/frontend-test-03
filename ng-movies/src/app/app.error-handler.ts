import { HttpErrorResponse } from '@angular/common/http'
import { ErrorHandler, Injectable, NgZone } from '@angular/core'
import { NotificationService } from './services/notification.service';

@Injectable()
export class ApplicationErrorHandler extends ErrorHandler {

  constructor(private ns: NotificationService, private zone: NgZone) {
    super()
  }

  handleError(errorResponse: HttpErrorResponse | any){
    if (errorResponse instanceof HttpErrorResponse) {
      
      this.zone.run(() =>{
        switch(errorResponse.status){
          case 401:
            this.ns.notify(`${errorResponse.status} - Não autorizado`)
          break;
          case 404:
            this.ns.notify(`${errorResponse.status} - Não encontrado`)
          break;
          default:
            this.ns.notify(`${errorResponse.status} - ${errorResponse.statusText}`)
            break
        }  
      })
      
    }
    super.handleError(errorResponse)
  }

}
