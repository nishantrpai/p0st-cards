import { ImageResponse } from "@vercel/og";
import { write } from "../../utilities/svg";

export const config = {
  runtime: "edge",
};

export default async function (req) {
  // get all query params
  let params = req.url.split("?")[1];
  params = params.split("&");
  let [message, to, signature] = params;

  message = message.split("=")[1];
  message = decodeURIComponent(message);
  // remove + from message
  message = message.replace(/\+/g, " ");
  to = to.split("=")[1];
  signature = signature ? signature.split("=")[1] : "";
  // make xhr request to get user data
  // const res = await fetch(`https://opeper-backend.vercel.app/api/twitter?id=${handle}`);
  // const {colors, img} = await res.json();

  let currentStamp =
    "https://opepenai.nyc3.digitaloceanspaces.com/images/c0821a17-9974-4604-b28d-fd5f2c61a611@lg.png";

  let sign = decodeURIComponent(signature);

  let img =
    "https://pbs.twimg.com/profile_images/1354479643882004483/Btnfm47p_400x400.jpg";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "40px",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000",
          fontSize: 32,
          fontWeight: 600,
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 500"
          width="800"
        >
          <rect
            xmlns="http://www.w3.org/2000/svg"
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="#000"
            stroke="#333"
            stroke-width="3px"
          />
          <g stroke="#222" stroke-width="2px">
            <line x1="400" y1="20" x2="400" y2="480" />
          </g>

          <g stroke="#222" strokeWidth="2px" fill="#000">
            <rect x="720" y="20" width="50" height="50" />
            <foreignObject>
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  float: "left",
                  left: 745,
                  top: -205,
                }}
              >
                <img id="stamp" width="50" src={currentStamp} />
              </div>
            </foreignObject>
          </g>

          <g transform="translate(20, 20)" fill="#fff">
            {write(message, "#fff", 3)}
          </g>
          {signature && (
            <g x="420" y="120" width="300" height="450">
              {/* draw sign */}
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  float: "left",
                  left: 500,
                  top: 100,
                }}
              >
                <img id="sign" width="300" src={sign} />
              </div>
            </g>
          )}
        </svg>
      </div>
    ),
    {
      width: 800,
      height: 500,
    }
  );
}
