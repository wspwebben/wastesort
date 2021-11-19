import { getRandom } from './random'

export const takeRandomElement = (source) => {
    const index = getRandom(0, source.length - 1)
    const [item] = source.splice(index, 1)
  
    return item
}
