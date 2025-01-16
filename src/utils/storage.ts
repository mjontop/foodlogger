import { FoodEntry } from '../types';

const STORAGE_KEY = 'foodDiaryEntries';

export const getFoodEntries = (): FoodEntry[] => {
  const entries = localStorage.getItem(STORAGE_KEY);
  return entries ? JSON.parse(entries) : [];
};

export const saveFoodEntry = (entry: FoodEntry): void => {
  const entries = getFoodEntries();
  entries.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

export const deleteFoodEntry = (entryId:string) : void => {
  const entries = getFoodEntries()
  const newEntries = entries.filter(e => e.id !==entryId)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newEntries))

}