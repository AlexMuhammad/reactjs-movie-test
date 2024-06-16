const CACHE_NAME = "my-movie-cache";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/src/main.tsx",
        "/src/pages/home.tsx",
        "/src/pages/watched.tsx",
        "/src/pages/detail.tsx",
        "/src/index.css",
        "/vite.svg",
        "/src/components",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker activating.");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.protocol.startsWith("chrome-extension:")) {
    return;
  }
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
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
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
            return fetchResponse;
          })
          .catch((error) => {
            console.error("Fetch failed:", error);
            throw error;
          });
      })
      .catch((error) => {
        console.error("Error in fetch handler:", error);
        return new Response("Offline Page Placeholder");
      })
  );
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-watched-movies') {
      event.waitUntil(syncWatchedMovies());
    }
  });
  
  const syncWatchedMovies = async () => {
    const db = await openDB('movies-db', 1);
    const operations = await db.getAll('pending-watched-movies');
  
    for (const operation of operations) {
      try {
        await fetch('/api/watched-movies', {
          method: operation.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(operation.data),
        });
        // Remove the pending operation after successful sync
        await db.delete('pending-watched-movies', operation.id);
      } catch (error) {
        console.error('Sync failed for operation', operation, error);
      }
    }
  };
