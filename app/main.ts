

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {appRouterProviders} from "./app.routes";
import {AppModule} from "./app.module";
import {Observable} from "rxjs";



platformBrowserDynamic().bootstrapModule(AppModule,[appRouterProviders]);

