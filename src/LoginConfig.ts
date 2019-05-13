import { GoogleLoginProvider, AuthServiceConfig } from 'angularx-social-login';

export function getLoginConfig() {
    let config = new AuthServiceConfig([
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("875949970454-dg3aqc7dkicjoun1tatovuo7h9qe5c90.apps.googleusercontent.com")
        }
    ]);

    return config;
}