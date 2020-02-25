import { Resource, TagsMap } from 'tmw-main/constants/app-types';
import { APIResource, APITag } from 'tmw-main/constants/api-types';
import { LOCALES } from 'tmw-main/constants/app-constants';

export const serializeTagsFromAPI = (tagsFromAPI: APITag[]): TagsMap => {
    const tagsMap: TagsMap = {};
    const secondaryTags: APITag[] = [];

    tagsFromAPI.forEach((tag: APITag) => {
        if (tag.id in tagsMap) {
            console.error('Some tags have the same ID!');
        } else if (tag.parent_id) {
            secondaryTags.push(tag);
        } else {
            tagsMap[tag.id] = {
                id: tag.id,
                name: tag.name,
                slug: tag.slug,
                secondaryTags: [],
            };
        }
    });

    secondaryTags.forEach((tag: APITag) => {
        if (tag.parent_id && tag.parent_id in tagsMap) {
            tagsMap[tag.parent_id].secondaryTags.push(tag);
        } else {
            // No parent
        }
    });

    return tagsMap;
};

export const serializeResourcesFromAPI = (resourcesFromAPI: APIResource[]): Resource[] => {
    const resources: Resource[] = [];

    resourcesFromAPI.forEach((resource: APIResource) => {
        resources.push({
            id: resource.id,
            name: resource.name,
            description: resource.description,
            url: resource.url,
            iconFilename: resource.image,
            locale: resource.language as LOCALES,
            score: resource.score,
            likes: resource.like,
            searchScore: resource.search_score,
            pricing: resource.price.name,
        });
    });

    return resources;
};
