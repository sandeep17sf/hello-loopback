import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {GeoipDataSource} from '../datasources';

export interface GeoPoint {
  // latitude
  y: number;
  // longitude
  x: number;
}
export interface Geoip {
  // this is where you define the Node.js methods that will be
  // mapped to REST/SOAP/gRPC operations as stated in the datasource
  // json file.
  geocode(address:string): Promise<GeoPoint[]>;
}

export class GeoipProvider implements Provider<Geoip> {
  constructor(
    // geoip must match the name property in the datasource json file
    @inject('datasources.geoip')
    protected dataSource: GeoipDataSource = new GeoipDataSource(),
  ) {}

  value(): Promise<Geoip> {
    return getService(this.dataSource);
  }
}
