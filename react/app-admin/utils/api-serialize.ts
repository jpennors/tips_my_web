import { APIContact, APIWebsiteSuggestion } from 'tmw-admin/constants/api-types';
import { Contact, WebsiteSuggestion } from 'tmw-admin/constants/app-types';

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

export const serializeSuggestionsFromAPI = (suggestionsFromAPI: APIWebsiteSuggestion[]): WebsiteSuggestion[] => {
    const suggestions: WebsiteSuggestion[] = [];

    suggestionsFromAPI.forEach((suggestion: APIWebsiteSuggestion) => {
        suggestions.push({
            id: suggestion.id,
            url: suggestion.url,
            description: suggestion.description,
            createdAt: suggestion.created_at,
        });
    });

    return suggestions;
};
