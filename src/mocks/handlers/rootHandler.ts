import { rest } from "msw";

import { Root } from "@accesso/loqueue-qsmart-nextgen-shared-components";

const getApiUrl = (path?: string) => {
  // This may require the use of the CRA Proxy during development
  return `http://localhost:3000/v2${path ?? ""}`;
};

export function getRootHandlers() {
  return rest.get(getApiUrl(), (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        time: "2022-08-23T14:01:34.753",
        expires_at: "2022-08-23T14:05:34.753",
        expires_in: 5,
        data: {
          available: true,
          available_until: "2022-08-23T18:00:00.000",
          available_from: "2022-08-23T10:00:00.000",
          state: "available",
          actions: [
            // {
            //   type: "signout",
            //   tags: ["signout"],
            //   href: "https://wvlnkhpp5b.execute-api.us-east-1.amazonaws.com/v2/actions/signout",
            // },
            {
              type: "signin.google",
              tags: ["signin"],
              href: "https://wvlnkhpp5b.execute-api.us-east-1.amazonaws.com/v2/actions/signin.google",
            },
            {
              type: "signin.password",
              tags: ["signin"],
              href: "https://wvlnkhpp5b.execute-api.us-east-1.amazonaws.com/v2/actions/signin.password",
              options: {
                properties: {
                  username: {
                    type: "string",
                    format: "email",
                    title: "E-mail",
                    description: "Please enter your email address",
                  },
                  password: {
                    type: "string",
                    format: "password",
                    title: "Password",
                    description: "Please enter your password",
                  },
                },
                required: ["username", "password"],
              },
            },
          ],
        },
        client_data: {
          link: "/reserve.html",
          link_text: "RESERVE",
          description: "Hi",
          description_2: "Hi2",
          description_3: "Hi3",
          description_4: "Hi4",
        },
        links: {
          signin: "https://xxx/api/v2/signin",
          attractions: "https://xxx/api/v2/attractions",
          reservations: "https://xxx/api/v2/reservations",
          entitlements: "https://xxx/api/v2/entitlements",
        },
      } as Root)
    );
  });
}
