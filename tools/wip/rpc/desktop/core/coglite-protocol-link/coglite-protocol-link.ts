import * as Url from "url"
import { Constants } from "../../constants"

export enum CogliteProtocolLinkAction {
  route = "route",
}

export interface CogliteProtocolLinkAttributes {
  action: CogliteProtocolLinkAction
  path: string
  queryParams: URLSearchParams
  session: string
  accountId: string
}

export class CogliteProtocolInvalidLinkError extends Error {
  constructor(public link: string, message: string) {
    super(message)
  }
}

/**
 * Class containing information defined in a CogliteProtocolLink(link starting with coglite://)
 * see
 */
export class CogliteProtocolLink implements CogliteProtocolLinkAttributes {
  public action: CogliteProtocolLinkAction
  public path: string
  public queryParams: URLSearchParams

  /**
   * Session that can be used by the application
   * opening CogliteProtocol to update a specific window instead of opening a new one
   */
  public session: string

  /**
   *
   */
  public accountId: string

  constructor(link?: string | CogliteProtocolLinkAttributes | CogliteProtocolLink) {
    if (!link) {
      return
    }
    if (typeof link === "string") {
      this._parseLink(link)
    } else {
      this.action = link.action
      this.path = link.path
      this.queryParams = link.queryParams
      this.session = link.session
      this.accountId = link.accountId
    }
  }

  public toString(): string {
    const queryParams = new Url.URLSearchParams(this.queryParams as any)
    if (this.accountId) {
      queryParams.append("accountId", this.accountId)
    }
    if (this.session) {
      queryParams.append("session", this.session)
    }
    const path = [this.action, this.path].filter(x => Boolean(x)).join("")
    return `coglite://${path}?${queryParams}`
  }

  private _parseLink(link: string) {
    const url = Url.parse(link)
    if (url.protocol !== Constants.customProtocolName + ":") {
      throw new CogliteProtocolInvalidLinkError(
        link,
        `Link '${link}' doesn't use the correct protocol: ${Constants.customProtocolName}`,
      )
    }
    const queryParams = new Url.URLSearchParams(url.query as string)

    this.accountId = queryParams.get("accountId")
    this.session = queryParams.get("session")
    this.action = url.host as CogliteProtocolLinkAction
    this.path = url.pathname

    queryParams.delete("accountId")
    queryParams.delete("session")
    this.queryParams = queryParams
  }
}
