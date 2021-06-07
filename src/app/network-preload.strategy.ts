import { Injectable } from "@angular/core";
import { PreloadingStrategy, Route } from "@angular/router";
import { EMPTY, Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class NetworkPreloadStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return this.hasGoodConnection() ? load() : EMPTY;
  }

  hasGoodConnection() {
    const {connection} = navigator as any;

    if (connection) {
      const ignoreConnections = ['slow-2g', '2g', 'slow-3g', '3g'];
      const {effectiveType} = connection;

      if (ignoreConnections.includes(effectiveType)) {
        return false;
      }
    }

    return true;
  }
}
