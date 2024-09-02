export const request = async (
  method: string,
  url: string,
  data?: object
): Promise<any> => {

  const token = localStorage.getItem("accessToken")

  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { "X-Authorization": token }),
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorMessage = `Error: ${response.statusText}`;
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return {};
  }

  const result = await response.json();
  return result;
};
