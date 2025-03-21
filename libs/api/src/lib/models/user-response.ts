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

import { mapValues } from '../runtime';
import type { AddressResponse } from './address-response';
import {
  AddressResponseFromJSON,
  AddressResponseFromJSONTyped,
  AddressResponseToJSON,
  AddressResponseToJSONTyped,
} from './address-response';

/**
 *
 * @export
 * @interface UserResponse
 */
export interface UserResponse {
  /**
   *
   * @type {number}
   * @memberof UserResponse
   */
  id: number;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  email: string;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  firstname: string;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  lastname: string;
  /**
   *
   * @type {string}
   * @memberof UserResponse
   */
  phone: string | null;
  /**
   *
   * @type {AddressResponse}
   * @memberof UserResponse
   */
  address?: AddressResponse;
}

/**
 * Check if a given object implements the UserResponse interface.
 */
export function instanceOfUserResponse(value: object): value is UserResponse {
  if (!('id' in value) || value['id'] === undefined) return false;
  if (!('email' in value) || value['email'] === undefined) return false;
  if (!('firstname' in value) || value['firstname'] === undefined) return false;
  if (!('lastname' in value) || value['lastname'] === undefined) return false;
  if (!('phone' in value) || value['phone'] === undefined) return false;
  return true;
}

export function UserResponseFromJSON(json: any): UserResponse {
  return UserResponseFromJSONTyped(json, false);
}

export function UserResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserResponse {
  if (json == null) {
    return json;
  }
  return {
    id: json['id'],
    email: json['email'],
    firstname: json['firstname'],
    lastname: json['lastname'],
    phone: json['phone'],
    address: json['address'] == null ? undefined : AddressResponseFromJSON(json['address']),
  };
}

export function UserResponseToJSON(json: any): UserResponse {
  return UserResponseToJSONTyped(json, false);
}

export function UserResponseToJSONTyped(value?: UserResponse | null, ignoreDiscriminator: boolean = false): any {
  if (value == null) {
    return value;
  }

  return {
    id: value['id'],
    email: value['email'],
    firstname: value['firstname'],
    lastname: value['lastname'],
    phone: value['phone'],
    address: AddressResponseToJSON(value['address']),
  };
}
