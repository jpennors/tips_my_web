import { LOCALES, PRICING_OPTIONS } from 'tmw-main/constants/app-constants';

export interface SecondaryTag {
    id: string;
    name: string;
    slug: string;
}

export interface PrimaryTag extends SecondaryTag {
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
    pricing: PRICING_OPTIONS;
}
