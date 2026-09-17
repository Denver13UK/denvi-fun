export async function onRequest(context) {
    const url = new URL(context.request.url);

    const name = url.searchParams.get("name") || "Nerd";
    const image = url.searchParams.get("image") || "";
    const claimed = url.searchParams.get("claimed") === "true";

    const escapeHTML = (value) =>
        String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    const safeName = escapeHTML(name);
    const safeImage = escapeHTML(image);

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Discord Gift</title>

<meta property="og:title" content="YOU GOT A GIFT!">
<meta property="og:description" content="${safeName}">
<meta property="og:image" content="${safeImage}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#e057f2">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="YOU GOT A GIFT!">
<meta name="twitter:description" content="${safeName}">
<meta name="twitter:image" content="${safeImage}">

<style>
* {
    box-sizing: border-box;
}

html, body {
    width: 100%;
    height: 100%;
    margin: 0;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #313338;
    color: #f2f3f5;
    overflow: hidden;
}

.background {
    position: fixed;
    inset: 0;
    background:
        radial-gradient(
            circle at 50% 35%,
            rgba(88, 101, 242, 0.16),
            transparent 40%
        ),
        #313338;
    overflow: hidden;
}

.background::before {
    content: "";
    position: absolute;
    inset: -10%;
    background:
        radial-gradient(
            circle at 20% 20%,
            rgba(88, 101, 242, 0.10),
            transparent 25%
        ),
        radial-gradient(
            circle at 80% 70%,
            rgba(114, 137, 218, 0.08),
            transparent 25%
        );
    filter: blur(30px);
}

.discord-logo {
    position: absolute;
    top: 38px;
    left: 42px;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    z-index: 2;
}

.discord-logo svg {
    width: 34px;
    height: 34px;
    fill: #fff;
}

.page {
    position: relative;
    z-index: 3;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.card {
    width: 440px;
    max-width: 100%;
    padding: 40px;
    background: #2b2d31;
    border-radius: 8px;
    box-shadow:
        0 8px 24px rgba(0, 0, 0, 0.35),
        0 2px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.discord-mark {
    width: 48px;
    height: 48px;
    margin: 0 auto 28px;
    fill: #fff;
}

.gift-image {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    margin: 0 auto 20px;
    background: #1e1f22;
}

.gifted {
    font-size: 16px;
    line-height: 24px;
    color: #dbdee1;
    margin-bottom: 8px;
}

.gift-name {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    color: #f2f3f5;
    font-size: 24px;
    line-height: 30px;
    font-weight: 600;
    word-break: break-word;
}

.gift-name img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
}

.button-wrapper {
    margin-top: 40px;
}

.accept-button {
    width: 100%;
    height: 44px;
    border: 0;
    border-radius: 3px;
    background: #5865f2;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
}

.accept-button:hover {
    background: #4752c4;
}

.accept-button.claimed {
    background: #4e5058;
    color: #949ba4;
    cursor: default;
}

.claimed-text {
    margin-top: 20px;
    font-size: 16px;
    line-height: 24px;
    color: #dbdee1;
}

.hidden {
    display: none;
}

@media (max-width: 600px) {
    .card {
        padding: 32px 24px;
    }

    .discord-logo {
        top: 20px;
        left: 20px;
    }
}
</style>
</head>

<body>

<div class="background"></div>

<div class="discord-logo">
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.54 5.17A16.36 16.36 0 0 0 15.47 4l-.5 1.02a15.15 15.15 0 0 0-5.94 0L8.53 4a16.39 16.39 0 0 0-4.08 1.18C1.86 9.03 1.16 12.79 1.51 16.5a16.48 16.48 0 0 0 5.02 2.54l1.22-1.67c-.67-.25-1.3-.56-1.9-.92l.47-.36c3.67 1.72 7.64 1.72 11.27 0l.48.36c-.61-.36-1.24-.67-1.91-.92l1.22 1.67a16.46 16.46 0 0 0 5.02-2.54c.41-4.3-.7-8.03-2.86-11.33ZM8.7 14.58c-1.08 0-1.97-1-1.97-2.23s.87-2.23 1.97-2.23 1.98 1 1.97 2.23c0 1.23-.87 2.23-1.97 2.23Zm6.6 0c-1.08 0-1.97-1-1.97-2.23s.87-2.23 1.97-2.23 1.98 1 1.97 2.23c0 1.23-.87 2.23-1.97 2.23Z"/>
    </svg>

    <span>Discord</span>
</div>

<div class="page">
    <section class="card">

        <svg class="discord-mark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19.54 5.17A16.36 16.36 0 0 0 15.47 4l-.5 1.02a15.15 15.15 0 0 0-5.94 0L8.53 4a16.39 16.39 0 0 0-4.08 1.18C1.86 9.03 1.16 12.79 1.51 16.5a16.48 16.48 0 0 0 5.02 2.54l1.22-1.67c-.67-.25-1.3-.56-1.9-.92l.47-.36c3.67 1.72 7.64 1.72 11.27 0l.48.36c-.61-.36-1.24-.67-1.91-.92l1.22 1.67a16.46 16.46 0 0 0 5.02-2.54c.41-4.3-.7-8.03-2.86-11.33ZM8.7 14.58c-1.08 0-1.97-1-1.97-2.23s.87-2.23 1.97-2.23 1.98 1 1.97 2.23c0 1.23-.87 2.23-1.97 2.23Zm6.6 0c-1.08 0-1.97-1-1.97-2.23s.87-2.23 1.97-2.23 1.98 1 1.97 2.23c0 1.23-.87 2.23-1.97 2.23Z"/>
        </svg>

        <img id="giftImage" class="gift-image" src="" alt="Gift">

        <div class="gifted">
            You've been gifted
        </div>

        <h1 class="gift-name">
            <img id="smallImage" src="" alt="">
            <span id="giftName"></span>
        </h1>

        <div class="button-wrapper">
            <button id="acceptButton" class="accept-button">
                Woo! Accept Gift
            </button>
        </div>

        <div id="claimedText" class="claimed-text hidden">
            This gift has already been claimed.
        </div>

    </section>
</div>

<script>
const name = ${JSON.stringify(name)};
const image = ${JSON.stringify(image)};
const claimed = ${JSON.stringify(claimed)};

const giftName = document.getElementById("giftName");
const giftImage = document.getElementById("giftImage");
const smallImage = document.getElementById("smallImage");
const acceptButton = document.getElementById("acceptButton");
const claimedText = document.getElementById("claimedText");

giftName.textContent = name;

if (image) {
    giftImage.src = image;
    smallImage.src = image;
} else {
    giftImage.style.display = "none";
    smallImage.style.display = "none";
}

if (claimed) {
    acceptButton.classList.add("claimed");
    acceptButton.disabled = true;
    claimedText.classList.remove("hidden");
} else {
    acceptButton.classList.remove("claimed");
    acceptButton.disabled = false;
    claimedText.classList.add("hidden");
}
</script>

</body>
</html>`;

    return new Response(html, {
        headers: {
            "Content-Type": "text/html; charset=UTF-8",
            "Cache-Control": "no-cache"
        }
    });
}
