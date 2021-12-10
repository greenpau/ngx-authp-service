# NGX Auth Portal Service

**Note**: This is work in progress.

<a href="https://github.com/greenpau/ngx-authp-service/actions/" target="_blank"><img src="https://github.com/greenpau/ngx-authp-service/workflows/build/badge.svg?branch=main"></a>

The service works with [ngx-authp-service](https://github.com/greenpau/ngx-authp-service).
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
import { AuthPortalService } from 'ngx-authp-service';

@NgModule({
  ...
  providers: [AuthPortalService],
  ...
})

export class AppModule {
}
```

Then, import and inject it into a constructor:

```typescript
constructor(private authService: AuthPortalService){
  this.userData = this.authService.whoami();
}
```

The `userData` contains the information about the user. This data could be
used to create a badge (avatar, persona, etc.).
