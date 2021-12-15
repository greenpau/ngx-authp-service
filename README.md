# Auth Portal Service for Angular

<a href="https://github.com/greenpau/ngx-authp-service/actions/" target="_blank"><img src="https://github.com/greenpau/ngx-authp-service/workflows/build/badge.svg?branch=main"></a>
<span class="badge-npmversion"><a href="https://npmjs.org/package/ngx-authp-service" title="View this project on NPM"><img src="https://img.shields.io/npm/v/ngx-authp-service.svg" alt="NPM version" /></a></span>

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

## Caddy Configuration

The following Caddyfile configuration allows the Angular app running
at `https://authdb.myfiosgateway.com:8443` accessing `https://auth.myfiosgateway.com/whoami`
API endpoint. If the configuration is not present, then default CORS policy
would prevent the app accessing the auth portal.

```
auth.myfiosgateway.com {
    route {
        header {
            Access-Control-Allow-Origin "https://authdb.myfiosgateway.com:8443"
            Access-Control-Allow-Methods "POST, GET, OPTIONS, PUT, DELETE"
            Access-Control-Allow-Headers "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization"
            Access-Control-Allow-Credentials true
        }
        authp {
            ...
        }
    }
}
```

Full Caddyfile:

```
{
        http_port 8080
        https_port 8443
        debug
}

auth.myfiosgateway.com {
        tls /home/greenpau/.local/tls/myfiosgateway/server.crt /home/greenpau/.local/tls/myfiosgateway/server.key
        route {
                header {
                        Access-Control-Allow-Origin "https://authdb.myfiosgateway.com:8443"
                        Access-Control-Allow-Methods "POST, GET, OPTIONS, PUT, DELETE"
                        Access-Control-Allow-Headers "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization"
                        Access-Control-Allow-Credentials true
                }
                authp {
                        crypto default token lifetime 3600
                        crypto key sign-verify a3c6eeee16e4479e9f31786e30b3ebdc
                        backend local /home/greenpau/.local/caddy/users.json local
                        cookie domain myfiosgateway.com
                        ui {
                                links {
                                        "AuthDB" https://authdb.myfiosgateway.com:8443/ icon "las la-star"
                                        "My Identity" "/whoami" icon "las la-user"
                                }
                        }
                        transform user {
                                match origin local
                                action add role authp/user
                        }
                        transform user {
                                match origin local
                                match roles authp/user
                                ui link "Portal Settings" /settings icon "las la-cog"
                        }
                }
        }
}

authdb.myfiosgateway.com {
        tls /home/greenpau/.local/tls/myfiosgateway/server.crt /home/greenpau/.local/tls/myfiosgateway/server.key
        route {
                authorize {
                        primary yes
                        crypto key verify a3c6eeee16e4479e9f31786e30b3ebdc
                        set auth url https://auth.myfiosgateway.com:8443/
                        allow roles authp/admin authp/user
                        validate bearer header
                        inject headers with claims
                }
                file_server {
                        root /home/greenpau/angular/app
                }
        }
}
```
