# initial build step as part of multi-step
FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# final step, importing build configuration for run
# next FROM statement terminates prior block
FROM nginx
EXPOSE 80
COPY --from=builder /app/build /usr/share/nginx/html
# no CMD, because nginx default is start

# execute from this directory using `docker build .`
# run from created image by `docker run -p 8080:80 buildImageId` <- port 80 is nginx default