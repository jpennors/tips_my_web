import { TagsMap } from '../constants/app-types';
import { APITag } from '../constants/api-types';


export const serializeTagsFromAPI = (tagsFromAPI: APITag[]): TagsMap => {
    const tagsMap: TagsMap = {};
    const secondaryTags: APITag[] = [];

    tagsFromAPI.forEach((tag: APITag) => {
        if (tag.id in tagsMap) {
            console.error('Some tags have the same ID!');
        }
        if (tag.parent_id) {
            secondaryTags.push(tag);
        } else {
            tagsMap[tag.id] = {
                id: tag.id,
                name: tag.name,
                secondaryTags: [],
            };
        }
    });

    secondaryTags.forEach((tag: APITag) => {
        if (tag.parent_id && tag.parent_id in tagsMap) {
            tagsMap[tag.parent_id].secondaryTags.push(tag);
        }
        else {
            // No parent
        }
    });

    return tagsMap;
};
