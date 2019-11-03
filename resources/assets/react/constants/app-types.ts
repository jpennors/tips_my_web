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
