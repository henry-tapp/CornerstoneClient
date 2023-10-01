import { rest } from "msw";

import imageSrc from '../../images/BannerDark.jpg'

const getApiUrl = (path?: string) => {
    return `http://localhost:3000/${path ?? ""}`;
};

export async function getImageHandlers() {
    const image = await fetch(imageSrc).then((res) =>
        res.arrayBuffer(),
    );
    return (
        rest.get(getApiUrl("/src/images/BannerDark.jpg"), (req, res, ctx) => {
            return res(
                ctx.set('Content-Length', image.byteLength.toString()),
                ctx.set('Content-Type', 'image/jpeg'),
                ctx.body(image),
            );
        })
    );
}
