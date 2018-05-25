import { Workflow } from '../models/workflow';
import { CatalogImage } from '../models/catalog';

export class WorkflowService {
    private _urlBase: string = 'https://s3-eu-west-1.amazonaws.com/dev.stack.foundation/catalog/';
    private catalogImages: CatalogImage[];
    catalogInfoHtmlStrings: {[key: string]: string} = {};

    // constructor (private http: HttpService) {
    // }

    public get urlBase () {
        return this._urlBase;
    }

    // public catalogInfoHtml (key: string): Observable<string> {
    //     if (this.catalogInfoHtmlStrings[key]) {
    //         return Observable.of(this.catalogInfoHtmlStrings[key]);
    //     }
    //     return this.http.get(this._urlBase + key + '.md')
    //         .map(response => {
    //             // this.catalogInfoHtmlStrings[key] = (new Showdown.Converter()).makeHtml(response.text());

    //             return this.catalogInfoHtmlStrings[key];
    //         });
    // }

    public getWorkflowImagesCatalog (refresh: boolean = false): Promise<CatalogImage[]> {
        if (this.catalogImages && !refresh) {
            return Promise.resolve(this.catalogImages);
        }
        else {
            return fetch(this._urlBase + 'catalog.json')
                .then(response => response.json())
                .then(catalog => {
                    this.catalogImages = catalog as CatalogImage[];
                    return this.catalogImages;
                });
        }
    }

    public downloadYAML (workflow: Workflow, filename: string = 'workflow.yaml') {
        // let data = yaml.safeDump(workflow, {skipInvalid: true}),
        //     blob = new Blob([data], {type: 'application/x-yaml'});
        // if(this.windowService.window.navigator.msSaveOrOpenBlob) {
        //     window.navigator.msSaveBlob(blob, filename);
        // }
        // else{
        //     var elem = this.windowService.window.document.createElement('a');
        //     elem.href = this.windowService.window.URL.createObjectURL(blob);
        //     elem.download = filename;        
        //     document.body.appendChild(elem);
        //     elem.click();        
        //     document.body.removeChild(elem);
        // }
    }
}