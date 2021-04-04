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
    APIVisitorStat,
    APISearchTagStat,
    APIGeneralAdminSearchResult,
    APIGeneralAdminSearch, APIStatTag, APIStatRelatedTag, APIStatTagBaseStructure, APIStatTagBaseDateStructure
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
    VisitorStat,
    SearchTagStat,
    GeneralAdminSearchResult,
    GeneralAdminSearch, StatTag, StatRelatedTag, StatTagBaseDateStructure, StatTagBaseStructure
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
        read: contact.read,
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
        read: suggestion.read,
        createdAt: suggestion.created_at,
    }));
};

export const serializeTagsFromAPI = (tagsFromAPI: Array<APITag | APIBasicTag>): Tag[] => {
    return tagsFromAPI.map(tag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug,
        primary: tag.primary,
        disabled: tag.disabled,
        deletedAt: tag.deleted_at,
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
        slug: price.slug,
    }));
};

export const serializeResourceTypesFromAPI = (typesFromAPI: APIResourceType[]): ResourceType[] => {
    return typesFromAPI.map(type => ({
        id: type.id,
        name: type.name,
        slug: type.slug,
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
        createdAt: log.created_at,
    }));
};

export const serializeVisitorStatsFromAPI = (
    VisitorStatsFromAPI: APIVisitorStat[],
): VisitorStat[] => {
    return VisitorStatsFromAPI.map(stat => ({
        date: stat.date,
        visitors: stat.visitors,
    }));
};

export const serializeSearchTagsStatsFromAPI = (
    SearchTagsStatsFromAPI: APISearchTagStat[],
): SearchTagStat[] => {
    return SearchTagsStatsFromAPI.map(searchTag => ({
        count: searchTag.count,
        id: searchTag.tag.id,
        name: searchTag.tag.name,
        slug: searchTag.tag.slug,
        primary: searchTag.tag.primary
    }));
};

export const serializeStatsBaseDateStructureFromAPI = (
    statsTagsBaseDateStructure: APIStatTagBaseDateStructure[],
): StatTagBaseDateStructure[] => {
    return statsTagsBaseDateStructure.map(statTagBaseDateStructure => ({
        count: statTagBaseDateStructure.count,
        date: statTagBaseDateStructure.date
    }));
};

export const serializeStatsBaseStructureFromAPI = (
    statTagBaseStructure: APIStatTagBaseStructure,
): StatTagBaseStructure => {
    return ({
        totalCount: statTagBaseStructure.total_count,
        detailedCount: serializeStatsBaseDateStructureFromAPI(statTagBaseStructure.detailed_count)
    });
};

export const serializeStatsRelatedTagsFromAPI = (
    statsRelatedTagsFromAPI: APIStatRelatedTag[],
): StatRelatedTag[] => {
    return statsRelatedTagsFromAPI.map(statRelatedTag => ({
        id : statRelatedTag.id,
        name: statRelatedTag.name,
        slug: statRelatedTag.slug,
        weight : statRelatedTag.weight,
        stats: serializeStatsBaseStructureFromAPI(statRelatedTag.stats)
    }));
};

export const serializeStatsTagsFromAPI = (
    TagsStatsFromAPI: APIStatTag[],
): StatTag[] => {
    return TagsStatsFromAPI.map(statTag => ({
        id : statTag.id,
        name: statTag.name,
        slug: statTag.slug,
        primary: statTag.primary,
        weight : statTag.weight,
        relatedTags: serializeStatsRelatedTagsFromAPI(statTag.related_tags),
        stats: serializeStatsBaseStructureFromAPI(statTag.stats)
    }));
};

export const serializeGeneralAdminSearchResultFromAPI = (
    GeneralAdminSearchResultFromAPI: APIGeneralAdminSearchResult[],
    type: string
): GeneralAdminSearchResult[] => {
    return GeneralAdminSearchResultFromAPI.map(adminSearchResult => ({
        id: adminSearchResult.id,
        title: adminSearchResult.title,
        type: type
    }))
}

export const serializeGeneralAdminSearchFromAPI = (
    GeneralAdminSearchFromAPI: APIGeneralAdminSearch[],
): Record<string,GeneralAdminSearch> => {
    let adminSearchDictionnary: Record<string,GeneralAdminSearch> = {}
    GeneralAdminSearchFromAPI.map(adminSearch => (
        adminSearchDictionnary[adminSearch.slug] = {
            name: adminSearch.name,
            slug: adminSearch.slug,
            results: serializeGeneralAdminSearchResultFromAPI(adminSearch.results, adminSearch.slug)
    }));
    return adminSearchDictionnary;
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
        primary: tag.primary,
    };
};

export const serializePriceToAPI = (price: Partial<Price>): Partial<APIPrice> => {
    return {
        name: price.name,
    };
};

export const serializeResourceTypeToAPI = (type: Partial<ResourceType>): Partial<ResourceType> => {
    return {
        name: type.name,
    };
};
