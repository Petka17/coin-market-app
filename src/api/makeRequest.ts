import axios, { AxiosError } from "axios";
import Decoder, * as _ from "jsonous";
import { Maybe } from "maybeasy";
import { ok } from "resulty";
import { FailedResponse } from "../common/types";

const api = axios.create({
  baseURL: "https://pro-api.coinmarketcap.com/v1/",
  headers: { "X-CMC_PRO_API_KEY": "ca6486f0-9083-4cc3-883c-0fb44371c17d" }
});

/**
 * Custom Decoders
 */
const identity = new Decoder(v => ok(v));

/**
 * Success case
 */
interface DecodedSucceedResponseData {
  code: number;
  data: Maybe<any>;
}

type DecodeResult = [DecodedSucceedResponseData | null, FailedResponse];

export const succeedResponseDecoder: Decoder<
  DecodedSucceedResponseData
> = _.succeed({})
  .assign("code", _.at(["status", "error_code"], _.number))
  .assign("data", _.maybe(_.field("data", identity)));

export const failedResponseDecoder: Decoder<FailedResponse> = _.succeed({})
  .assign("code", _.at(["status", "error_code"], _.number))
  .assign("message", _.at(["status", "error_message"], _.string));

/**
 * Methods
 */
type Methods = "get" | "post" | "put" | "patch" | "delete";

/**
 * Make request
 * @param url
 * @param method
 * @param body
 * @param serverDataDecoder
 */
export function makeRequest<T>(
  url: string,
  method: "get",
  serverDataDecoder: Decoder<T>
): Promise<T>;
export function makeRequest<T>(
  url: string,
  method: Methods,
  body: any,
  serverDataDecoder: Decoder<T>
): Promise<T>;
export function makeRequest(
  url: string,
  method: Methods,
  body: any
): Promise<void>;
export async function makeRequest<T>(
  url: string,
  method: Methods,
  body: any,
  serverDataDecoder?: Decoder<T>
): Promise<T | void> {
  const [maybeServerData, error] = await makeAndDecodeResponse(
    url,
    method,
    body
  );

  if (maybeServerData === null) {
    throw new Error(error.message);
  }

  if (!serverDataDecoder) {
    return;
  }

  const serverData = maybeServerData.data.getOrElseValue(null);

  const [data, decodeError] = serverDataDecoder
    .decodeAny(serverData)
    .cata<[T | null, string]>({
      Ok: val => [val, ""],
      Err: msg => [null, msg]
    });

  if (data === null) {
    throw new Error(`Server data decoder failed: ${decodeError}`);
  }

  return data;
}

const makeAndDecodeResponse = async (
  url: string,
  method: Methods,
  body: any
): Promise<DecodeResult> => {
  try {
    const { data: responseData } = await api({ url, method, data: body });

    return succeedResponseDecoder.decodeAny(responseData).cata<DecodeResult>({
      Ok: val => [val, { code: 0, message: "" }],
      Err: msg => [
        null,
        { code: 999, message: `Successful response decoder failed: ${msg}` }
      ]
    });
  } catch (axiosError) {
    if (!axiosError.response) {
      return [null, { code: 599, message: "Unknown server error" }];
    }

    const {
      response: { data }
    }: AxiosError = axiosError;

    const failedResponse = failedResponseDecoder
      .decodeAny(data)
      .cata<FailedResponse>({
        Ok: val => val,
        Err: msg => ({ code: 999, message: msg })
      });

    return [null, failedResponse];
  }
};
