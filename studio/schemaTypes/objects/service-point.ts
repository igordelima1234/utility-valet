import {defineField, defineType} from 'sanity'
import {CheckmarkCircleIcon} from '@sanity/icons/CheckmarkCircle'

/** A numbered benefit in a service page's overview. */
export const servicePoint = defineType({
  name: 'servicePoint',
  title: 'Key point',
  type: 'object',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({name: 'title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'body', type: 'text', rows: 2, validation: (rule) => rule.required()}),
  ],
  preview: {select: {title: 'title', subtitle: 'body'}},
})
