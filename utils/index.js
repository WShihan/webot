export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
export const tip = text => console.log(`-----《 ${text} 》-----`);
