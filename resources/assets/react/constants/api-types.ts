/* eslint-disable @typescript-eslint/camelcase */

export interface APITag {
  id: string;
  name: string;
  parent_id: string | null;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
  parent: {
    id: string;
    name: string;
    parent_id: string | null;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
  };
  resource_tags: APITag[];
}
