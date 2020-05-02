import { APIBasicTag } from 'tmw-admin/constants/api-types';
import { Resource, TagsMap } from 'tmw-main/constants/app-types';
import { APIResource, APITag } from 'tmw-main/constants/api-types';
import { LOCALES, PRICING_OPTIONS } from 'tmw-main/constants/app-constants';

export const serializeTagsFromAPI = (tagsFromAPI: APIBasicTag[] | APITag[]): TagsMap => {
    const tagsMap: TagsMap = {};
    const secondaryTags: Array<APIBasicTag | APITag> = [];

    tagsFromAPI.forEach((tag: APIBasicTag | APITag) => {
        if (tag.id in tagsMap) {
            console.error('Some tags have the same ID!');
        } else if (!tag.primary) {
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

    // secondaryTags.forEach((tag: APIBasicTag | APITag) => {
    //     const parentTagId = tag.parent_id;
    //     if (parentTagId) {
    //         const parentTag = 'parent' in tag ? tag.parent : tagsMap[parentTagId];
    //         if (parentTag.id in tagsMap) {
    //             tagsMap[parentTag.id].secondaryTags.push(tag);
    //         } else {
    //             tagsMap[parentTag.id] = {
    //                 id: parentTag.id,
    //                 name: parentTag.name,
    //                 slug: parentTag.slug,
    //                 secondaryTags: [tag],
    //             };
    //         }
    //     }
    // });

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
            pricing: resource.price.name as PRICING_OPTIONS,
        });
    });

    return resources;
};
