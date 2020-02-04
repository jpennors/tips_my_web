import { APIContact } from 'tmw-admin/constants/api-types';
import { Contact } from 'tmw-admin/constants/app-types';

export const serializeContactsFromAPI = (contactsFromAPI: APIContact[]): Contact[] => {
    const contacts: Contact[] = [];

    contactsFromAPI.forEach((contact: APIContact) => {
        contacts.push({
            id: contact.id,
            email: contact.email,
            message: contact.message,
            createdAt: contact.created_at,
        });
    });

    return contacts;
};
