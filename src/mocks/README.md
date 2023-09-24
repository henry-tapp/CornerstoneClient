# Mocking

This folder contains all (mostly) of the bits to handle the mocking we provide via the MSW (Mock Service Worker).
The images folder is also exposed as a static dir to storybook so we can use images from that in story examples.

The Handlers file `handlers.ts` contains all the actual mock handlers for various API calls.

The `browser.js` and `server.js` are the 2 respective entry points for the service worker depending if it's running in a CLI based server OR in a browser as an actual service worker. (For more details on MSW I recommend you check the project site: <https://mswjs.io/>)
