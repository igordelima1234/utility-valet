import {defineArrayMember, defineField, defineType} from 'sanity'
import {PackageIcon} from '@sanity/icons/Package'

/**
 * Keys the website uses to pick each service's icon and illustration.
 * Adding a new value here also needs matching artwork in the site code.
 */
const SERVICE_KEYS = [
  {title: 'Instanet', value: 'instanet'},
  {title: "Renter's Insurance", value: 'insurance'},
  {title: 'Pest Control', value: 'pest'},
  {title: 'Air Filter Delivery', value: 'filters'},
  {title: 'Rewards Program', value: 'rewards'},
  {title: 'Credit Reporting', value: 'credit'},
  {title: 'Exclusive Deals', value: 'deals'},
  {title: 'Utility Valet', value: 'valet'},
]

/** A Revenue Valet service, rendered at /revenue-valet/<slug> and as a card on /revenue-valet. */
export const revenueValetService = defineType({
  name: 'revenueValetService',
  title: 'Revenue Valet service',
  type: 'document',
  icon: PackageIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'settings', title: 'Settings'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Service name',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
      group: 'content',
      description:
        'One or two sentences. Shown on the service card, under the page headline, and as the search description.',
      validation: (rule) => rule.required().max(220).warning('Keep it short so it fits the card.'),
    }),
    defineField({
      name: 'headline',
      type: 'string',
      group: 'content',
      description: 'The large heading at the top of the service page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'overview',
      type: 'object',
      group: 'content',
      options: {collapsible: false},
      fields: [
        defineField({name: 'heading', type: 'string', validation: (rule) => rule.required()}),
        defineField({
          name: 'paragraphs',
          type: 'array',
          of: [defineArrayMember({type: 'text', rows: 3})],
          validation: (rule) => rule.required().min(1),
        }),
        defineField({
          name: 'points',
          title: 'Key points',
          type: 'array',
          of: [defineArrayMember({type: 'servicePoint'})],
          validation: (rule) => rule.required().min(1).max(6),
        }),
      ],
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      group: 'settings',
      description: 'The page address: utilityvalet.io/revenue-valet/<slug>. Changing it breaks existing links.',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'serviceKey',
      title: 'Icon & illustration',
      type: 'string',
      group: 'settings',
      description: 'Which icon and illustration the website shows for this service.',
      options: {list: SERVICE_KEYS},
      validation: (rule) =>
        rule.required().custom(async (key, context) => {
          if (!key) return true
          const id = context.document?._id.replace(/^drafts\./, '')
          const taken = await context
            .getClient({apiVersion: '2026-09-30'})
            .fetch(
              `count(*[_type == "revenueValetService" && serviceKey == $key && !(_id in [$id, "drafts." + $id])])`,
              {key, id},
            )
          return taken === 0 || 'Another service already uses this icon & illustration.'
        }),
    }),
  ],
  preview: {select: {title: 'title', subtitle: 'headline'}},
})
