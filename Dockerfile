FROM node:16.2.0 as builder

ARG NODE_VERSION=16.2.0

RUN apt-get update; apt install -y curl
# RUN curl https://get.volta.sh | bash
# ENV VOLTA_HOME /root/.volta
# ENV PATH /root/.volta/bin:$PATH
# RUN volta install node@${NODE_VERSION}

#######################################################################

RUN mkdir /app
WORKDIR /app

# NPM will not install any package listed in "devDependencies" when NODE_ENV is set to "production",
# to install all modules: "npm install --production=false".
# Ref: https://docs.npmjs.com/cli/v9/commands/npm-install#description

ENV NODE_ENV production

COPY . .

RUN npm install
RUN npm run heroku-postbuild

FROM node:16.2.0

LABEL fly_launch_runtime="nodejs"

COPY --from=builder /app /app

WORKDIR /app
ENV NODE_ENV production
# ENV PATH /root/.volta/bin:$PATH
# ENV GOOGLE_CLIENT_ID 296719822032-rjmc4bj4i7irri0ni18cgtm9o1ffff42.apps.googleusercontent.com
# ENV GOOGLE_CLIENT_SECRET lTpkBu7j09w4pnwDYg6CDtp7
# ENV MONGO_URI mongodb+srv://ahonesa:jalmari12@rqg-depo-prod.hp4jo.mongodb.net/rqg-depo-prod?retryWrites=true&w=majority
# ENV COOKIE_KEY gdfdfdsfdsdfsdfdsdfdsdf

CMD [ "npm", "start" ]
