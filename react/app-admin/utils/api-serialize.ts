import { APIContact, APITag, APIWebsiteSuggestion, APIResource, APIBasicTag } from 'tmw-admin/constants/api-types';
import { Contact, Tag, WebsiteSuggestion , Resource } from 'tmw-admin/constants/app-types';
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
        createdAt: resource.created_at,
        tags: serializeTagsFromAPI(resource.resource_tags.map(({ tag }) => tag)),
    }));
};
