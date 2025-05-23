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


import * as runtime from '../runtime';
import type { AddressResponse, UpdateUserAddressRequest, UpdateUserPhoneRequest, UserResponse } from '../models/index';
import {
  AddressResponseFromJSON,
  UpdateUserAddressRequestToJSON,
  UpdateUserPhoneRequestToJSON,
  UserResponseFromJSON,
} from '../models/index';

export interface UpdateCurrentUserAddressRequest {
  updateUserAddressRequest: UpdateUserAddressRequest;
}

export interface UpdateCurrentUserPhoneRequest {
  updateUserPhoneRequest: UpdateUserPhoneRequest;
}

/**
 *
 */
export class UserApi extends runtime.BaseAPI {

  /**
   * Resolve current user based on identity extracted from bearer token
   * Resolve current user
   */
  async resolveCurrentUserRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearer', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/v1/users/me`,
      method: 'POST',
      headers: headerParameters,
      query: queryParameters,
    }, initOverrides);

    return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
  }

  /**
   * Resolve current user based on identity extracted from bearer token
   * Resolve current user
   */
  async resolveCurrentUser(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
    const response = await this.resolveCurrentUserRaw(initOverrides);
    return await response.value();
  }

  /**
   * Update the address of the user based on identity extracted from bearer token
   * Update address of current user
   */
  async updateCurrentUserAddressRaw(requestParameters: UpdateCurrentUserAddressRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AddressResponse>> {
    if (requestParameters['updateUserAddressRequest'] == null) {
      throw new runtime.RequiredError(
        'updateUserAddressRequest',
        'Required parameter "updateUserAddressRequest" was null or undefined when calling updateCurrentUserAddress().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearer', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/v1/users/me/address`,
      method: 'PUT',
      headers: headerParameters,
      query: queryParameters,
      body: UpdateUserAddressRequestToJSON(requestParameters['updateUserAddressRequest']),
    }, initOverrides);

    return new runtime.JSONApiResponse(response, (jsonValue) => AddressResponseFromJSON(jsonValue));
  }

  /**
   * Update the address of the user based on identity extracted from bearer token
   * Update address of current user
   */
  async updateCurrentUserAddress(requestParameters: UpdateCurrentUserAddressRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AddressResponse> {
    const response = await this.updateCurrentUserAddressRaw(requestParameters, initOverrides);
    return await response.value();
  }

  /**
   * Update the phone of the user based on identity extracted from bearer token
   * Update phone of current user
   */
  async updateCurrentUserPhoneRaw(requestParameters: UpdateCurrentUserPhoneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<UserResponse>> {
    if (requestParameters['updateUserPhoneRequest'] == null) {
      throw new runtime.RequiredError(
        'updateUserPhoneRequest',
        'Required parameter "updateUserPhoneRequest" was null or undefined when calling updateCurrentUserPhone().',
      );
    }

    const queryParameters: any = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters['Content-Type'] = 'application/json';

    if (this.configuration && this.configuration.accessToken) {
      const token = this.configuration.accessToken;
      const tokenString = await token('bearer', []);

      if (tokenString) {
        headerParameters['Authorization'] = `Bearer ${tokenString}`;
      }
    }
    const response = await this.request({
      path: `/api/v1/users/me/phone`,
      method: 'PATCH',
      headers: headerParameters,
      query: queryParameters,
      body: UpdateUserPhoneRequestToJSON(requestParameters['updateUserPhoneRequest']),
    }, initOverrides);

    return new runtime.JSONApiResponse(response, (jsonValue) => UserResponseFromJSON(jsonValue));
  }

  /**
   * Update the phone of the user based on identity extracted from bearer token
   * Update phone of current user
   */
  async updateCurrentUserPhone(requestParameters: UpdateCurrentUserPhoneRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<UserResponse> {
    const response = await this.updateCurrentUserPhoneRaw(requestParameters, initOverrides);
    return await response.value();
  }

}
