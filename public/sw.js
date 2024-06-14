self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("my-movie-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/src/main.tsx",
        "/src/pages/home.tsx",
        "/src/pages/watched.tsx",
        "/src/index.css",
        "/vite.svg",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.protocol !== "chrome-extension:") {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }
        const fetchRequest = event.request.clone();
        return fetch(fetchRequest)
          .then((fetchResponse) => {
            if (
              !fetchResponse ||
              fetchResponse.status !== 200 ||
              fetchResponse.type !== "basic"
            ) {
              return fetchResponse;
            }
            const responseToCache = fetchResponse.clone();
            caches.open("my-movie-cache").then((cache) => {
              cache.put(event.request, responseToCache); 
            });
            return fetchResponse;
          })
          .catch((error) => {
            console.error("Fetch failed:", error);
            throw error;
          });
      })
    );
  }
});
