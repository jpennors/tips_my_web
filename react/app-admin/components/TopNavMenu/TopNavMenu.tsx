import * as React from 'react';
import { Container, Image, Input, Menu, Responsive, Icon, Search, Label, Header } from 'semantic-ui-react';
import { ADMIN_APP_ROUTES } from 'tmw-admin/constants/app-constants';
import { logout } from 'tmw-admin/utils/auth-module';
import { ajaxPost } from 'tmw-common/utils/ajax';
import { serializeGeneralAdminSearchFromAPI } from 'tmw-admin/utils/api-serialize';
import { GeneralAdminSearch } from 'tmw-admin/constants/app-types';


export const TopNavMenu: React.FunctionComponent = () => {

    const [generalAdminSearch, setGeneralAdminSearch] = React.useState<Record<string,GeneralAdminSearch>>({});
    const [searchKey, setSearchKey] = React.useState<string>("");

    const fetchGeneralAdminSearch = async (): Promise<void> => {

        return ajaxPost('search/admin', {
            key: searchKey,
        })
        .then(res => {
            const adminSearch = serializeGeneralAdminSearchFromAPI(res.data);
            setGeneralAdminSearch(adminSearch);
        })
    };

    const onSearchKeyChange = (_: any, { value }: { value: string }): void => {
        setSearchKey(value);
    };
    
    React.useEffect(() => {
        if (searchKey && searchKey.length >= 3) {
            fetchGeneralAdminSearch();
        }
    }, [searchKey]);

    const categoryLayoutRenderer = ({ categoryContent, resultsContent }: any) => {
        if(!resultsContent)
            return (<Container></Container>);
        return( 
            <div>
                <Header as='h4' className='name' style={{ marginLeft: 10, marginTop: 10,}}>{categoryContent}</Header>
                <Container className='results'>
                    {resultsContent}
                </Container>
            </div>);
    }

    const categoryRenderer = ( {name}: any) => <span>{name}</span>

    const resultRenderer = ({title}: any) => <p>{title}</p>
    

    return (
        <Menu inverted style={{ borderRadius: 0 }}>
            <Container>
                <Menu.Item href={ADMIN_APP_ROUTES.MAIN} header>
                    <Image size="mini" src="/images/logo-icon.svg" style={{ marginRight: '5px' }} />
                    TipsMyWeb Admin
                </Menu.Item>
                <Menu.Item onClick={logout}>Logout</Menu.Item>
                <Menu.Item href={ADMIN_APP_ROUTES.PUBLIC_APP} target="_blank">
                    Public App
                    <Icon className="external alternate" style={{ marginLeft: '8px' }} />
                </Menu.Item>
                <Menu.Item position="right">
                    <Responsive minWidth={500}>
                        <Search
                            placeholder="Search ..."
                            value={searchKey}
                            onSearchChange={onSearchKeyChange}
                            category
                            categoryLayoutRenderer={categoryLayoutRenderer}
                            categoryRenderer={categoryRenderer}
                            resultRenderer={resultRenderer}
                            results={generalAdminSearch}
                        />
                    </Responsive>
                </Menu.Item>
            </Container>
        </Menu>
    );
};
