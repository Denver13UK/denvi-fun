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

    // Get the actual gift HTML from your Pages site.
    const pageURL = new URL("/dc-gift.html", url.origin);

    const response = await fetch(pageURL);
    let html = await response.text();

    // Inject Discord preview metadata.
    const meta = `
<meta property="og:title" content="YOU GOT A GIFT!">
<meta property="og:description" content="${safeName}">
<meta property="og:image" content="${safeImage}">
<meta property="og:type" content="website">
<meta name="theme-color" content="#e057f2">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="YOU GOT A GIFT!">
<meta name="twitter:description" content="${safeName}">
<meta name="twitter:image" content="${safeImage}">
`;

    html = html.replace("</head>", meta + "\n</head>");

    return new Response(html, {
        status: 200,
        headers: {
            "Content-Type": "text/html; charset=UTF-8",
            "Cache-Control": "no-cache, no-store, must-revalidate"
        }
    });
}
