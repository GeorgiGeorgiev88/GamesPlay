export default function urlBuilder(id:string):string {

    const baseUrl = '/comment';
    const query = `where=recipeId="${id}"`;
    const encodedQuery = encodeURIComponent(query);
    return `${baseUrl}?${encodedQuery}`;
    
}