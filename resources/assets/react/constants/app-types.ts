import { LOCALES } from 'tmw/constants/ui-constants';

export interface SecondaryTag {
    id: string;
    name: string;
}

export interface PrimaryTag extends SecondaryTag{
    secondaryTags: SecondaryTag[];
}

export interface TagsMap {
    [id: string]: PrimaryTag;
}

export interface Resource {
    id: string;
    name: string;
    description: string;
    url: string;
    iconFilename: string;
    locale: LOCALES;
    score: number;
    like: number;
    searchScore: number;
}

export interface ResourcesMap {
    [id: string]: Resource;
}
