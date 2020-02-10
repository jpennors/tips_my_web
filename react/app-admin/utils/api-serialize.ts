import {
    APIContact,
    APITag,
    APIWebsiteSuggestion,
    APIResource,
    APIBasicTag,
    APIPrice,
    APIResourceType, APIResourceTag,
} from 'tmw-admin/constants/api-types';
import {
    Contact,
    Tag,
    WebsiteSuggestion,
    Resource,
    Price,
    ResourceType,
    ResourceTag,
} from 'tmw-admin/constants/app-types';
import { LOCALES } from 'tmw-admin/constants/app-constants';

export const serializeContactsFromAPI = (contactsFromAPI: APIContact[]): Contact[] => {
    return contactsFromAPI.map(contact => ({
        id: contact.id,
        email: contact.email,
        message: contact.message,
        createdAt: contact.created_at,
    }));
};

export const serializeSuggestionsFromAPI = (suggestionsFromAPI: APIWebsiteSuggestion[]): WebsiteSuggestion[] => {
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
        parentId: 'parent' in tag && tag.parent ? tag.parent.id : null,
        parentName: 'parent' in tag && tag.parent ? tag.parent.name : null,
    }));
};

export const serializeResourceTagsFromAPI = (resourceTagsFromAPI: APIResourceTag[]): ResourceTag[] => {
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
        typeId: resource.price_id,
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

