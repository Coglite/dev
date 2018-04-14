import {BatchServiceClient} from "azure-batch/lib/batchServiceClient";
import * as msRest from "ms-rest";
import { BatchClientProxy } from "./azure-batch-client-proxy";


export interface SharedKeyOptions {
    account: string;
    key: string;
    url: string;
}

/**
 * Factory class that return the batch client proxy built for the given credentials.
 * It prevent from recreating a new client everytime we do a new request
 * as it will cache the last AAD and last shared key client
 */
export class AzureBatchClientProxyFactory {

    // For AAD
    private _currentUrl: string = null;
    private _currentToken: string = null;
    private _currentAADClient: BatchClientProxy = null;

    // For shared key
    private _currentSharedKeyOptions: SharedKeyOptions = {} as any;
    private _currentSharedKeyClient: BatchClientProxy = null;

    /**
     * Return the client for AAD usage
     * @param accountUrl Url endpoint
     * @param token AAD access token
     */
    public getForAADToken(accountUrl: string, token: string): BatchClientProxy {
        if (!token) {
            throw new Error("BatchClientProxy AAD token cannot be null or undefined");
        }
        if (token !== this._currentToken || accountUrl !== this._currentUrl) {
            this._currentToken = token;
            this._currentUrl = accountUrl;
            this._currentAADClient = new BatchClientProxy(accountUrl, this._newAADCredenials(token));
        }
        return this._currentAADClient;
    }



    private _newAADCredenials(token) {
        return new msRest.TokenCredentials(token, "Bearer");
    }
}
