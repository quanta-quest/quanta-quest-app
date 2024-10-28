export namespace controller {
	
	export class GetAppDocumentsReq {
	    appKey: string;
	    page: number;
	    pageSize: number;
	    search: string;
	
	    static createFrom(source: any = {}) {
	        return new GetAppDocumentsReq(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.appKey = source["appKey"];
	        this.page = source["page"];
	        this.pageSize = source["pageSize"];
	        this.search = source["search"];
	    }
	}
	export class ImportAppSourceReq {
	    appKey: string;
	    zipFilePath: string;
	
	    static createFrom(source: any = {}) {
	        return new ImportAppSourceReq(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.appKey = source["appKey"];
	        this.zipFilePath = source["zipFilePath"];
	    }
	}
	export class Res {
	    code: number;
	    message: string;
	    data: any;
	
	    static createFrom(source: any = {}) {
	        return new Res(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.code = source["code"];
	        this.message = source["message"];
	        this.data = source["data"];
	    }
	}

}

