import { getSchedule } from "mocks/examples/scheduleExamples";
import { rest } from "msw";

import src from '../../images/BannerDark.jpg'

const getApiUrl = (path?: string) => {
    return `http://localhost:3000/${path ?? ""}`;
};

export function getImageHandlers() {
    return (
        rest.get(getApiUrl("/src/images/BannerDark.jpg"), (req, res, ctx) => {
            return res(
                ctx.status(200),
                ctx.json(src);
            );
})
    );
}
