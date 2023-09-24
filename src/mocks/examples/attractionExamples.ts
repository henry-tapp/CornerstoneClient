import {
  ApiResponseData,
  Attraction,
  AttractionClient,
  AttractionState,
} from "@accesso/loqueue-qsmart-nextgen-shared-components";

// DEV Use, This all changed when using the config driven API bits
const getApiUrl = (path?: string) => {
  // This may require the use of the CRA Proxy during development
  return `http://localhost:3000/v2${path ?? ""}`;
};

function getRandomNumber(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function getAttractionExamplesById(
  attractionId: string,
  state: AttractionState
) {
  return {
    id: attractionId,
    time: "2022-08-23T14:00:03.000Z",
    expires_in: 27,
    expires_at: "2022-08-23T14:00:30.000Z",
    data: {
      id: "1",
      name: "Batman",
      state: state,
      wait_time_mins: getRandomNumber(1, 10),
    },
    client_data: {},
    actions: [
      {
        text: "RIDE IN AN HOUR",
        href: "#",
        type: "reserve",
        tags: [],
        method: "post",
      },
      {
        text: "RIDE IN 24 MINS WITH FLASH PASS GOLD",
        href: "#",
        type: "reserve",
        tags: [],
        method: "post",
      },
      {
        text: "GET ON NOW",
        secondText: "$10",
        href: "#",
        type: "reserve",
        tags: [],
        method: "post",
      },
      {
        text: "THE FLASH PASS GOLD $99 EACH",
        href: "#",
        type: "marketing",
        tags: [],
        method: "post",
      },
      {
        text: "THE FLASH PASS PLATINUM $120 EACH",
        href: "#",
        type: "marketing",
        tags: [],
        method: "post",
      },
    ],
    links: {
      self: getApiUrl(`/attractions/${attractionId}`),
    },
  } as ApiResponseData<Attraction, AttractionClient>;
}
