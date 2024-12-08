import { Client, Account, ID, Models } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);

// Export the User type from Appwrite
export type User = Models.User<Models.Preferences>;

export { ID };
