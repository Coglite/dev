import { CogliteProtocolLink } from "./coglite-protocol-link"

describe("CogliteProtocolLink", () => {
  const prefix = "coglite://route/pools/pool-1"

  it("throws an error when invalid protocol", () => {
    expect(() => new CogliteProtocolLink("https://invalid")).toThrow()
  })

  it("extract the session from the link", () => {
    expect(new CogliteProtocolLink(`coglite://?session=session-1`).session).toEqual("session-1")
    expect(new CogliteProtocolLink(`${prefix}?session=session-1`).session).toEqual("session-1")
    expect(
      new CogliteProtocolLink(`${prefix}?accountId=account-1&session=session-1`).session,
    ).toEqual("session-1")
  })

  it("extract the accountId from the link", () => {
    expect(new CogliteProtocolLink(`coglite://?accountId=account-1`).accountId).toEqual("account-1")
    expect(new CogliteProtocolLink(`${prefix}?accountId=account-1`).accountId).toEqual("account-1")
    expect(
      new CogliteProtocolLink(`${prefix}?accountId=account-1&session=session-1`).accountId,
    ).toEqual("account-1")
  })

  it("extract other query params", () => {
    expect(new CogliteProtocolLink(`coglite://?custom=value-1`).queryParams.get("custom")).toEqual(
      "value-1",
    )
    expect(
      new CogliteProtocolLink(`${prefix}?custom=value-1&accountId=account-1`).queryParams.get(
        "custom",
      ),
    ).toEqual("value-1")
    expect(
      new CogliteProtocolLink(
        `${prefix}?accountId=account-1&custom=value-1&session=session-1`,
      ).queryParams.get("custom"),
    ).toEqual("value-1")
  })

  it("convert back to the same string", () => {
    expect(new CogliteProtocolLink(`coglite://?accountId=account-1`).toString()).toEqual(
      `coglite://?accountId=account-1`,
    )
    expect(new CogliteProtocolLink(`${prefix}?accountId=account-1`).toString()).toEqual(
      `${prefix}?accountId=account-1`,
    )
    expect(
      new CogliteProtocolLink(`${prefix}?accountId=account-1&session=session-1`).toString(),
    ).toEqual(`${prefix}?accountId=account-1&session=session-1`)
    expect(
      new CogliteProtocolLink(
        `${prefix}?accountId=account-1&custom=value-1&session=session-1`,
      ).toString(),
    ).toEqual(`${prefix}?custom=value-1&accountId=account-1&session=session-1`)
  })
})
