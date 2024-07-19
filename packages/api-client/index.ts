import createClient from "openapi-fetch";
import type { paths } from "./schema.d.ts";

const client = createClient<paths>({ baseUrl: "https://myapi.dev/v1/" });

export default client;