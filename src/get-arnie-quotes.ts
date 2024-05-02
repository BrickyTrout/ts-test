import { httpGet } from "./mock-http-interface";

type Keys = "FAILURE" | "Arnie Quote";

type TResult = { [K in Keys]?: string };

export const getArnieQuotes = async (urls: string[]): Promise<TResult[]> => {
  const getPromises = urls.map(async (url): Promise<TResult> => {
    try {
      const res = await httpGet(url);
      const message = JSON.parse(res.body)?.["message"] ?? "";
      if (res.status === 200) {
        return { "Arnie Quote": message };
      } else {
        return { FAILURE: message };
      }
    } catch (err) {
      return { FAILURE: JSON.stringify(err) };
    }
  });

  return Promise.all(getPromises);
};
