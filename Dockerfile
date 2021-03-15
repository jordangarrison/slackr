# ---- Build ----
FROM node:14-alpine as builder

WORKDIR /app
ENV PATH /app/bin:$PATH

COPY . .

RUN npm clean-install
RUN npm run build
RUN ls ./dist && echo 'Build Successful 🚀' || /bin/sh -c "echo 'Build Failed 🔥🔥🔥' && exit 1"
# RUN npm test

# ---- Prod -----
FROM node:14-alpine as prod

WORKDIR /app
ENV PATH /app/bin:$PATH

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/bin ./bin

RUN npm install --production
RUN SLACK_TOKEN=test node ./bin/slackr help

# ---- Entry ----
CMD ["node", "./bin/slackr"]
