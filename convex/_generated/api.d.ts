/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as campaigns from "../campaigns.js";
import type * as contacts from "../contacts.js";
import type * as content from "../content.js";
import type * as donations from "../donations.js";
import type * as faq from "../faq.js";
import type * as http from "../http.js";
import type * as lib_auth from "../lib/auth.js";
import type * as media from "../media.js";
import type * as newsletter from "../newsletter.js";
import type * as seed from "../seed.js";
import type * as siteSettings from "../siteSettings.js";
import type * as stories from "../stories.js";
import type * as testimonials from "../testimonials.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  auth: typeof auth;
  campaigns: typeof campaigns;
  contacts: typeof contacts;
  content: typeof content;
  donations: typeof donations;
  faq: typeof faq;
  http: typeof http;
  "lib/auth": typeof lib_auth;
  media: typeof media;
  newsletter: typeof newsletter;
  seed: typeof seed;
  siteSettings: typeof siteSettings;
  stories: typeof stories;
  testimonials: typeof testimonials;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
