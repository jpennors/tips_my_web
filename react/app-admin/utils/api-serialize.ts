/* eslint-disable @typescript-eslint/camelcase */

import {
    APIContact,
    APITag,
    APIWebsiteSuggestion,
    APIResource,
    APIBasicTag,
    APIPrice,
    APIResourceType,
    APIResourceTag,
    APILog,
} from 'tmw-admin/constants/api-types';
import {
    Contact,
    Tag,
    WebsiteSuggestion,
    Resource,
    Price,
    ResourceType,
    ResourceTag,
    Log,
} from 'tmw-admin/constants/app-types';
import { LOCALES } from 'tmw-admin/constants/app-constants';

/*
 * Convert data from API format to frontend format
 */

export const serializeContactsFromAPI = (contactsFromAPI: APIContact[]): Contact[] => {
    return contactsFromAPI.map(contact => ({
        id: contact.id,
        email: contact.email,
        message: contact.message,
        createdAt: contact.created_at,
    }));
};

export const serializeSuggestionsFromAPI = (
    suggestionsFromAPI: APIWebsiteSuggestion[],
): WebsiteSuggestion[] => {
    return suggestionsFromAPI.map(suggestion => ({
        id: suggestion.id,
        url: suggestion.url,
        description: suggestion.description,
        createdAt: suggestion.created_at,
    }));
};

export const serializeTagsFromAPI = (tagsFromAPI: Array<APITag | APIBasicTag>): Tag[] => {
    return tagsFromAPI.map(tag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        parentId: 'parent' in tag && tag.parent ? tag.parent.id : null,
        parentName: 'parent' in tag && tag.parent ? tag.parent.name : null,
    }));
};

export const serializeResourceTagsFromAPI = (
    resourceTagsFromAPI: APIResourceTag[],
): ResourceTag[] => {
    return resourceTagsFromAPI.map(resourceTag => ({
        tagId: resourceTag.tag_id,
        belonging: resourceTag.belonging,
        tag: serializeTagsFromAPI([resourceTag.tag])[0],
    }));
};

export const serializeResourcesFromAPI = (resourcesFromAPI: APIResource[]): Resource[] => {
    return resourcesFromAPI.map(resource => ({
        id: resource.id,
        name: resource.name,
        description: resource.description,
        url: resource.url,
        iconFilename: resource.image,
        locale: resource.language as LOCALES,
        score: resource.score,
        interfaceScore: resource.interface,
        likes: resource.like,
        priceId: resource.price_id,
        typeId: resource.type_id,
        priceName: resource.price.name,
        typeName: resource.type.name,
        createdAt: resource.created_at,
        tags: serializeResourceTagsFromAPI(resource.resource_tags),
    }));
};

export const serializePricesFromAPI = (pricesFromAPI: APIPrice[]): Price[] => {
    return pricesFromAPI.map(price => ({
        id: price.id,
        name: price.name,
    }));
};

export const serializeResourceTypesFromAPI = (typesFromAPI: APIResourceType[]): ResourceType[] => {
    return typesFromAPI.map(type => ({
        id: type.id,
        name: type.name,
    }));
};

export const serializeLogsFromAPI = (logsFromAPI: APILog[]): Log[] => {
    return logsFromAPI.map(log => ({
        id: log.id,
        description: log.description,
        level: log.level,
        routeUri: log.route?.uri,
        routeMethod: log.route?.method,
        geoipCity: log.geoip?.city,
        geoipContinent: log.geoip?.continent,
        geoipCountry: log.geoip?.country,
        geoipStateName: log.geoip?.state_name,
        geoipTimezone: log.geoip?.timezone,
    }));
};

/*
 * Convert data from frontend format to (partial) API format (to use with POST API)
 */

export const serializeResourceToAPI = (resource: Partial<Resource>): Partial<APIResource> => {
    return {
        name: resource.name,
        description: resource.description,
        url: resource.url,
        language: resource.locale,
        score: resource.score,
        interface: resource.interfaceScore,
        price_id: resource.priceId,
        type_id: resource.typeId,
        tags: resource.tags
            ? resource.tags.map(tag => ({
                tag_id: tag.tagId,
                  belonging: tag.belonging,
              }))
            : [],
    };
};

export const serializeTagToAPI = (tag: Partial<Tag>): Partial<APITag> => {
    return {
        name: tag.name,
        parent_id: tag.parentId,
    };
};
