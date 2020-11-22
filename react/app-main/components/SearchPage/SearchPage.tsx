import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { DocumentHead } from 'tmw-main/components/DocumentHead';
import { TagsSelector } from 'tmw-main/components/TagsSelector';

import './search-page.less';

export const SearchPage: React.FunctionComponent = () => {
    return (
        <div className="search-page">
            <DocumentHead title="Home" />
            <div className="search-page__top-spacing" />
            <p className="search-page__title">
                Let&apos;s find the most <span className="search-page__title--bold">useful</span>{' '}
                websites for your <span className="search-page__title--bold">workflow</span>
            </p>
            <TagsSelector />
            <div className="search-page__help-container">
                <div className="search-page__help-content">
                    <span className="search-page__help-content-text">
                        TipsMyWeb makes you discover new web resources to help with your day to day
                        workflow.
                        <br />
                        <span className="search-page__help--small">
                            Start by selecting tags corresponding to your subject of interest.
                        </span>
                    </span>
                    <FontAwesomeIcon className="search-page__help-content-icon" icon={faQuestion} />
                </div>
            </div>
        </div>
    );
};
