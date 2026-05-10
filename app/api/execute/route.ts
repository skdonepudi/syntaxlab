import { NextRequest } from "next/server";

const MAX_RETRIES = 30;

function judge0Url(path = "") {
  const url = new URL(`${process.env.RAPIDAPI_URL}${path}`);
  url.searchParams.set("base64_encoded", "true");
  url.searchParams.set("fields", "*");
  return url.toString();
}

const judge0Headers = () => ({
  "Content-Type": "application/json",
  "X-RapidAPI-Host": process.env.RAPIDAPI_HOST!,
  "X-RapidAPI-Key": process.env.RAPIDAPI_KEY!,
});

async function submit(body: object): Promise<string> {
  const res = await fetch(judge0Url(), {
    method: "POST",
    headers: judge0Headers(),
    body: JSON.stringify(body),
  });

  if (res.status === 429) throw new Error("QUOTA_EXCEEDED");
  if (!res.ok) throw new Error(`Submission failed: ${res.status}`);

  const data = await res.json();
  return data.token;
}

async function pollResult(token: string, retries = 0): Promise<object> {
  if (retries >= MAX_RETRIES) throw new Error("TIMEOUT");

  const res = await fetch(judge0Url(`/${token}`), { headers: judge0Headers() });
  const data = await res.json();

  const statusId = data?.status?.id;
  if (statusId === 1 || statusId === 2) {
    await new Promise((r) => setTimeout(r, 1000));
    return pollResult(token, retries + 1);
  }

  return data;
}

export async function POST(request: NextRequest) {
  if (!process.env.RAPIDAPI_URL || !process.env.RAPIDAPI_KEY) {
    return Response.json({ error: "Code execution is not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const token = await submit(body);
    const result = await pollResult(token);
    return Response.json(result);
  } catch (error) {
    const msg = (error as Error).message;
    if (msg === "QUOTA_EXCEEDED") {
      return Response.json(
        { error: "Quota of 50 requests exceeded for the Day!" },
        { status: 429 }
      );
    }
    if (msg === "TIMEOUT") {
      return Response.json({ error: "Execution timed out" }, { status: 408 });
    }
    return Response.json({ error: "Execution failed. Please try again." }, { status: 500 });
  }
}
