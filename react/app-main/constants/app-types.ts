import { LOCALES, PRICING_OPTIONS } from 'tmw-main/constants/app-constants';

export interface BasicTag {
    id: string;
    name: string;
    slug: string;
}

export interface RelatedTag extends BasicTag {
    weight: number;
}

export interface MainTag extends BasicTag {
    relatedTags: RelatedTag[];
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
