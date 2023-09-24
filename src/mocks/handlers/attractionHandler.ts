import { getAttractionExamplesById } from "mocks/examples/attractionExamples";
import { rest } from "msw";

import attractionImage1 from "../images/128_Megacoaster_thumb.jpg";

const getApiUrl = (path?: string) => {
  // This may require the use of the CRA Proxy during development
  return `http://localhost:3000/v2${path ?? ""}`;
};

export function getAttractionHandlers() {
  return (
    rest.get(
      getApiUrl("/attractions/:attractionId/thumb"),
      async (req, res, ctx) => {
        const imageBuffer = await fetch(attractionImage1).then((res) =>
          res.arrayBuffer()
        );
        return res(
          ctx.set({
            "Content-Type": "image/jpeg",
            "Content-Length": imageBuffer.byteLength.toString(),
          }),
          // ctx.delay(5000), // Enable this line to help test Async image loading etc
          ctx.body(imageBuffer)
        );
      }
    ),
    rest.get(getApiUrl("/attractions/:attractionId"), (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(
          getAttractionExamplesById(req.params.attractionId as string, "open")
        )
      );
    })
  );
}
