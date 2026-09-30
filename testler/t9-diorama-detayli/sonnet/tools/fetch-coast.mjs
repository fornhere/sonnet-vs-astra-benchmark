import { overpass } from './overpass.mjs';
const BB = '40.60,-74.14,40.84,-73.84';
await overpass('coast', `[out:json][timeout:120];way["natural"="coastline"](${BB});out geom;`);
await overpass('named', `[out:json][timeout:120];(
 way["name"="Empire State Building"]["building"](${BB});
 way["name"="Chrysler Building"](${BB});
 way["name"="One World Trade Center"](${BB});
 way["name"="Flatiron Building"](${BB});
 way["name"="Grand Central Terminal"](${BB});
 way["name"="Brooklyn Bridge"]["bridge"](${BB});
 way["name"="Manhattan Bridge"]["bridge"](${BB});
 way["name"="Williamsburg Bridge"]["bridge"](${BB});
 way["name"~"Queensboro Bridge|Ed Koch"]["bridge"](${BB});
 way["name"="Statue of Liberty"](${BB});
 way["name"="Central Park"](${BB});
 relation["name"="Central Park"](${BB});
);out geom tags;`);
