import { updateCurrent, updateFinished, updateUpcoming, pruneData } from '../'
import { listIDs } from '../../utils'

export function listFinishedIDs (data, existingIDs) {
  const currentAndUpcomingIDs = listIDs(data, 'id')
  const finishedIDs = existingIDs.filter(id => !currentAndUpcomingIDs.includes(id.toString()))
  return finishedIDs
}

export async function processFinished (seasonYear, data, existingIDs) {
  const finishedIDs = listFinishedIDs(data, existingIDs)
  return data.concat(await updateFinished(seasonYear, finishedIDs))
}

export async function processData (seasonYear, data) {
  const existingIDs = listIDs(data.data, 'i')
  let updatedData = []

  updatedData = updatedData.concat(await updateCurrent(seasonYear))
  if (seasonYear.current) updatedData = updatedData.concat(await updateUpcoming(seasonYear))

  updatedData = updatedData.concat(await processFinished(seasonYear, updatedData, existingIDs))
  updatedData = updatedData.concat(await pruneData(seasonYear, updatedData))

  return updatedData
}
