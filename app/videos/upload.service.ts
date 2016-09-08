/**
 * Created by Hienadz on 31.08.16.
 */
import {Injectable, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';

declare var NProgress:any;
@Injectable()
export class FileUploadService {
    /**
     * @param Observable<number>
     */
    private progress$: Observable<number>;

    /**
     * @type {number}
     */
    private progress: number = 0;

    private progressObserver: any;

    uploadProgress:number=0;

    @Output() notifer:EventEmitter<number> = new EventEmitter<number>();

    constructor () {
        NProgress.configure({ minimum: 0.01,showSpinner: false });
        this.progress$ = new Observable<number>((observer:any) => {
            this.progressObserver = observer;
        });

    }

    /**
     * @returns {Observable<number>}
     */
    public getObserver (): Observable<number> {
        return this.progress$;
    }

    /**
     * Upload files through XMLHttpRequest
     *
     * @param url
     * @param file
     * @returns {Promise<T>}
     */
    public upload (url: string, file: File): Promise<any> {
        return new Promise((resolve, reject) => {

            NProgress.start();

            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            formData.append("fileUpload", file, file.name);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        NProgress.done();
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            FileUploadService.setUploadUpdateInterval(500);

            xhr.upload.onprogress = (event) => {
                this.progress = Math.round(event.loaded / event.total * 100);
                NProgress.set(event.loaded / event.total);
                this.progressObserver.next(this.progress);

            };

            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    }

    /**
     * Set interval for frequency with which Observable inside Promise will share data with subscribers.
     *
     * @param interval
     */
    private static setUploadUpdateInterval (interval: number): void {
        setInterval(() => {}, interval);
    }
}