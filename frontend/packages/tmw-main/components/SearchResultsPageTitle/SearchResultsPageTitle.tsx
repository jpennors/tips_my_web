import * as React from 'react';
import { BasicTag } from 'tmw-main/constants/app-types';

import styles from './SearchResultsPageTitle.module.scss';

interface SearchResultsPageTitleProps {
    hasResults: boolean;
    isLoading: boolean;
    mainSearchTag: BasicTag | undefined;
    relatedSearchTags: BasicTag[];
}

export const SearchResultsPageTitle: React.FunctionComponent<SearchResultsPageTitleProps> = ({
    hasResults,
    isLoading,
    mainSearchTag,
    relatedSearchTags,
}) => {
    return (
        <div>
            <div className={styles.title}>
                {isLoading || hasResults ? (
                    <>
                        Level-up your <span className={styles.titleEmphasis}>workflow!</span>
                    </>
                ) : (
                    <>{"We didn't find any resource for these tags..."}</>
                )}
            </div>
            <div className={styles.subtitle}>
                {isLoading ? (
                    'Looking for great resources...'
                ) : hasResults && mainSearchTag ? (
                    <>
                        <span className={styles.primarySearchTagSeparator}>/</span>
                        <span className={styles.primarySearchTag}>{mainSearchTag.name}</span>
                        {relatedSearchTags.map(tag => (
                            <React.Fragment key={tag.id}>
                                <span className={styles.secondarySearchTagSeparator}>/</span>
                                <span className={styles.secondarySearchTag}>{tag.name}</span>
                            </React.Fragment>
                        ))}
                    </>
                ) : (
                    'Please try to broaden the scope of your search'
                )}
            </div>
        </div>
    );
};
