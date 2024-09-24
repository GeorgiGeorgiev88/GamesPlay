import { request } from "../lib/request";


const baseUrl = "http://localhost:3030/data"

interface GameData {
  category: string;
  imageUrl: string;
  maxLevel: string;
  summary: string;
  title: string;
}


export const getAll = async () => {
  const result = await request("GET", `${baseUrl}/games`);
  return result;
};

// export const getComments = async () => {
//   const result = await request("GET", `${baseUrl}/comment`);
//   return result;
// };

export const getComments = async (gameId:string) => {

  const query = new URLSearchParams({
    where: `gameId="${gameId}"`,
    load: `owner=_ownerId:users`,
  })

  const result = await request("GET", `${baseUrl}/comment?${query}`);
  return result;
};

export const create = async (gameData: GameData) => {
  const result = await request("POST", `${baseUrl}/games`, gameData);
  return result;
};

export const edit = async (gameData: GameData,gameId:string) => {
  console.log(gameData)
  const result = await request("PUT", `${baseUrl}/games/${gameId}`, gameData);
  return result;
 };

export const getOne = async (gameId: string) => {
  const singleGame = await request("GET", `${baseUrl}/games/${gameId}`);
  return singleGame;
};

export const comment = async (comment: object) => {
  const result = await request("POST", `${baseUrl}/comment`, comment);
  return result;
};
