import { access, process, map } from '../'

export async function taskRunner (path, seasonYear) {
  let data = await access(path, seasonYear)

  const { prunedExistingData, prunedUpdatedData } = await process(seasonYear, data)
  const result = await map(seasonYear, prunedExistingData, prunedUpdatedData)

  return result
  // console.log(prunedUpdatedData)
  // console.log(prunedExistingData)
  // console.log(result)

  // TODO
  // 1. Map processed into expected output
  // 2. Save to disk
  // 3. Output stats to console
}
