import { LOCALES } from 'tmw-main/constants/ui-constants';

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
    likes: number;
    searchScore: number;
}
