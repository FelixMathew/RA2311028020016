export async function Log(
  token: string,
  stack: string,
  level: string,
  pkg: string,
  message: string
) {
  await fetch("http://20.207.122.201/evaluation-service/logs", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      stack,
      level,
      package: pkg,
      message,
    }),
  });
}