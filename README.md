# NGX Auth Portal Service

**Note**: This is work in progress.

<a href="https://github.com/greenpau/ngx-authp-service/actions/" target="_blank"><img src="https://github.com/greenpau/ngx-authp-service/workflows/build/badge.svg?branch=main"></a>

The service works with [caddy-auth-portal](https://github.com/greenpau/caddy-auth-portal).
It retrieves user data and, if necessary, redirects users to auth portal
for authentication.

## Installation

```bash
npm install ngx-authp-service --save

# or

yarn add ngx-authp-service
```

## Usage

Add the auth portal service to your `app.module.ts` as a provider:

```typescript
import { AUTHP_CONFIG, AuthPortalService, AuthPortalConfig } from 'ngx-authp-service';

const PROD_AUTHP_CONFIG: AuthPortalConfig = {
  baseUrl: 'https://auth.myfiosgateway.com:8443/',
};

@NgModule({
  ...
  providers: [
    {
      provide: AUTHP_CONFIG,
      useValue: PROD_AUTHP_CONFIG,
    },
    AuthPortalService
  ],
  ...
})

export class AppModule {
}
```

Then, import and inject it into a constructor:

```typescript
import { AuthPortalService, UserData } from 'ngx-authp-service';

export class AppComponent implements OnInit {

  userData: UserData = {};

  constructor(
    private readonly authpService: AuthPortalService
  ) {
    this.authpService.whoami().subscribe(
      (data) => {
        this.userData = data;
        console.log(this.userData);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
```

The `userData` contains the information about the user. This data could be
used to create a user badge (account, persona, etc.).

The `raw` field contains the raw response from `whoami` API endpoint.

```typescript
export class UserData implements IUserData {
  id?: string;
  name?: string;
  email?: string;
  roles?: Array<string>;
  avatar?: string;
  raw?: object;
```

## Misc

Format prior to committing:

```bash
ng lint
npm run format:write
```

Prior to release, increment version in `projects/ngx-authp-service/package.json`.

Then, run the following commands to tag and release:
```
npm run package
NPM_PKG_VER=(`cat ./projects/ngx-authp-service/package.json | jq -r .version`)
git tag -a v${NPM_PKG_VER} -m "v${NPM_PKG_VER}"
git push --tags
```
