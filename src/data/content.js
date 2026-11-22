// All page text comes from the files in src/content (edit those, not this file).
import { readDoc } from './docs'
import { parseHome, parseSteps, parseLines, parseTerms, parseBrief } from './mdParse'

const both = (name, parse) => ({
  vi: parse(readDoc(name, 'vi')),
  en: parse(readDoc(name, 'en')),
})

export const home = both('home', parseHome)
export const workflow = both('workflow', parseSteps)
export const terms = both('terms', parseTerms)
export const brief = both('brief', parseBrief)
export const priceNotes = both('price-notes', parseLines)