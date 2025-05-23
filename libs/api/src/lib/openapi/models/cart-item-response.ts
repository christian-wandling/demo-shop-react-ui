/* tslint:disable */
/* eslint-disable */
/**
 * Demo Shop API
 * A comprehensive API for managing an online store, providing endpoints for product catalog, user management, shopping cart operations, and order processing
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface CartItemResponse
 */
export interface CartItemResponse {
  /**
   *
   * @type {number}
   * @memberof CartItemResponse
   */
  id: number;
  /**
   *
   * @type {number}
   * @memberof CartItemResponse
   */
  productId: number;
  /**
   *
   * @type {string}
   * @memberof CartItemResponse
   */
  productName: string;
  /**
   *
   * @type {string}
   * @memberof CartItemResponse
   */
  productThumbnail: string;
  /**
   *
   * @type {number}
   * @memberof CartItemResponse
   */
  quantity: number;
  /**
   *
   * @type {number}
   * @memberof CartItemResponse
   */
  unitPrice: number;
  /**
   *
   * @type {number}
   * @memberof CartItemResponse
   */
  totalPrice: number;
}

/**
 * Check if a given object implements the CartItemResponse interface.
 */
export function instanceOfCartItemResponse(value: object): value is CartItemResponse {
  if (!('id' in value) || value['id'] === undefined) return false;
  if (!('productId' in value) || value['productId'] === undefined) return false;
  if (!('productName' in value) || value['productName'] === undefined) return false;
  if (!('productThumbnail' in value) || value['productThumbnail'] === undefined) return false;
  if (!('quantity' in value) || value['quantity'] === undefined) return false;
  if (!('unitPrice' in value) || value['unitPrice'] === undefined) return false;
  if (!('totalPrice' in value) || value['totalPrice'] === undefined) return false;
  return true;
}

export function CartItemResponseFromJSON(json: any): CartItemResponse {
  return CartItemResponseFromJSONTyped(json, false);
}

export function CartItemResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CartItemResponse {
  if (json == null) {
    return json;
  }
  return {

    'id': json['id'],
    'productId': json['productId'],
    'productName': json['productName'],
    'productThumbnail': json['productThumbnail'],
    'quantity': json['quantity'],
    'unitPrice': json['unitPrice'],
    'totalPrice': json['totalPrice'],
  };
}

export function CartItemResponseToJSON(json: any): CartItemResponse {
  return CartItemResponseToJSONTyped(json, false);
}

export function CartItemResponseToJSONTyped(value?: CartItemResponse | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {

    'id': value['id'],
    'productId': value['productId'],
    'productName': value['productName'],
    'productThumbnail': value['productThumbnail'],
    'quantity': value['quantity'],
    'unitPrice': value['unitPrice'],
    'totalPrice': value['totalPrice'],
  };
}

