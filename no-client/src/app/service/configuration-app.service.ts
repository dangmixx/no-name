import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { concatMap, delay, map, retryWhen, tap } from 'rxjs/operators';
@Injectable({
	providedIn: 'root',
})
export class ConfigurationAppService {
	public dataConfig: any = null;
	constructor(private http: HttpClient) {}

	public loadConfig() {
		const environmentConfig = environment.production ? 'prod' : 'dev';
		let timeExpire = new Date(new Date().setMinutes(new Date().getMinutes() + 5));
		const configFileUrl = `/app/config.${environmentConfig}.json`;
		const headers = new HttpHeaders()
			.set('client-cache-expire-time', timeExpire.toISOString())
			.set('client-cache-type', 'local')
			.set('client-cache', 'true')
			.set('api-url-config', 'local');

		this.http
			.get(configFileUrl, { headers: headers })
			.pipe(
				retryWhen((errors) =>
					errors.pipe(
						delay(1000),
						tap((error) => {
							alert('Your network down or not stable');
						})
					)
				)
			)
			.subscribe((res) => {
				console.info('Config Loaded');
				this.dataConfig = res;
			});
	}

	public getConfig() {
		return this.dataConfig;
	}
}
