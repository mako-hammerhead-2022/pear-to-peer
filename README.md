# Pear to Peer

## Deployment to render.com
Render provides free hosting similar to Heroku, including up to one database. A credit card shouldn't be needed to use the free tier (other providers such as fly.io require this). Like Heroku, the server will go into a 'sleep' state after 15 minutes of inactivity.
### Notes
- **Setting up auth0 is not covered**: auth0 details are currently hard coded to use `mako-2022-scott.au.auth0.com`.
- **Setting up AWS s3 is not covered**: Use the credentials for the s3 bucket that Mat setup.
- **Database will be deleted after 90 days**: you can create a new db after the old one is deleted. You'll need to update the `DATABASE_URL` environment variable. Changing environment variables will trigger a new build.

### Signup
Signup method shouldn't matter. Complete the signup process and verify your email.

### Create a PostgreSQL database
- Once logged in, click the blue "New +" button at the top of the screen and then select PostgreSQL.
- Enter a value for 'Name' - this can be anything. You can leave the 'Database' and 'User' fields blank.
- Leave all other options as their defaults and click 'Create Database'.
- Once the database has finished 'Creating', copy the 'Internal Database URL' for future use.

## Create a Web Service
- Click the 'New +' button at the top of the screen and then select 'Web Service'
- **Connecting your GitHub account and giving render permissions is optional.** You can provide a link to a public repository instead, although this may disable some features such as 'Auto-Deploy'.
  - Click 'Connect account' under 'GitHub', which will take you to a GitHub 'Install Render' page.
  - Select your account.
  - Keep 'All repositories' checked **OR** select only your pear-to-peer fork. Click 'Install'.
  - _You might need to provide a two-factor code at this point._
  - You should then be redirected back to render.
- Click 'connect' next to your GitHub repo **OR** provide a public repo link and click 'continue'.
- **Name**: Enter a unique name for the web service. This will determine the url - `<name>.onrender.com`
- Leave 'Root Directory', 'Environment' and 'Region' as their defaults.
- **Branch**: likely `main` or whatever branch has been setup for deployment.
- **Build Command**: `npm i && npm run build && npm run knex seed:run`
  - `&& npm run knex seed:run` can be removed after the first successful build to prevent the database being overwritten on every deployment. If you don't want seed data, you can also remove it.
- Leave 'Start Command' as default - `node server/index.js`
- Expand the 'Advanced' section.
- Add the following Environment Variables (`key: value`):
  - `NODE_ENV: production`
  - `DATABASE_URL: <Internal Database URL you copied earlier>`
  - `AWS_ACCESS_KEY_ID: <access_key_id>`
  - `AWS_SECRET_ACCESS_KEY: <secret_access_key>`
- Click 'Create Web Service'.
- The deployment should be completed successfully in 5 - 10 minutes.
- (_optional_) Go to settings, edit the build command and remove `&& npm run knex seed:run` to stop the database being overwritten on every build.

