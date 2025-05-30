import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { name, email, businessName, businessType, automation } =
    await request.json();

  const content = `Hola soy ${name} y vengo desde BodegueroDigital, me comunico desde el correo ${email}, mi negocio se llama "${businessName}" y es del tipo "${businessType}". Me interesa automatizar: ${
    automation?.join(", ") || "ninguno"
  }.`;

  try {
    const tokenRes = await fetch(
      "https://comunicacion.factmype.com/api/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: import.meta.env.PUBLIC_WSP_USERNAME,
          password: import.meta.env.PUBLIC_WSP_PASSWORD,
        }),
      }
    );

    if (!tokenRes.ok) {
      const errorText = await tokenRes.text();
      console.error("[Error al generar token]", errorText);
      throw new Error("No se pudo generar el token");
    }

    const { token } = await tokenRes.json();

    const sendRes = await fetch(
      "https://comunicacion.factmype.com/api/message/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          to: import.meta.env.PUBLIC_WSP_TO,
          content,
        }),
      }
    );

    const data = await sendRes.json();

    return new Response(
      JSON.stringify({
        status: sendRes.status,
        data,
      }),
      {
        status: sendRes.ok ? 200 : sendRes.status,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error en contact.json.ts:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Error inesperado";

    return new Response(
      JSON.stringify({ error: true, message: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
